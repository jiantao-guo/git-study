//列合计模板代码
function (_data, _name) {
	var _sum = 0;
	for (var _i = 0; _i < _data.length; _i++) {
		var _r = _data[_i];
		var _d = _r.get(_name);
		var _n = parseFloat(_d);
		if (!isNaN(_n)) {
			_sum += _n;
		}
	}
	var _total = (typeof(_sum) == 'undefined' ? '' : Aurora.formatMoney(_sum));
	return _total;
}

/**
 *Update事件触发的JS代码
 *
 **/
// 修改其他列只读
function (_dataSet, _record, _name, _value, _oldValue) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition + "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		if (_name == '${@fieldName}') {
			var _targetFieldName = '${@targetFieldName}';
			var _readOnlyValue = '${@readOnlyFlag}';
			if (_readOnlyValue == 'EDITABLE') {
				var _targetField = _record.getMeta().getField(_targetFieldName);
				_targetField.setReadOnly(false);
			} else if (_readOnlyValue == 'READONLY') {
				var _targetField = _record.getMeta().getField(_targetFieldName);
				_targetField.setReadOnly(true);
			}
		}
	}
}
// 修改其他列必输
function (_dataSet, _record, _name, _value, _oldValue) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		if (_name == '${@fieldName}') {
			var _targetFieldName = '${@targetFieldName}';
			var _requiredValue = '${@requiredFlag}';
			if (_requiredValue == 'REQUIRED') {
				var _targetField = _record.getMeta().getField(_targetFieldName);
				_targetField.setRequired(true);
			} else if (_requiredValue == 'UNREQUIRED') {
				var _targetField = _record.getMeta().getField(_targetFieldName);
				_targetField.setRequired(false);
			}
		}
	}
}
// 修改其他列清空
function (_dataSet, _record, _name, _value, _oldValue) {
	var targetDs = '${@targetDs}';
	var sourceDs = '${@sourceDs}';
	if(targetDs == sourceDs){
		var _triggerCondition = '${@triggerCondition}';
		var _conditionValue = '${@conditionValue}';
		if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
			if (_name == '${@fieldName}') {
				var _targetFieldName = '${@targetFieldName}';
				var _clearFlag = '${@clearFlag}';
				if (_clearFlag == 'CLEAR') {
					_record.set(_targetFieldName, '');
				}
			}
		}
	}else{
		var _triggerCondition = '${@triggerCondition}';
		var _conditionValue = '${@conditionValue}';
		if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
			if (_name == '${@fieldName}') {
				var _targetFieldName = '${@targetFieldName}';
				var _clearFlag = '${@clearFlag}';
				if (_clearFlag == 'CLEAR') {
					var clearDs = $(targetDs);
					for(var i = 0; i < clearDs.getAll().length; i ++){
						clearDs.getAt(i).set(_targetFieldName,'');
					}
				}
			}
		}
	}
}
// 修改其他组件隐藏
function (_dataSet, _record, _name, _value, _oldValue) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		var _targetLayoutId = '${@targetLayoutId}';
		var _targetLayoutType = '${@targetLayoutType}';
		var _targetTagId = '${@targetTagId}';
		var _hidden_flag = '${@hidden_flag}';
		if (_name == '${@fieldName}') {
			if (_hidden_flag == 'HIDE') {
				if (_hidden_flag) {
					if (_targetLayoutId && _targetTagId && (_targetLayoutType != 'grid' && _targetLayoutType != 'table')) {
						$(_targetTagId).hide();
					} else if (_targetLayoutId && !_targetTagId) {
						if (_targetLayoutType == 'grid' || _targetLayoutType == 'table' || _targetLayoutType == 'tab') {
							$(_targetLayoutId).hide();
						} else {
							Ext.fly(_targetLayoutId).hide();
						}
					}
				}
			} else if (_hidden_flag == 'SHOW') {
				if (_hidden_flag) {
					if (_targetLayoutId && _targetTagId && (_targetLayoutType != 'grid' && _targetLayoutType != 'table')) {
						$(_targetTagId).show();
					} else if (_targetLayoutId && !_targetTagId) {
						if (_targetLayoutType == 'grid' || _targetLayoutType == 'table' || _targetLayoutType == 'tab') {
							$(_targetLayoutId).show();
						} else {
							Ext.fly(_targetLayoutId).show();
						}
					}
				}
			}
		}
	}
}
// 修改其他LOV查询参数
function (_dataSet, _record, _name, _value, _oldValue) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		if (_name == '${@fieldName}') {
			var _targetFieldName = '${@targetFieldName}';
			var _filterName = '${@filterName}';
			if (_filterName) {
				if('${@targetTagType}' == 'lov'){
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setLovPara(_filterName, _value);
				}else if('${@targetTagType}' == 'comboBox'){
					$('${@targetDS}').setQueryParameter(_filterName,_value);
					$('${@targetDS}').query();
				}
			}
		}
	}
}
//隐藏\显示Grid的列
function (_dataSet, _record, _name, _value, _oldValue) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		if (_name == '${@fieldName}') {
			var _targetLayoutId = '${@targetLayoutId}';
			var _targetFieldName = '${@targetFieldName}';
			var _hiddenFlag = '${@hidden_flag}';
			if (_hiddenFlag == 'HIDE') {
				$(_targetLayoutId).hideColumn(_targetFieldName);
			} else if (_hiddenFlag == 'SHOW') {
				$(_targetLayoutId).showColumn(_targetFieldName);
			}
		}
	}
}

/**
 *Load事件触发的JS代码
 *
 **/
// 修改其他列只读
function (_dataSet) {
	var _fieldName = '${@fieldName}';
	var _recordLength = _dataSet.getAll().length;
	for (var i = 0; i < _recordLength; i++) {
		var _record = _dataSet.getAt(i);
		if (_record) {
			var _value = _record.get(_fieldName);
			var _triggerCondition = '${@triggerCondition}';
			var _conditionValue = '${@conditionValue}';
			if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
				var _targetFieldName = '${@targetFieldName}';
				var _readOnlyValue = '${@readOnlyFlag}';
				if (_readOnlyValue == 'EDITABLE') {
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setReadOnly(false);
				} else if (_readOnlyValue == 'READONLY') {
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setReadOnly(true);
				}
			}
		}
	}
}
// 修改其他列必输
function (_dataSet) {
	var _fieldName = '${@fieldName}';
	var _recordLength = _dataSet.getAll().length;
	for (var i = 0; i < _recordLength; i++) {
		var _record = _dataSet.getAt(i);
		if (_record) {
			var _value = _record.get(_fieldName);
			var _triggerCondition = '${@triggerCondition}';
			var _conditionValue = '${@conditionValue}';
			if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
				var _targetFieldName = '${@targetFieldName}';
				var _requiredValue = '${@requiredFlag}';
				if (_requiredValue == 'REQUIRED') {
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setRequired(true);
				} else if (_requiredValue == 'UNREQUIRED') {
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setRequired(false);
				}
			}
		}
	}
}
// 修改其他列清空
function (_dataSet) {
	;
}
// 修改其他组件隐藏
function (_dataSet) {
	var _fieldName = '${@fieldName}';
	var _recordLength = _dataSet.getAll().length;
	for (var i = 0; i < _recordLength; i++) {
		var _record = _dataSet.getAt(i);
		if (_record) {
			var _value = _record.get(_fieldName);
			var _triggerCondition = '${@triggerCondition}';
			var _conditionValue = '${@conditionValue}';
			if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
				var _targetLayoutId = '${@targetLayoutId}';
				var _targetLayoutType = '${@targetLayoutType}';
				var _targetTagId = '${@targetTagId}';
				var _hidden_flag = '${@hidden_flag}';
				if (_hidden_flag == 'HIDE') {
					if (_hidden_flag) {
						if (_targetLayoutId && _targetTagId && (_targetLayoutType != 'grid' && _targetLayoutType != 'table')) {
							$(_targetTagId).hide();
						} else if (_targetLayoutId && !_targetTagId) {
							if (_targetLayoutType == 'grid' || _targetLayoutType == 'table' || _targetLayoutType == 'tab') {
								$(_targetLayoutId).hide();
							} else {
								Ext.fly(_targetLayoutId).hide();
							}
						}
					}
				} else if (_hidden_flag == 'SHOW') {
					if (_hidden_flag) {
						if (_targetLayoutId && _targetTagId && (_targetLayoutType != 'grid' && _targetLayoutType != 'table')) {
							$(_targetTagId).show();
						} else if (_targetLayoutId && !_targetTagId) {
							if (_targetLayoutType == 'grid' || _targetLayoutType == 'table' || _targetLayoutType == 'tab') {
								$(_targetLayoutId).show();
							} else {
								Ext.fly(_targetLayoutId).show();
							}
						}
					}
				}

			}
		}
	}
}
// 修改其他LOV查询参数
function (_dataSet) {
	var _fieldName = '${@fieldName}';
	var _recordLength = _dataSet.getAll().length;
	for (var i = 0; i < _recordLength; i++) {
		var _record = _dataSet.getAt(i);
		if (_record) {
			var _value = _record.get(_fieldName);
			var _triggerCondition = '${@triggerCondition}';
			var _conditionValue = '${@conditionValue}';
			if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
				var _targetFieldName = '${@targetFieldName}';
				var _filterName = '${@filterName}';
				if('${@targetTagType}' == 'lov'){
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setLovPara(_filterName, _value);
				}else if('${@targetTagType}' == 'comboBox'){
					$('${@targetDS}').setQueryParameter(_filterName,_value);
					$('${@targetDS}').query();
				}
			}
		}
	}
}
//隐藏\显示Grid的列
function (_dataSet) {
	var _fieldName = '${@fieldName}';
	var _recordLength = _dataSet.getAll().length;
	for (var i = 0; i < _recordLength; i++) {
		var _record = _dataSet.getAt(i);
		if (_record) {
			var _value = _record.get(_fieldName);
			var _triggerCondition = '${@triggerCondition}';
			var _conditionValue = '${@conditionValue}';
			if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
				var _targetLayoutId = '${@targetLayoutId}';
				var _targetFieldName = '${@targetFieldName}';
				var _hiddenFlag = '${@hidden_flag}';
				if (_hiddenFlag == 'HIDE') {
					$(_targetLayoutId).hideColumn(_targetFieldName);
				} else if (_hiddenFlag == 'SHOW') {
					$(_targetLayoutId).showColumn(_targetFieldName);
				}

			}
		}
	}

}
//CellClick事件的lov的param设置
function (_grid,_row,_name,_record) {
	var _triggerCondition = '${@triggerCondition}';
	var _conditionValue = '${@conditionValue}';
	var _sourceDs = $('${@sourceDsId}');
	var _sourceRecord;
	if(_record.ds == _sourceDs){
		_sourceRecord = _record;
	}else{
		_sourceRecord = _sourceDs.getAt(0);
	}
	var _value = _sourceRecord.get('${@fieldName}');
	if ((_triggerCondition && eval("'" + _value.replace(/'/g,"&apos") + "'" + _triggerCondition +  "'" + _conditionValue.replace(/'/g,"&apos") + "'")) || !_triggerCondition) {
		if (_name == '${@targetFieldName}') {
			var _targetFieldName = '${@targetFieldName}';
			var _filterName = '${@filterName}';
			if (_filterName) {
				if('${@targetTagType}' == 'lov'){
					var _targetField = _record.getMeta().getField(_targetFieldName);
					_targetField.setLovPara(_filterName, _value);
				}else if('${@targetTagType}' == 'comboBox'){
					$('${@targetDS}').setQueryParameter(_filterName,_record.get('${@fieldName}'));
					$('${@targetDS}').query();
				}
			}
		}
	}
}
