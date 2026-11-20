import writePath from "json-write-path";
import { query } from "jsonpathly";

export const resolveSource = (sourcePath, state) => {
    if (!sourcePath) return null;

    const root = state[sourcePath.fileName];
    if (root === undefined) {
        throw new Error(`Entry not found in state: ${sourcePath.fileName}`);
    }

    if (sourcePath.jsonPath) {
        const matches = query(root, sourcePath.jsonPath, { returnArray: true });
        if (matches.length === 0) {
            if (Array.isArray(root)) return root;
            return [];
        }
        return matches.length === 1 ? matches[0] : matches;
    }

    if (Array.isArray(sourcePath.filePath) && sourcePath.filePath.length > 0) {
        return sourcePath.filePath.reduce((curr, key) => (curr ? curr[key] : undefined), root);
    }

    return root;
};

export const checkDestinationExists = (destinationPath, state) => {
    if (!destinationPath) return true;
    const root = state[destinationPath.fileName];
    if (root === undefined) return false;

    if (destinationPath.jsonPath) {
        const matches = query(root, destinationPath.jsonPath, { returnArray: true });
        return matches.length > 0;
    }

    return true;
};

export const writeResult = (state, destinationPath, result, showLog = false) => {
    if (!destinationPath) return;

    if (!destinationPath.filePath || destinationPath.filePath.length === 0) {
        const target = state[destinationPath.fileName];
        if (Array.isArray(target)) {
            target.push(...(Array.isArray(result) ? result : [result]));
        } else {
            state[destinationPath.fileName] = result;
        }
        return;
    }

    writePath(state, destinationPath, result, showLog);
};

export const shouldSkip = (instruction, base, showLog = false) => {
    if (instruction.destinationPath?.dataRole && !instruction.destinationPath?.jsonPath) {
        instruction.destinationPath.jsonPath = `$..*[?@.attributes['data-role'] == '${instruction.destinationPath.dataRole}']`;
    }

    if (instruction.skipIf && query(base, instruction.skipIf, { returnArray: true }).length > 0) {
        return true;
    }

    if (!checkDestinationExists(instruction.destinationPath, { base })) {
        if (showLog) {
            console.warn(`Destination node not found for ${instruction.destinationPath?.jsonPath}, skipping instruction.`);
        }
        return true;
    }

    return false;
};
