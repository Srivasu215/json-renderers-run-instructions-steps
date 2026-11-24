export const $ = (id) => document.getElementById(id);

export const state = {
    activePanesCount: 2,
    editors: [null, null, null],
    activeEditorIndex: 0,
    fileNames: ['instructions.json', 'data.json', 'columns.json'],
    contents: ['', '', '']
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

export async function loadInitialInstructions() {
    try {
        const res = await fetch('./data/instructions.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch (err) {
        console.warn('Fallback: instructions.json', err);
        return pretty({ "buildHeader": { "type": "single", "narration": "Build table header" } });
    }
}

export async function loadInitialData() {
    try {
        const res = await fetch('./data/data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch (err) {
        console.warn('Fallback: data.json', err);
        return pretty([ { "itemName": "Demo Item", "category": "General" } ]);
    }
}

export async function loadInitialColumns() {
    try {
        const res = await fetch('./data/columns.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return pretty(data);
    } catch (err) {
        console.warn('Fallback: columns.json', err);
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
