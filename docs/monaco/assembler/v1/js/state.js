export const $ = (id) => document.getElementById(id);

export const state = {
    activePanesCount: 2,
    editors: [],
    activeEditorIndex: 0,
    fileNames: ['instructions.json', 'data.json', 'columns.json'],
    contents: ['', '', '']
};

export const defaultPaneDefinitions = [
    {
        paneId: 'pane1',
        badgeText: 'Editor 1',
        fileBtnId: 'openFileBtn1',
        fileInputId: 'fileInput1',
        fileNameId: 'fileName1',
        defaultFileName: 'instructions.json',
        editorId: 'editor1'
    },
    {
        paneId: 'pane2',
        badgeText: 'Editor 2',
        fileBtnId: 'openFileBtn2',
        fileInputId: 'fileInput2',
        fileNameId: 'fileName2',
        defaultFileName: 'data.json',
        editorId: 'editor2'
    },
    {
        paneId: 'pane3',
        badgeText: 'Editor 3',
        fileBtnId: 'openFileBtn3',
        fileInputId: 'fileInput3',
        fileNameId: 'fileName3',
        defaultFileName: 'columns.json',
        editorId: 'editor3'
    }
];

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

export async function loadInitialInstructions() {
    try {
        const res = await fetch('./data/instructions.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch {
        return pretty({ "buildHeader": { "type": "single", "narration": "Build table header" } });
    }
}

export async function loadInitialData() {
    try {
        const res = await fetch('./data/data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch {
        return pretty([ { "itemName": "Demo Item", "category": "General" } ]);
    }
}

export async function loadInitialColumns() {
    try {
        const res = await fetch('./data/columns.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch {
        return pretty([ { "columnName": "itemName", "label": "Item Name" } ]);
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
