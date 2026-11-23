import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import "../../../docs/dist/v6/min.js";

// import runInstructions from "../../src/v4/index.js";
// import { spec } from "spec-repo";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        console.log("window.ks.declarative.definitions.data.table.simple:", window.ks.declarative.definitions.data.select.simple);
        const localInstructions = window.ks.declarative.definitions.data.select.simple.instructions;
        const localBaseFromSpec = window.ks.declarative.definitions.data.select.simple.baseFromSpec;

        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: localInstructions,
            baseKey: localBaseFromSpec,
            data: { columns, data },
            showLog: false
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: result,
            targetHtmlId, appendPosition: "replace", showLog: false
        });

    } catch (err) {
        console.error("V4 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
