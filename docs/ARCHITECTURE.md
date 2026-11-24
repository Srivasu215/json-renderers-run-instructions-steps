# Architecture: json-renderers-run-instructions-steps

> Sequential blueprint instruction step runner for JSON renderers with 3D dimensional orchestration, `declarative-spec` resolution, and `guardFunc` verification.

---

## 1. Executive Summary

`json-renderers-run-instructions-steps` (v6 engine) is the core execution coordinator of the KeshavSoft declarative UI generation ecosystem. It receives an execution configuration (`inConfig`), validates inputs through `guardFunc`, resolves base canvas AST specifications from `declarative-spec` via `baseKey`, and executes instructions sequentially to produce deterministic JSON specifications.

```
                         +-----------------------------+
                         |          inConfig           |
                         | { baseKey, instructions, ..}|
                         +--------------+--------------+
                                        |
                                        v
                         +-----------------------------+
                         |       guardFunc(inConfig)   |
                         |   (Runtime Type & Key Guard)|
                         +--------------+--------------+
                                        |
                                        v
  +------------------+   +-----------------------------+   +------------------------+
  | declarative-spec |-->| json-renderers-run-         |-->| Target Canvas Spec AST |
  | (spec[baseKey])  |   | instructions-steps          |   | (Ready for DOM mount)  |
  +------------------+   +--------------+--------------+   +------------------------+
                                        |
                       Delegates By Spatial Dimension:
         +------------------------------+-------------------------------+
         |                              |                               |
         v                              v                               v
  +------------------+        +-------------------+           +-------------------+
  |   0D Primitive   |        |     1D Linear     |           |     2D Matrix     |
  |  applyTemplate   |        |   fromCollection  |           |   rowOnColumn /   |
  | (json-transformer|        | (json-transformer-|           |   columnOnRow     |
  | funcs-primitive) |        |funcs-one-dimension|           | (json-transformer-|
  +------------------+        +-------------------+           |funcs-two-dimens.) |
                                                              +-------------------+
```

---

## 2. Core Principles & v6 Enhancements

### Pure Orchestrator
The runner contains **zero DOM rendering logic**. It does not create HTML nodes or touch the browser DOM directly. It outputs declarative JSON trees that can be mounted into the DOM using `jsonToDom`.

### declarative-spec Integration
Callers no longer need to manually clone canvas templates. By passing `baseKey` (e.g., `"tableSimple"`, `"selectBase"`, `"dataListSimple"`, `"formSimple"`), the runner resolves the initial AST directly from `declarative-spec`.

### Input Verification with guardFunc
To guarantee fail-fast stability in production, every invocation runs `guardFunc(inConfig)`:
- Verifies `inConfig` is a valid Object.
- Asserts `baseKey` is a non-empty string that exists within `declarative-spec`.
- Asserts `instructions` is a non-empty Array of non-empty strings.

### Global Browser Namespace
Browser bundle distributions automatically register under:
```javascript
window.ks.jsonRenderers.runInstructions.steps = {
    meta,
    runInstructions
};
```

---

## 3. The Execution Pipeline

```javascript
const runInstructions = (inConfig = {}) => {
    guardFunc(inConfig);

    const {
        instructions = [],
        baseKey,
        data,
        showLog = false
    } = inConfig;

    const base = spec[baseKey];

    instructions.forEach(key => {
        if (showLog) console.log(`[runStep] ${key}`);
        executeStep(key, { base, data }, showLog);
    });

    return base;
};
```

---

## 4. 3D Spatial Transformer Delegation

| Dimension | Package | Function | Usage |
| :--- | :--- | :--- | :--- |
| **0D (Primitive)** | `json-transformer-funcs-primitive` | `applyTemplate` | Cards, Badges, Containers |
| **1D (Linear)** | `json-transformer-funcs-one-dimension` | `fromCollection` | Colgroups, Headers, List items |
| **2D (Matrix)** | `json-transformer-funcs-two-dimensions` | `rowOnColumn` & `columnOnRow` | Table body, Selects, DataLists |

---

## 5. Architectural Generations

| Version | Status | Key Characteristics |
| :--- | :--- | :--- |
| **v1** | Deprecated | Initial step runner; monolithic validation guards; coupled instructions. |
| **v2** | Deprecated | Streamlined 4-line `executeStep`. |
| **v3** | Deprecated | Integrated 2D matrix orchestration via `json-transformer-funcs-two-dimensions`. |
| **v4** | Archived | Decoupled instruction blueprints into `declarative-instructions`. |
| **v5** | Maintained | Added `registerGlobal` for unified browser namespace. |
| **v6** | **Current** | Introduced `baseKey` resolution via `declarative-spec` and runtime `guardFunc` protection. |

---

## 6. Testing & Quality Assurance

All instructions run with deterministic results:

```bash
npm run build
```
