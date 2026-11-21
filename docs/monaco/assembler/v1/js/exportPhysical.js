/**
 * Export the currently assembled Studio as a clean, physical HTML file.
 */
export function exportPhysicalProject({ paneCount, studioAppElement }) {
    if (!studioAppElement) return;

    // Clone element to sanitize before export
    const clone = studioAppElement.cloneNode(true);

    // Format HTML indentation
    const bodyHtml = clone.outerHTML
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n');

    const physicalHtml = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Monaco Studio (Physical Export - ${paneCount} Pane${paneCount > 1 ? 's' : ''}) | KeshavSoft</title>
    
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
${bodyHtml}

    <!-- Monaco AMD Loader -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js"></script>
    
    <!-- Functional Controller -->
    <script type="module" src="./js/index.js"></script>
</body>

</html>
`;

    // Trigger physical file download in browser
    const blob = new Blob([physicalHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `index-${paneCount}-pane.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default exportPhysicalProject;
