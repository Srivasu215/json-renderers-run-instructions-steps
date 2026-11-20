import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import "../../../docs/dist/v5/min.js";
// import { spec } from "spec-repo";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        const localInstructions = window.ks.declarative.definitions.data.table.simple.instructions;
        const localBaseFromSpec = window.ks.declarative.definitions.data.table.simple.baseFromSpec;

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

        // console.log("V4 Table Result Spec:", result);
        // const container = document.getElementById(targetHtmlId);
        // if (container) {
        //     container.innerHTML = `<pre class="bg-white p-3 border rounded"><code>${JSON.stringify(result, null, 2)}</code></pre>`;
        // }
    } catch (err) {
        console.error("V4 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
