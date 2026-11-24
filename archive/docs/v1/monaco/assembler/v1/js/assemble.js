/**
 * Deep clone and interpolate placeholders {{key}} in a JSON specification tree.
 */
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

/**
 * Fetch a JSON specification file.
 */
async function fetchSpec(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load specification from ${path}: HTTP ${res.status}`);
    return await res.json();
}

/**
 * The Central Assembler:
 * Dynamically composes atomic JSON component specs into a complete studio specification tree.
 */
export async function assembleStudioSpec({ paneCount = 2, paneDefinitions = [] } = {}) {
    const [headerSpec, paneTemplate, footerSpec] = await Promise.all([
        fetchSpec('./specs/header.spec.json'),
        fetchSpec('./specs/pane.spec.json'),
        fetchSpec('./specs/footer.spec.json')
    ]);

    // Build the Pane specifications
    const assembledPanes = [];
    for (let i = 0; i < paneCount; i++) {
        const def = paneDefinitions[i] || {
            paneId: `pane${i + 1}`,
            badgeText: `Editor ${i + 1}`,
            fileBtnId: `openFileBtn${i + 1}`,
            fileInputId: `fileInput${i + 1}`,
            fileNameId: `fileName${i + 1}`,
            defaultFileName: `file${i + 1}.json`,
            editorId: `editor${i + 1}`
        };

        const paneInstance = interpolateSpec(paneTemplate, def);
        assembledPanes.push(paneInstance);
    }

    // Assemble the complete Studio App specification tree
    const studioAppSpec = {
        tagName: 'div',
        attributes: {
            class: 'studio-app'
        },
        children: [
            headerSpec,
            {
                tagName: 'main',
                attributes: {
                    id: 'studioWorkspace',
                    class: 'studio-workspace',
                    'data-panes': String(paneCount)
                },
                children: assembledPanes
            },
            footerSpec
        ]
    };

    return studioAppSpec;
}

export default assembleStudioSpec;
