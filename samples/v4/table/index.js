import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import runInstructions from "../../src/v4/index.js";
import { spec } from "spec-repo";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        const base = structuredClone(spec.tableSimple);
        const result = runInstructions({
            instructions: ["buildColgroup", "buildHeader", "buildBody"],
            base,
            data: { columns, data },
            showLog: true
        });

        console.log("V4 Table Result Spec:", result);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<pre class="bg-white p-3 border rounded"><code>${JSON.stringify(result, null, 2)}</code></pre>`;
        }
    } catch (err) {
        console.error("V4 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
