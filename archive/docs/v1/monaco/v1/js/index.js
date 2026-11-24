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

        // 2. Load Default Instructions
        state.content = await loadInitialInstructions();

        // 3. Create Monaco Editor Instance
        const container = $('jsonEditor');
        const editor = monaco.editor.create(container, {
            value: state.content,
            language: 'json',
            theme: 'vs-dark',
            automaticLayout: true,
            tabSize: 2,
            fontSize: 13,
            lineNumbers: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'all',
            padding: { top: 10 }
        });

        state.editor = editor;

        // Track live edits
        editor.onDidChangeModelContent(() => {
            state.content = editor.getValue();
        });

        // 4. Update Cursor Position in Footer
        editor.onDidChangeCursorPosition((e) => {
            const pos = e.position;
            const el = $('cursorPos');
            if (el) el.textContent = `Ln ${pos.lineNumber}, Col ${pos.column}`;
        });

        // 5. File Picker Wiring (Button Click + Ctrl/Cmd+O)
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
                    state.content = text;
                    state.fileName = file.name;
                    
                    // Format if valid JSON
                    const formatted = pretty(text);
                    editor.setValue(formatted);

                    const fn = $('fileName');
                    if (fn) fn.textContent = file.name;

                    setStatus(`Loaded: ${file.name}`);
                };
                reader.readAsText(file);
            });
        }

        // Ctrl+O / Cmd+O Shortcut
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () => {
            if (fileInput) {
                fileInput.value = '';
                fileInput.click();
            }
        });

        // Initial status
        setStatus('Ready ✓');
    } catch (err) {
        console.error('Failed to initialize Monaco V1:', err);
    }
}

// Boot on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
