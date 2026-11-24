# json-renderers-run-instructions-steps

> Sequential blueprint instruction step runner for JSON renderers with 3D dimensional orchestration and declarative-spec resolution.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge)](https://keshavsoft.github.io/json-renderers-run-instructions-steps/)
[![NPM Package](https://img.shields.io/badge/📦_npm-v1.5.1-cb3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/json-renderers-run-instructions-steps)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/json-renderers-run-instructions-steps.svg)](https://www.npmjs.com/package/json-renderers-run-instructions-steps)

## ⚡ Quick Note: What It Is

`json-renderers-run-instructions-steps` takes a base canvas from `declarative-spec` and runs an array of instruction blueprints sequentially to generate complete JSON UI specifications with **zero DOM dependencies**.

```
Input Data + baseKey + instructions ---> [Step Runner] ---> Generated UI Spec AST
```

---

## 🚀 Quick Start

### Installation

```bash
npm install json-renderers-run-instructions-steps
```

### Usage (ESM)

```javascript
import runInstructions from "json-renderers-run-instructions-steps";

const spec = runInstructions({
  baseKey: "tableSimple", // Auto-resolves base AST from declarative-spec
  instructions: ["buildColgroup", "buildHeader", "buildBody"],
  data: { columns, data },
});
```

### Browser (CDN / Script tag)

```javascript
// Automatically mounted to window.ks:
window.ks.jsonRenderers.runInstructions.steps.runInstructions({
  baseKey: "tableSimple",
  instructions: ["buildColgroup", "buildHeader", "buildBody"],
  data: { columns, data },
});
```

---

## 📐 3D Dimensional Orchestration

| Dimension          | Package                                 | Method                        | Builds                         |
| :----------------- | :-------------------------------------- | :---------------------------- | :----------------------------- |
| **0D (Primitive)** | `json-transformer-funcs-primitive`      | `applyTemplate`               | Cards, Badges, Field shells    |
| **1D (Linear)**    | `json-transformer-funcs-one-dimension`  | `fromCollection`              | Colgroups, Headers, Lists      |
| **2D (Matrix)**    | `json-transformer-funcs-two-dimensions` | `rowOnColumn` / `columnOnRow` | Table body, Selects, DataLists |

---

## 📄 License

MIT © [KeshavSoft](https://github.com/keshavsoft)
