#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const specsDir = path.join(rootDir, 'docs', 'monaco', 'assembler', 'v1', 'specs');
const cssSourceDir = path.join(rootDir, 'docs', 'monaco', 'assembler', 'v1', 'css');
const dataSourceDir = path.join(rootDir, 'docs', 'monaco', 'assembler', 'v1', 'data');

// CLI Arguments: node scaffold.js [panes] [targetDir]
const args = process.argv.slice(2);
const paneCountArg = parseInt(args[0], 10) || 2;
const targetDirArg = args[1] || path.join(rootDir, 'my-client-tool');

const paneCount = Math.max(1, Math.min(3, paneCountArg));
const targetDir = path.resolve(process.cwd(), targetDirArg);

console.log(`\n======================================================`);
console.log(`  KeshavSoft STATIC Studio Generator`);
console.log(`  Mode: ${paneCount} Pane${paneCount > 1 ? 's' : ''} (100% Static HTML)`);
console.log(`  Target: ${targetDir}`);
console.log(`======================================================\n`);

/**
 * Compile a KeshavSoft JSON specification object into indented, valid static HTML.
 */
function specToHtml(spec, indent = 0) {
    if (spec === null || spec === undefined) return '';
    if (typeof spec === 'string' || typeof spec === 'number') {
        return ' '.repeat(indent) + String(spec);
    }
    const spaces = ' '.repeat(indent);
    const tagName = spec.tagName || 'div';
    
    let attrStr = '';
    if (spec.attributes) {
        for (const [k, v] of Object.entries(spec.attributes)) {
            attrStr += ` ${k}="${String(v).replace(/"/g, '&quot;')}"`;
        }
    }

    const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    if (voidElements.has(tagName.toLowerCase())) {
        return `${spaces}<${tagName}${attrStr}>`;
    }

    if (spec.textContent !== undefined && spec.textContent !== null && (!spec.children || spec.children.length === 0)) {
        return `${spaces}<${tagName}${attrStr}>${spec.textContent}</${tagName}>`;
    }

    if (spec.children && spec.children.length > 0) {
        const childHtmls = spec.children.map(child => {
            if (typeof child === 'string') {
                return `${spaces}    ${child}`;
            }
            return specToHtml(child, indent + 4);
        }).join('\n');
        return `${spaces}<${tagName}${attrStr}>\n${childHtmls}\n${spaces}</${tagName}>`;
    }

    return `${spaces}<${tagName}${attrStr}></${tagName}>`;
}

function interpolateSpec(obj, vars) {
    if (typeof obj === 'string') {
        let result = obj;
        for (const [key, val] of Object.entries(vars)) {
            result = result.replaceAll(`{{${key}}}`, String(val));
        }
        return result;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => interpolateSpec(item, vars));
    }
    if (obj !== null && typeof obj === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(obj)) {
            out[k] = interpolateSpec(v, vars);
        }
        return out;
    }
    return obj;
}

// 1. Prepare Target Directories
fs.mkdirSync(path.join(targetDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(targetDir, 'data'), { recursive: true });
fs.mkdirSync(path.join(targetDir, 'js'), { recursive: true });

// 2. Compile Static HTML from JSON Specs
const paneTemplate = JSON.parse(fs.readFileSync(path.join(specsDir, 'pane.spec.json'), 'utf-8'));
const footerSpec = JSON.parse(fs.readFileSync(path.join(specsDir, 'footer.spec.json'), 'utf-8'));

const filesForPanes = ['instructions.json', 'data.json', 'columns.json'];

// Static Header HTML
const headerHtml = `        <!-- Top Bar Header Section -->
        <header class="studio-header">
            <div class="header-left">
                <a href="#" class="brand-link" title="Monaco Studio">
                    <i class="bi bi-cpu-fill brand-icon"></i>
                    <span>json-renderers-run-instructions-steps</span>
                    <span class="version-pill">v1</span>
                </a>
            </div>
            <div class="header-right">
                <span id="statusPill" class="status-pill success hidden">
                    <i class="bi bi-check2"></i> <span id="statusText">Loaded ✓</span>
                </span>
                <div class="header-divider"></div>
                <span class="pane-file-pill">
                    <i class="bi bi-layout-split"></i>
                    <span>${paneCount} Pane${paneCount > 1 ? 's' : ''} Static Layout</span>
                </span>
            </div>
        </header>`;

// Static Workspace Panes HTML
const paneHtmls = [];
for (let i = 0; i < paneCount; i++) {
    const paneSpec = interpolateSpec(paneTemplate, {
        paneId: `pane${i + 1}`,
        badgeText: `Editor ${i + 1}`,
        fileBtnId: `openFileBtn${i + 1}`,
        fileInputId: `fileInput${i + 1}`,
        fileNameId: `fileName${i + 1}`,
        defaultFileName: filesForPanes[i] || `file${i + 1}.json`,
        editorId: `editor${i + 1}`
    });
    paneHtmls.push(specToHtml(paneSpec, 12));
}

const workspaceHtml = `        <!-- Main Workspace Section: ${paneCount} Static Panes -->
        <main class="studio-workspace" data-panes="${paneCount}">
${paneHtmls.join('\n\n')}
        </main>`;

// Static Footer HTML
footerSpec.children[0].children[2].textContent = `${paneCount} Pane${paneCount > 1 ? 's' : ''} Active`;
const footerHtml = specToHtml(footerSpec, 8);

const fullIndexHtml = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Monaco Studio (${paneCount} Pane Static Project) | KeshavSoft</title>
    
    <!-- Auto-normalize trailing slash so relative paths ./css and ./js always resolve correctly -->
    <script>
        if (!location.pathname.endsWith('/') && !location.pathname.endsWith('.html')) {
            location.replace(location.pathname + '/' + location.search + location.hash);
        }
    </script>
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- Monaco Editor Stylesheet -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/editor/editor.main.min.css">
    
    <!-- Modular Control-Scoped CSS -->
    <link rel="stylesheet" href="./css/base.css">
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="./css/workspace.css">
    <link rel="stylesheet" href="./css/footer.css">
</head>

<body>
    <div class="studio-app">
${headerHtml}

${workspaceHtml}

${footerHtml}
    </div>

    <!-- Monaco AMD Loader -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js"></script>
    
    <!-- Functional Controller -->
    <script type="module" src="./js/index.js"></script>
</body>

</html>
`;

fs.writeFileSync(path.join(targetDir, 'index.html'), fullIndexHtml, 'utf-8');
console.log(`✓ Generated 100% STATIC index.html with ${paneCount} panes baked in`);

// 3. Copy Modular CSS
const cssFiles = ['base.css', 'header.css', 'workspace.css', 'footer.css'];
for (const f of cssFiles) {
    const src = path.join(cssSourceDir, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, 'css', f));
    }
}
console.log(`✓ Copied modular CSS (base.css, header.css, workspace.css, footer.css)`);

// 4. Copy Required Data Files
for (let i = 0; i < paneCount; i++) {
    const f = filesForPanes[i];
    const src = path.join(dataSourceDir, f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, 'data', f));
    }
}
console.log(`✓ Copied ${paneCount} data files`);

// 5. Generate Lean, Static-Driven JS Controller (Zero Dynamic Assembler at Runtime!)
const stateJsContent = `export const $ = (id) => document.getElementById(id);

export const state = {
    paneCount: ${paneCount},
    editors: [],
    fileNames: ${JSON.stringify(filesForPanes.slice(0, paneCount))},
    contents: []
};

export const pretty = (v) => {
    if (typeof v === 'string') {
        try {
            return JSON.stringify(JSON.parse(v), null, 2);
        } catch {
            return v;
        }
    }
    return JSON.stringify(v, null, 2);
};

export async function loadInitialData(filename) {
    try {
        const res = await fetch(\`./data/\${filename}\`);
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const data = await res.json();
        return pretty(data);
    } catch (err) {
        console.warn('Fallback loading', filename, err);
        return pretty({ "status": "ready", "file": filename });
    }
}

export function setStatus(text) {
    const pill = $('statusPill');
    const textEl = $('statusText');
    if (!pill || !textEl) return;
    
    textEl.textContent = text;
    pill.classList.remove('hidden');
    
    clearTimeout(setStatus._timer);
    setStatus._timer = setTimeout(() => {
        pill.classList.add('hidden');
    }, 3000);
}
`;

fs.writeFileSync(path.join(targetDir, 'js', 'state.js'), stateJsContent, 'utf-8');

const indexJsContent = `import { $, state, pretty, loadInitialData, setStatus } from './state.js';

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

            setStatus(\`Loaded: \${file.name}\`);
        };
        reader.readAsText(file);
    });
}

async function start() {
    try {
        // 1. Initialize Monaco AMD Core
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

        // 2. Preload Data and Mount Monaco to Static Containers
        for (let i = 0; i < state.paneCount; i++) {
            const num = i + 1;
            const container = $(\`editor\${num}\`);
            if (!container) continue;

            const initialText = await loadInitialData(state.fileNames[i]);
            state.contents[i] = initialText;

            const ed = monaco.editor.create(container, {
                ...editorConfig,
                value: initialText
            });
            state.editors[i] = ed;

            // Wire dedicated file picker
            wirePane({
                editor: ed,
                fileBtnId: \`openFileBtn\${num}\`,
                fileInputId: \`fileInput\${num}\`,
                fileNameId: \`fileName\${num}\`,
                index: i
            });

            // Live edit updates
            ed.onDidChangeModelContent(() => {
                state.contents[i] = ed.getValue();
            });

            // Focus and cursor tracker
            const updateCursor = () => {
                const pos = ed.getPosition();
                const el = $('cursorPos');
                if (el && pos) el.textContent = \`Editor \${num} | Ln \${pos.lineNumber}, Col \${pos.column}\`;
            };

            ed.onDidFocusEditorText(updateCursor);
            ed.onDidChangeCursorPosition(updateCursor);
        }

        setStatus('Ready ✓');
    } catch (err) {
        console.error('Failed to initialize static Monaco studio:', err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
`;

fs.writeFileSync(path.join(targetDir, 'js', 'index.js'), indexJsContent, 'utf-8');
console.log(`✓ Generated static JS controller (zero runtime assemble/fetch dependencies)`);

// 6. Clean up any leftover runtime assembler files from target
const oldFiles = ['assemble.js', 'jsonToDom.js', 'exportPhysical.js'];
for (const of_ of oldFiles) {
    const p = path.join(targetDir, 'js', of_);
    if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log(`\n🎉 Success! Scaffolded 100% STATIC project at:`);
console.log(`   ${targetDir}\n`);
