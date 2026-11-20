import { spec, instructions as instructionsRepo } from "spec-repo";
import { resolveSource, writeResult, shouldSkip } from "./helpers.js";
import {
    runSingleTransformer,
    runRowOnColumnTransformer,
    runColumnOnRowTransformer
} from "./transformers.js";

export const executeStep = (instructionOrKey, { base, data }, showLog = false) => {
    if (!instructionOrKey) return null;

    if (Array.isArray(instructionOrKey)) {
        return instructionOrKey.map(step => executeStep(step, { base, data }, showLog));
    }

    const instruction = typeof instructionOrKey === "string"
        ? instructionsRepo[instructionOrKey]
        : instructionOrKey;

    if (!instruction) {
        if (showLog) console.warn(`Instruction not found: ${instructionOrKey}`);
        return null;
    }

    if (shouldSkip(instruction, base, showLog)) {
        return null;
    }

    const type = instruction.type ?? (instruction.templateKey?.columnKey ? "rowOnColumn" : "single");
    const state = { base, data };
    let result;

    if (type === "rowOnColumn") {
        const columnSpec = spec[instruction?.templateKey?.columnKey];
        const rowSpec = spec[instruction?.templateKey?.rowKey];
        const columns = data?.columns ?? [];
        const rows = data?.data ?? (Array.isArray(data) ? data : data?.rows ?? []);
        result = runRowOnColumnTransformer({ columns, data: rows, columnSpec, rowSpec });
    } else if (type === "columnOnRow") {
        const columnSpec = spec[instruction?.templateKey?.columnKey];
        const rowSpec = spec[instruction?.templateKey?.rowKey];
        const columns = data?.columns ?? [];
        const rows = data?.data ?? (Array.isArray(data) ? data : data?.rows ?? []);
        result = runColumnOnRowTransformer({ columns, rows, columnSpec, rowSpec });
    } else {
        const template = instruction.templateKey ? spec[instruction.templateKey] : null;
        const source = resolveSource(instruction.sourcePath, state);
        result = runSingleTransformer(source, template, instruction.func);
    }

    writeResult(state, instruction.destinationPath, result, showLog);
    return result;
};

export default executeStep;
