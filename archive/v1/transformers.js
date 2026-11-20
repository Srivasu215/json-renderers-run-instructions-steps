import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import rowOnColumnFunc from "json-transformer-funcs-row-on-column";

const singleTransformers = {
    applyTemplate,
    fromCollection
};

export const runSingleTransformer = (source, template, func) => {
    if (func === null || func === undefined) {
        return structuredClone(template);
    }
    const fn = singleTransformers[func];
    if (!fn) throw new Error(`Unknown function: ${func}`);
    return fn(source, template);
};

export const runRowOnColumnTransformer = ({ columns = [], data = [], columnSpec, rowSpec } = {}) => {
    return rowOnColumnFunc({
        columns,
        data,
        columnSpec,
        rowSpec
    });
};

export const runColumnOnRowTransformer = ({ columns = [], rows = [], columnSpec, rowSpec } = {}) => {
    return columns.map(column => {
        const container = applyTemplate(column, columnSpec);

        let optionsList = [];
        if (Array.isArray(column.options) && column.options.length > 0) {
            optionsList = column.options.map(opt =>
                typeof opt === "object" ? opt : { rowValue: opt }
            );
        } else if (Array.isArray(rows) && rows.length > 0) {
            optionsList = rows.map(r => ({
                ...r,
                rowValue: r[column.columnName] ?? r.value ?? r
            }));
        }

        container.children = optionsList.map(item => applyTemplate(item, rowSpec));
        return container;
    });
};
