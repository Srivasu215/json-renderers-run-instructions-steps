import executeStep from "./executeStep.js";

/**
 * Task 1: Executes an array of blueprint instructions sequentially on base with data.
 */
const runInstructions = ({
    instructions = [],
    base,
    data,
    showLog = false
} = {}) => {
    if (!Array.isArray(instructions)) {
        throw new TypeError("instructions must be an array");
    }

    instructions.forEach(step => {
        if (showLog) console.log("[runInstructions step]:", step);
        executeStep(step, { base, data }, showLog);
    });

    return base;
};

export { executeStep };
export default runInstructions;
