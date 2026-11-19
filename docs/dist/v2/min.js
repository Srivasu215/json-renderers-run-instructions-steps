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
// node_modules/jsonpathly/dist/index.mjs
var o = Object.defineProperty, s = Object.getOwnPropertySymbols, c = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable, u = Math.pow, d = (e, t, n) => t in e ? o(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, f = (e, t) => {
	for (var n in t ||= {}) c.call(t, n) && d(e, n, t[n]);
	if (s) for (var n of s(t)) l.call(t, n) && d(e, n, t[n]);
	return e;
}, p = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, m = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, h = () => void 0, g = (e, t, n, r) => {
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
}, _ = (e, t, n = h) => {
	let r = [];
	if (!g(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!g(y(e.x, t), y(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !v(o, i) || !v(a, i)) return !1;
			let s = a[i];
			if (!v(o, i) || !g(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, v = (e, t) => Object.prototype.hasOwnProperty.call(e, t), y = (e, t) => v(e, t) ? e[t] : void 0, ee = 16383, b = 1e3, x = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > b) throw new m(`Member name too long (maximum ${b} characters)`);
	return t;
}, S = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, te = (e) => e instanceof RangeError && /call stack/i.test(e.message), C = (e) => Array.isArray(e), ne = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), w = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, T = (e) => typeof e == "number", E = (e) => typeof e == "string", re = (e) => e === void 0, D = (e) => e !== void 0;
function ie(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function ae(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function oe(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var se = class extends SyntaxError {
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
function O(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Rr }, a = Rr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", _ = "true", v = "false", y = "null", ee = /^[,\]]/, b = /^[+\-]/, x = /^[*\/]/, S = /^[a-zA-Z_]/, te = /^[\x80-\uFFFF_]/, C = /^[a-zA-Z0-9_]/, ne = /^[0-9@$\-]/, w = /^[^\/\\]/, T = /^[gimsuy]/, E = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, re = /^[\uD800-\uDBFF]/, D = /^[\uDC00-\uDFFF]/, O = /^[0-9]/, ce = /^[1-9]/, le = /^[eE]/, k = /^["\\]/, ue = /^['\\]/, de = /^[ -\uD7FF\uE000-\uFFFF]/, fe = /^[dD]/, pe = /^[89abAB]/, me = /^[c-fC-F]/, he = /^[0-9a-fA-F]/, ge = /^[ \t\n\r]/, _e = J([",", "]"], !1, !1, !1), ve = q("length", !1), ye = q("count", !1), be = q("match", !1), xe = q("search", !1), Se = q("value", !1), Ce = J(["+", "-"], !1, !1, !1), we = J(["*", "/"], !1, !1, !1), Te = Nr("string"), A = J([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ee = J([["", "￿"], "_"], !1, !1, !1), De = J([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Oe = q("-", !1), ke = J([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), j = q("$", !1), Ae = q("@", !1), je = q("..", !1), Me = q(".", !1), Ne = q("*", !1), Pe = q("&&", !1), Fe = q("||", !1), Ie = q("!", !1), Le = q("==", !1), Re = q("!=", !1), ze = q(">=", !1), Be = q(">", !1), Ve = q("<=", !1), He = q("<", !1), Ue = q("=~", !1), We = q("in", !1), Ge = q("nin", !1), Ke = q("subsetof", !1), qe = q("anyof", !1), Je = q("noneof", !1), Ye = q("sizeof", !1), Xe = q("size", !1), Ze = q("empty", !1), Qe = q("true", !1), $e = q("false", !1), et = q("null", !1), tt = q("{", !1), nt = q("}", !1), M = q("[", !1), rt = q("]", !1), N = q(":", !1), it = q(",", !1), at = q("(", !1), ot = q(")", !1), st = q("?", !1), ct = Nr("regex"), lt = q("/", !1), ut = J(["/", "\\"], !0, !1, !1), P = q("\\", !1), dt = jr(), ft = J([
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
	], !1, !1, !1), mt = J([["\ud800", "\udbff"]], !1, !1, !1), ht = J([["\udc00", "\udfff"]], !1, !1, !1), F = J([["0", "9"]], !1, !1, !1), gt = Nr("number"), _t = q("0", !1), vt = J([["1", "9"]], !1, !1, !1), yt = Nr("integer"), bt = J(["e", "E"], !1, !1, !1), xt = q("\"", !1), St = q("'", !1), Ct = J(["\"", "\\"], !1, !1, !1), wt = J(["'", "\\"], !1, !1, !1), I = J([[" ", "퟿"], ["", "￿"]], !1, !1, !1), L = q("b", !1), Tt = q("f", !1), R = q("n", !1), Et = q("r", !1), Dt = q("t", !1), Ot = q("u", !1), kt = J(["d", "D"], !1, !1, !1), At = J([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), jt = q("\\u", !1), Mt = J([["c", "f"], ["C", "F"]], !1, !1, !1), Nt = J([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Pt = J([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Ft(e) {
		return {
			type: "root",
			next: ie(e)
		};
	}
	function It(e) {
		return e.map((e) => e[1]);
	}
	function z(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Lt(e) {
		return e;
	}
	function Rt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function zt() {
		return { type: "wildcard" };
	}
	function Bt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Vt() {
		return { type: "wildcard" };
	}
	function Ht(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ut(e) {
		return e;
	}
	function Wt(e) {
		return e;
	}
	function Gt(e, t) {
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
	function Kt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function B(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function qt(e, t) {
		return oe(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function Jt(e, t) {
		return oe(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function Yt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Xt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Zt(e, t) {
		return t !== null || ae(e);
	}
	function Qt(e, t) {
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
	function $t(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function en(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function tn() {
		return { operator: "empty" };
	}
	function nn() {
		return "eq";
	}
	function rn() {
		return "ne";
	}
	function an() {
		return "le";
	}
	function on() {
		return "lt";
	}
	function sn() {
		return "ge";
	}
	function cn() {
		return "gt";
	}
	function ln() {
		return "in";
	}
	function un() {
		return "nin";
	}
	function dn() {
		return "subsetof";
	}
	function fn() {
		return "anyof";
	}
	function pn() {
		return "noneof";
	}
	function mn() {
		return "sizeof";
	}
	function hn() {
		return "size";
	}
	function gn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function _n() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function vn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function yn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function bn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function xn() {
		return "length";
	}
	function Sn() {
		return "count";
	}
	function Cn() {
		return "match";
	}
	function wn() {
		return "search";
	}
	function Tn() {
		return "value";
	}
	function En(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Dn(e, t) {
		return t.length === 0 ? e : oe(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function On(e, t) {
		return t.length === 0 ? e : oe(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function kn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function An(e) {
		return {
			type: "root",
			next: ie(e)
		};
	}
	function jn(e) {
		return {
			type: "current",
			next: ie(e)
		};
	}
	function Mn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Nn() {
		return { type: "wildcard" };
	}
	function Pn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Fn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function In(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ln(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Rn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function zn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Bn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Vn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Hn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Un(e) {
		return e;
	}
	function Wn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Gn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Kn(e, t) {
		return [e, t.value];
	}
	function qn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Jn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Yn(e) {
		return _a(e);
	}
	function Xn(e) {
		return _a(e);
	}
	function Zn() {
		return "true";
	}
	function Qn() {
		return "false";
	}
	function $n() {
		return "null";
	}
	function er(e) {
		return _a(e);
	}
	function tr() {
		return "true";
	}
	function nr() {
		return "false";
	}
	function rr() {
		return "null";
	}
	function ir(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function ar(e) {
		return e.join("");
	}
	function or(e, t) {
		let n = parseFloat(Or());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function sr() {
		let e = parseInt(Or(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e) {
		return e;
	}
	function dr() {
		return "\"";
	}
	function fr(e) {
		return e;
	}
	function pr(e) {
		return e;
	}
	function mr() {
		return "'";
	}
	function hr(e) {
		return e;
	}
	function gr() {
		return "\\";
	}
	function _r() {
		return "/";
	}
	function vr() {
		return "\b";
	}
	function yr() {
		return "\f";
	}
	function br() {
		return "\n";
	}
	function xr() {
		return "\r";
	}
	function Sr() {
		return "	";
	}
	function Cr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function wr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Tr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let V = t.peg$currPos | 0, H = V, U = [{
		line: 1,
		column: 1
	}], W = V, Er = t.peg$maxFailExpected || [], G = t.peg$silentFails | 0, Dr = /* @__PURE__ */ new Map(), K;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Or() {
		return e.substring(H, V);
	}
	function kr(e, t) {
		throw t = t === void 0 ? Fr(H, V) : t, Ir(e, t);
	}
	function Ar(t = V) {
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
		let n = U[t], r;
		if (n) return n;
		if (t >= U.length) r = U.length - 1;
		else for (r = t; !U[--r];);
		for (n = U[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return U[t] = n, n;
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
		V < W || (V > W && (W = V, Er = []), Er.push(e));
	}
	function Ir(e, t) {
		return new se(e, null, null, t);
	}
	function Lr(e, t, n) {
		return new se(se.buildMessage(e, t), e, t, n);
	}
	function Rr() {
		let e, t, r, i;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), i = ga(), i === n ? (V = e, e = n) : (H = e, e = Ft(r))), e;
	}
	function zr() {
		let e, t, r, i, a;
		for (e = V, t = [], r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i);
		return H = e, t = It(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = V, t = Ti(), t === n ? (V = e, e = n) : (r = Ur(), r === n ? (V = e, e = n) : (H = e, e = z(r))), e === n && (e = V, t = Gr(), t !== n && (H = e, t = Lt(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = V, t = wi(), t === n ? (V = e, e = n) : (r = Wr(), r === n ? (V = e, e = n) : (H = e, e = Rt(r))), e;
	}
	function Ur() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = zt()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = Bt(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = Vt()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = Ht(t)), e = t, e === n && (e = V, t = Gr(), t !== n && (H = e, t = Ut(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = Kr(), r === n ? (V = e, e = n) : ($(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = Wt(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ui(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Gt(t, r);
		} else V = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = $i(), i === n ? (V = t, t = n) : ($(), a = Jr(), a === n ? (V = t, t = n) : ($(), o = ea(), o === n ? (V = t, t = n) : (s = V, G++, c = V, l = $(), u = e.charAt(V), ee.test(u) ? V++ : (u = n, G === 0 && Y(_e)), u === n ? (V = c, c = n) : (l = [l, u], c = l), G--, c === n ? s = n : (V = s, s = void 0), s === n ? (V = t, t = n) : (H = t, t = Kt(a)))))), t === n && (t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = Jr(), i === n ? (V = t, t = n) : (H = t, t = B(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = V * 91 + 10, u = Dr.get(l);
		if (u) return V = u.nextPos, u.result;
		if (e = V, t = Yr(), t !== n) {
			for (r = [], i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = qt(t, r);
		} else V = e, e = n;
		return Dr.set(l, {
			nextPos: V,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = Xr(), t !== n) {
			for (r = [], i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Jt(t, r);
		} else V = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = $i(), r === n ? (V = e, e = n) : ($(), i = Jr(), i === n ? (V = e, e = n) : ($(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = Yt(i))))), e === n && (e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = ei(), r === n ? (V = e, e = n) : (H = e, e = Xt(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = V, t = ai(), t === n ? (V = e, e = n) : (r = V, i = $(), a = Qr(), a === n ? (V = r, r = n) : (i = [i, a], r = i), r === n && (r = null), H = V, i = Zt(t, r), i = i ? void 0 : n, i === n ? (V = e, e = n) : (H = e, e = Qt(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = V, t = $r(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : (H = e, e = $t(t, r))), e === n && (e = V, t = Ii(), t === n ? (V = e, e = n) : ($(), r = di(), r === n ? (V = e, e = n) : (H = e, e = en(r))), e === n && (e = V, t = Wi(), t !== n && (H = e, t = tn()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = V, t = Ai(), t !== n && (H = e, t = nn()), e = t, e === n && (e = V, t = ji(), t !== n && (H = e, t = rn()), e = t, e === n && (e = V, t = Pi(), t !== n && (H = e, t = an()), e = t, e === n && (e = V, t = Fi(), t !== n && (H = e, t = on()), e = t, e === n && (e = V, t = Mi(), t !== n && (H = e, t = sn()), e = t, e === n && (e = V, t = Ni(), t !== n && (H = e, t = cn()), e = t, e === n && (e = V, t = Li(), t !== n && (H = e, t = ln()), e = t, e === n && (e = V, t = Ri(), t !== n && (H = e, t = un()), e = t, e === n && (e = V, t = zi(), t !== n && (H = e, t = dn()), e = t, e === n && (e = V, t = Bi(), t !== n && (H = e, t = fn()), e = t, e === n && (e = V, t = Vi(), t !== n && (H = e, t = pn()), e = t, e === n && (e = V, t = Hi(), t !== n && (H = e, t = mn()), e = t, e === n && (e = V, t = Ui(), t !== n && (H = e, t = hn()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = Jr(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = gn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = _n()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = vn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = yn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = V, t = ni(), t === n ? (V = e, e = n) : (r = $i(), r === n ? (V = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = bn(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = V, e.substr(V, 6) === o ? (r = o, V += 6) : (r = n, G === 0 && Y(ve)), r !== n && (H = t, r = xn()), t = r, t === n && (t = V, e.substr(V, 5) === s ? (r = s, V += 5) : (r = n, G === 0 && Y(ye)), r !== n && (H = t, r = Sn()), t = r, t === n && (t = V, e.substr(V, 5) === c ? (r = c, V += 5) : (r = n, G === 0 && Y(be)), r !== n && (H = t, r = Cn()), t = r, t === n && (t = V, e.substr(V, 6) === l ? (r = l, V += 6) : (r = n, G === 0 && Y(xe)), r !== n && (H = t, r = wn()), t = r, t === n && (t = V, e.substr(V, 5) === u ? (r = u, V += 5) : (r = n, G === 0 && Y(Se)), r !== n && (H = t, r = Tn()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ii(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = En(t, r);
		} else V = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = V * 91 + 21, d = Dr.get(u);
		if (d) return V = d.nextPos, d.result;
		if (t = V, r = oi(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), b.test(s) ? V++ : (s = n, G === 0 && Y(Ce)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), b.test(s) ? V++ : (s = n, G === 0 && Y(Ce)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = Dn(r, i);
		} else V = t, t = n;
		return Dr.set(u, {
			nextPos: V,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = V, r = si(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && Y(we)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && Y(we)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = On(r, i);
		} else V = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = kn(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = An(r))), e === n && (e = V, t = Ci(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = jn(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = V, t = V, r = la(), r === n ? (V = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (V = e, e = n) : (i = $(), a = V, o = la(), o === n ? (V = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = V, s = Qi(), s === n ? (V = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), H = e, e = Mn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = V, t = Ei(), t !== n && (H = e, t = Nn()), e = t, e === n && (e = V, t = la(), t !== n && (H = e, t = Pn(t)), e = t, e === n && (e = V, t = da(), t !== n && (H = e, t = Fn(t)), e = t, e === n && (e = V, t = yi(), t !== n && (H = e, t = In(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = V, t = na(), t === n ? (V = e, e = n) : (r = ra(), H = e, e = Ln(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = V, t = pi(), t !== n && (H = e, t = Rn(t)), e = t, e === n && (e = V, t = sa(), t !== n && (H = e, t = zn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = Bn()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = Vn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = Hn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return G++, e = V, t = da(), t !== n && (H = e, t = Un(t)), e = t, G--, e === n && (t = n, G === 0 && Y(Te)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = V, t = Ji(), t === n ? (V = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (V = e, e = n) : (H = e, e = Wn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = gi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Gn(t, r);
		} else V = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = V, t = da(), t === n ? (V = e, e = n) : ($(), r = Qi(), r === n ? (V = e, e = n) : ($(), i = fi(), i === n ? (V = e, e = n) : (H = e, e = Kn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = qn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = fi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Jn(t, r);
		} else V = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = V, r = V, i = V, a = e.charAt(V), S.test(a) ? V++ : (a = n, G === 0 && Y(A)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else V = i, i = n;
		if (r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Yn(r)), t = r, t === n) {
			if (t = V, r = V, i = [], a = e.charAt(V), te.test(a) ? V++ : (a = n, G === 0 && Y(Ee)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(V), te.test(a) ? V++ : (a = n, G === 0 && Y(Ee));
			else i = n;
			r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Xn(r)), t = r, t === n && (t = V, r = Gi(), r !== n && (H = t, r = Zn()), t = r, t === n && (t = V, r = Ki(), r !== n && (H = t, r = Qn()), t = r, t === n && (t = V, r = qi(), r !== n && (H = t, r = $n()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(V), C.test(t) ? V++ : (t = n, G === 0 && Y(De)), t === n && (t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(Oe)), r === n ? (V = t, t = n) : (i = V, G++, a = e.charAt(V), ne.test(a) ? V++ : (a = n, G === 0 && Y(ke)), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = V, t = ia(), t !== n && (H = e, t = er(t)), e = t, e === n && (e = V, t = Gi(), t !== n && (H = e, t = tr()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = nr()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = rr()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(V) === 36 ? (t = "$", V++) : (t = n, G === 0 && Y(j)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(V) === 64 ? (t = "@", V++) : (t = n, G === 0 && Y(Ae)), t;
	}
	function wi() {
		let t;
		return e.substr(V, 2) === ".." ? (t = "..", V += 2) : (t = n, G === 0 && Y(je)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(V) === 46 ? (t = ".", V++) : (t = n, G === 0 && Y(Me)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(V) === 42 ? (t = "*", V++) : (t = n, G === 0 && Y(Ne)), t;
	}
	function Di() {
		let t;
		return e.substr(V, 2) === "&&" ? (t = "&&", V += 2) : (t = n, G === 0 && Y(Pe)), t;
	}
	function Oi() {
		let t;
		return e.substr(V, 2) === "||" ? (t = "||", V += 2) : (t = n, G === 0 && Y(Fe)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(V) === 33 ? (t = "!", V++) : (t = n, G === 0 && Y(Ie)), t;
	}
	function Ai() {
		let t;
		return e.substr(V, 2) === "==" ? (t = "==", V += 2) : (t = n, G === 0 && Y(Le)), t;
	}
	function ji() {
		let t;
		return e.substr(V, 2) === "!=" ? (t = "!=", V += 2) : (t = n, G === 0 && Y(Re)), t;
	}
	function Mi() {
		let t;
		return e.substr(V, 2) === ">=" ? (t = ">=", V += 2) : (t = n, G === 0 && Y(ze)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(V) === 62 ? (t = ">", V++) : (t = n, G === 0 && Y(Be)), t;
	}
	function Pi() {
		let t;
		return e.substr(V, 2) === "<=" ? (t = "<=", V += 2) : (t = n, G === 0 && Y(Ve)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(V) === 60 ? (t = "<", V++) : (t = n, G === 0 && Y(He)), t;
	}
	function Ii() {
		let t;
		return e.substr(V, 2) === "=~" ? (t = "=~", V += 2) : (t = n, G === 0 && Y(Ue)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = V, e.substr(V, 2) === "in" ? (r = "in", V += 2) : (r = n, G === 0 && Y(We)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = V, e.substr(V, 3) === "nin" ? (r = "nin", V += 3) : (r = n, G === 0 && Y(Ge)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = V, e.substr(V, 8) === d ? (r = d, V += 8) : (r = n, G === 0 && Y(Ke)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === f ? (r = f, V += 5) : (r = n, G === 0 && Y(qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === p ? (r = p, V += 6) : (r = n, G === 0 && Y(Je)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === m ? (r = m, V += 6) : (r = n, G === 0 && Y(Ye)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === h ? (r = h, V += 4) : (r = n, G === 0 && Y(Xe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === g ? (r = g, V += 5) : (r = n, G === 0 && Y(Ze)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === _ ? (r = _, V += 4) : (r = n, G === 0 && Y(Qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === v ? (r = v, V += 5) : (r = n, G === 0 && Y($e)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === y ? (r = y, V += 4) : (r = n, G === 0 && Y(et)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(V) === 123 ? (t = "{", V++) : (t = n, G === 0 && Y(tt)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(V) === 125 ? (t = "}", V++) : (t = n, G === 0 && Y(nt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(V) === 91 ? (t = "[", V++) : (t = n, G === 0 && Y(M)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(V) === 93 ? (t = "]", V++) : (t = n, G === 0 && Y(rt)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(V) === 58 ? (t = ":", V++) : (t = n, G === 0 && Y(N)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(V) === 44 ? (t = ",", V++) : (t = n, G === 0 && Y(it)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(V) === 40 ? (t = "(", V++) : (t = n, G === 0 && Y(at)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(V) === 41 ? (t = ")", V++) : (t = n, G === 0 && Y(ot)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(V) === 63 ? (t = "?", V++) : (t = n, G === 0 && Y(st)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(lt)), r !== n) {
			for (i = [], a = e.charAt(V), w.test(a) ? V++ : (a = n, G === 0 && Y(ut)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(P)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(dt)), s === n ? (V = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(V), w.test(a) ? V++ : (a = n, G === 0 && Y(ut)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(P)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(dt)), s === n ? (V = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(V) === 47 ? (a = "/", V++) : (a = n, G === 0 && Y(lt)), a === n ? (V = t, t = n) : (H = t, t = ir(i));
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(ct)), t;
	}
	function ra() {
		let t, r, i;
		for (t = V, r = [], i = e.charAt(V), T.test(i) ? V++ : (i = n, G === 0 && Y(ft)); i !== n;) r.push(i), i = e.charAt(V), T.test(i) ? V++ : (i = n, G === 0 && Y(ft));
		return H = t, r = ar(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = V, r = V, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else V = r, r = n;
		return t = r === n ? r : e.substring(t, V), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(V), E.test(t) ? V++ : (t = n, G === 0 && Y(pt)), t === n && (t = V, r = e.charAt(V), re.test(r) ? V++ : (r = n, G === 0 && Y(mt)), r === n ? (V = t, t = n) : (i = e.charAt(V), D.test(i) ? V++ : (i = n, G === 0 && Y(ht)), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(V), O.test(t) ? V++ : (t = n, G === 0 && Y(F))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (G++, t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(Oe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = V, e.charCodeAt(V) === 46 ? (o = ".", V++) : (o = n, G === 0 && Y(Me)), o !== n) {
				if (s = [], c = e.charAt(V), O.test(c) ? V++ : (c = n, G === 0 && Y(F)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(V), O.test(c) ? V++ : (c = n, G === 0 && Y(F));
				else s = n;
				s === n ? (V = a, a = n) : (o = [o, s], a = o);
			} else V = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), H = t, t = or(a, o);
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(gt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(V) === 48 ? (t = "0", V++) : (t = n, G === 0 && Y(_t)), t === n) {
			if (t = V, r = e.charAt(V), ce.test(r) ? V++ : (r = n, G === 0 && Y(vt)), r !== n) {
				for (i = [], a = e.charAt(V), O.test(a) ? V++ : (a = n, G === 0 && Y(F)); a !== n;) i.push(a), a = e.charAt(V), O.test(a) ? V++ : (a = n, G === 0 && Y(F));
				r = [r, i], t = r;
			} else V = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 48 ? (r = "0", V++) : (r = n, G === 0 && Y(_t)), r === n) {
			if (r = V, e.charCodeAt(V) === 45 ? (i = "-", V++) : (i = n, G === 0 && Y(Oe)), i === n && (i = null), a = e.charAt(V), ce.test(a) ? V++ : (a = n, G === 0 && Y(vt)), a !== n) {
				for (o = [], s = e.charAt(V), O.test(s) ? V++ : (s = n, G === 0 && Y(F)); s !== n;) o.push(s), s = e.charAt(V), O.test(s) ? V++ : (s = n, G === 0 && Y(F));
				i = [
					i,
					a,
					o
				], r = i;
			} else V = r, r = n;
		}
		return r !== n && (H = t, r = sr()), t = r, G--, t === n && (r = n, G === 0 && Y(yt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = V, r = e.charAt(V), le.test(r) ? V++ : (r = n, G === 0 && Y(bt)), r !== n) {
			if (i = e.charAt(V), b.test(i) ? V++ : (i = n, G === 0 && Y(Ce)), i === n && (i = null), a = [], o = e.charAt(V), O.test(o) ? V++ : (o = n, G === 0 && Y(F)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(V), O.test(o) ? V++ : (o = n, G === 0 && Y(F));
			else a = n;
			a === n ? (V = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else V = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (G++, t = V, e.charCodeAt(V) === 34 ? (r = "\"", V++) : (r = n, G === 0 && Y(xt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(V) === 34 ? (a = "\"", V++) : (a = n, G === 0 && Y(xt)), a === n ? (V = t, t = n) : (H = t, t = cr(i));
		} else V = t, t = n;
		if (t === n) {
			if (t = V, e.charCodeAt(V) === 39 ? (r = "'", V++) : (r = n, G === 0 && Y(St)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(V) === 39 ? (a = "'", V++) : (a = n, G === 0 && Y(St)), a === n ? (V = t, t = n) : (H = t, t = lr(i));
			} else V = t, t = n;
		}
		return G--, t === n && (r = n, G === 0 && Y(Te)), t;
	}
	function fa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), k.test(i) ? V++ : (i = n, G === 0 && Y(Ct)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = ur(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(P)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 34 ? (i = "\"", V++) : (i = n, G === 0 && Y(xt)), i === n ? (V = t, t = n) : (H = t, t = dr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(P)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = fr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), ue.test(i) ? V++ : (i = n, G === 0 && Y(wt)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = pr(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(P)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 39 ? (i = "'", V++) : (i = n, G === 0 && Y(St)), i === n ? (V = t, t = n) : (H = t, t = mr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(P)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = hr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(V), de.test(t) ? V++ : (t = n, G === 0 && Y(I)), t === n && (t = V, r = V, i = e.charAt(V), re.test(i) ? V++ : (i = n, G === 0 && Y(mt)), i === n ? (V = r, r = n) : (a = e.charAt(V), D.test(a) ? V++ : (a = n, G === 0 && Y(ht)), a === n ? (V = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, V)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(P)), r !== n && (H = t, r = gr()), t = r, t === n && (t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(lt)), r !== n && (H = t, r = _r()), t = r, t === n && (t = V, e.charCodeAt(V) === 98 ? (r = "b", V++) : (r = n, G === 0 && Y(L)), r !== n && (H = t, r = vr()), t = r, t === n && (t = V, e.charCodeAt(V) === 102 ? (r = "f", V++) : (r = n, G === 0 && Y(Tt)), r !== n && (H = t, r = yr()), t = r, t === n && (t = V, e.charCodeAt(V) === 110 ? (r = "n", V++) : (r = n, G === 0 && Y(R)), r !== n && (H = t, r = br()), t = r, t === n && (t = V, e.charCodeAt(V) === 114 ? (r = "r", V++) : (r = n, G === 0 && Y(Et)), r !== n && (H = t, r = xr()), t = r, t === n && (t = V, e.charCodeAt(V) === 116 ? (r = "t", V++) : (r = n, G === 0 && Y(Dt)), r !== n && (H = t, r = Sr()), t = r, t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(Ot)), r === n ? (V = t, t = n) : (i = V, a = V, o = e.charAt(V), fe.test(o) ? V++ : (o = n, G === 0 && Y(kt)), o === n ? (V = a, a = n) : (s = e.charAt(V), pe.test(s) ? V++ : (s = n, G === 0 && Y(At)), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (e.substr(V, 2) === "\\u" ? (a = "\\u", V += 2) : (a = n, G === 0 && Y(jt)), a === n ? (V = t, t = n) : (o = V, s = V, c = e.charAt(V), fe.test(c) ? V++ : (c = n, G === 0 && Y(kt)), c === n ? (V = s, s = n) : (l = e.charAt(V), me.test(l) ? V++ : (l = n, G === 0 && Y(Mt)), l === n ? (V = s, s = n) : (u = Z(), u === n ? (V = s, s = n) : (d = Z(), d === n ? (V = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, V), o === n ? (V = t, t = n) : (H = t, t = Cr(i, o))))), t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(Ot)), r === n ? (V = t, t = n) : (i = V, a = V, o = Z(), o === n ? (V = a, a = n) : (s = Z(), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (H = V, a = wr(i), a = a ? n : void 0, a === n ? (V = t, t = n) : (H = t, t = Tr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(V), he.test(t) ? V++ : (t = n, G === 0 && Y(Nt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(V), C.test(t) ? V++ : (t = n, G === 0 && Y(De)), t;
	}
	function $() {
		let t, r;
		for (G++, t = [], r = e.charAt(V), ge.test(r) ? V++ : (r = n, G === 0 && Y(Pt)); r !== n;) t.push(r), r = e.charAt(V), ge.test(r) ? V++ : (r = n, G === 0 && Y(Pt));
		return G--, t;
	}
	function ga() {
		let t, r;
		return t = V, G++, e.length > V ? (r = e.charAt(V), V++) : (r = n, G === 0 && Y(dt)), G--, r === n ? t = void 0 : (V = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && kr("Member name too long (maximum 1000 characters)"), e;
	}
	K = a();
	let va = K !== n && V === e.length;
	function ya() {
		throw K !== n && V < e.length && Y(Mr()), Lr(Er, W < e.length ? Ar(W) : null, W < e.length ? Fr(W, W + 1) : Fr(W, W));
	}
	if (t.peg$library) return {
		peg$result: K,
		peg$currPos: V,
		peg$FAILED: n,
		peg$maxFailExpected: Er,
		peg$maxFailPos: W,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return K;
	ya();
}
var ce = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), le = {
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
}, k = (e) => {
	throw new p(1, 1, e);
}, ue = (e) => e.type === "root" || e.type === "current", de = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function fe(e) {
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
		if (ue(i)) r === "value" && !de(i) && k("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && k(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = ce.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = le[e], a = i.args;
				a.length !== n.args.length && k(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && k(`The result of ${e}() must be compared`), r === "value" && n.logical && k(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && k("A literal must be compared");
		}
	}
}
function pe(e) {
	let t;
	try {
		t = O(e);
	} catch (e) {
		if (te(e)) throw new p(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new p(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new p(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return fe(t), t;
}
var me = /* @__PURE__ */ new Set([
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
]), he = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), ge = (e) => e >= 55296 && e <= 56319, _e = (e) => e >= 56320 && e <= 57343, ve = (e) => e !== void 0 && e >= "0" && e <= "9", ye = (e, t) => {
	let n = e.charCodeAt(t);
	return ge(n) && _e(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : ge(n) || _e(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, be = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !me.has(n) ? null : n === "n" ? {
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
}, xe = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return he.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Se = (e, t) => {
	let n = e[t];
	return n === "\\" ? be(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : ye(e, t);
}, Ce = (e, t) => {
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
			let t = xe(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Se(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Se(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, we = (e, t) => {
	let n = t + 1, r = n;
	for (; ve(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; ve(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Te = (e) => {
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
				let e = i ? we(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Ce(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = xe(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = be(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = ye(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, A = 1e3, Ee = 1e3, De = 16, Oe = /^[dgimsuy]*$/, ke = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, j = class extends Error {}, Ae = 0, je = 1, Me = 2, Ne = 3, Pe = 4, Fe = 5, Ie = u(2, 31) - 1, Le = (e, t) => {
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
	return e.scratch = void 0, (r.gen > Ie - t - 2 || r.step > Ie - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Re = /* @__PURE__ */ new Set([
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
]), ze = /^\{(\d+)(?:,(\d*))?\}/, Be = /^[0-9a-fA-F]{4}/, Ve = /^\(\?([ims]*)(?:-([ims]*))?:/, He = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Ue = class {
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
		if (this.i < this.src.length) throw new j("unexpected character");
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
				let r = Ve.exec(e.slice(t, t + 12));
				if (!r) throw new j("lookaround or named group");
				let i = f({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new j("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new j("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new j("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Re.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new j("trailing backslash");
		if (r === "b" || r === "B") throw new j("word boundary");
		if (r >= "1" && r <= "9") throw new j("backreference");
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
			if (n === -1) throw new j("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Be.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Be.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = ze.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > A || i !== Infinity && i > A) throw new j("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, We = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= A) throw new j("pattern too large");
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
		this.emit(Fe);
	}
	compile(e) {
		if (++this.work > 4 * A) throw new j("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Ae, this.atomId(e));
				return;
			case "bol":
				this.emit(Ne, +!!e.multiline);
				return;
			case "eol":
				this.emit(Pe, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(je);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Me)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(je);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Me, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(je);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Ge = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Ue(e, r, t, n).parse(), a = new We(r);
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
}, Ke = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: _, atomHit: v } = r, y = r.gen, ee = r.step;
	r.gen = y + t.length + 2, r.step = ee + t.length + 2;
	let b = 0, x = !1, S = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== y) switch (h[r] = y, ++c === 64 && (u(c), c = 0), i[r]) {
				case Ae:
					e[n++] = r;
					break;
				case Fe: return u(c), x = !0, n;
				case Me:
					g[s++] = a[r];
					break;
				case je:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Ne:
					(b === 0 || a[r] === 1 && He(t.charCodeAt(b - 1))) && (g[s++] = r + 1);
					break;
				case Pe: (b === t.length || a[r] === 1 && He(t.charCodeAt(b))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (y++, p = S(d, 0, 0), x) return !0;
	for (; b < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(b) : t.charCodeAt(b)) > 65535 ? 2 : 1, n = t.slice(b, b + e), r = ee + b + 1;
		y++, m = 0, b += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (_[i] !== r) {
				_[i] = r;
				let e = s[i];
				v[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (v[i] === 1 && (m = S(f, m, t + 1), x)) return !0;
		}
		if (!l && (m = S(f, m, 0), x)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, qe = (e, t, n) => {
	let r = Le(e, t.length);
	try {
		return Ke(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Je = 256, Ye = /* @__PURE__ */ new Map(), Xe = 0, Ze = (e, t, n, r, i = !1) => {
	if (e.length > Ee || t.length > 7 || !Oe.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Ye.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = ke(s) > De ? null : Ge(n ? `^(?:${s})$` : s, t, i);
	Xe >= Je && (Ye.clear(), Xe = 0);
	let l = Ye.get(s);
	return l === void 0 && Ye.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Xe++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Qe = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), qe(e, t, n);
}, $e = class {
	constructor(e) {
		this.nodes = e;
	}
}, et = (e) => {
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
}, tt = (e) => {
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
	return !et(e);
}, nt = 256, M = /* @__PURE__ */ new Map(), rt = (e, t) => {
	let n = M.get(e);
	return n === void 0 && (n = tt(e), M.size >= nt && M.clear(), M.set(Array.from(e).join(""), n)), t(e.length), n;
}, N = /* @__PURE__ */ new Map(), it = (e, t) => {
	let n = N.get(e);
	return n === void 0 && (n = Te(e), n !== null && (n = Array.from(n).join("")), N.size >= nt && N.clear(), N.set(Array.from(e).join(""), n)), t(e.length), n;
}, at = 256, ot = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Ee) c = null;
		else if (o) {
			let n = it(e, i);
			c = n === null ? null : Ze(n, t, r, i, !0);
		} else c = rt(e, i) ? Ze(e, t, r, i) : null;
		s !== void 0 && (s.size >= at && s.clear(), s.set(a, c));
	}
	return c !== null && Qe(c, n, i);
}, st = {
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
		return !E(r) || !E(i) ? !1 : ot(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : ot(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, ct = (e, t, n = h) => e === void 0 && t === void 0 || _(e, t, n), lt = (e, t, n = h) => !_(e, t, n), ut = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, P = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return ut(n) - ut(i);
	}
	return e.length - t.length;
}, dt = (e, t, n = h) => T(e) && T(t) ? e < t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), P(e, t) < 0) : !1, ft = (e, t, n = h) => dt(e, t, n) || ct(e, t, n), pt = (e, t, n = h) => T(e) && T(t) ? e > t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), P(e, t) > 0) : !1, mt = (e, t, n = h) => pt(e, t, n) || ct(e, t, n), ht = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, F = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) {
		let r = y(e, i);
		if (n(1 + ht(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, gt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, _t = (e) => typeof e == "string" && e.length + 1 > ee, vt = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = S(e);
	for (let n = 0; n < a; n++) {
		let r = y(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), _t(r) ? i.long.push(r) : i.set.add(gt(r));
	}
	return n?.set(e, i), i;
}, yt = ({ set: e, long: t }, n, r) => {
	if (_t(n)) {
		for (let e of t) if (r(1 + ht(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(gt(n)));
}, bt = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) if (n(), v(e, i) && t(e[i])) return !0;
	return !1;
}, xt = {
	eq: ct,
	ne: lt,
	lt: dt,
	le: ft,
	gt: pt,
	ge: mt,
	in: (e, t, n = h) => C(t) ? F(t, e, n) !== -1 : !1,
	nin: (e, t, n = h) => C(t) ? F(t, e, n) === -1 : !1,
	subsetof: (e, t, n = h, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = vt(t, n, r);
		return !bt(e, (e) => !yt(i, e, n), n);
	},
	anyof: (e, t, n = h, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = vt(t, n, r);
		return bt(e, (e) => yt(i, e, n), n);
	},
	noneof: (e, t, n = h, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = vt(t, n, r);
		return !bt(e, (e) => yt(i, e, n), n);
	},
	sizeof: (e, t) => !C(e) && !E(e) || !C(t) && !E(t) ? !1 : (C(e) ? S(e) : e.length) === (C(t) ? S(t) : t.length),
	size: (e, t) => !C(e) && !E(e) || !T(t) ? !1 : (C(e) ? S(e) : e.length) === t
}, St = (e) => !C(e) && !E(e) ? !1 : (C(e) ? S(e) : e.length) === 0, Ct = (e, t, n, r = h, i) => !E(e) || !E(t) ? !1 : ot(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), wt = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), I = (e, t) => e.concat(`[${t}]`), L = (e, t) => e < 0 ? t + e : e, Tt = (e, t) => {
	let n = S(e), r = L(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: v(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, R = (e, t) => {
	for (let n of t) e.push(n);
}, Et = 1e6, Dt = 100, Ot = 1e6, kt = 20, At = 1e4, jt = 1e4, Mt = class {
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
					v(n, r) && this.visit(n[r]);
				} else if (v(n, t)) this.visit(n[t]);
				else if (++e.holes > jt) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!v(n, r)) continue;
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
}, Nt = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, wt(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = wt(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = S(e);
			for (let r = 0; r < n; r++) this.tick(), v(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Mt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(At, Math.ceil((this.retained - this.retainedLimit) / kt))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new m(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Et, Dt * e.weight) + t, this.retainedLimit = Math.max(Ot, kt * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Mt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(At, Math.ceil((this.steps - this.stepLimit) / Dt))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new m(`Query exceeded ${this.stepLimit} evaluation steps`);
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
			if (v(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (C(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: I(t, r)
					});
				}), n;
			}
			if (w(e)) {
				let n = x(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) v(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!C(e)) return;
			let r = Tt(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: I(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (C(e)) {
				let r = Tt(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: I(t, r.index)
				} : void 0;
			}
			if (w(e)) {
				let r = String(n.value);
				return v(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!C(e)) return [];
			let r = S(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : L(n.start, r), o = n.end === null ? r : L(n.end, r)) : (a = n.start === null ? r - 1 : L(n.start, r), o = n.end === null ? -r - 1 : L(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: v(e, u) ? e[u] : void 0,
				paths: I(t, u)
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
					R(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": R(n, this.handleBracketExpressionContent(e, r));
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
						R(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						R(n, this.handleWildcard(a));
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
						if (!v(n, t)) continue;
						a = {
							value: n[t],
							paths: I(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!v(n, r)) continue;
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
			if (t.operator === "empty") return St(n);
			if (t.operator === "reg") return Ct(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = xt[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new $e(r.value) : new $e(D(r?.value) ? [r?.value] : []);
			}), i = st[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
							paths: I(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (w(n)) {
						let i = x(n);
						this.tick(i.length);
						for (let a of i) {
							if (!v(n, a)) continue;
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
				if (o === null) R(n, a);
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
				throw te(e) ? new m("Query is nested too deeply") : ne(e) ? new m("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Et, this.retainedLimit = this.adaptiveLimit ? Ot : Infinity;
	}
}, Pt = (e, t, n) => {
	let r = pe(t), i = new Nt(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? re(i) ? [] : [i.value] : i?.value;
}, Ft = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Pt(e, i, n);
		D(t) && r.push(t);
	}
	return r;
}, It = (e, t, n = {}) => {
	try {
		return C(t) ? Ft(e, t, n) : Pt(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, z = (e) => Array.isArray(e) ? e : [e], Lt = (e, t, n) => {
	e[t] = n;
}, Rt = {
	set: Lt,
	push: (e, t, n) => {
		e[t].push(...z(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...z(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(z(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(z(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, zt = (e) => typeof e == "object" && !!e && !Array.isArray(e), Bt = (e, t) => {
	if (!zt(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = B(t, i);
	return n;
}, Vt = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => B(t, e));
}, Ht = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ut = (e, t) => Ht(e, t), Wt = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Gt = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Kt = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Gt,
		applyTemplate: e
	});
}, B = (e, t, n) => {
	let r = e, i = t;
	Wt(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Ht(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ut(a?.textContent, r)), "attributes" in a && (a.attributes = Bt(a?.attributes, r)), "children" in a && (a.children = Vt(a?.children, r))), a);
};
Kt(B);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var qt = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Jt = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Yt = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Jt,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Xt = (e, t) => {
	let n = e, r = t;
	return qt(n, r), n.map((e) => B(e, r));
};
Yt((e, t) => {
	let n = e;
	return qt(n, t), n.map((e) => B(e, e[t]));
}, Xt);
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var Zt = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Zt(n, t);
		if (e) return e;
	}
	return null;
}, Qt = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = It(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Zt(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, $t = (e, t, n, r) => {
	let { parent: i, key: a } = Qt(e, t, r);
	return (Rt[t.action] || Lt)(i, a, n), e;
}, en = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = It(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, tn = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			$t(e, t, n, r);
		} catch {}
	}
}, nn = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), rn = (e, t) => {
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
}, an = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (rn(e, t), t.map((t) => {
	let i = B(t, r);
	return i.children = Xt(nn(e, t), n), i;
})), on = {
	applyTemplate: B,
	fromCollection: Xt
}, sn = (e, t, n) => {
	if (n == null) return structuredClone(t);
	let r = on[n];
	if (!r) throw Error(`Unknown function: ${n}`);
	return r(e, t);
}, cn = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => an({
	columns: e,
	data: t,
	columnSpec: n,
	rowSpec: r
}), ln = ({ columns: e = [], rows: t = [], columnSpec: n, rowSpec: r } = {}) => e.map((e) => {
	let i = B(e, n), a = [];
	return Array.isArray(e.options) && e.options.length > 0 ? a = e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : Array.isArray(t) && t.length > 0 && (a = t.map((t) => ({
		...t,
		rowValue: t[e.columnName] ?? t.value ?? t
	}))), i.children = a.map((e) => B(e, r)), i;
}), un = (e) => ({
	columns: e?.columns ?? [],
	rows: e?.data ?? (Array.isArray(e) ? e : e?.rows ?? [])
}), dn = {
	single: (e, n) => {
		let r = e.templateKey ? t[e.templateKey] : null;
		return sn(en(e.sourcePath, n), r, e.func);
	},
	rowOnColumn: (e, { data: n }) => {
		let { columns: r, rows: i } = un(n);
		return cn({
			columns: r,
			data: i,
			columnSpec: t[e.templateKey.columnKey],
			rowSpec: t[e.templateKey.rowKey]
		});
	},
	columnOnRow: (e, { data: n }) => {
		let { columns: r, rows: i } = un(n);
		return ln({
			columns: r,
			rows: i,
			columnSpec: t[e.templateKey.columnKey],
			rowSpec: t[e.templateKey.rowKey]
		});
	}
}, fn = (e, t, n) => {
	if (e.skipIf && It(t.base, e.skipIf, { returnArray: !0 }).length > 0) return null;
	let r = dn[e.type ?? "single"], i = r(e, t);
	return tn(t, e.destinationPath, i, n), i;
}, pn = (e, t, n = !1) => {
	if (!e) return null;
	if (Array.isArray(e)) return e.map((e) => pn(e, t, n));
	let r = i[e];
	return r ? Array.isArray(r) ? r.map((e) => fn(e, t, n)) : fn(r, t, n) : (n && console.warn(`Instruction not found: ${e}`), null);
}, mn = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	r && console.log(`[runStep] ${e}`), pn(e, {
		base: t,
		data: n
	}, r);
}), t);
export { mn as default, pn as executeStep };
