var DynamicEngine = function() {
	var configObj = $config();
	var config = new CompositeMap(configObj);
	var viewObj = CompositeUtil.findChild(configObj, 'view');
	var view = new CompositeMap(viewObj);
	var viewType = $ctx.parameter.view_type;
	var approveRecord = $ctx.parameter.approve_record;
	var viewRadioDsBmArray = [];
	if (approveRecord == 'Y') {
		viewType = 'VIEW';
	}
	var scriptLastObj = CompositeUtil.findChild(viewObj, 'script',
			'position_type', 'last');
	var scriptLastNode = null;
	if (!scriptLastObj) {
		scriptLastNode = view.createChildNS('script');
		scriptLastNode.position_type = 'last';
	} else {
		scriptLastNode = new CompositeMap(scriptLastObj);
	}

	var scriptFirstObj = CompositeUtil.findChild(viewObj, 'script',
			'position_type', 'first');
	var scriptFirstNode = null;
	if (!scriptFirstObj) {
		var viewChildList = viewObj.getChilds();
		scriptFirstNode = new CompositeMap('script');
		viewChildList.add(0, scriptFirstNode.getData());
		scriptFirstNode.position_type = 'first';
	} else {
		scriptFirstNode = new CompositeMap(scriptFirstObj);
	}

	// 输出友好的错误信息至页面
	var writeErrorMsg = function(errorMsg) {
		var node = CompositeUtil.findChild(configObj, 'view');
		node.getChildsNotNull().clear();
		div = node.createChild('div');
		div.put('style', 'font-size:16px;font-weight:bold;')
		div.setText(errorMsg);
	}

	// 处理布局组件的基础属性
	var dealLayoutBasic = function(layoutNode, layoutBasic) {
		// 设置宽度
		if (layoutBasic.width) {
			layoutNode.width = layoutBasic.width;
		}
		// 设置高度
		if (layoutBasic.height) {
			layoutNode.height = layoutBasic.height;
		}
		// 设置自适应宽度
		if (layoutBasic.marginwidth) {
			layoutNode.marginwidth = layoutBasic.marginwidth;
		}
		// 设置自适应高度
		if (layoutBasic.marginheight) {
			layoutNode.marginheight = layoutBasic.marginheight;
		}
		// 设置样式
		if (layoutBasic.style) {
			layoutNode.style = layoutBasic.style;
		}
	}

	// 处理Form类型的布局组件特殊属性
	var dealLayoutForm = function(layoutNode, layoutBasic) {
		$ctx.getObject('parameter').layout_id = layoutBasic.layout_id;
		var formResultMap = $bm('bpm.ENGINE.bpm_page_layout_form_query')
				.queryAsMap();
		var formAttArr = formResultMap.getChildren();
		if (formAttArr.length && (formAttArr.length == 1)) {
			var formAtt = formAttArr[0];
			// 设置form的描述
			if (formAtt.prompt) {
				layoutNode.prompt = formAtt.prompt;
			}
			// 设置form的title
			if (formAtt.title) {
				layoutNode.title = formAtt.title;
			}
			// 设置form的列数
			if (formAtt.column) {
				layoutNode.column = formAtt.column;
			}
			// 设置form的行数
			if (formAtt.row) {
				layoutNode.row = formAtt.row;
			}
			// 设置form的标签宽度
			if (formAtt.labelwidth) {
				layoutNode.labelwidth = formAtt.labelwidth;
			}
			// 设置form的标签分割符
			if (formAtt.labelseparator) {
				layoutNode.labelseparator = formAtt.labelseparator;
			}
		} else {
			throw new java.lang.Exception('布局组件代码为:' + layoutBasic.layout_code
					+ '的' + layoutBasic.layout_type + '类型的布局组件Form属性记录不存在！');
		}
	}

	// 处理Grid类型的布局组件特殊属性
	var dealLayoutGrid = function(layoutNode, layoutBasic) {
		$ctx.getObject('parameter').layout_id = layoutBasic.layout_id;
		var gridMap = $bm('bpm.ENGINE.bpm_page_layout_grid_query').queryAsMap();
		var gridAttArr = gridMap.getChildren();
		if (gridAttArr.length && (gridAttArr.length == 1)) {
			var gridAtt = gridAttArr[0];
			// 设置grid的是否有导航
			if (gridAtt.navbar) {
				layoutNode.navbar = gridAtt.navbar;
			}
		} else {
			throw new java.lang.Exception('布局组件代码为:' + layoutBasic.layout_code
					+ '的' + layoutBasic.layout_type + '类型的布局组件Grid属性记录不存在！');
		}
	}

	// 处理Tab类型的布局组件特殊属性
	var dealLayoutTab = function(layoutNode, layoutBasic) {
		$ctx.getObject('parameter').layout_id = layoutBasic.layout_id;
		var tabMap = $bm('bpm.ENGINE.bpm_page_layout_tab_query').queryAsMap();
		var tabAttArr = tabMap.getChildren();
		if (tabAttArr && (tabAttArr.length == 1)) {
			var tabAtt = tabAttArr[0];
			// 设置Tab的默认选中
			if (tabAtt.selected) {
				layoutNode.selected = tabAtt.selected;
			}
			// 设置Tab的可关闭
			if (tabAtt.closeable) {
				layoutNode.closeable = tabAtt.closeable;
			}
			// 设置Tab的是否可用
			if (tabAtt.disabled) {
				layoutNode.disabled = tabAtt.disabled;
			}
			// 设置Tab的引用页面
			if (tabAtt.ref) {
				layoutNode.ref = tabAtt.ref;
			}
			// 设置Tab的标签样式
			if (tabAtt.tabstyle) {
				layoutNode.tabstyle = tabAtt.tabstyle;
			}
			// 设置Tab的内部样式
			if (tabAtt.bodystyle) {
				layoutNode.bodystyle = tabAtt.bodystyle;
			}
		} else {
			throw new java.lang.Exception('布局组件代码为:' + layoutBasic.layout_code
					+ '的' + layoutBasic.layout_type + '类型的布局组件Tab属性记录不存在！');
		}
	}

	// 处理布局组件设置
	var dealLayout = function(layoutBasic) {
		if (layoutBasic.id) {
			// 布局组件属性设置
			var layoutNode = new CompositeMap(CompositeUtil.findChild(
					$config(), layoutBasic.layout_type, 'id', layoutBasic.id));
			if (layoutNode) {
				dealLayoutBasic(layoutNode, layoutBasic);
				if (layoutBasic.layout_type == 'form'
						|| layoutBasic.layout_type == 'fieldSet'
						|| layoutBasic.layout_type == 'box'
						|| layoutBasic.layout_type == 'vBox'
						|| layoutBasic.layout_type == 'hBox') {
					dealLayoutForm(layoutNode, layoutBasic);
				} else if (layoutBasic.layout_type == 'grid'
						|| layoutBasic.layout_type == 'table') {
					dealLayoutGrid(layoutNode, layoutBasic);
				} else if (layoutBasic.layout_type == 'tab') {
					dealLayoutTab(layoutNode, layoutBasic);
				} else {
					throw new java.lang.Exception('布局组件代码为:'
							+ layoutBasic.layout_code + '的'
							+ layoutBasic.layout_type + '类型的布局组件类型不在处理范围当中！');
				}
				if (!layoutBasic.hidden || layoutBasic.hidden != 'true') {
					// 处理布局组件下的所有标签
					dealTags(layoutBasic, layoutNode);
					// 处理布局组件下的所有按钮
					dealLayoutButtons(layoutBasic, layoutNode);
					// 处理布局组件下的所有事件
					dealLayoutEvents(layoutBasic, layoutNode);
				}
			} else {
				throw new java.lang.Exception('布局组件代码为:'
						+ layoutBasic.layout_code + '的'
						+ layoutBasic.layout_type + '类型的布局组件不存在!');
			}
		} else {
			throw new java.lang.Exception('布局代码为:' + layoutBasic.layout_code
					+ ',布局描述为:' + layoutBasic.layout_desc + '的布局组件ID未设置！');
		}
	}

	var dealLayoutsHidden = function() {
		// 查询当前page下的所有布局组件
		var layoutBasicMap = $bm('bpm.ENGINE.bpm_page_layout_basic_query')
				.queryAsMap();
		var layoutArr = layoutBasicMap.getChildren();
		if (!layoutArr || layoutArr.length == 0) {
			throw new java.lang.Exception('当前页面不存在布局组件！');
		}
		// 处理布局组件配置\布局组件下的标签配置\布局组件下的按钮配置\布局组件的事件配置\布局组件下标签的事件配置
		for ( var layoutIdx = 0; layoutIdx < layoutArr.length; layoutIdx++) {
			dealLayoutHidden(layoutArr[layoutIdx]);
		}
	}

	var dealLayoutHidden = function(layoutBasic) {
		var layoutNode = new CompositeMap(CompositeUtil.findChild($config(),
				layoutBasic.layout_type, 'id', layoutBasic.id));
		// 设置隐藏
		if (layoutBasic.hidden) {
			if (layoutBasic.hidden == 'true' || layoutBasic.hidden == 'Y') {
				layoutNode.hidden = 'true';
				layoutNode.getParent().removeChild(layoutNode);
				return;
			} else if (layoutBasic.hidden == 'false'
					|| layoutBasic.hidden == 'N') {
				layoutNode.hidden = 'false';
			}
		}
	}

	// 处理所有的布局组件
	var dealLayouts = function() {
		// 查询当前page下的所有布局组件
		var layoutBasicMap = $bm('bpm.ENGINE.bpm_page_layout_basic_query')
				.queryAsMap();
		var layoutArr = layoutBasicMap.getChildren();
		if (!layoutArr || layoutArr.length == 0) {
			throw new java.lang.Exception('当前页面不存在布局组件！');
		}
		// 处理布局组件配置\布局组件下的标签配置\布局组件下的按钮配置\布局组件的事件配置\布局组件下标签的事件配置
		for ( var layoutIdx = 0; layoutIdx < layoutArr.length; layoutIdx++) {
			dealLayout(layoutArr[layoutIdx]);
		}
	}

	// 标签的数据源属性设置
	var dealTagDsAtt = function(tagBasic, ds) {
		var fieldsObj = CompositeUtil.findChild(ds, 'fields');
		var fields = null;
		// 如果当前dataSet下不存在Fields标签，则新建
		if (!fieldsObj) {
			fields = new CompositeMap(ds).createChildNS('fields');
		} else {
			fields = new CompositeMap(fieldsObj);
		}
		var fieldObj = CompositeUtil.findChild(fieldsObj, 'field', 'name',
				tagBasic.name);
		var field = null;
		// 如果当前fields下不存在对应name的field，则新建
		if (!fieldObj) {
			field = fields.createChildNS('field');
		} else {
			field = new CompositeMap(fieldObj);
		}
		// 设置标签名称
		if (tagBasic.name) {
			field.name = tagBasic.name;
		}
		// 设置默认值
		if (tagBasic.defaultvalue) {
			field.defaultvalue = tagBasic.defaultvalue;
		}
		// 设置是否只读
		if (tagBasic.readonly) {
			field.readonly = tagBasic.readonly;
		}
		// 设置是否必输
		if (tagBasic.required) {
			field.required = tagBasic.required;
		}
		// 设置描述
		if (tagBasic.prompt) {
			field.prompt = tagBasic.prompt;
		}
		// 设置校验代码
		if (tagBasic.validator) {
			field.validator = tagBasic.validator;
		}
		// 设置必输提示信息
		if (tagBasic.requiredmessage) {
			field.requiredmessage = tagBasic.requiredmessage;
		}
		return field;
	}

	// 非模板标签处理
	var dealTagNoTplt = function(tagBasic, layoutBasic, layoutNode, ds, field) {
		// 如果当前标签类型为隐藏，则不创建相关标签
		if (tagBasic.tag_type == 'hidden') {
			return;
		} else {
			var tagObj = null;
			var tag = null;
			var tagId = layoutBasic.id + '_' + tagBasic.name + '_'
					+ tagBasic.tag_type;
			tagBasic.id = tagId;
			if (layoutBasic.layout_type == 'grid'
					|| layoutBasic.layout_type == 'table') {
				// Grid以及Table的属性设置
				colObj = CompositeUtil.findChild(layoutNode.getData(),
						'column', 'name', tagBasic.name);
				if (colObj) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下已经存在名称为:'
							+ tagBasic.name + '的列');
				} else {
					columnsObj = CompositeUtil.findChild(layoutNode.getData(),
							'columns');
					var columnNode = null;
					if (!columnsObj) {
						columnsNode = layoutNode.createChildNS('columns');
					} else {
						columnsNode = new CompositeMap(columnsObj);
					}
					editorsObj = CompositeUtil.findChild(layoutNode.getData(),
							'editors');
					if (!editorsObj) {
						editorsNode = layoutNode.createChildNS('editors');
					} else {
						editorsNode = new CompositeMap(editorsObj);
					}
					// 如果当前标签存在上级标签,说明是合并列,需要将当前标签创建到上级标签下,否则直接创建columns下
					if (tagBasic.parent_name) {
						parentColumnObj = CompositeUtil.findChild(columnsNode
								.getData(), 'column', 'name',
								tagBasic.parent_name);
						if (!parentColumnObj) {
							throw new java.lang.Exception('布局组件:'
									+ layoutBasic.layout_desc + '下名称为:'
									+ tagBasic.name + '的标签的父标签还未被创建，请检查标签顺序');
						} else {
							var parentColumnNode = new CompositeMap(
									parentColumnObj);
							columnNode = parentColumnNode
									.createChildNS('column');
						}
					} else {
						columnNode = columnsNode.createChildNS('column');
					}

					// 设置column的name属性
					if (tagBasic.name) {
						columnNode.name = tagBasic.name;
					}
					// 设置column的width属性
					if (tagBasic.width) {
						columnNode.width = tagBasic.width;
					}
					// 设置column的align属性
					if (tagBasic.align) {
						columnNode.align = tagBasic.align;
					}
					// 如果当前列可以维护，则设置column的编辑器
					if (tagBasic.readonly != 'true' && tagBasic.readonly != 'Y') {
						// 合并列不存在编辑器
						if (tagBasic.tag_type != 'merge_column') {
							columnNode.editor = tagId;
						}
					}
					// 设置column的editorfunction属性
					if (tagBasic.editorfunction
							&& (tagBasic.readonly != 'true' && tagBasic.readonly != 'Y')) {
						columnNode.editorfunction = tagBasic.editorfunction;
					}
					// 设置column的footerrenderer属性
					if (tagBasic.footerrenderer
							&& tagBasic.footerrenderer == 'Y'
							&& tagBasic.footerrenderer_js) {
						var footerRendererFunName = layoutBasic.id + '_'
								+ tagBasic.name + '_footerrenderer';
						var originalText = scriptFirstNode.getText();
						originalText = originalText ? originalText : '';
						scriptFirstNode.setText(originalText + '\n'
								+ 'function ' + footerRendererFunName
								+ '(_data,_name){' + tagBasic.footerrenderer_js
								+ '};\n');
						columnNode.footerrenderer = footerRendererFunName;
					}
					// 设置column的lock属性
					if (tagBasic.lock) {
						columnNode.lock = tagBasic.lock;
					}
					// 设置column的lock属性
					if (tagBasic.lock) {
						columnNode.lock = tagBasic.lock;
					}
					// 设置column的renderer属性
					if (tagBasic.renderer) {
						columnNode.renderer = tagBasic.renderer;
					}
					// 设置column的resizable属性
					if (tagBasic.resizable) {
						columnNode.resizable = tagBasic.resizable;
					}
					// 设置column的sortable属性
					if (tagBasic.sortable) {
						columnNode.sortable = tagBasic.sortable;
					}
					// 设置column的printable属性
					if (tagBasic.printable) {
						columnNode.printable = tagBasic.printable;
					}
					// 设置column的hidden属性
					// if (tagBasic.hidden) {
					// columnNode.hidden = tagBasic.hidden;
					// }
					// 如果当前列类型为merge_column，则不生成相应的编辑器，直接返回
					if (tagBasic.tag_type == 'merge_column') {
						columnNode.prompt = tagBasic.prompt;
						return;
					}
					tag = editorsNode.createChildNS(tagBasic.tag_type);
					// 所有的标签都不进行全角半角转换
					tag.transformCharacter = 'false';
					// 设置tag的ID属性
					tag.id = tagId;
				}
			} else {
				// Form类的属性设置
				tagObj = CompositeUtil.findChild(layoutNode.getData(),
						tagBasic.tag_type, 'name', tagBasic.name);
				if (tagObj) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下已经存在名称为:'
							+ tagBasic.name + '的标签');
				} else {
					tag = layoutNode.createChildNS(tagBasic.tag_type);
				}
				// 设置tag的ID属性
				tag.id = tagId;

				// 设置标签的name属性
				if (tagBasic.name) {
					tag.name = tagBasic.name;
				}
				// 设置标签的bindTarget属性
				if (tagBasic.bindtarget) {
					tag.bindtarget = tagBasic.bindtarget;
				}
				// 设置标签的width属性
				if (tagBasic.width) {
					tag.width = tagBasic.width;
				}
				// 设置标签的height属性
				if (tagBasic.height) {
					tag.height = tagBasic.height;
				}
				// 设置标签的style属性
				if (tagBasic.style) {
					tag.style = tagBasic.style;
				}
				// 设置标签的colspan属性
				if (tagBasic.colspan) {
					tag.colspan = tagBasic.colspan;
				}
				// 设置标签的rowspan属性
				if (tagBasic.rowspan) {
					tag.rowspan = tagBasic.rowspan;
				}
				// 设置标签的hidden属性
				if (tagBasic.hidden) {
					tag.hidden = tagBasic.hidden;
				}
				// 所有的标签都不进行全角半角转换
				tag.transformCharacter = 'false';
			}

			// 设置查询参数
			$ctx.getObject('parameter').tag_id = tagBasic.tag_id;
			if (tagBasic.tag_type == 'checkBox') {
				var checkBoxAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_checkbox_query').queryAsMap();
				var checkBoxAttArr = checkBoxAttMap.getChildren();
				if (!checkBoxAttArr || checkBoxAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var checkBoxAtt = checkBoxAttArr[0];
					// 设置checkBox的checkedvalue属性
					if (checkBoxAtt.checkedvalue) {
						field.checkedvalue = checkBoxAtt.checkedvalue;
					}
					// 设置checkBox的checkedvalue属性
					if (checkBoxAtt.uncheckedvalue) {
						field.uncheckedvalue = checkBoxAtt.uncheckedvalue;
					}
					// 设置checkBox的label属性
					if (checkBoxAtt.label) {
						tag.label = checkBoxAtt.label;
					}
				}
			} else if (tagBasic.tag_type == 'comboBox') {
				var comboBoxAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_combobox_query').queryAsMap();
				var comboBoxAttArr = comboBoxAttMap.getChildren();
				if (!comboBoxAttArr || comboBoxAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var comboBoxAtt = comboBoxAttArr[0];
					// 设置comboBox的options属性
					if (comboBoxAtt.options) {
						field.options = comboBoxAtt.options;
					}
					// 设置comboBox的displayfield属性
					if (comboBoxAtt.displayfield) {
						field.displayfield = comboBoxAtt.displayfield;
					}
					// 设置comboBox的valuefield属性
					if (comboBoxAtt.valuefield) {
						field.valuefield = comboBoxAtt.valuefield;
					}
					// 设置comboBox的returnfield属性
					if (comboBoxAtt.returnfield) {
						field.returnfield = comboBoxAtt.returnfield;
					}
					// 设置comboBox的options属性|syscode属性|sql属性，只能用一种
					var dss = CompositeUtil.findChild($config(), 'dataSets');
					if (comboBoxAtt.datasource == 'OPTIONS') {
						var optionsDs = CompositeUtil.findChild(dss, 'dataSet',
								'id', comboBoxAtt.options);
						if (optionsDs) {
							tag.options = comboBoxAtt.options;
						} else {
							var optionsDsId = layoutBasic.id + '_'
									+ tagBasic.name + '_sqltext_ds';
							var childList = dss.getChilds();
							var optionsDs = new CompositeMap('dataSet');
							optionsDs.getData().setPrefix(dss.getPrefix());
							optionsDs.getData().setNameSpaceURI(
									dss.getNamespaceURI());
							childList.add(0, optionsDs.getData());
							optionsDs.id = optionsDsId;
							field.options = optionsDsId;
							field.displayfield = 'label';
							field.valuefield = 'value';
							var comboBoxOptionsMap = $bm(
									'bpm.ENGINE.bpm_page_tags_combobox_options_query')
									.queryAsMap();
							var comboBoxOptionsArr = comboBoxOptionsMap
									.getChildren();
							if (comboBoxOptionsArr
									&& comboBoxOptionsArr.length != 0) {
								var datasNode = optionsDs
										.createChildNS('datas');
								for ( var optionsIdx = 0; optionsIdx < comboBoxOptionsArr.length; optionsIdx++) {
									var recordNode = datasNode
											.createChildNS('record');
									recordNode.label = comboBoxOptionsArr[optionsIdx].label;
									recordNode.value = comboBoxOptionsArr[optionsIdx].value;
								}
							}
						}
					} else if (comboBoxAtt.datasource == 'SYSCODE'
							&& comboBoxAtt.syscode) {
						var optionsDsId = layoutBasic.id + '_' + tagBasic.name
								+ '_syscode_' + comboBoxAtt.syscode + '_ds';
						var childList = dss.getChilds();
						var optionsDs = new CompositeMap('dataSet');
						optionsDs.getData().setPrefix(dss.getPrefix());
						optionsDs.getData().setNameSpaceURI(
								dss.getNamespaceURI());
						childList.add(0, optionsDs.getData());
						optionsDs.id = optionsDsId;
						optionsDs.lookupcode = comboBoxAtt.syscode;
						field.displayfield = 'code_value_name';
						field.valuefield = 'code_value';
						field.options = optionsDsId;
					} else if (comboBoxAtt.datasource == 'SQLTEXT'
							&& comboBoxAtt.sqltext) {
						var optionsDsId = layoutBasic.id + '_' + tagBasic.name
								+ '_sqltext_ds';
						var childList = dss.getChilds();
						var optionsDs = new CompositeMap('dataSet');
						optionsDs.getData().setPrefix(dss.getPrefix());
						optionsDs.getData().setNameSpaceURI(
								dss.getNamespaceURI());
						childList.add(0, optionsDs.getData());
						optionsDs.id = optionsDsId;
						optionsDs.queryurl = $ctx.getObject('request').context_path
								+ '/autocrud/bpm.ENGINE.bpm_engine_cobmobox_sqltext_query/query?tag_id='
								+ tagBasic.tag_id
						optionsDs.autoquery = 'true';
						optionsDs.fetchall = 'true';
						field.displayfield = comboBoxAtt.displayfield;
						field.valuefield = comboBoxAtt.valuefield;
						field.options = optionsDsId;
					}
					// 设置comboBox的mapping属性，options类型以及syscode类型不设置mapping
					if (comboBoxAtt.datasource != 'OPTIONS'
							&& comboBoxAtt.datasource != 'SYSCODE') {
						$ctx.parameter.tag_id = tagBasic.tag_id;
						var mapperMap = $bm(
								'bpm.ENGINE.bpm_page_tags_combobox_mapper_query')
								.queryAsMap();
						var mapperArr = mapperMap.getChildren();
						if (mapperArr
								&& mapperArr.length > 0
								&& (comboBoxAtt.returnfield || comboBoxAtt.valuefield)) {
							throw new java.lang.Exception(
									'布局组件:'
											+ layoutBasic.layout_desc
											+ '下名称为:'
											+ tagBasic.name
											+ '的'
											+ tagBasic.tag_type
											+ '类型的标签既存在returnField、valueField又存在mapper映射，存在冲突！');
						} else if (mapperArr.length > 0) {
							var mappingField = field.createChildNS('mapping');
							for ( var mapperIdx = 0; mapperIdx < mapperArr.length; mapperIdx++) {
								var mapField = mappingField
										.createChildNS('map');
								mapField.from = mapperArr[mapperIdx].from_field;
								mapField.to = mapperArr[mapperIdx].to_field;
							}
						}
					}
				}
			} else if (tagBasic.tag_type == 'datePicker') {
				var datePickerAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_datepicker_query')
						.queryAsMap();
				var datePickerAttArr = datePickerAttMap.getChildren();
				if (!datePickerAttArr || datePickerAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var datePickerAtt = datePickerAttArr[0];
					// 设置datePicker的dayrenderer属性
					if (datePickerAtt.dayrenderer) {
						field.dayrenderer = datePickerAtt.dayrenderer;
					}
					// 设置datePicker的enablebesidedays属性
					if (datePickerAtt.enablebesidedays) {
						field.enablebesidedays = datePickerAtt.enablebesidedays;
					}
					// 设置datePicker的enablemonthbtn属性
					/*
					 * if (datePickerAtt.enablemonthbtn) { tag.enablemonthbtn =
					 * datePickerAtt.enablemonthbtn; }
					 */
					// 设置datePicker的viewsize属性
					if (datePickerAtt.viewsize) {
						tag.viewsize = datePickerAtt.viewsize;
					}
					// 设置datePicker的renderer属性
					if (datePickerAtt.renderer) {
						tag.renderer = datePickerAtt.renderer;
					} else {
						tag.renderer = 'Aurora.formatDate';
						if (columnNode) {
							columnNode.renderer = 'Aurora.formatDate'
						}
					}
				}
			} else if (tagBasic.tag_type == 'dateTimePicker') {
				var datetimePickerAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_datetimepicker_query')
						.queryAsMap();
				var datetimePickerAttArr = datetimePickerAttMap.getChildren();
				if (!datetimePickerAttArr || datetimePickerAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var datetimePickerAtt = datetimePickerAttArr[0];
					// 设置datetimePicker的dayrenderer属性
					if (datetimePickerAtt.dayrenderer) {
						field.dayrenderer = datetimePickerAtt.dayrenderer;
					}
					// 设置datetimePicker的enablebesidedays属性
					if (datetimePickerAtt.enablebesidedays) {
						field.enablebesidedays = datetimePickerAtt.enablebesidedays;
					}
					// 设置datetimePicker的enablemonthbtn属性
					/*
					 * if (datetimePickerAtt.enablemonthbtn) {
					 * tag.enablemonthbtn = datetimePickerAtt.enablemonthbtn; }
					 */
					// 设置datetimePicker的viewsize属性
					if (datetimePickerAtt.viewsize) {
						tag.viewsize = datetimePickerAtt.viewsize;
					}
					// 设置datetimePicker的renderer属性
					if (datetimePickerAtt.renderer) {
						tag.renderer = datetimePickerAtt.renderer;
					} else {
						tag.renderer = 'Aurora.formatDateTime';
						if (columnNode) {
							columnNode.renderer = 'Aurora.formatDateTime'
						}
					}
					// 设置datetimePicker的hour属性
					if (datetimePickerAtt.hour) {
						tag.hour = datetimePickerAtt.hour;
					}
					// 设置datetimePicker的minute属性
					if (datetimePickerAtt.minute) {
						tag.minute = datetimePickerAtt.minute;
					}
					// 设置datetimePicker的second属性
					if (datetimePickerAtt.second) {
						tag.second = datetimePickerAtt.second;
					}
				}
			} else if (tagBasic.tag_type == 'label') {
				var labelAttMap = $bm('bpm.ENGINE.bpm_page_tags_label_query')
						.queryAsMap();
				var labelAttArr = labelAttMap.getChildren();
				if (!labelAttArr || labelAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var labelAtt = labelAttArr[0];
					// 设置label的renderer属性
					if (labelAtt.renderer) {
						tag.renderer = labelAtt.renderer;
					}
				}
			} else if (tagBasic.tag_type == 'lov') {
				var lovAttMap = $bm('bpm.ENGINE.bpm_page_tags_lov_query')
						.queryAsMap();
				var lovAttArr = lovAttMap.getChildren();
				if (!lovAttArr || lovAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var lovAtt = lovAttArr[0];
					// 设置lov的lovautoquery属性
					if (lovAtt.lovautoquery) {
						field.lovautoquery = lovAtt.lovautoquery;
					}
					// 设置lov的lovgridheight属性
					if (lovAtt.lovgridheight) {
						field.lovgridheight = lovAtt.lovgridheight;
					} else {
						field.lovgridheight = 320;
					}
					// 设置lov的lovheight属性
					if (lovAtt.lovheight) {
						field.lovheight = lovAtt.lovheight;
					} else {
						field.lovheight = 450;
					}
					// 设置lov的lovwidth属性
					if (lovAtt.lovwidth) {
						field.lovwidth = lovAtt.lovwidth;
					} else {
						field.lovwidth = 500;
					}
					// 设置lov的lovlabelwidth属性
					if (lovAtt.lovlabelwidth) {
						field.lovlabelwidth = lovAtt.lovlabelwidth;
					}
					// 设置lov的autocomplete属性
					if (lovAtt.autocomplete) {
						field.autocomplete = lovAtt.autocomplete;
					}
					// 设置lov的autocompletefield属性
					if (lovAtt.autocompletefield) {
						field.autocompletefield = lovAtt.autocompletefield;
					}
					// 设置lov的title属性
					if (lovAtt.title) {
						field.title = lovAtt.title;
					}
					// 设置lov的fetchRemote属性
					if (lovAtt.fetchremote) {
						field.fetchremote = lovAtt.fetchremote;
					} else {
						field.fetchremote = 'true';
					}
					// 设置lov的lovservice属性|lovurl属性|syscode属性|sqltext属性
					if (lovAtt.lovservice) {
						field.lovservice = lovAtt.lovservice;
					} else if (lovAtt.lovurl) {
						field.lovurl = lovAtt.lovurl;
					} else if (lovAtt.datasource == 'SYSCODE'
							&& datalovAtt.syscode) {
						field.lovservice = 'bpm.ENGINE.bpm_engine_lov_syscode_query?syscode='
								+ lovAtt.syscode;
					} else if (lovAtt.datasource == 'SQLTEXT' && lovAtt.sqltext) {
						field.lovurl = $ctx.getObject('request').context_path
								+ '/modules/bpm/ENGINE/bpm_lov_service.screen?tag_id='
								+ tagBasic.tag_id + '&lov_width='
								+ field.lovwidth + '&lov_height='
								+ field.lovheight + '&lov_grid_height='
								+ field.lovgridheight;
						field.lovservice = 'bpm.ENGINE.bpm_engine_lov_sqltext_query?tag_id='
								+ tagBasic.tag_id;
					}
					// 设置comboBox的mapping属性
					$ctx.parameter.tag_id = tagBasic.tag_id;
					var mapperMap = $bm(
							'bpm.ENGINE.bpm_page_tags_lov_mapper_query')
							.queryAsMap();
					var mapperArr = mapperMap.getChildren();
					if (!mapperArr || mapperArr.length == 0) {
						throw new java.lang.Exception('布局组件:'
								+ layoutBasic.layout_desc + '下名称为:'
								+ tagBasic.name + '的' + tagBasic.tag_type
								+ '类型的标签不存在mapping映射,请设置相应的mapping映射！');
					} else {
						var mappingField = field.createChildNS('mapping');
						for ( var mapperIdx = 0; mapperIdx < mapperArr.length; mapperIdx++) {
							var mapField = mappingField.createChildNS('map');
							mapField.from = mapperArr[mapperIdx].from_field;
							mapField.to = mapperArr[mapperIdx].to_field;
						}
					}
				}
			} else if (tagBasic.tag_type == 'numberField') {
				var numberFieldAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_numberfield_query')
						.queryAsMap();
				var numberFieldAttArr = numberFieldAttMap.getChildren();
				if (!numberFieldAttArr || numberFieldAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var numberFieldAtt = numberFieldAttArr[0];
					// 设置numberField的allowdecimals属性
					if (numberFieldAtt.allowdecimals) {
						tag.allowdecimals = numberFieldAtt.allowdecimals;
					}
					// 设置numberField的decimalprecision属性
					if (numberFieldAtt.decimalprecision) {
						tag.decimalprecision = numberFieldAtt.decimalprecision;
					}
					// 设置numberField的allownegative属性
					if (numberFieldAtt.allownegative) {
						tag.allownegative = numberFieldAtt.allownegative;
					}
					// 设置numberField的allowformat属性
					if (numberFieldAtt.allowformat) {
						tag.allowformat = numberFieldAtt.allowformat;
						if (numberFieldAtt.allowformat == 'true'
								&& (layoutBasic.layout_type == 'grid' || layoutBasic.layout_type == 'table')) {
							columnNode.renderer = 'Aurora.formatMoney';
						}
					}
				}
			} else if (tagBasic.tag_type == 'radio') {
				var radioAttMap = $bm('bpm.ENGINE.bpm_page_tags_radio_query')
						.queryAsMap();
				var radioAttArr = radioAttMap.getChildren();
				if (!radioAttArr || radioAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var radioAtt = radioAttArr[0];

					// 设置radio的valuefield属性
					if (radioAtt.valuefield) {
						field.valuefield = radioAtt.valuefield;
					}
					// 设置radio的labelexpression属性
					if (radioAtt.labelexpression) {
						tag.labelexpression = radioAtt.labelexpression;
					}
					// 设置radio的labelfield属性
					if (radioAtt.labelfield) {
						tag.labelfield = radioAtt.labelfield;
					}
					// 设置radio的layout属性
					if (radioAtt.layout) {
						tag.layout = radioAtt.layout;
					} else {
						tag.layout = 'horizontal';
					}
					// 设置radio的options属性|syscode属性|sqltext属性
					if (radioAtt.datasource == 'OPTIONS') {
						var radioOptionsMap = $bm(
								'bpm.ENGINE.bpm_page_tags_radio_options_query')
								.queryAsMap();
						var radioOptionsArr = radioOptionsMap.getChildren();
						if (radioOptionsArr && radioOptionsArr.length != 0) {
							var itemsNode = tag.createChildNS('items');
							for ( var optionsIdx = 0; optionsIdx < radioOptionsArr.length; optionsIdx++) {
								var itemNode = itemsNode.createChildNS('item');
								itemNode.label = radioOptionsArr[optionsIdx].label;
								itemNode.value = radioOptionsArr[optionsIdx].value;
							}
						} else {
							throw new java.lang.Exception('布局组件:'
									+ layoutBasic.layout_desc + '下名称为:'
									+ tagBasic.name + '的' + tagBasic.tag_type
									+ '类型的标签取值来源设置为OPTIONS，但是相关表没有值');
						}
					} else if (radioAtt.datasource == 'SYSCODE'
							&& radioAtt.syscode) {
						$ctx.parameter.syscode = radioAtt.syscode;
						var bm = new ModelService(
								'bpm.ENGINE.bpm_engine_radio_syscode_query');
						bm.fetchDescriptor = {
							fetchAll : 'true'
						};
						var rootPath = field.name + '_' + radioAtt.syscode;
						bm.option = {
							rootPath : rootPath
						};
						bm.query();
						tag.options = '/model/' + rootPath;
						tag.labelexpression = '${@code_value_name}';
						tag.valuefield = 'code_value';
						// 将该Radio的Options属性用到的BM存放到缓存中，缓存访问时执行该BM的Query方法
						viewRadioDsBmArray
								.push({
									bmName : 'bpm.ENGINE.bpm_engine_radio_syscode_query',
									fetchAll : 'true',
									rootPath : rootPath,
									syscode : radioAtt.syscode
								});
					} else if (radioAtt.datasource == 'SQLTEXT'
							&& radioAtt.sqltext) {
						throw new java.lang.Exception('布局组件:'
								+ layoutBasic.layout_desc + '下名称为:'
								+ tagBasic.name + '的' + tagBasic.tag_type
								+ '类型的标签存在SQLTEXT属性,目前该属性不被支持');
					}
				}
			} else if (tagBasic.tag_type == 'textField') {
				var textFieldAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_textfield_query')
						.queryAsMap();
				var textFieldAttArr = textFieldAttMap.getChildren();
				if (!textFieldAttArr || textFieldAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var textFieldAtt = textFieldAttArr[0];
					// 设置textField的typecase属性
					if (textFieldAtt.typecase) {
						field.typecase = textFieldAtt.typecase;
					}
				}
			} else if (tagBasic.tag_type == 'tree') {
				var treeAttMap = $bm('bpm.ENGINE.bpm_page_tags_tree_query')
						.queryAsMap();
				var treeAttArr = treeAttMap.getChildren();
				if (!treeAttArr || treeAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var treeAtt = treeAttArr[0];
					// 设置tree的showcheckbox属性
					if (treeAtt.showcheckbox) {
						tag.showcheckbox = treeAtt.showcheckbox;
					}
					var treeAtt = treeAttArr[0];
					// 设置tree的displayfield属性
					if (treeAtt.displayfield) {
						tag.displayfield = treeAtt.displayfield;
					}
					var treeAtt = treeAttArr[0];
					// 设置tree的idfield属性
					if (treeAtt.idfield) {
						tag.idfield = treeAtt.idfield;
					}
					var treeAtt = treeAttArr[0];
					// 设置tree的parentfield属性
					if (treeAtt.parentfield) {
						tag.parentfield = treeAtt.parentfield;
					}
					var treeAtt = treeAttArr[0];
					// 设置tree的sequencefield属性
					if (treeAtt.sequencefield) {
						tag.sequencefield = treeAtt.sequencefield;
					}
					var treeAtt = treeAttArr[0];
					// 设置tree的renderer属性
					if (treeAtt.renderer) {
						tag.renderer = treeAtt.renderer;
					}
				}
			} else if (tagBasic.tag_type == 'treeGrid') {
				var treeGridAttMap = $bm(
						'bpm.ENGINE.bpm_page_tags_treegrid_query').queryAsMap();
				var treeGridAttArr = treeGridAttMap.getChildren();
				if (!treeGridAttArr || treeGridAttArr.length == 0) {
					throw new java.lang.Exception('布局组件:'
							+ layoutBasic.layout_desc + '下名称为:' + tagBasic.name
							+ '的' + tagBasic.tag_type + '类型的标签不存在相应的'
							+ tagBasic.tag_type + '属性');
				} else {
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的showcheckbox属性
					if (treeGridAtt.showcheckbox) {
						tag.showcheckbox = treeGridAtt.showcheckbox;
					}
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的displayfield属性
					if (treeGridAtt.displayfield) {
						tag.displayfield = treeGridAtt.displayfield;
					}
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的idfield属性
					if (treeGridAtt.idfield) {
						tag.idfield = treeGridAtt.idfield;
					}
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的parentfield属性
					if (treeGridAtt.parentfield) {
						tag.parentfield = treeGridAtt.parentfield;
					}
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的sequencefield属性
					if (treeGridAtt.sequencefield) {
						tag.sequencefield = treeGridAtt.sequencefield;
					}
					var treeGridAtt = treeGridAttArr[0];
					// 设置treeGrid的renderer属性
					if (treeGridAtt.renderer) {
						tag.renderer = treeGridAtt.renderer;
					}
				}
			}
		}
	}

	// 表单类型的模板标签处理
	var dealGridTagTplt = function(tagBasic, layoutBasic, layoutNode, ds, field) {
		if (tagBasic.readonly
				&& (tagBasic.readonly == 'Y' || tagBasic.readonly == 'true')) {
			// 修改模板标签为只读类型时的editor和editorFun
			var layoutObj = CompositeUtil.findChild($config(),
					layoutBasic.layout_type, 'id', layoutBasic.id);
			var columnsObj = CompositeUtil.findChild(layoutObj, 'columns');
			if (!columnsObj) {
				return;
			} else {
				var column = CompositeUtil.findChild(columnsObj, 'column',
						'name', tagBasic.name);
				if (column) {
					if (tagBasic.readonly
							&& (tagBasic.readonly == 'Y' || tagBasic.readonly == 'true')) {
						column.remove('editor');
						column.remove('editorfunction');
					} else if (tagBasic.readonly
							&& (tagBasic.readonly == 'Y' || tagBasic.readonly == 'true')) {
						return;
					}
				} else {
					return;
				}
			}
		}
	}

	// 处理标签设置
	var dealTag = function(tagBasic, layoutBasic, layoutNode) {
		var ds = CompositeUtil.findChild($config(), 'dataSet', 'id',
				tagBasic.bindtarget);
		if (!ds) {
			// 如果标签上设置的数据源不存在，抛出异常进行提示
			throw new java.lang.Exception('布局组件：' + layoutBasic.layout_desc
					+ '下的标签：' + tagBasic.tag_desc + '对应的DataSet：'
					+ tagBasic.bindtarget + '不存在');
		} else {
			var field = dealTagDsAtt(tagBasic, ds);
			if (tagBasic.template_flag == 'Y') {
				// 处理模板带出的标签
				if (!tagBasic.id && layoutBasic.layout_type != 'grid'
						&& layoutBasic.layout_type != 'table') {
					// 如果当前标签的ID未设置，抛出异常进行提示
					throw new java.lang.Exception('布局组件：'
							+ layoutBasic.layout_desc + '下的标签：'
							+ tagBasic.tag_desc + '对应的Id属性为空');
				} else if (layoutBasic.layout_type != 'grid'
						&& layoutBasic.layout_type != 'table') {
					var tag = CompositeUtil.findChild($config(),
							tagBasic.tag_type, 'id', tagBasic.id);
					if (!tag) {
						// 如果ID对应的标签不存在，抛出异常进行提示
						throw new java.lang.Exception('布局组件：'
								+ layoutBasic.layout_desc + '下的标签：'
								+ tagBasic.tag_desc + '的Id:' + tagBasic.id
								+ '标签不存在');
					}
				} else {
					dealGridTagTplt(tagBasic, layoutBasic, layoutNode, ds,
							field)
				}
			} else if (tagBasic.template_flag == 'N') {
				// 处理配置进来的标签
				dealTagNoTplt(tagBasic, layoutBasic, layoutNode, ds, field);
			}
			dealTagEvents(tagBasic, layoutBasic);
		}
	}

	// 处理标签下的所有事件
	var dealTagEvents = function(tagBasic, layoutBasic) {
		$ctx.parameter.tag_id = tagBasic.tag_id;
		var tagEventsMap = $bm('bpm.ENGINE.bpm_page_tag_events_query')
				.queryAsMap();
		var tagEventsArr = tagEventsMap.getChildren();
		if (tagEventsArr && tagEventsArr.length != 0) {
			for ( var eventIdx = 0; eventIdx < tagEventsArr.length; eventIdx++) {
				var tagEventAtt = tagEventsArr[eventIdx];
				if (tagEventAtt.event_target == 'DATASET') {
					// 设置数据源上的事件
					var dsObj = CompositeUtil.findChild(viewObj, 'dataSet',
							'id', tagBasic.bindtarget);
					if (!dsObj) {
						throw new java.lang.Exception('标签:' + tagBasic.tag_desc
								+ '设置的bindtarget:' + tagBasic.bindtarget
								+ '不存在');
					} else {
						var originalText = scriptLastNode.getText();
						originalText = originalText ? originalText : '';
						scriptLastNode
								.setText(originalText + '\n' + '$(\''
										+ tagBasic.bindtarget + '\').on(\''
										+ tagEventsArr[eventIdx].event_type
										+ '\','
										+ tagEventsArr[eventIdx].event_handler
										+ ');\n');
					}
				} else if (tagEventAtt.event_target == 'TAG'
						&& (layoutBasic.layout_type != 'grid' || layoutBasic.layout_type != 'table')) {
					// 如果当前布局组件不为grid和table的时候，tag属性可以设置，grid和table上的tag的
					var originalText = scriptLastNode.getText();
					originalText = originalText ? originalText : '';
					scriptLastNode.setText(originalText + '\n' + '$(\''
							+ tagBasic.id + '\').on(\''
							+ tagEventsArr[eventIdx].event_type + '\','
							+ tagEventsArr[eventIdx].event_handler + ');\n');
				}
			}
		}
	}

	// 处理布局组件下的所有标签
	var dealTags = function(layoutBasic, layoutNode) {
		// 处理布局组件下的标签属性
		$ctx.getObject('parameter').layout_id = layoutBasic.layout_id;
		var tagBasicMap = $bm('bpm.ENGINE.bpm_page_tags_basic_query')
				.queryAsMap();
		var tagArr = tagBasicMap.getChildren();
		for ( var tagIdx = 0; tagIdx < tagArr.length; tagIdx++) {
			dealTag(tagArr[tagIdx], layoutBasic, layoutNode);
		}
	}

	var dealLayoutBtn = function(layoutBtnAtt, layoutBasic, layoutNode) {
		if (layoutBasic.layout_type == 'grid'
				|| layoutBasic.layout_type == 'table') {
			if (layoutBtnAtt.template_flag == 'Y') {
				var buttonObj = CompositeUtil.findChild(layoutNode.getData(),
						'button', 'id', layoutBtnAtt.id);

				if (!buttonObj) {
					throw new java.lang.Exception('模板类型的布局组件按钮,ID为:'
							+ layoutBtnAtt.id + '在模板页面中不存在');
				} else {
					var button = new CompositeMap(buttonObj);
					if (layoutBtnAtt.operation_type == 'OPERATION'
							&& viewType == 'VIEW') {
						layoutBtnAtt.disabled = 'true';
						layoutBtnAtt.hidden = 'true';
					}
					// 设置按钮的text属性
					if (layoutBtnAtt.text) {
						button.text = layoutBtnAtt.text;
					}
					// 设置按钮的click属性
					if (layoutBtnAtt.click) {
						button.click = layoutBtnAtt.click;
					}
					// 设置按钮的type属性
					if (layoutBtnAtt.type) {
						button.type = layoutBtnAtt.type;
					}
					// 设置按钮的width属性
					if (layoutBtnAtt.width) {
						button.width = layoutBtnAtt.width;
					}
					// 设置按钮的height属性
					if (layoutBtnAtt.height) {
						button.height = layoutBtnAtt.height;
					}
					// 设置按钮的icon属性
					if (layoutBtnAtt.icon) {
						button.icon = layoutBtnAtt.icon;
					}
					// 设置按钮的disabled属性
					if (layoutBtnAtt.disabled) {
						button.disabled = layoutBtnAtt.disabled;
					}
					// 设置按钮的hidden属性
					if (layoutBtnAtt.hidden) {
						button.hidden = layoutBtnAtt.hidden;
					}
				}
			} else if (layoutBtnAtt.template_flag == 'N') {
				// 页面上的非模板类型的按钮，支持新建
				var buttonObj = CompositeUtil.findChild(layoutNode.getData(),
						'button', 'id', layoutBtnAtt.id);
				if (buttonObj) {
					throw new java.lang.Exception('模板类型的布局组件按钮,ID为:'
							+ layoutBtnAtt.id + '在模板页面中已经存在');
				} else {
					var toolBarObj = CompositeUtil.findChild(layoutNode
							.getData(), 'toolBar');
					var toolBar = null;
					if (toolBarObj) {
						toolBar = new CompositeMap(toolBarObj);
					} else {
						toolBar = layoutNode.createChildNS('toolBar');
					}
					if (layoutBtnAtt.operation_type == 'OPERATION'
							&& viewType == 'VIEW') {
						layoutBtnAtt.disabled = 'true';
						layoutBtnAtt.hidden = 'true';
					}
					var button = toolBar.createChildNS('button');
					// 设置按钮的text属性
					if (layoutBtnAtt.text) {
						button.text = layoutBtnAtt.text;
					}
					// 设置按钮的click属性
					if (layoutBtnAtt.click) {
						button.click = layoutBtnAtt.click;
					}
					// 设置按钮的type属性
					if (layoutBtnAtt.type) {
						button.type = layoutBtnAtt.type;
					}
					// 设置按钮的width属性
					if (layoutBtnAtt.width) {
						button.width = layoutBtnAtt.width;
					}
					// 设置按钮的height属性
					if (layoutBtnAtt.height) {
						button.height = layoutBtnAtt.height;
					}
					// 设置按钮的icon属性
					if (layoutBtnAtt.icon) {
						button.icon = layoutBtnAtt.icon;
					}
					// 设置按钮的disabled属性
					if (layoutBtnAtt.disabled) {
						button.disabled = layoutBtnAtt.disabled;
					}
					// 设置按钮的hidden属性
					if (layoutBtnAtt.hidden) {
						button.hidden = layoutBtnAtt.hidden;
					}
				}
			}
		} else {
			throw new java.lang.Exception('目前只支持Grid和Table类型布局组件下的按钮配置，布局组件:'
					+ layoutBasic.layout_desc + '的类型为:'
					+ layoutBasic.layout_type);
		}
	}

	// 处理布局组件下的所有按钮
	var dealLayoutButtons = function(layoutBasic, layoutNode) {
		var layoutBtnMap = $bm('bpm.ENGINE.bpm_page_layout_buttons_query')
				.queryAsMap();
		var layoutBtnArr = layoutBtnMap.getChildren();
		for ( var btnIdx = 0; btnIdx < layoutBtnArr.length; btnIdx++) {
			dealLayoutBtn(layoutBtnArr[btnIdx], layoutBasic, layoutNode);
		}
	}

	// 处理布局组件下的所有事件
	var dealLayoutEvents = function(layoutBasic, layoutNode) {
		var layoutEventsMap = $bm('bpm.ENGINE.bpm_page_layout_events_query')
				.queryAsMap();
		var layoutEventsArr = layoutEventsMap.getChildren();
		if (layoutEventsArr && layoutEventsArr.length != 0) {
			for ( var eventIdx = 0; eventIdx < layoutEventsArr.length; eventIdx++) {
				var layoutEventAtt = layoutEventsArr[eventIdx];
				if (layoutEventAtt.event_target == 'DATASET') {
					var dsObj = CompositeUtil.findChild(viewObj, 'dataSet',
							'id', layoutBasic.dataset);
					if (!dsObj) {
						throw new java.lang.Exception('布局组件:'
								+ layoutBasic.layout_desc + '设置的dataset:'
								+ layoutBasic.dataset + '不存在');
					} else {
						var originalText = scriptLastNode.getText();
						originalText = originalText ? originalText : '';
						scriptLastNode.setText(originalText + '\n' + '$(\''
								+ layoutBasic.dataset + '\').on(\''
								+ layoutEventAtt.event_type + '\','
								+ layoutEventAtt.event_handler + ')\n');
					}
				} else if (layoutEventAtt.event_target == 'LAYOUT') {
					var originalText = scriptLastNode.getText();
					originalText = originalText ? originalText : '';
					scriptLastNode.setText(originalText + '\n' + '$(\''
							+ layoutNode.id + '\').on(\''
							+ layoutEventAtt.event_type + '\','
							+ layoutEventAtt.event_handler + ');\n');
				}
			}
		}
	}

	// 处理页面的所有按钮
	var dealPageButtons = function() {
		// 查询当前page下的所有按钮
		var pageBtnMap = $bm('bpm.ENGINE.bpm_page_buttons_query').queryAsMap();
		var pageBtnArr = pageBtnMap.getChildren();
		if (pageBtnArr && pageBtnArr.length > 0) {
			for ( var pageBtnIdx = 0; pageBtnIdx < pageBtnArr.length; pageBtnIdx++) {
				dealPageButton(pageBtnArr[pageBtnIdx]);
			}
		}
	}

	// 处理页面按钮
	var dealPageButton = function(pageBtnAtt) {
		if (pageBtnAtt.template_flag == 'Y') {
			var buttonObj = CompositeUtil.findChild($config(), 'button', 'id',
					pageBtnAtt.id);
			if (!buttonObj) {
				throw new java.lang.Exception('模板类型的页面按钮,ID为:' + pageBtnAtt.id
						+ '在模板页面中不存在');
			} else {
				var button = new CompositeMap(buttonObj);
				if (pageBtnAtt.operation_type == 'OPERATION'
						&& viewType == 'VIEW') {
					pageBtnAtt.disabled = 'true';
					pageBtnAtt.hidden = 'true';
				}
				// 设置按钮的text属性
				if (pageBtnAtt.text) {
					button.text = pageBtnAtt.text;
				}
				// 设置按钮的click属性
				if (pageBtnAtt.click) {
					button.click = pageBtnAtt.click;
				}
				// 设置按钮的type属性
				if (pageBtnAtt.type) {
					button.type = pageBtnAtt.type;
				}
				// 设置按钮的width属性
				if (pageBtnAtt.width) {
					button.width = pageBtnAtt.width;
				}
				// 设置按钮的height属性
				if (pageBtnAtt.height) {
					button.height = pageBtnAtt.height;
				}
				// 设置按钮的icon属性
				if (pageBtnAtt.icon) {
					button.icon = pageBtnAtt.icon;
				}
				// 设置按钮的disabled属性
				if (pageBtnAtt.disabled) {
					button.disabled = pageBtnAtt.disabled;
				}
				// 设置按钮的hidden属性
				if (pageBtnAtt.hidden) {
					button.hidden = pageBtnAtt.hidden;
				}
			}
		} else if (pageBtnAtt.template_flag == 'N') {
			// 页面上的非模板类型的按钮，目前不支持新建
			return;
		}
	}

	// 处理页面的所有事件
	var dealPageEvents = function() {
		// 页面事件
		var pageEventsMap = $bm('bpm.ENGINE.bpm_page_events_query')
				.queryAsMap();
		var pageEventsArr = pageEventsMap.getChildren();
		if (pageEventsArr && pageEventsArr.length) {
			for ( var eventIdx = 0; eventIdx < pageEventsArr.length; eventIdx++) {
				var pageEventAtt = pageEventsArr[eventIdx];
				if (pageEventAtt.event_target = 'page') {
					if (pageEventAtt.event_type == 'init') {
						var originalText = scriptLastNode.getText();
						originalText = originalText ? originalText : '';
						scriptLastNode.setText(originalText + '\n'
								+ 'Aurora.onReady('
								+ pageEventAtt.event_handler + ');\n');
					}
				}
			}
		}
	}

	// 增加单据页面的工作流审批展示
	var dealWflAppHis = function() {
		var screenBody = new CompositeMap(CompositeUtil.findChild($config(),
				'screenBody'));
		var wflAppHisDs = screenBody.createChildNS("dataSet");
		wflAppHisDs.id = "bpm_oa_wfl_app_his_ds";
		wflAppHisDs.autoquery = "true";
		wflAppHisDs.model = "bpm.ENGINE.bpm_oa_wfl_app_his";
		wflAppHisDs.queryurl = $ctx.getObject('request').context_path
				+ '/autocrud/'
				+ 'bpm.ENGINE.bpm_oa_wfl_app_his/query?oa_flow_doc_header_id='
				+ $ctx.getObject('parameter').oa_flow_doc_header_id;
		var wflAppHisGrid = screenBody.createChildNS("grid");
		wflAppHisGrid.bindtarget = "bpm_oa_wfl_app_his_ds";
		wflAppHisGrid.id = "bpm_oa_wfl_app_his_grid";
		wflAppHisGrid.marginwidth = "32";
		wflAppHisGrid.height = "300";
		wflAppHisGrid.navbar = "true";
		var wflAppHisCols = wflAppHisGrid.createChildNS("columns");
		var appDateCol = wflAppHisCols.createChildNS("column");
		appDateCol.name = "creation_date";
		appDateCol.prompt = "WFL_WORKFLOW_APPROVE_RECORD.APPROVE_DATE";
		appDateCol.renderer = "Aurora.formatDate";
		appDateCol.align = "center";
		appDateCol.width = "150";
		var nodeNameCol = wflAppHisCols.createChildNS("column");
		nodeNameCol.name = "node_name";
		nodeNameCol.prompt = "WFL_WORKFLOW_APPROVE_RECORD.APPROVE_NODE";
		nodeNameCol.align = "center";
		nodeNameCol.width = "150";
		var userNameCol = wflAppHisCols.createChildNS("column");
		userNameCol.name = "user_name";
		userNameCol.prompt = "WFL_WORKFLOW_APPROVE_RECORD.APPROVER_NAME";
		userNameCol.align = "center";
		userNameCol.width = "150";
		var actionTitleCol = wflAppHisCols.createChildNS("column");
		actionTitleCol.name = "action_title";
		actionTitleCol.prompt = "WFL_WORKFLOW_APPROVAL.ACTION";
		actionTitleCol.align = "center";
		actionTitleCol.width = "150";
		var commentTextCol = wflAppHisCols.createChildNS("column");
		commentTextCol.name = "comment_text";
		commentTextCol.prompt = "WFL_WORKFLOW_APPROVE_RECORD.APPROVER_MEMO";
		commentTextCol.align = "left";
		commentTextCol.width = "400";
	}

	return {
		rendererPage : function() {
			try {
				// 刷新缓存标志
				var refreshCacheFlag = $ctx.parameter.refresh_cache;

				var pageId = $ctx.getObject('parameter').page_id;
				if (!pageId) {
					throw new java.lang.Exception('当前页面传入的PageId为空！');
				}
				// 缓存键，采用dynamic_page_页面ID格式组成
				var viewCacheKey = 'dynamic_page_' + pageId + '_' + viewType;
				var dynamicCache = $cache('DynamicPageCache');
				// 如果当前刷新缓存标志位Y，则刷新缓存
				if (refreshCacheFlag && refreshCacheFlag == 'Y') {
					// 设置查询条件page_id
					$ctx.getObject('parameter').page_id = pageId;
					// 处理所有的布局组建
					dealLayouts();
					// 处理所有的页面按钮
					dealPageButtons();
					// 处理所有的页面事件
					dealPageEvents();
					// 处理布局组件的隐藏
					dealLayoutsHidden();
					// 如果view节点不为null，则缓存当前view至缓存中
					viewObj = CompositeUtil.findChild($config(), 'view');
					radioDsBmArray = [];
					for ( var i = 0; i < viewRadioDsBmArray.length; i++) {
						var bmConfig = {
							bmName : viewRadioDsBmArray[i]['bmName'],
							fetchAll : viewRadioDsBmArray[i]['fetchAll'],
							rootPath : viewRadioDsBmArray[i]['rootPath'],
							syscode : viewRadioDsBmArray[i]['syscode']
						};
						radioDsBmArray.push(bmConfig);
					}
					viewObj.put('radioDsBmArray',radioDsBmArray);
					if (viewObj) {
						dynamicCache.setValue(viewCacheKey, viewObj.clone());
					}
					// 增加审批记录的查询
					if (approveRecord == 'Y') {
						dealWflAppHis();
					}
				} else {
					// 根据缓存键获取缓存的view
					var viewCacheValue = dynamicCache.getValue(viewCacheKey);
					// 如果当前缓存内容为空，则重新生成
					if (!viewCacheValue) {
						// 设置查询条件page_id
						$ctx.getObject('parameter').page_id = pageId;
						// 处理所有的布局组建
						dealLayouts();
						// 处理所有的页面按钮
						dealPageButtons();
						// 处理所有的页面事件
						dealPageEvents();
						// 处理布局组件的隐藏
						dealLayoutsHidden();
						// 如果view节点不为null，则缓存当前view至缓存中
						viewObj = CompositeUtil.findChild($config(), 'view');
						radioDsBmArray = [];
						for ( var i = 0; i < viewRadioDsBmArray.length; i++) {
							var bmConfig = {
								bmName : viewRadioDsBmArray[i]['bmName'],
								fetchAll : viewRadioDsBmArray[i]['fetchAll'],
								rootPath : viewRadioDsBmArray[i]['rootPath'],
								syscode : viewRadioDsBmArray[i]['syscode']
							};
							radioDsBmArray.push(bmConfig);
						}
						viewObj.put('radioDsBmArray',radioDsBmArray);
						if (viewObj) {
							dynamicCache
									.setValue(viewCacheKey, viewObj.clone());
						}
						// 增加审批记录的查询
						if (approveRecord == 'Y') {
							dealWflAppHis();
						}
					} else {
						// 如果缓存内容不为空，则取缓存的view节点
						config.removeChild(view);
						var viewObj = new CompositeMap(viewCacheValue.clone());
						config.addChild(viewObj);
						var radioDsBmArray = viewObj.radioDsBmArray;
						if (radioDsBmArray) {
							for ( var i = 0; i < radioDsBmArray.length; i++) {
								var bmConfig = radioDsBmArray[i];
								$ctx.parameter.syscode = bmConfig.syscode;
								var bm = new ModelService(bmConfig.bmName);
								bm.fetchDescriptor = bmConfig;
								bm.option = bmConfig;
								bm.query();
							}
						}
						// 增加审批记录的查询
						if (approveRecord == 'Y') {
							dealWflAppHis();
						}
					}
				}
				//println(config.toXML());
			} catch (e) {
				writeErrorMsg(e.message);
			}
		}
	}
}();
// 处理逻辑调用
DynamicEngine.rendererPage();
