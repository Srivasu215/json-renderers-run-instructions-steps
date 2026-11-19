import { spec, instructions } from "spec-repo";
import { resolveSource, writeResult } from "./helpers.js";
import {
    runSingleTransformer,
    runRowOnColumnTransformer,
    runColumnOnRowTransformer
} from "./transformers.js";

const types = {
    single: (instruction, state) => {
        const template = spec[instruction.templateKey];
        const source = resolveSource(instruction.sourcePath, state);
        return runSingleTransformer(source, template, instruction.func);
    },
    rowOnColumn: (instruction, { data }) => {
        const { columnKey, rowKey } = instruction.templateKey;
        return runRowOnColumnTransformer({
            columns: data?.columns,
            data: data?.data ?? (Array.isArray(data) ? data : data?.rows),
            columnSpec: spec[columnKey],
            rowSpec: spec[rowKey]
        });
    },
    columnOnRow: (instruction, { data }) => {
        const { columnKey, rowKey } = instruction.templateKey;
        return runColumnOnRowTransformer({
            columns: data?.columns,
            rows: data?.data ?? (Array.isArray(data) ? data : data?.rows),
            columnSpec: spec[columnKey],
            rowSpec: spec[rowKey]
        });
    }
};

export const executeStep = (key, state, showLog = false) => {
    const instruction = instructions[key];
    const result = types[instruction.type](instruction, state);
    writeResult(state, instruction.destinationPath, result, showLog);
    return result;
};

export default executeStep;
