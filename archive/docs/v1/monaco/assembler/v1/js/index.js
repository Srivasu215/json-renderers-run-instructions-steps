import { $, state, defaultPaneDefinitions, pretty, loadInitialInstructions, loadInitialData, loadInitialColumns, setStatus } from './state.js';
import { assembleStudioSpec } from './assemble.js';
import { buildSpecElement } from './jsonToDom.js';
import { exportPhysicalProject } from './exportPhysical.js';

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

function setLayoutMode(count) {
    const validCount = Math.max(1, Math.min(3, parseInt(count, 10) || 2));
    state.activePanesCount = validCount;

    const workspace = $('studioWorkspace');
    if (workspace) {
        workspace.setAttribute('data-panes', String(validCount));
    }

    document.querySelectorAll('.btn-layout-mode').forEach((btn) => {
        const btnCount = parseInt(btn.getAttribute('data-panes'), 10);
        if (btnCount === validCount) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const meta = $('layoutMeta');
    if (meta) {
        meta.textContent = `${validCount} Pane${validCount > 1 ? 's' : ''} Assembled`;
    }

    requestAnimationFrame(() => {
        setTimeout(() => {
            state.editors.forEach((ed, idx) => {
                if (ed && idx < validCount) ed.layout();
            });
        }, 50);
    });

    const url = new URL(window.location.href);
    url.searchParams.set('panes', String(validCount));
    window.history.replaceState({}, '', url.toString());
}

async function start() {
    try {
        const appRoot = $('appRoot');
        if (!appRoot) throw new Error('#appRoot element not found');

        // 1. Determine Initial Layout (defaults to 2)
        const params = new URLSearchParams(window.location.search);
        const initialPanes = Math.max(1, Math.min(3, parseInt(params.get('panes') || '2', 10)));
        state.activePanesCount = initialPanes;

        // 2. Load Default Data Content
        state.contents[0] = await loadInitialInstructions();
        state.contents[1] = await loadInitialData();
        state.contents[2] = await loadInitialColumns();

        // 3. Assemble Complete Specification Tree from JSON Specs
        const fullSpec = await assembleStudioSpec({
            paneCount: 3, // Assemble all 3 panes into DOM; layout mode controls visibility
            paneDefinitions: defaultPaneDefinitions
        });

        // 4. Render Specification Directly into DOM via jsonToDom
        const studioAppEl = buildSpecElement({ inSpec: fullSpec });
        appRoot.appendChild(studioAppEl);

        // 5. Initialize Monaco Core
        const monaco = await initMonaco();

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

        // 6. Mount Monaco instances into assembled pane slots
        [1, 2, 3].forEach((num) => {
            const idx = num - 1;
            const container = $(`editor${num}`);
            if (!container) return;

            const ed = monaco.editor.create(container, {
                ...editorConfig,
                value: state.contents[idx]
            });
            state.editors[idx] = ed;

            wirePane({
                editor: ed,
                fileBtnId: `openFileBtn${num}`,
                fileInputId: `fileInput${num}`,
                fileNameId: `fileName${num}`,
                index: idx
            });

            ed.onDidChangeModelContent(() => {
                state.contents[idx] = ed.getValue();
            });

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

        // 7. Wire Layout Switcher Buttons
        document.querySelectorAll('.btn-layout-mode').forEach((btn) => {
            btn.addEventListener('click', () => {
                const count = btn.getAttribute('data-panes');
                setLayoutMode(count);
            });
        });

        // 8. Wire Export Physical Project Button
        const btnExport = $('btnExportProject');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                const studioEl = document.querySelector('.studio-app');
                exportPhysicalProject({
                    paneCount: state.activePanesCount,
                    studioAppElement: studioEl
                });
                setStatus(`Exported physical HTML (${state.activePanesCount} Panes) ✓`);
            });
        }

        // 9. Apply Initial Layout
        setLayoutMode(initialPanes);

        window.addEventListener('resize', () => {
            state.editors.forEach((ed, idx) => {
                if (ed && idx < state.activePanesCount) ed.layout();
            });
        });

        setStatus('Assembled ✓');
    } catch (err) {
        console.error('Failed to initialize Monaco Studio Assembler:', err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
