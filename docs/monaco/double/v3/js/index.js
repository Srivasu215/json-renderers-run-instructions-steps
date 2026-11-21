import { $, state, pretty, loadInitialInstructions, loadInitialData, loadInitialColumns, setStatus } from './state.js';

async function initMonaco() {
    return new Promise((resolve, reject) => {
        if (window.monaco) {
            return resolve(window.monaco);
        }
        require.config({
            paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }
        });
        require(['vs/editor/editor.main'], () => resolve(window.monaco), reject);
    });
}

/**
 * Wire a self-contained Studio Pane component:
 * Connects a File Open button + input to its dedicated Monaco editor and active file pill.
 */
function wirePane({ editor, fileBtnId, fileInputId, fileNameId, index }) {
    const fileBtn = $(fileBtnId);
    const fileInput = $(fileInputId);
    const fileNameEl = $(fileNameId);

    if (!fileBtn || !fileInput) return;

    fileBtn.addEventListener('click', () => {
        fileInput.value = '';
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target.result;
            const formatted = pretty(text);
            editor.setValue(formatted);

            if (fileNameEl) fileNameEl.textContent = file.name;
            state.fileNames[index] = file.name;
            state.contents[index] = formatted;

            setStatus(`Loaded: ${file.name}`);
        };
        reader.readAsText(file);
    });
}

/**
 * Switch layout mode: 1, 2, or 3 panes.
 */
function setLayoutMode(count) {
    const validCount = Math.max(1, Math.min(3, parseInt(count, 10) || 2));
    state.activePanesCount = validCount;

    const workspace = $('studioWorkspace');
    if (workspace) {
        workspace.setAttribute('data-panes', String(validCount));
    }

    // Update switcher buttons UI
    document.querySelectorAll('.btn-layout-mode').forEach((btn) => {
        const btnCount = parseInt(btn.getAttribute('data-panes'), 10);
        if (btnCount === validCount) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update footer metadata
    const meta = $('layoutMeta');
    if (meta) {
        meta.textContent = `${validCount} Pane${validCount > 1 ? 's' : ''} Active`;
    }

    // Trigger Monaco layout reflow on visible editors
    requestAnimationFrame(() => {
        setTimeout(() => {
            state.editors.forEach((ed, idx) => {
                if (ed && idx < validCount) {
                    ed.layout();
                }
            });
        }, 50);
    });

    // Sync URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('panes', String(validCount));
    window.history.replaceState({}, '', url.toString());
}

async function start() {
    try {
        // 1. Initialize Monaco Core
        const monaco = await initMonaco();

        // 2. Load Default Initial Data for all 3 Panes
        state.contents[0] = await loadInitialInstructions();
        state.contents[1] = await loadInitialData();
        state.contents[2] = await loadInitialColumns();

        const editorConfig = {
            language: 'json',
            theme: 'vs-dark',
            automaticLayout: true,
            tabSize: 2,
            fontSize: 13,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'all',
            padding: { top: 10 }
        };

        // 3. Mount Editors 1, 2, and 3
        [1, 2, 3].forEach((num) => {
            const idx = num - 1;
            const container = $(`editor${num}`);
            if (!container) return;

            const ed = monaco.editor.create(container, {
                ...editorConfig,
                value: state.contents[idx]
            });
            state.editors[idx] = ed;

            // Wire individual file picker
            wirePane({
                editor: ed,
                fileBtnId: `openFileBtn${num}`,
                fileInputId: `fileInput${num}`,
                fileNameId: `fileName${num}`,
                index: idx
            });

            // Track live content changes
            ed.onDidChangeModelContent(() => {
                state.contents[idx] = ed.getValue();
            });

            // Focus & cursor tracker
            const updateCursor = () => {
                const pos = ed.getPosition();
                const el = $('cursorPos');
                if (el && pos) el.textContent = `Editor ${num} | Ln ${pos.lineNumber}, Col ${pos.column}`;
            };

            ed.onDidFocusEditorText(() => {
                state.activeEditorIndex = idx;
                updateCursor();
            });

            ed.onDidChangeCursorPosition(() => {
                if (state.activeEditorIndex === idx) updateCursor();
            });
        });

        // 4. Wire Layout Switcher Buttons
        document.querySelectorAll('.btn-layout-mode').forEach((btn) => {
            btn.addEventListener('click', () => {
                const count = btn.getAttribute('data-panes');
                setLayoutMode(count);
            });
        });

        // 5. Initial Layout Mode from URL (defaults to 2)
        const params = new URLSearchParams(window.location.search);
        const initialPanes = params.get('panes') || '2';
        setLayoutMode(initialPanes);

        // Window resize reflow
        window.addEventListener('resize', () => {
            state.editors.forEach((ed, idx) => {
                if (ed && idx < state.activePanesCount) ed.layout();
            });
        });

        setStatus('Ready ✓');
    } catch (err) {
        console.error('Failed to initialize Monaco Studio V3:', err);
    }
}

// Boot on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
