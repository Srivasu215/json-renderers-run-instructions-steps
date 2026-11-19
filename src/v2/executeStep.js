import { spec, instructions } from "spec-repo";
import { query } from "jsonpathly";
import { resolveSource, writeResult } from "./helpers.js";
import {
    runSingleTransformer,
    runRowOnColumnTransformer,
    runColumnOnRowTransformer
} from "./transformers.js";

const runInstruction = (instruction, { base, data }, showLog) => {
    if (!instruction) return null;

    // Skip if target already inserted (e.g. searchFrame toolbar)
    if (instruction.skipIf && query(base, instruction.skipIf, { returnArray: true }).length > 0) {
        return null;
    }

    // Skip if target container does not exist in base (e.g. footer on table without footer)
    if (instruction.destinationPath?.jsonPath && query(base, instruction.destinationPath.jsonPath, { returnArray: true }).length === 0) {
        return null;
    }

    const type = instruction.type ?? "single";
    const state = { base, data };
    let result;

    if (type === "rowOnColumn" || type === "columnOnRow") {
        const columnSpec = spec[instruction.templateKey.columnKey];
        const rowSpec = spec[instruction.templateKey.rowKey];
        const columns = data?.columns ?? [];
        const rows = data?.data ?? (Array.isArray(data) ? data : data?.rows ?? []);

        result = type === "rowOnColumn"
            ? runRowOnColumnTransformer({ columns, data: rows, columnSpec, rowSpec })
            : runColumnOnRowTransformer({ columns, rows, columnSpec, rowSpec });
    } else {
        const template = instruction.templateKey ? spec[instruction.templateKey] : null;
        const source = resolveSource(instruction.sourcePath, state);
        result = runSingleTransformer(source, template, instruction.func);
    }

    writeResult(state, instruction.destinationPath, result, showLog);
    return result;
};

/**
 * Step Executor: Executes an instruction key (or array of keys) on { base, data }.
 * Keys resolve directly from declarative instructions.
 */
export const executeStep = (key, { base, data }, showLog = false) => {
    if (!key) return null;

    if (Array.isArray(key)) {
        return key.map(k => executeStep(k, { base, data }, showLog));
    }

    const instruction = instructions[key];
    if (!instruction) {
        if (showLog) console.warn(`Instruction not found: ${key}`);
        return null;
    }

    if (Array.isArray(instruction)) {
        return instruction.map(step => runInstruction(step, { base, data }, showLog));
    }

    return runInstruction(instruction, { base, data }, showLog);
};

export default executeStep;
