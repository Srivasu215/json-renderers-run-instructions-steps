import { $, state, pretty, loadInitialInstructions, loadInitialData, setStatus } from './state.js';

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
function wirePane({ paneId, editor, fileBtnId, fileInputId, fileNameId, onLoaded }) {
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
            if (onLoaded) onLoaded(file.name, formatted);
            setStatus(`Loaded: ${file.name}`);
        };
        reader.readAsText(file);
    });
}

async function start() {
    try {
        // 1. Initialize Monaco Editor Core
        const monaco = await initMonaco();

        // 2. Load Default Content for Both Panes
        state.contentLeft = await loadInitialInstructions();
        state.contentRight = await loadInitialData();

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

        // 3. Create Left Monaco Editor Instance (Pane 1)
        const containerLeft = $('editorLeft');
        const editorLeft = monaco.editor.create(containerLeft, {
            ...editorConfig,
            value: state.contentLeft
        });
        state.editorLeft = editorLeft;

        // 4. Create Right Monaco Editor Instance (Pane 2)
        const containerRight = $('editorRight');
        const editorRight = monaco.editor.create(containerRight, {
            ...editorConfig,
            value: state.contentRight
        });
        state.editorRight = editorRight;

        // 5. Wire Self-Contained Pane File Selectors
        wirePane({
            paneId: 'paneLeft',
            editor: editorLeft,
            fileBtnId: 'openFileBtnLeft',
            fileInputId: 'fileInputLeft',
            fileNameId: 'fileNameLeft',
            onLoaded: (name, val) => {
                state.fileNameLeft = name;
                state.contentLeft = val;
            }
        });

        wirePane({
            paneId: 'paneRight',
            editor: editorRight,
            fileBtnId: 'openFileBtnRight',
            fileInputId: 'fileInputRight',
            fileNameId: 'fileNameRight',
            onLoaded: (name, val) => {
                state.fileNameRight = name;
                state.contentRight = val;
            }
        });

        // 6. Track Content Changes
        editorLeft.onDidChangeModelContent(() => {
            state.contentLeft = editorLeft.getValue();
        });
        editorRight.onDidChangeModelContent(() => {
            state.contentRight = editorRight.getValue();
        });

        // 7. Focus & Cursor Position Tracking
        const updateCursor = (ed) => {
            const pos = ed.getPosition();
            const el = $('cursorPos');
            if (el && pos) el.textContent = `Ln ${pos.lineNumber}, Col ${pos.column}`;
        };

        editorLeft.onDidFocusEditorText(() => {
            state.activeEditor = 'left';
            updateCursor(editorLeft);
        });
        editorRight.onDidFocusEditorText(() => {
            state.activeEditor = 'right';
            updateCursor(editorRight);
        });

        editorLeft.onDidChangeCursorPosition(() => {
            if (state.activeEditor === 'left') updateCursor(editorLeft);
        });
        editorRight.onDidChangeCursorPosition(() => {
            if (state.activeEditor === 'right') updateCursor(editorRight);
        });

        setStatus('Ready ✓');
    } catch (err) {
        console.error('Failed to initialize Monaco Double V1:', err);
    }
}

// Boot on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
