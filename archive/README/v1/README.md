# json-renderers-run-instructions-steps

> Sequential blueprint instruction step runner for JSON renderers with 3D dimensional orchestration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: live-demo](https://img.shields.io/badge/live-demo-green)](https://keshavsoft.github.io/json-renderers-run-instructions-steps/)

---

## What It Does

`json-renderers-run-instructions-steps` executes an array of declarative blueprint instructions sequentially on a base canvas using input data:

```javascript
import runInstructions, {
  executeStep,
} from "json-renderers-run-instructions-steps";
import { spec } from "spec-repo";

const base = structuredClone(spec.tableSimple);

const canvas = runInstructions({});
```

---

## 3D Dimensional Orchestration

`json-renderers-run-instructions-steps` is a pure orchestrator. It contains zero transformation loops or ad-hoc algorithms; it delegates directly to the three dimensional transformer functions:

| Dimension          | Package                                 | Function                      | Usage                          |
| :----------------- | :-------------------------------------- | :---------------------------- | :----------------------------- |
| **0D (Primitive)** | `json-transformer-funcs-primitive`      | `applyTemplate`               | Cards, Badges, Containers      |
| **1D (Linear)**    | `json-transformer-funcs-one-dimension`  | `fromCollection`              | Colgroups, Headers, List items |
| **2D (Matrix)**    | `json-transformer-funcs-two-dimensions` | `rowOnColumn` & `columnOnRow` | Table body, Selects, DataLists |

---

## License

MIT © [KeshavSoft](https://github.com/keshavsoft)
