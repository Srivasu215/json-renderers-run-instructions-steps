import { spec, instructions } from "spec-repo";
import { query } from "jsonpathly";
import { resolveSource, writeResult } from "./helpers.js";
import {
    runSingleTransformer,
    runRowOnColumnTransformer,
    runColumnOnRowTransformer
} from "./transformers.js";

const extractData = data => ({
    columns: data?.columns ?? [],
    rows: data?.data ?? (Array.isArray(data) ? data : data?.rows ?? [])
});

const types = {
    single: (step, state) => {
        const template = step.templateKey ? spec[step.templateKey] : null;
        const source = resolveSource(step.sourcePath, state);
        return runSingleTransformer(source, template, step.func);
    },
    rowOnColumn: (step, { data }) => {
        const { columns, rows } = extractData(data);
        return runRowOnColumnTransformer({
            columns,
            data: rows,
            columnSpec: spec[step.templateKey.columnKey],
            rowSpec: spec[step.templateKey.rowKey]
        });
    },
    columnOnRow: (step, { data }) => {
        const { columns, rows } = extractData(data);
        return runColumnOnRowTransformer({
            columns,
            rows,
            columnSpec: spec[step.templateKey.columnKey],
            rowSpec: spec[step.templateKey.rowKey]
        });
    }
};

const runSingle = (step, state, showLog) => {
    if (step.skipIf && query(state.base, step.skipIf, { returnArray: true }).length > 0) {
        return null;
    }

    const transform = types[step.type ?? "single"];
    const result = transform(step, state);
    writeResult(state, step.destinationPath, result, showLog);
    return result;
};

export const executeStep = (key, state, showLog = false) => {
    if (!key) return null;

    if (Array.isArray(key)) {
        return key.map(k => executeStep(k, state, showLog));
    }

    const instruction = instructions[key];
    if (!instruction) {
        if (showLog) console.warn(`Instruction not found: ${key}`);
        return null;
    }

    if (Array.isArray(instruction)) {
        return instruction.map(step => runSingle(step, state, showLog));
    }

    return runSingle(instruction, state, showLog);
};

export default executeStep;
