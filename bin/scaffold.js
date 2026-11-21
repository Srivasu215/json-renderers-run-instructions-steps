#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assemblerDir = path.join(rootDir, 'docs', 'monaco', 'assembler', 'v1');

// Parse CLI arguments: node scaffold.js [panes] [targetDir]
const args = process.argv.slice(2);
const paneCountArg = parseInt(args[0], 10) || 2;
const targetDirArg = args[1] || path.join(rootDir, 'docs', 'monaco', `generated-${paneCountArg}-pane`);

const paneCount = Math.max(1, Math.min(3, paneCountArg));
const targetDir = path.resolve(process.cwd(), targetDirArg);

console.log(`\n======================================================`);
console.log(`  KeshavSoft Physical Studio Scaffolder`);
console.log(`  Mode: ${paneCount} Pane${paneCount > 1 ? 's' : ''}`);
console.log(`  Target: ${targetDir}`);
console.log(`======================================================\n`);

// Ensure target directories
fs.mkdirSync(path.join(targetDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(targetDir, 'data'), { recursive: true });
fs.mkdirSync(path.join(targetDir, 'js'), { recursive: true });

// 1. Copy Modular CSS
const cssFiles = ['base.css', 'header.css', 'workspace.css', 'footer.css'];
for (const f of cssFiles) {
    const src = path.join(assemblerDir, 'css', f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, 'css', f));
    }
}
console.log(`✓ Copied modular CSS (base.css, header.css, workspace.css, footer.css)`);

// 2. Copy Data Files
const dataFiles = ['instructions.json', 'data.json', 'columns.json'].slice(0, paneCount);
for (const f of dataFiles) {
    const src = path.join(assemblerDir, 'data', f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, 'data', f));
    }
}
console.log(`✓ Copied ${dataFiles.length} data files (${dataFiles.join(', ')})`);

// 3. Copy JS Modules
const jsFiles = ['index.js', 'state.js', 'assemble.js', 'jsonToDom.js', 'exportPhysical.js'];
for (const f of jsFiles) {
    const src = path.join(assemblerDir, 'js', f);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(targetDir, 'js', f));
    }
}
console.log(`✓ Copied JS engine controller`);

// 4. Generate Physical index.html
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Monaco Studio (${paneCount} Pane Physical Project) | KeshavSoft</title>
    
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
    <!-- Root Mount Point -->
    <div id="appRoot"></div>

    <!-- Monaco AMD Loader -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js"></script>
    
    <!-- Functional Controller (Preconfigured for ${paneCount} Pane${paneCount > 1 ? 's' : ''}) -->
    <script>
        // Force preconfigured pane count
        const url = new URL(window.location.href);
        if (!url.searchParams.has('panes')) {
            url.searchParams.set('panes', '${paneCount}');
            window.history.replaceState({}, '', url.toString());
        }
    </script>
    <script type="module" src="./js/index.js"></script>
</body>

</html>
`;

fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtmlContent, 'utf-8');
console.log(`✓ Generated physical index.html with clean root structure`);

console.log(`\n🎉 Success! Scaffolded ${paneCount}-pane project at:`);
console.log(`   ${targetDir}\n`);
