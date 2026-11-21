import { $, state, pretty, loadInitialInstructions, setStatus } from './state.js';

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

async function start() {
    try {
        // 1. Initialize Monaco Editor Core
        const monaco = await initMonaco();

        // 2. Load Default Content
        state.contentLeft = await loadInitialInstructions();
        state.contentRight = pretty({
            "info": "Monaco Right Editor (50/50)",
            "status": "ready"
        });

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

        // 3. Create Left Monaco Editor Instance
        const containerLeft = $('editorLeft');
        const editorLeft = monaco.editor.create(containerLeft, {
            ...editorConfig,
            value: state.contentLeft
        });
        state.editorLeft = editorLeft;

        // 4. Create Right Monaco Editor Instance
        const containerRight = $('editorRight');
        const editorRight = monaco.editor.create(containerRight, {
            ...editorConfig,
            value: state.contentRight
        });
        state.editorRight = editorRight;

        // Track live edits
        editorLeft.onDidChangeModelContent(() => {
            state.contentLeft = editorLeft.getValue();
        });
        editorRight.onDidChangeModelContent(() => {
            state.contentRight = editorRight.getValue();
        });

        // 5. Cursor Position tracking on active editor
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

        // 6. File Picker Wiring (Loads into currently active editor)
        const fileInput = $('fileInput');
        const openFileBtn = $('openFileBtn');

        if (openFileBtn && fileInput) {
            openFileBtn.addEventListener('click', () => {
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

                    const targetEditor = state.activeEditor === 'right' ? editorRight : editorLeft;
                    targetEditor.setValue(formatted);

                    state.fileName = file.name;
                    const fn = $('fileName');
                    if (fn) fn.textContent = file.name;

                    setStatus(`Loaded: ${file.name}`);
                };
                reader.readAsText(file);
            });
        }

        // Ctrl+O / Cmd+O Shortcut
        editorLeft.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () => {
            if (fileInput) {
                fileInput.value = '';
                fileInput.click();
            }
        });
        editorRight.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () => {
            if (fileInput) {
                fileInput.value = '';
                fileInput.click();
            }
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
