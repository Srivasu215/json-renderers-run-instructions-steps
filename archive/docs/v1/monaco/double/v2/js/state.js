export const $ = (id) => document.getElementById(id);

export const state = {
    editorLeft: null,
    editorRight: null,
    activeEditor: 'left',
    fileName: 'instructions.json',
    contentLeft: '',
    contentRight: ''
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
        console.warn('Fallback: could not fetch local instructions.json', err);
        return pretty({
            "buildColgroup": { "type": "single", "narration": "Build column widths" },
            "buildHeader": { "type": "single", "narration": "Build table header" },
            "buildBody": { "type": "rowOnColumn", "narration": "Build table body" }
        });
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
