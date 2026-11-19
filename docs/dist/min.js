var e = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: { initialize: "serialRoot" }
			}
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: { serial: { showSerial: "serialChild" } }
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		options: {}
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		options: {}
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		options: {}
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		options: {}
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		options: {}
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			options: {}
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			options: {}
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			options: {}
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			options: {}
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			options: {}
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			options: {}
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			options: {}
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			options: {}
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			options: {}
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			options: {}
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			options: {}
		}
	}
}, t = {
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, n = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, r = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, i = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'form-body']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		}
	},
	searchFrame: [{
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	}],
	searchLabel: [{
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-label-slot']"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	}],
	searchHelper: [{
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-helper-slot']"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	}],
	searchInput: [{
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-input-slot']"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	}],
	serialRoot: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serialChild: [{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshiftSerialToRows",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	}],
	optionsShowButton: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	optionsEditButton: [
		{
			narration: "Append edit column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	optionsDeleteButton: [
		{
			narration: "Append delete column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-body']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-header']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-footer']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, a = {
	name: "spec-repo",
	version: "1.17.1"
};
// node_modules/spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: a,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: t,
	tags: n,
	tagsSchema: r,
	instructions: i,
	definitions: e
});
// node_modules/json-write-path/src/v4/utils/toArray.js
var o = (e) => Array.isArray(e) ? e : [e], s = (e, t, n) => {
	e[t] = n;
}, c = {
	set: s,
	push: (e, t, n) => {
		e[t].push(...o(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...o(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(o(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(o(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, l = Object.defineProperty, u = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable, p = Math.pow, m = (e, t, n) => t in e ? l(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ee = (e, t) => {
	for (var n in t ||= {}) d.call(t, n) && m(e, n, t[n]);
	if (u) for (var n of u(t)) f.call(t, n) && m(e, n, t[n]);
	return e;
}, h = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, g = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, _ = () => void 0, v = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = S(e);
		return r === S(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = x(e), a = x(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, te = (e, t, n = _) => {
	let r = [];
	if (!v(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!v(b(e.x, t), b(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !y(o, i) || !y(a, i)) return !1;
			let s = a[i];
			if (!y(o, i) || !v(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, y = (e, t) => Object.prototype.hasOwnProperty.call(e, t), b = (e, t) => y(e, t) ? e[t] : void 0, ne = 16383, re = 1e3, x = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > re) throw new g(`Member name too long (maximum ${re} characters)`);
	return t;
}, S = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, ie = (e) => e instanceof RangeError && /call stack/i.test(e.message), C = (e) => Array.isArray(e), ae = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), w = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, T = (e) => typeof e == "number", E = (e) => typeof e == "string", oe = (e) => e === void 0, D = (e) => e !== void 0;
function se(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function ce(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function le(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var ue = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function de(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Rr }, a = Rr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", g = "true", _ = "false", v = "null", te = /^[,\]]/, y = /^[+\-]/, b = /^[*\/]/, ne = /^[a-zA-Z_]/, re = /^[\x80-\uFFFF_]/, x = /^[a-zA-Z0-9_]/, S = /^[0-9@$\-]/, ie = /^[^\/\\]/, C = /^[gimsuy]/, ae = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, w = /^[\uD800-\uDBFF]/, T = /^[\uDC00-\uDFFF]/, E = /^[0-9]/, oe = /^[1-9]/, D = /^[eE]/, de = /^["\\]/, fe = /^['\\]/, pe = /^[ -\uD7FF\uE000-\uFFFF]/, O = /^[dD]/, me = /^[89abAB]/, he = /^[c-fC-F]/, ge = /^[0-9a-fA-F]/, _e = /^[ \t\n\r]/, ve = J([",", "]"], !1, !1, !1), ye = q("length", !1), be = q("count", !1), xe = q("match", !1), Se = q("search", !1), Ce = q("value", !1), we = J(["+", "-"], !1, !1, !1), Te = J(["*", "/"], !1, !1, !1), Ee = Nr("string"), De = J([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Oe = J([["", "￿"], "_"], !1, !1, !1), ke = J([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), k = q("-", !1), Ae = J([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), je = q("$", !1), Me = q("@", !1), Ne = q("..", !1), A = q(".", !1), Pe = q("*", !1), j = q("&&", !1), Fe = q("||", !1), Ie = q("!", !1), Le = q("==", !1), Re = q("!=", !1), ze = q(">=", !1), Be = q(">", !1), Ve = q("<=", !1), He = q("<", !1), Ue = q("=~", !1), We = q("in", !1), Ge = q("nin", !1), Ke = q("subsetof", !1), qe = q("anyof", !1), Je = q("noneof", !1), Ye = q("sizeof", !1), Xe = q("size", !1), Ze = q("empty", !1), M = q("true", !1), Qe = q("false", !1), $e = q("null", !1), et = q("{", !1), tt = q("}", !1), nt = q("[", !1), rt = q("]", !1), it = q(":", !1), at = q(",", !1), ot = q("(", !1), st = q(")", !1), ct = q("?", !1), lt = Nr("regex"), N = q("/", !1), ut = J(["/", "\\"], !0, !1, !1), P = q("\\", !1), dt = jr(), ft = J([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), pt = J([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), mt = J([["\ud800", "\udbff"]], !1, !1, !1), ht = J([["\udc00", "\udfff"]], !1, !1, !1), F = J([["0", "9"]], !1, !1, !1), gt = Nr("number"), _t = q("0", !1), vt = J([["1", "9"]], !1, !1, !1), yt = Nr("integer"), bt = J(["e", "E"], !1, !1, !1), I = q("\"", !1), L = q("'", !1), xt = J(["\"", "\\"], !1, !1, !1), St = J(["'", "\\"], !1, !1, !1), Ct = J([[" ", "퟿"], ["", "￿"]], !1, !1, !1), wt = q("b", !1), Tt = q("f", !1), R = q("n", !1), z = q("r", !1), Et = q("t", !1), B = q("u", !1), Dt = J(["d", "D"], !1, !1, !1), Ot = J([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), kt = q("\\u", !1), At = J([["c", "f"], ["C", "F"]], !1, !1, !1), jt = J([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Mt = J([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Nt(e) {
		return {
			type: "root",
			next: se(e)
		};
	}
	function Pt(e) {
		return e.map((e) => e[1]);
	}
	function Ft(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function It(e) {
		return e;
	}
	function Lt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Rt() {
		return { type: "wildcard" };
	}
	function zt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Bt() {
		return { type: "wildcard" };
	}
	function Vt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ht(e) {
		return e;
	}
	function Ut(e) {
		return e;
	}
	function Wt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function Gt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function V(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Kt(e, t) {
		return le(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function qt(e, t) {
		return le(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function Jt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Yt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Xt(e, t) {
		return t !== null || ce(e);
	}
	function Zt(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function Qt(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function $t(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function en() {
		return { operator: "empty" };
	}
	function tn() {
		return "eq";
	}
	function nn() {
		return "ne";
	}
	function rn() {
		return "le";
	}
	function an() {
		return "lt";
	}
	function on() {
		return "ge";
	}
	function sn() {
		return "gt";
	}
	function cn() {
		return "in";
	}
	function ln() {
		return "nin";
	}
	function un() {
		return "subsetof";
	}
	function dn() {
		return "anyof";
	}
	function fn() {
		return "noneof";
	}
	function pn() {
		return "sizeof";
	}
	function mn() {
		return "size";
	}
	function hn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function gn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function _n() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function vn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function yn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function bn() {
		return "length";
	}
	function xn() {
		return "count";
	}
	function Sn() {
		return "match";
	}
	function Cn() {
		return "search";
	}
	function wn() {
		return "value";
	}
	function Tn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function En(e, t) {
		return t.length === 0 ? e : le(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Dn(e, t) {
		return t.length === 0 ? e : le(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function On(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function kn(e) {
		return {
			type: "root",
			next: se(e)
		};
	}
	function An(e) {
		return {
			type: "current",
			next: se(e)
		};
	}
	function jn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Mn() {
		return { type: "wildcard" };
	}
	function Nn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Pn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Fn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function In(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Ln(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Rn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function zn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Bn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Vn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Hn(e) {
		return e;
	}
	function Un(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Wn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Gn(e, t) {
		return [e, t.value];
	}
	function Kn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function qn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Jn(e) {
		return _a(e);
	}
	function Yn(e) {
		return _a(e);
	}
	function Xn() {
		return "true";
	}
	function Zn() {
		return "false";
	}
	function Qn() {
		return "null";
	}
	function $n(e) {
		return _a(e);
	}
	function er() {
		return "true";
	}
	function tr() {
		return "false";
	}
	function nr() {
		return "null";
	}
	function rr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function ir(e) {
		return e.join("");
	}
	function ar(e, t) {
		let n = parseFloat(Or());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function or() {
		let e = parseInt(Or(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function sr(e) {
		return e.join("");
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e) {
		return e;
	}
	function ur() {
		return "\"";
	}
	function dr(e) {
		return e;
	}
	function fr(e) {
		return e;
	}
	function pr() {
		return "'";
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "\\";
	}
	function gr() {
		return "/";
	}
	function _r() {
		return "\b";
	}
	function vr() {
		return "\f";
	}
	function yr() {
		return "\n";
	}
	function br() {
		return "\r";
	}
	function xr() {
		return "	";
	}
	function Sr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Cr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function wr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let H = t.peg$currPos | 0, U = H, W = [{
		line: 1,
		column: 1
	}], G = H, Tr = t.peg$maxFailExpected || [], K = t.peg$silentFails | 0, Er = /* @__PURE__ */ new Map(), Dr;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Or() {
		return e.substring(U, H);
	}
	function kr(e, t) {
		throw t = t === void 0 ? Fr(U, H) : t, Ir(e, t);
	}
	function Ar(t = H) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function q(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function J(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function jr() {
		return { type: "any" };
	}
	function Mr() {
		return { type: "end" };
	}
	function Nr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Pr(t) {
		let n = W[t], r;
		if (n) return n;
		if (t >= W.length) r = W.length - 1;
		else for (r = t; !W[--r];);
		for (n = W[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return W[t] = n, n;
	}
	function Fr(e, t, n) {
		let i = Pr(e), a = Pr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function Y(e) {
		H < G || (H > G && (G = H, Tr = []), Tr.push(e));
	}
	function Ir(e, t) {
		return new ue(e, null, null, t);
	}
	function Lr(e, t, n) {
		return new ue(ue.buildMessage(e, t), e, t, n);
	}
	function Rr() {
		let e, t, r, i;
		return e = H, t = Si(), t === n ? (H = e, e = n) : (r = zr(), i = ga(), i === n ? (H = e, e = n) : (U = e, e = Nt(r))), e;
	}
	function zr() {
		let e, t, r, i, a;
		for (e = H, t = [], r = H, i = $(), a = Br(), a === n ? (H = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = H, i = $(), a = Br(), a === n ? (H = r, r = n) : (i = [i, a], r = i);
		return U = e, t = Pt(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = H, t = Ti(), t === n ? (H = e, e = n) : (r = Ur(), r === n ? (H = e, e = n) : (U = e, e = Ft(r))), e === n && (e = H, t = Gr(), t !== n && (U = e, t = It(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = H, t = wi(), t === n ? (H = e, e = n) : (r = Wr(), r === n ? (H = e, e = n) : (U = e, e = Lt(r))), e;
	}
	function Ur() {
		let e, t;
		return e = H, t = Ei(), t !== n && (U = e, t = Rt()), e = t, e === n && (e = H, t = xi(), t !== n && (U = e, t = zt(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = H, t = Ei(), t !== n && (U = e, t = Bt()), e = t, e === n && (e = H, t = xi(), t !== n && (U = e, t = Vt(t)), e = t, e === n && (e = H, t = Gr(), t !== n && (U = e, t = Ht(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = H, t = Xi(), t === n ? (H = e, e = n) : ($(), r = Kr(), r === n ? (H = e, e = n) : ($(), i = Zi(), i === n ? (H = e, e = n) : (U = e, e = Ut(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = H, t = ui(), t !== n) {
			for (r = [], i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = ui(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = ui(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = Wt(t, r);
		} else H = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = H, r = ta(), r === n ? (H = t, t = n) : ($(), i = $i(), i === n ? (H = t, t = n) : ($(), a = Jr(), a === n ? (H = t, t = n) : ($(), o = ea(), o === n ? (H = t, t = n) : (s = H, K++, c = H, l = $(), u = e.charAt(H), te.test(u) ? H++ : (u = n, K === 0 && Y(ve)), u === n ? (H = c, c = n) : (l = [l, u], c = l), K--, c === n ? s = n : (H = s, s = void 0), s === n ? (H = t, t = n) : (U = t, t = Gt(a)))))), t === n && (t = H, r = ta(), r === n ? (H = t, t = n) : ($(), i = Jr(), i === n ? (H = t, t = n) : (U = t, t = V(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = H * 91 + 10, u = Er.get(l);
		if (u) return H = u.nextPos, u.result;
		if (e = H, t = Yr(), t !== n) {
			for (r = [], i = H, a = $(), o = Oi(), o === n ? (H = i, i = n) : (s = $(), c = Yr(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = Oi(), o === n ? (H = i, i = n) : (s = $(), c = Yr(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = Kt(t, r);
		} else H = e, e = n;
		return Er.set(l, {
			nextPos: H,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = H, t = Xr(), t !== n) {
			for (r = [], i = H, a = $(), o = Di(), o === n ? (H = i, i = n) : (s = $(), c = Xr(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = Di(), o === n ? (H = i, i = n) : (s = $(), c = Xr(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = qt(t, r);
		} else H = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = H, t = ki(), t === n ? (H = e, e = n) : ($(), r = $i(), r === n ? (H = e, e = n) : ($(), i = Jr(), i === n ? (H = e, e = n) : ($(), a = ea(), a === n ? (H = e, e = n) : (U = e, e = Jt(i))))), e === n && (e = H, t = ki(), t === n ? (H = e, e = n) : ($(), r = ei(), r === n ? (H = e, e = n) : (U = e, e = Yt(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = H, t = ai(), t === n ? (H = e, e = n) : (r = H, i = $(), a = Qr(), a === n ? (H = r, r = n) : (i = [i, a], r = i), r === n && (r = null), U = H, i = Xt(t, r), i = i ? void 0 : n, i === n ? (H = e, e = n) : (U = e, e = Zt(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = H, t = $r(), t === n ? (H = e, e = n) : ($(), r = ai(), r === n ? (H = e, e = n) : (U = e, e = Qt(t, r))), e === n && (e = H, t = Ii(), t === n ? (H = e, e = n) : ($(), r = di(), r === n ? (H = e, e = n) : (U = e, e = $t(r))), e === n && (e = H, t = Wi(), t !== n && (U = e, t = en()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = H, t = Ai(), t !== n && (U = e, t = tn()), e = t, e === n && (e = H, t = ji(), t !== n && (U = e, t = nn()), e = t, e === n && (e = H, t = Pi(), t !== n && (U = e, t = rn()), e = t, e === n && (e = H, t = Fi(), t !== n && (U = e, t = an()), e = t, e === n && (e = H, t = Mi(), t !== n && (U = e, t = on()), e = t, e === n && (e = H, t = Ni(), t !== n && (U = e, t = sn()), e = t, e === n && (e = H, t = Li(), t !== n && (U = e, t = cn()), e = t, e === n && (e = H, t = Ri(), t !== n && (U = e, t = ln()), e = t, e === n && (e = H, t = zi(), t !== n && (U = e, t = un()), e = t, e === n && (e = H, t = Bi(), t !== n && (U = e, t = dn()), e = t, e === n && (e = H, t = Vi(), t !== n && (U = e, t = fn()), e = t, e === n && (e = H, t = Hi(), t !== n && (U = e, t = pn()), e = t, e === n && (e = H, t = Ui(), t !== n && (U = e, t = mn()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = H, t = $i(), t === n ? (H = e, e = n) : ($(), r = Jr(), r === n ? (H = e, e = n) : ($(), i = ea(), i === n ? (H = e, e = n) : (U = e, e = hn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = H, t = Gi(), t !== n && (U = e, t = gn()), e = t, e === n && (e = H, t = Ki(), t !== n && (U = e, t = _n()), e = t, e === n && (e = H, t = qi(), t !== n && (U = e, t = vn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = H, t = ni(), t === n ? (H = e, e = n) : (r = $i(), r === n ? (H = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (H = e, e = n) : (U = e, e = yn(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = H, e.substr(H, 6) === o ? (r = o, H += 6) : (r = n, K === 0 && Y(ye)), r !== n && (U = t, r = bn()), t = r, t === n && (t = H, e.substr(H, 5) === s ? (r = s, H += 5) : (r = n, K === 0 && Y(be)), r !== n && (U = t, r = xn()), t = r, t === n && (t = H, e.substr(H, 5) === c ? (r = c, H += 5) : (r = n, K === 0 && Y(xe)), r !== n && (U = t, r = Sn()), t = r, t === n && (t = H, e.substr(H, 6) === l ? (r = l, H += 6) : (r = n, K === 0 && Y(Se)), r !== n && (U = t, r = Cn()), t = r, t === n && (t = H, e.substr(H, 5) === u ? (r = u, H += 5) : (r = n, K === 0 && Y(Ce)), r !== n && (U = t, r = wn()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = H, t = ii(), t !== n) {
			for (r = [], i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = ii(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = ii(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = Tn(t, r);
		} else H = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = H * 91 + 21, d = Er.get(u);
		if (d) return H = d.nextPos, d.result;
		if (t = H, r = oi(), r !== n) {
			for (i = [], a = H, o = $(), s = e.charAt(H), y.test(s) ? H++ : (s = n, K === 0 && Y(we)), s === n ? (H = a, a = n) : (c = $(), l = oi(), l === n ? (H = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = H, o = $(), s = e.charAt(H), y.test(s) ? H++ : (s = n, K === 0 && Y(we)), s === n ? (H = a, a = n) : (c = $(), l = oi(), l === n ? (H = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			U = t, t = En(r, i);
		} else H = t, t = n;
		return Er.set(u, {
			nextPos: H,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = H, r = si(), r !== n) {
			for (i = [], a = H, o = $(), s = e.charAt(H), b.test(s) ? H++ : (s = n, K === 0 && Y(Te)), s === n ? (H = a, a = n) : (c = $(), l = si(), l === n ? (H = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = H, o = $(), s = e.charAt(H), b.test(s) ? H++ : (s = n, K === 0 && Y(Te)), s === n ? (H = a, a = n) : (c = $(), l = si(), l === n ? (H = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			U = t, t = Dn(r, i);
		} else H = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = H, t = $i(), t === n ? (H = e, e = n) : ($(), r = ai(), r === n ? (H = e, e = n) : ($(), i = ea(), i === n ? (H = e, e = n) : (U = e, e = On(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = H, t = Si(), t === n ? (H = e, e = n) : (r = zr(), r === n ? (H = e, e = n) : (U = e, e = kn(r))), e === n && (e = H, t = Ci(), t === n ? (H = e, e = n) : (r = zr(), r === n ? (H = e, e = n) : (U = e, e = An(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = H, t = H, r = la(), r === n ? (H = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (H = e, e = n) : (i = $(), a = H, o = la(), o === n ? (H = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = H, s = Qi(), s === n ? (H = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), U = e, e = jn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = H, t = Ei(), t !== n && (U = e, t = Mn()), e = t, e === n && (e = H, t = la(), t !== n && (U = e, t = Nn(t)), e = t, e === n && (e = H, t = da(), t !== n && (U = e, t = Pn(t)), e = t, e === n && (e = H, t = yi(), t !== n && (U = e, t = Fn(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = H, t = na(), t === n ? (H = e, e = n) : (r = ra(), U = e, e = In(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = H, t = pi(), t !== n && (U = e, t = Ln(t)), e = t, e === n && (e = H, t = sa(), t !== n && (U = e, t = Rn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = H, t = Gi(), t !== n && (U = e, t = zn()), e = t, e === n && (e = H, t = Ki(), t !== n && (U = e, t = Bn()), e = t, e === n && (e = H, t = qi(), t !== n && (U = e, t = Vn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return K++, e = H, t = da(), t !== n && (U = e, t = Hn(t)), e = t, K--, e === n && (t = n, K === 0 && Y(Ee)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = H, t = Ji(), t === n ? (H = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (H = e, e = n) : (U = e, e = Un(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = H, t = gi(), t !== n) {
			for (r = [], i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = gi(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = gi(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = Wn(t, r);
		} else H = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = H, t = da(), t === n ? (H = e, e = n) : ($(), r = Qi(), r === n ? (H = e, e = n) : ($(), i = fi(), i === n ? (H = e, e = n) : (U = e, e = Gn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = H, t = Xi(), t === n ? (H = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (H = e, e = n) : (U = e, e = Kn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = H, t = fi(), t !== n) {
			for (r = [], i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = fi(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = H, a = $(), o = X(), o === n ? (H = i, i = n) : (s = $(), c = fi(), c === n ? (H = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			U = e, e = qn(t, r);
		} else H = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = H, r = H, i = H, a = e.charAt(H), ne.test(a) ? H++ : (a = n, K === 0 && Y(De)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else H = i, i = n;
		if (r = i === n ? i : e.substring(r, H), r !== n && (U = t, r = Jn(r)), t = r, t === n) {
			if (t = H, r = H, i = [], a = e.charAt(H), re.test(a) ? H++ : (a = n, K === 0 && Y(Oe)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(H), re.test(a) ? H++ : (a = n, K === 0 && Y(Oe));
			else i = n;
			r = i === n ? i : e.substring(r, H), r !== n && (U = t, r = Yn(r)), t = r, t === n && (t = H, r = Gi(), r !== n && (U = t, r = Xn()), t = r, t === n && (t = H, r = Ki(), r !== n && (U = t, r = Zn()), t = r, t === n && (t = H, r = qi(), r !== n && (U = t, r = Qn()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(H), x.test(t) ? H++ : (t = n, K === 0 && Y(ke)), t === n && (t = H, e.charCodeAt(H) === 45 ? (r = "-", H++) : (r = n, K === 0 && Y(k)), r === n ? (H = t, t = n) : (i = H, K++, a = e.charAt(H), S.test(a) ? H++ : (a = n, K === 0 && Y(Ae)), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = H, t = ia(), t !== n && (U = e, t = $n(t)), e = t, e === n && (e = H, t = Gi(), t !== n && (U = e, t = er()), e = t, e === n && (e = H, t = Ki(), t !== n && (U = e, t = tr()), e = t, e === n && (e = H, t = qi(), t !== n && (U = e, t = nr()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(H) === 36 ? (t = "$", H++) : (t = n, K === 0 && Y(je)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(H) === 64 ? (t = "@", H++) : (t = n, K === 0 && Y(Me)), t;
	}
	function wi() {
		let t;
		return e.substr(H, 2) === ".." ? (t = "..", H += 2) : (t = n, K === 0 && Y(Ne)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(H) === 46 ? (t = ".", H++) : (t = n, K === 0 && Y(A)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(H) === 42 ? (t = "*", H++) : (t = n, K === 0 && Y(Pe)), t;
	}
	function Di() {
		let t;
		return e.substr(H, 2) === "&&" ? (t = "&&", H += 2) : (t = n, K === 0 && Y(j)), t;
	}
	function Oi() {
		let t;
		return e.substr(H, 2) === "||" ? (t = "||", H += 2) : (t = n, K === 0 && Y(Fe)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(H) === 33 ? (t = "!", H++) : (t = n, K === 0 && Y(Ie)), t;
	}
	function Ai() {
		let t;
		return e.substr(H, 2) === "==" ? (t = "==", H += 2) : (t = n, K === 0 && Y(Le)), t;
	}
	function ji() {
		let t;
		return e.substr(H, 2) === "!=" ? (t = "!=", H += 2) : (t = n, K === 0 && Y(Re)), t;
	}
	function Mi() {
		let t;
		return e.substr(H, 2) === ">=" ? (t = ">=", H += 2) : (t = n, K === 0 && Y(ze)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(H) === 62 ? (t = ">", H++) : (t = n, K === 0 && Y(Be)), t;
	}
	function Pi() {
		let t;
		return e.substr(H, 2) === "<=" ? (t = "<=", H += 2) : (t = n, K === 0 && Y(Ve)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(H) === 60 ? (t = "<", H++) : (t = n, K === 0 && Y(He)), t;
	}
	function Ii() {
		let t;
		return e.substr(H, 2) === "=~" ? (t = "=~", H += 2) : (t = n, K === 0 && Y(Ue)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = H, e.substr(H, 2) === "in" ? (r = "in", H += 2) : (r = n, K === 0 && Y(We)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = H, e.substr(H, 3) === "nin" ? (r = "nin", H += 3) : (r = n, K === 0 && Y(Ge)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = H, e.substr(H, 8) === d ? (r = d, H += 8) : (r = n, K === 0 && Y(Ke)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = H, e.substr(H, 5) === f ? (r = f, H += 5) : (r = n, K === 0 && Y(qe)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = H, e.substr(H, 6) === p ? (r = p, H += 6) : (r = n, K === 0 && Y(Je)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = H, e.substr(H, 6) === m ? (r = m, H += 6) : (r = n, K === 0 && Y(Ye)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = H, e.substr(H, 4) === ee ? (r = ee, H += 4) : (r = n, K === 0 && Y(Xe)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = H, e.substr(H, 5) === h ? (r = h, H += 5) : (r = n, K === 0 && Y(Ze)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = H, e.substr(H, 4) === g ? (r = g, H += 4) : (r = n, K === 0 && Y(M)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = H, e.substr(H, 5) === _ ? (r = _, H += 5) : (r = n, K === 0 && Y(Qe)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = H, e.substr(H, 4) === v ? (r = v, H += 4) : (r = n, K === 0 && Y($e)), r === n ? (H = t, t = n) : (i = H, K++, a = Q(), K--, a === n ? i = void 0 : (H = i, i = n), i === n ? (H = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(H) === 123 ? (t = "{", H++) : (t = n, K === 0 && Y(et)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(H) === 125 ? (t = "}", H++) : (t = n, K === 0 && Y(tt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(H) === 91 ? (t = "[", H++) : (t = n, K === 0 && Y(nt)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(H) === 93 ? (t = "]", H++) : (t = n, K === 0 && Y(rt)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(H) === 58 ? (t = ":", H++) : (t = n, K === 0 && Y(it)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(H) === 44 ? (t = ",", H++) : (t = n, K === 0 && Y(at)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(H) === 40 ? (t = "(", H++) : (t = n, K === 0 && Y(ot)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(H) === 41 ? (t = ")", H++) : (t = n, K === 0 && Y(st)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(H) === 63 ? (t = "?", H++) : (t = n, K === 0 && Y(ct)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (K++, t = H, e.charCodeAt(H) === 47 ? (r = "/", H++) : (r = n, K === 0 && Y(N)), r !== n) {
			for (i = [], a = e.charAt(H), ie.test(a) ? H++ : (a = n, K === 0 && Y(ut)), a === n && (a = H, e.charCodeAt(H) === 92 ? (o = "\\", H++) : (o = n, K === 0 && Y(P)), o === n ? (H = a, a = n) : (e.length > H ? (s = e.charAt(H), H++) : (s = n, K === 0 && Y(dt)), s === n ? (H = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(H), ie.test(a) ? H++ : (a = n, K === 0 && Y(ut)), a === n && (a = H, e.charCodeAt(H) === 92 ? (o = "\\", H++) : (o = n, K === 0 && Y(P)), o === n ? (H = a, a = n) : (e.length > H ? (s = e.charAt(H), H++) : (s = n, K === 0 && Y(dt)), s === n ? (H = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(H) === 47 ? (a = "/", H++) : (a = n, K === 0 && Y(N)), a === n ? (H = t, t = n) : (U = t, t = rr(i));
		} else H = t, t = n;
		return K--, t === n && (r = n, K === 0 && Y(lt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = H, r = [], i = e.charAt(H), C.test(i) ? H++ : (i = n, K === 0 && Y(ft)); i !== n;) r.push(i), i = e.charAt(H), C.test(i) ? H++ : (i = n, K === 0 && Y(ft));
		return U = t, r = ir(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = H, r = H, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else H = r, r = n;
		return t = r === n ? r : e.substring(t, H), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(H), ae.test(t) ? H++ : (t = n, K === 0 && Y(pt)), t === n && (t = H, r = e.charAt(H), w.test(r) ? H++ : (r = n, K === 0 && Y(mt)), r === n ? (H = t, t = n) : (i = e.charAt(H), T.test(i) ? H++ : (i = n, K === 0 && Y(ht)), i === n ? (H = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(H), E.test(t) ? H++ : (t = n, K === 0 && Y(F))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (K++, t = H, e.charCodeAt(H) === 45 ? (r = "-", H++) : (r = n, K === 0 && Y(k)), r === n && (r = null), i = ca(), i !== n) {
			if (a = H, e.charCodeAt(H) === 46 ? (o = ".", H++) : (o = n, K === 0 && Y(A)), o !== n) {
				if (s = [], c = e.charAt(H), E.test(c) ? H++ : (c = n, K === 0 && Y(F)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(H), E.test(c) ? H++ : (c = n, K === 0 && Y(F));
				else s = n;
				s === n ? (H = a, a = n) : (o = [o, s], a = o);
			} else H = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), U = t, t = ar(a, o);
		} else H = t, t = n;
		return K--, t === n && (r = n, K === 0 && Y(gt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(H) === 48 ? (t = "0", H++) : (t = n, K === 0 && Y(_t)), t === n) {
			if (t = H, r = e.charAt(H), oe.test(r) ? H++ : (r = n, K === 0 && Y(vt)), r !== n) {
				for (i = [], a = e.charAt(H), E.test(a) ? H++ : (a = n, K === 0 && Y(F)); a !== n;) i.push(a), a = e.charAt(H), E.test(a) ? H++ : (a = n, K === 0 && Y(F));
				r = [r, i], t = r;
			} else H = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (K++, t = H, e.charCodeAt(H) === 48 ? (r = "0", H++) : (r = n, K === 0 && Y(_t)), r === n) {
			if (r = H, e.charCodeAt(H) === 45 ? (i = "-", H++) : (i = n, K === 0 && Y(k)), i === n && (i = null), a = e.charAt(H), oe.test(a) ? H++ : (a = n, K === 0 && Y(vt)), a !== n) {
				for (o = [], s = e.charAt(H), E.test(s) ? H++ : (s = n, K === 0 && Y(F)); s !== n;) o.push(s), s = e.charAt(H), E.test(s) ? H++ : (s = n, K === 0 && Y(F));
				i = [
					i,
					a,
					o
				], r = i;
			} else H = r, r = n;
		}
		return r !== n && (U = t, r = or()), t = r, K--, t === n && (r = n, K === 0 && Y(yt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = H, r = e.charAt(H), D.test(r) ? H++ : (r = n, K === 0 && Y(bt)), r !== n) {
			if (i = e.charAt(H), y.test(i) ? H++ : (i = n, K === 0 && Y(we)), i === n && (i = null), a = [], o = e.charAt(H), E.test(o) ? H++ : (o = n, K === 0 && Y(F)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(H), E.test(o) ? H++ : (o = n, K === 0 && Y(F));
			else a = n;
			a === n ? (H = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else H = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (K++, t = H, e.charCodeAt(H) === 34 ? (r = "\"", H++) : (r = n, K === 0 && Y(I)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(H) === 34 ? (a = "\"", H++) : (a = n, K === 0 && Y(I)), a === n ? (H = t, t = n) : (U = t, t = sr(i));
		} else H = t, t = n;
		if (t === n) {
			if (t = H, e.charCodeAt(H) === 39 ? (r = "'", H++) : (r = n, K === 0 && Y(L)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(H) === 39 ? (a = "'", H++) : (a = n, K === 0 && Y(L)), a === n ? (H = t, t = n) : (U = t, t = cr(i));
			} else H = t, t = n;
		}
		return K--, t === n && (r = n, K === 0 && Y(Ee)), t;
	}
	function fa() {
		let t, r, i;
		return t = H, r = H, K++, i = e.charAt(H), de.test(i) ? H++ : (i = n, K === 0 && Y(xt)), K--, i === n ? r = void 0 : (H = r, r = n), r === n ? (H = t, t = n) : (i = ma(), i === n ? (H = t, t = n) : (U = t, t = lr(i))), t === n && (t = H, e.charCodeAt(H) === 92 ? (r = "\\", H++) : (r = n, K === 0 && Y(P)), r === n ? (H = t, t = n) : (e.charCodeAt(H) === 34 ? (i = "\"", H++) : (i = n, K === 0 && Y(I)), i === n ? (H = t, t = n) : (U = t, t = ur())), t === n && (t = H, e.charCodeAt(H) === 92 ? (r = "\\", H++) : (r = n, K === 0 && Y(P)), r === n ? (H = t, t = n) : (i = ha(), i === n ? (H = t, t = n) : (U = t, t = dr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = H, r = H, K++, i = e.charAt(H), fe.test(i) ? H++ : (i = n, K === 0 && Y(St)), K--, i === n ? r = void 0 : (H = r, r = n), r === n ? (H = t, t = n) : (i = ma(), i === n ? (H = t, t = n) : (U = t, t = fr(i))), t === n && (t = H, e.charCodeAt(H) === 92 ? (r = "\\", H++) : (r = n, K === 0 && Y(P)), r === n ? (H = t, t = n) : (e.charCodeAt(H) === 39 ? (i = "'", H++) : (i = n, K === 0 && Y(L)), i === n ? (H = t, t = n) : (U = t, t = pr())), t === n && (t = H, e.charCodeAt(H) === 92 ? (r = "\\", H++) : (r = n, K === 0 && Y(P)), r === n ? (H = t, t = n) : (i = ha(), i === n ? (H = t, t = n) : (U = t, t = mr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(H), pe.test(t) ? H++ : (t = n, K === 0 && Y(Ct)), t === n && (t = H, r = H, i = e.charAt(H), w.test(i) ? H++ : (i = n, K === 0 && Y(mt)), i === n ? (H = r, r = n) : (a = e.charAt(H), T.test(a) ? H++ : (a = n, K === 0 && Y(ht)), a === n ? (H = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, H)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = H, e.charCodeAt(H) === 92 ? (r = "\\", H++) : (r = n, K === 0 && Y(P)), r !== n && (U = t, r = hr()), t = r, t === n && (t = H, e.charCodeAt(H) === 47 ? (r = "/", H++) : (r = n, K === 0 && Y(N)), r !== n && (U = t, r = gr()), t = r, t === n && (t = H, e.charCodeAt(H) === 98 ? (r = "b", H++) : (r = n, K === 0 && Y(wt)), r !== n && (U = t, r = _r()), t = r, t === n && (t = H, e.charCodeAt(H) === 102 ? (r = "f", H++) : (r = n, K === 0 && Y(Tt)), r !== n && (U = t, r = vr()), t = r, t === n && (t = H, e.charCodeAt(H) === 110 ? (r = "n", H++) : (r = n, K === 0 && Y(R)), r !== n && (U = t, r = yr()), t = r, t === n && (t = H, e.charCodeAt(H) === 114 ? (r = "r", H++) : (r = n, K === 0 && Y(z)), r !== n && (U = t, r = br()), t = r, t === n && (t = H, e.charCodeAt(H) === 116 ? (r = "t", H++) : (r = n, K === 0 && Y(Et)), r !== n && (U = t, r = xr()), t = r, t === n && (t = H, e.charCodeAt(H) === 117 ? (r = "u", H++) : (r = n, K === 0 && Y(B)), r === n ? (H = t, t = n) : (i = H, a = H, o = e.charAt(H), O.test(o) ? H++ : (o = n, K === 0 && Y(Dt)), o === n ? (H = a, a = n) : (s = e.charAt(H), me.test(s) ? H++ : (s = n, K === 0 && Y(Ot)), s === n ? (H = a, a = n) : (c = Z(), c === n ? (H = a, a = n) : (l = Z(), l === n ? (H = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, H), i === n ? (H = t, t = n) : (e.substr(H, 2) === "\\u" ? (a = "\\u", H += 2) : (a = n, K === 0 && Y(kt)), a === n ? (H = t, t = n) : (o = H, s = H, c = e.charAt(H), O.test(c) ? H++ : (c = n, K === 0 && Y(Dt)), c === n ? (H = s, s = n) : (l = e.charAt(H), he.test(l) ? H++ : (l = n, K === 0 && Y(At)), l === n ? (H = s, s = n) : (u = Z(), u === n ? (H = s, s = n) : (d = Z(), d === n ? (H = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, H), o === n ? (H = t, t = n) : (U = t, t = Sr(i, o))))), t === n && (t = H, e.charCodeAt(H) === 117 ? (r = "u", H++) : (r = n, K === 0 && Y(B)), r === n ? (H = t, t = n) : (i = H, a = H, o = Z(), o === n ? (H = a, a = n) : (s = Z(), s === n ? (H = a, a = n) : (c = Z(), c === n ? (H = a, a = n) : (l = Z(), l === n ? (H = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, H), i === n ? (H = t, t = n) : (U = H, a = Cr(i), a = a ? n : void 0, a === n ? (H = t, t = n) : (U = t, t = wr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(H), ge.test(t) ? H++ : (t = n, K === 0 && Y(jt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(H), x.test(t) ? H++ : (t = n, K === 0 && Y(ke)), t;
	}
	function $() {
		let t, r;
		for (K++, t = [], r = e.charAt(H), _e.test(r) ? H++ : (r = n, K === 0 && Y(Mt)); r !== n;) t.push(r), r = e.charAt(H), _e.test(r) ? H++ : (r = n, K === 0 && Y(Mt));
		return K--, t;
	}
	function ga() {
		let t, r;
		return t = H, K++, e.length > H ? (r = e.charAt(H), H++) : (r = n, K === 0 && Y(dt)), K--, r === n ? t = void 0 : (H = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && kr("Member name too long (maximum 1000 characters)"), e;
	}
	Dr = a();
	let va = Dr !== n && H === e.length;
	function ya() {
		throw Dr !== n && H < e.length && Y(Mr()), Lr(Tr, G < e.length ? Ar(G) : null, G < e.length ? Fr(G, G + 1) : Fr(G, G));
	}
	if (t.peg$library) return {
		peg$result: Dr,
		peg$currPos: H,
		peg$FAILED: n,
		peg$maxFailExpected: Tr,
		peg$maxFailPos: G,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return Dr;
	ya();
}
var fe = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), pe = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, O = (e) => {
	throw new h(1, 1, e);
}, me = (e) => e.type === "root" || e.type === "current", he = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function ge(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (me(i)) r === "value" && !he(i) && O("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && O(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = fe.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = pe[e], a = i.args;
				a.length !== n.args.length && O(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && O(`The result of ${e}() must be compared`), r === "value" && n.logical && O(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && O("A literal must be compared");
		}
	}
}
function _e(e) {
	let t;
	try {
		t = de(e);
	} catch (e) {
		if (ie(e)) throw new h(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new h(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new h(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return ge(t), t;
}
var ve = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), ye = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), be = (e) => e >= 55296 && e <= 56319, xe = (e) => e >= 56320 && e <= 57343, Se = (e) => e !== void 0 && e >= "0" && e <= "9", Ce = (e, t) => {
	let n = e.charCodeAt(t);
	return be(n) && xe(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : be(n) || xe(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, we = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !ve.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, Te = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return ye.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Ee = (e, t) => {
	let n = e[t];
	return n === "\\" ? we(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : Ce(e, t);
}, De = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = Te(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Ee(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Ee(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Oe = (e, t) => {
	let n = t + 1, r = n;
	for (; Se(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; Se(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, ke = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? Oe(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = De(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = Te(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = we(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = Ce(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, k = 1e3, Ae = 1e3, je = 16, Me = /^[dgimsuy]*$/, Ne = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, A = class extends Error {}, Pe = 0, j = 1, Fe = 2, Ie = 3, Le = 4, Re = 5, ze = p(2, 31) - 1, Be = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > ze - t - 2 || r.step > ze - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Ve = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), He = /^\{(\d+)(?:,(\d*))?\}/, Ue = /^[0-9a-fA-F]{4}/, We = /^\(\?([ims]*)(?:-([ims]*))?:/, Ge = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Ke = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new A("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = We.exec(e.slice(t, t + 12));
				if (!r) throw new A("lookaround or named group");
				let i = ee({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new A("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new A("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new A("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Ve.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new A("trailing backslash");
		if (r === "b" || r === "B") throw new A("word boundary");
		if (r >= "1" && r <= "9") throw new A("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new A("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Ue.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Ue.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = He.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > k || i !== Infinity && i > k) throw new A("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, qe = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= k) throw new A("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(Re);
	}
	compile(e) {
		if (++this.work > 4 * k) throw new A("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Pe, this.atomId(e));
				return;
			case "bol":
				this.emit(Ie, +!!e.multiline);
				return;
			case "eol":
				this.emit(Le, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(j);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Fe)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(j);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Fe, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(j);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Je = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Ke(e, r, t, n).parse(), a = new qe(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, Ye = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: g, atomHit: _ } = r, v = r.gen, te = r.step;
	r.gen = v + t.length + 2, r.step = te + t.length + 2;
	let y = 0, b = !1, ne = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== v) switch (ee[r] = v, ++c === 64 && (u(c), c = 0), i[r]) {
				case Pe:
					e[n++] = r;
					break;
				case Re: return u(c), b = !0, n;
				case Fe:
					h[s++] = a[r];
					break;
				case j:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case Ie:
					(y === 0 || a[r] === 1 && Ge(t.charCodeAt(y - 1))) && (h[s++] = r + 1);
					break;
				case Le: (y === t.length || a[r] === 1 && Ge(t.charCodeAt(y))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (v++, p = ne(d, 0, 0), b) return !0;
	for (; y < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(y) : t.charCodeAt(y)) > 65535 ? 2 : 1, n = t.slice(y, y + e), r = te + y + 1;
		v++, m = 0, y += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (g[i] !== r) {
				g[i] = r;
				let e = s[i];
				_[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (_[i] === 1 && (m = ne(f, m, t + 1), b)) return !0;
		}
		if (!l && (m = ne(f, m, 0), b)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Xe = (e, t, n) => {
	let r = Be(e, t.length);
	try {
		return Ye(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Ze = 256, M = /* @__PURE__ */ new Map(), Qe = 0, $e = (e, t, n, r, i = !1) => {
	if (e.length > Ae || t.length > 7 || !Me.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = M.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Ne(s) > je ? null : Je(n ? `^(?:${s})$` : s, t, i);
	Qe >= Ze && (M.clear(), Qe = 0);
	let l = M.get(s);
	return l === void 0 && M.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Qe++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, et = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Xe(e, t, n);
}, tt = class {
	constructor(e) {
		this.nodes = e;
	}
}, nt = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, rt = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !nt(e);
}, it = 256, at = /* @__PURE__ */ new Map(), ot = (e, t) => {
	let n = at.get(e);
	return n === void 0 && (n = rt(e), at.size >= it && at.clear(), at.set(Array.from(e).join(""), n)), t(e.length), n;
}, st = /* @__PURE__ */ new Map(), ct = (e, t) => {
	let n = st.get(e);
	return n === void 0 && (n = ke(e), n !== null && (n = Array.from(n).join("")), st.size >= it && st.clear(), st.set(Array.from(e).join(""), n)), t(e.length), n;
}, lt = 256, N = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Ae) c = null;
		else if (o) {
			let n = ct(e, i);
			c = n === null ? null : $e(n, t, r, i, !0);
		} else c = ot(e, i) ? $e(e, t, r, i) : null;
		s !== void 0 && (s.size >= lt && s.clear(), s.set(a, c));
	}
	return c !== null && et(c, n, i);
}, ut = {
	length: (e, t) => {
		let n = e[0];
		if (E(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (C(n)) return S(n);
		if (w(n)) {
			let e = x(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : N(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : N(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, P = (e, t, n = _) => e === void 0 && t === void 0 || te(e, t, n), dt = (e, t, n = _) => !te(e, t, n), ft = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, pt = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return ft(n) - ft(i);
	}
	return e.length - t.length;
}, mt = (e, t, n = _) => T(e) && T(t) ? e < t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), pt(e, t) < 0) : !1, ht = (e, t, n = _) => mt(e, t, n) || P(e, t, n), F = (e, t, n = _) => T(e) && T(t) ? e > t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), pt(e, t) > 0) : !1, gt = (e, t, n = _) => F(e, t, n) || P(e, t, n), _t = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, vt = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) {
		let r = b(e, i);
		if (n(1 + _t(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, yt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, bt = (e) => typeof e == "string" && e.length + 1 > ne, I = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = S(e);
	for (let n = 0; n < a; n++) {
		let r = b(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), bt(r) ? i.long.push(r) : i.set.add(yt(r));
	}
	return n?.set(e, i), i;
}, L = ({ set: e, long: t }, n, r) => {
	if (bt(n)) {
		for (let e of t) if (r(1 + _t(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(yt(n)));
}, xt = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) if (n(), y(e, i) && t(e[i])) return !0;
	return !1;
}, St = {
	eq: P,
	ne: dt,
	lt: mt,
	le: ht,
	gt: F,
	ge: gt,
	in: (e, t, n = _) => C(t) ? vt(t, e, n) !== -1 : !1,
	nin: (e, t, n = _) => C(t) ? vt(t, e, n) === -1 : !1,
	subsetof: (e, t, n = _, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = I(t, n, r);
		return !xt(e, (e) => !L(i, e, n), n);
	},
	anyof: (e, t, n = _, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = I(t, n, r);
		return xt(e, (e) => L(i, e, n), n);
	},
	noneof: (e, t, n = _, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = I(t, n, r);
		return !xt(e, (e) => L(i, e, n), n);
	},
	sizeof: (e, t) => !C(e) && !E(e) || !C(t) && !E(t) ? !1 : (C(e) ? S(e) : e.length) === (C(t) ? S(t) : t.length),
	size: (e, t) => !C(e) && !E(e) || !T(t) ? !1 : (C(e) ? S(e) : e.length) === t
}, Ct = (e) => !C(e) && !E(e) ? !1 : (C(e) ? S(e) : e.length) === 0, wt = (e, t, n, r = _, i) => !E(e) || !E(t) ? !1 : N(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Tt = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), R = (e, t) => e.concat(`[${t}]`), z = (e, t) => e < 0 ? t + e : e, Et = (e, t) => {
	let n = S(e), r = z(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: y(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, B = (e, t) => {
	for (let n of t) e.push(n);
}, Dt = 1e6, Ot = 100, kt = 1e6, At = 20, jt = 1e4, Mt = 1e4, Nt = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					y(n, r) && this.visit(n[r]);
				} else if (y(n, t)) this.visit(n[t]);
				else if (++e.holes > Mt) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!y(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), C(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: S(e),
				i: 0,
				holes: 0
			});
			else if (w(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, Pt = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Tt(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Tt(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = S(e);
			for (let r = 0; r < n; r++) this.tick(), y(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jt, Math.ceil((this.retained - this.retainedLimit) / At))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new g(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Dt, Ot * e.weight) + t, this.retainedLimit = Math.max(kt, At * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jt, Math.ceil((this.steps - this.stepLimit) / Ot))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new g(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!w(e)) return;
			let r = this.canonicalName(n, n.value);
			if (y(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (C(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: R(t, r)
					});
				}), n;
			}
			if (w(e)) {
				let n = x(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) y(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!C(e)) return;
			let r = Et(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: R(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (C(e)) {
				let r = Et(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: R(t, r.index)
				} : void 0;
			}
			if (w(e)) {
				let r = String(n.value);
				return y(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!C(e)) return [];
			let r = S(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : z(n.start, r), o = n.end === null ? r : z(n.end, r)) : (a = n.start === null ? r - 1 : z(n.start, r), o = n.end === null ? -r - 1 : z(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: y(e, u) ? e[u] : void 0,
				paths: R(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (w(e.value)) {
						let t = this.handleIdentifier(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (w(e.value)) {
						let t = this.handleStringLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (C(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					B(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": B(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						D(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						B(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						B(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						D(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (w(e)) {
					let t = x(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else C(e) && i.push({
					parent: a,
					keys: null,
					length: S(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!y(n, t)) continue;
						a = {
							value: n[t],
							paths: R(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!y(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!T(i) || !T(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return T(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Ct(n);
			if (t.operator === "reg") return wt(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = St[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new tt(r.value) : new tt(D(r?.value) ? [r?.value] : []);
			}), i = ut[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : D(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : D(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (C(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: R(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (w(n)) {
						let i = x(n);
						this.tick(i.length);
						for (let a of i) {
							if (!y(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!D(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) B(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw ie(e) ? new g("Query is nested too deeply") : ae(e) ? new g("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Dt, this.retainedLimit = this.adaptiveLimit ? kt : Infinity;
	}
}, Ft = (e, t, n) => {
	let r = _e(t), i = new Pt(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? oe(i) ? [] : [i.value] : i?.value;
}, It = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Ft(e, i, n);
		D(t) && r.push(t);
	}
	return r;
}, Lt = (e, t, n = {}) => {
	try {
		return C(t) ? It(e, t, n) : Ft(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Rt = (e) => typeof e == "object" && !!e && !Array.isArray(e), zt = (e, t) => {
	if (!Rt(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = V(t, i);
	return n;
}, Bt = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => V(t, e));
}, Vt = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ht = (e, t) => Vt(e, t), Ut = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Wt = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Gt = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Wt,
		applyTemplate: e
	});
}, V = (e, t, n) => {
	let r = e, i = t;
	Ut(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Vt(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ht(a?.textContent, r)), "attributes" in a && (a.attributes = zt(a?.attributes, r)), "children" in a && (a.children = Bt(a?.children, r))), a);
};
Gt(V);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Kt = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, qt = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Jt = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: qt,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Yt = (e, t) => {
	let n = e, r = t;
	return Kt(n, r), n.map((e) => V(e, r));
};
Jt((e, t) => {
	let n = e;
	return Kt(n, t), n.map((e) => V(e, e[t]));
}, Yt);
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var Xt = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Xt(n, t);
		if (e) return e;
	}
	return null;
}, Zt = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Lt(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Xt(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, Qt = (e, t, n, r) => {
	let { parent: i, key: a } = Zt(e, t, r);
	return (c[t.action] || s)(i, a, n), e;
}, $t = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = Lt(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, en = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			Qt(e, t, n, r);
		} catch {}
	}
}, tn = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), nn = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, rn = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (nn(e, t), t.map((t) => {
	let i = V(t, r);
	return i.children = Yt(tn(e, t), n), i;
})), an = {
	applyTemplate: V,
	fromCollection: Yt
}, on = (e, t, n) => {
	if (n == null) return structuredClone(t);
	let r = an[n];
	if (!r) throw Error(`Unknown function: ${n}`);
	return r(e, t);
}, sn = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => rn({
	columns: e,
	data: t,
	columnSpec: n,
	rowSpec: r
}), cn = ({ columns: e = [], rows: t = [], columnSpec: n, rowSpec: r } = {}) => e.map((e) => {
	let i = V(e, n), a = [];
	return Array.isArray(e.options) && e.options.length > 0 ? a = e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : Array.isArray(t) && t.length > 0 && (a = t.map((t) => ({
		...t,
		rowValue: t[e.columnName] ?? t.value ?? t
	}))), i.children = a.map((e) => V(e, r)), i;
}), ln = {
	single: (e, n) => {
		let r = t[e.templateKey];
		return on($t(e.sourcePath, n), r, e.func);
	},
	rowOnColumn: (e, { data: n }) => {
		let { columnKey: r, rowKey: i } = e.templateKey;
		return sn({
			columns: n?.columns,
			data: n?.data ?? (Array.isArray(n) ? n : n?.rows),
			columnSpec: t[r],
			rowSpec: t[i]
		});
	},
	columnOnRow: (e, { data: n }) => {
		let { columnKey: r, rowKey: i } = e.templateKey;
		return cn({
			columns: n?.columns,
			rows: n?.data ?? (Array.isArray(n) ? n : n?.rows),
			columnSpec: t[r],
			rowSpec: t[i]
		});
	}
}, un = (e, t, n = !1) => {
	let r = i[e], a = ln[r.type](r, t);
	return en(t, r.destinationPath, a, n), a;
}, dn = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	r && console.log(`[runStep] ${e}`), un(e, {
		base: t,
		data: n
	}, r);
}), t);
export { dn as default, un as executeStep };
