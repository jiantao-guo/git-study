(function(){
var EXT_UTIL_EVENT = Ext.util.Event,
	EXT_UTIL_EVENT_PROTOTYPE = EXT_UTIL_EVENT.prototype;
EXT_UTIL_EVENT_PROTOTYPE.on = EXT_UTIL_EVENT_PROTOTYPE.addListener;
EXT_UTIL_EVENT_PROTOTYPE.un = EXT_UTIL_EVENT_PROTOTYPE.removeListener;
	
var AUTO_ID=0,
	AUTO_TAB_GROUP=0,
	tab_groups={},
	DRAG_TYPE,
	DRAG_CATEGORY,
	THEME,
	CURRENT_MENU_VIEW,
	isIE = Ext.isIE,
	isNewIE = Ext.isIE9 || Ext.isIE10 || Ext.isIE11,
	action = false,
	startPos,
	TASK_ID,
	cancelFunc,
	DOC = document,
	tempdiv,
	thDiv,
	screenWrap,
	EACH = Ext.each,
	GET = Ext.get,
	MAX = Math.max,
	MIN = Math.min,
	ROUND = Math.round,
	dragEvent = new EXT_UTIL_EVENT(),
	dropEvent = new EXT_UTIL_EVENT(),
	screenResizeEvent = new EXT_UTIL_EVENT(),
	stopEvent = function(e){e.stopEvent()},
	TAB_DS,
	TAB_COLUMN_DS,
	screenwidth,
	screenheight,
	TAB_FIELD_TABCODE='tab_code',
	TAB_FIELD_PARENTTABCODE = 'parent_tab_code',
	TAB_FIELD_TABSEQ = 'tab_seq',
	TAB_FIELD_TABTYPE = 'tab_type',
	TAB_FIELD_TABGROUP = 'tab_group',
	TAB_FIELD_WIDTH = 'width',
	TAB_FIELD_HEIGHT = 'height',
	TAB_FIELD_LABELWIDTH = 'label_width',
	TAB_FIELD_FIELDWIDTH = 'field_width',
	TAB_FIELD_SETUPWIDTH = 'setup_width',
	TAB_FIELD_SETUPHEIGHT = 'setup_height',
	TAB_FIELD_MARGINWIDTH = 'margin_width',
	TAB_FIELD_MARGINHEIGHT = 'margin_height',
	TAB_FIELD_TABDESC = 'tab_desc',
	TAB_FIELD_ROWCOUNT = 'row_count',
	TAB_FIELD_COLUMNCOUNT = 'column_count',
	applyIfDefined = function(o,c,defaults){
		if(defaults){
	        applyIfDefined(o, defaults);
	    }
		if(o && c && typeof c == 'object'){
	        for(var p in c){
	        	if(Ext.isDefined(c[p]))
	            	o[p] = c[p];
	        }
	    }
	    return o;
	},
	globalConfig = {
		id:TAB_FIELD_TABCODE,
		group : TAB_FIELD_TABGROUP,
		width:TAB_FIELD_WIDTH,
		height:TAB_FIELD_HEIGHT,
		labelwidth:TAB_FIELD_LABELWIDTH,
		fieldwidth:TAB_FIELD_FIELDWIDTH,
		ismarginwidth:TAB_FIELD_SETUPWIDTH,
		ismarginheight:TAB_FIELD_SETUPHEIGHT,
		marginwidth:TAB_FIELD_MARGINWIDTH,
		marginheight:TAB_FIELD_MARGINHEIGHT,
		title:TAB_FIELD_TABDESC,
		row:TAB_FIELD_ROWCOUNT,
		column:TAB_FIELD_COLUMNCOUNT
	},
	getData = function(type,index,pid){
		var opt = Options.get(type),
			data = {};
		Ext.iterate(globalConfig,function(key,value){
			if(Ext.isDefined(opt[key])){
				data[value] = opt[key];
			}
		});
		data[TAB_FIELD_TABTYPE] = Types.find(type);
		data[TAB_FIELD_TABCODE] = 'editor-'+(++AUTO_ID);
		if(Ext.isDefined(pid)){
			data[TAB_FIELD_PARENTTABCODE] = pid;
			data[TAB_FIELD_SETUPWIDTH] = 'ABSOLUTE_WIDTH';
		}
		if(type == 'TabPanel'){
			data[TAB_FIELD_TABGROUP] = ++AUTO_TAB_GROUP;
		}
		data[TAB_FIELD_TABSEQ] = index;
		return data;
	},
	getConfig = function(record){
		var config = {
			record : record,
			dataset : record.ds
		}
		Ext.iterate(globalConfig,function(key,value){
			config[key] = record.get(value);
		});
		return config;
	},
	createDiv = function(cls,attr,text){
		var buff = [];
		Ext.iterate(attr,function(key,value){
			buff.push(key+'="'+value+'"');
		});
		return ['<div unselectable="on" class="',cls,'" ',buff.join(' '),'>',text||'','</div>'].join('');
	},
	createProxy = function(type,root){
		if(Ext.isString(type)){
    		var opt = Options.get(type);
			proxy={
				width:opt.ismarginwidth=='MARGIN_WIDTH'&&root?screenwidth - opt.marginwidth:opt.width,
				height:opt.ismarginheight=='MARGIN_HEIGHT'?screenheight - opt.marginheight:opt.height
			}
    	}else{
    		var opt = type.wrap;
    		proxy={
				width:opt.getWidth(),
				height:opt.getHeight()
			}
    	}
    	return proxy;
	},
	Task = function(){
		var task_id;
		return {
			start : function(callback,delay){
				this.end();
				task_id = callback.defer(delay);
			},
			end : function(){
				if(task_id){
					clearTimeout(task_id);
					task_id=null;
				}
			}
		}
	}(),
	Types = function(){
		var types = {
				TabPanel : 'TAB',
				Form : 'FORM',
				Grid : 'GRID',
				Table : 'TABLE',
				FieldBox : 'FIELDBOX',
				FieldBoxColumn : 'FIELDBOXCOLUMN',
				HBox : 'HBOX',
				VBox : 'VBOX'
			},
			field_type={};
		Ext.iterate(types,function(key,value){
			field_type[value] = key;
		});
		return {
			find : function(type){
				return types[type];
			},
			get : function(type){
				return field_type[type];
			}
		}
	}(),
	Options = function(){
		var global = {
				width : 400,
				height : 200,
				minwidth : 150,
				minheight : 75,
				marginwidth : 50,
				marginheight : 100,
				resizable : 'xy',
				ismarginwidth:'MARGIN_WIDTH',
				ismarginheight:'ABSOLUTE_HEIGHT',
				movable : true,
				closable : true
			},
			options = {
				TextField : {
					width:150,
					height:20,
					minwidth : 50,
					minheight : 20
				},
				Box : {
					labelwidth:120,
					fieldwidth:280,
					row : 0,
					column : 4,
					resizable : '',
					ismarginwidth:'',
					ismarginheight:''
				},
				HBox:{
					extend:'Box',
					row : 1,
					column : 0
				},
				VBox:{
					extend:'Box',
					column : 1
				},
				Form:{
					extend:'Box',
					sizable : true
				},
				FieldBoxColumn : {
					extend:'FieldBox',
					labelminwidth : 10
				},
				FieldBox:{
					height:224,
					extend:'Box'			
				},
				Grid:{
					columnminwidth:30			
				},
				Table:{
					extend:'Grid'		
				},
				Tab:{
					stripwidth:100
				}
			};
		function _extend(type){
			var opt = options[type],
				extend = opt.extend;
			delete opt.extend;
			if(extend){
				opt = options[type] = Ext.apply({},opt,_extend(extend));
			}
			return opt;
		}
		return {
			init:function(){
				var _options = {}
				Ext.iterate(options,function(key,value){
					_options[key] = Ext.apply({},_extend(key),global);
				});
				options = _options;
			},
			get:function(type){
				return options[type]||global;
			},
			setOptions:function(opt,glb){
				global = glb||global;
				options = opt;
				this.init();
			}
		}
	}(),
	Tip = function(){
		var wrap,
			isShow = false,
			tpl = createDiv('editor-tip');//'<div class="editor-tip"></div>';
		return {
			init : function(){
				wrap = wrap || new Ext.Template(tpl).insertFirst(Ext.getBody(),{},true);
			},
			show : function(x,y,animate){
				wrap.moveTo(x-this.width()/2,y-this.height()/2).show(animate !== false && !isShow);
				isShow = true;
				return this;
			},
			hide : function(animate){
				if(isShow){
					wrap.hide(animate!==false && {
						callback : function(){
							wrap.moveTo(-10000,-10000);
						}
					});
					isShow = false;
				}
				return this;
			},
			log : function(html,opacity){
				Ext.isObject(html)?
					html.appendTo(wrap.update('')):
					wrap.update(html);
				wrap.setOpacity(opacity);
				return this;
			},
			width : function(){
				return wrap.getWidth();
			},
			height : function(){
				return wrap.getHeight();
			},
			isShow : function(){
				return isShow;
			}
		}
	}(),
	ElementManager = function(){
		var cache={};
		return {
			put : function(el){
				cache[el.id] = el;
			},
			get : function(id){
				return cache[id];
			},
			remove : function(el){
				delete cache[el.id];
			},
			clear : function(){
				cache={};
			}
		}
	}(),
	Editor = function(){
		var wrap,
			el,
			isShow = false,
			tpl = '<div class="editor-input item-tf item-wrap"><input class="item-textField" style="text-align:center" autocomplete="off" type="input" tabIndex="-1"></input></div>';
		return new (Ext.extend(Ext.util.Observable,{
			init : function(){
				wrap = wrap || new Ext.Template(tpl).insertFirst(Ext.getBody(),{},true);
				el = wrap.child('input');
			},
			show : function(x,y){
				wrap.moveTo(x,y).show();
				isShow = true;
				return this;
			},
			hide : function(){
				if(isShow){
					wrap.hide();
					isShow = false;
				}
				return this;
			},
			width : function(w){
				if(Ext.isDefined(w)){
					wrap.setWidth(w);
					return this;
				}else
					return wrap.getWidth();
			},
			height : function(h){
				if(Ext.isDefined(h)){
					wrap.setHeight(h);
					return this;
				}else
					return wrap.getHeight();
			},
			isShow : function(){
				return isShow;
			}
		}))();
	}(),
	Proxy = function(){
		var wrap,
			isShow = false,
			tpl = createDiv('screen-editor-proxy editor-wrap'),//'<div unselectable="on" class="screen-editor-proxy editor-wrap"></div>',
			wrapEl;
		return new (Ext.extend(Ext.util.Observable,{
			init : function(){
				wrap = wrap || new Ext.Template(tpl).insertFirst(Ext.getBody(),{},true);
			},
			show : function(el){
				var sf = this;
				isShow && sf.hide();
				wrap.appendTo(wrapEl = el);
				isShow = true;
				return sf;
			},
			hide : function(){
				var sf = this;
				Ext.getBody().insertFirst(wrap);
				isShow = false;
				sf.fireEvent('hide');
				return sf;
			},
			getWrap : function(){
				return wrapEl;
			},
			width : function(w){
				if(Ext.isDefined(w)){
					wrap.setWidth(w);
					return this;
				}else
					return wrap.getWidth();
			},
			height : function(h){
				if(Ext.isDefined(h)){
					wrap.setHeight(h);
					return this;
				}else
					return wrap.getHeight();
			},
			isShow : function(){
				return isShow;
			}
		}))();
	}(),
	Abstract = Ext.extend(Ext.util.Observable,{
		constructor : function(config){
			var sf = this;
			Ext.apply(sf,config);
			sf.initComponent(config);
			ElementManager.put(sf);
			sf.initOthers();
        	sf.initEvents();
		},
		initComponent : function(config){},
		initOthers : function(){},
		initEvents : function(){
			this.addEvents(
	    	'resize');
	    },
		focus : function(){
			var sf = this;
			sf.wrap.focus();
		},
		blur : function(){
			this.wrap.blur();
		},
		setWidth : function(w){
			var sf = this;
			if(w == sf.width)return;
			sf.width = w;
			sf.marginwidth = screenwidth-w;
			sf.wrap.setWidth(w);
			sf.fireEvent('resize',sf);
		},
		getWidth : function(){
			return this.width;
		},
		setMinWidth : function(w){
			var sf = this;
			if(w == sf.minwidth)return;
			sf.minwidth = w;
			if(w > sf.width)
				sf.getRecord().set(TAB_FIELD_WIDTH,w);
//				sf.setWidth(w);
		},
		getMinWidth : function(){
			return this.minwidth;
		},
		setHeight : function(h){
			var sf = this;
			if(h == sf.height)return false;
			sf.height = h;
			sf.marginheight = screenheight-h;
			sf.wrap.setHeight(h);
			sf.fireEvent('resize',sf);
		},
		getHeight : function(){
			return this.height;
		},
		setMinHeight : function(h){
			var sf = this;
			if(h == sf.minheight)return;
			sf.minheight = h;
			if(h > sf.height)
				sf.getRecord().set(TAB_FIELD_HEIGHT,h);
//				sf.setHeight(h);
		},
		getMinHeight : function(){
			return this.minheight;
		},
		getRecord : function(){
			return this.record;
		},
		destroy : function(){
			var sf = this,
				ds = sf.dataset,
				children = sf.children;
			EACH(children,function(child){
				ds.remove(child.getRecord());
			});
			ElementManager.remove(sf);
			sf.fireEvent('destroy',sf);
		}
	}),
	Observable = function(){
		var outlineTpl = createDiv('editor-outline'),
			dragTpl = createDiv('drag-icon',{title:'拖动'}),
			closeTpl = createDiv('close-icon',{title:'关闭'}),
			resizeTpl = createDiv('resize-icon',{title:'缩放'}),
			marginSizeIcon = createDiv('marginsize-icon {cls}',{title:'{title}'});
		return Ext.extend(Abstract,{
			constructor : function(config){
				var sf = this;
				config.ismarginwidth = config.ismarginwidth == 'MARGIN_WIDTH';
				config.ismarginheight = config.ismarginwidth == 'MARGIN_HEIGHT';
				Abstract.prototype.constructor.call(sf,config);
				sf.resizable && sf.onScreenResize(screenwidth,screenheight);
			},
			initOthers : function(){
				var sf = this;
				sf.initOutline();
				sf.movable && sf.initMove();
				sf.resizable && sf.initResize();
				sf.closable && sf.initClose();
			},
			initOutline : function(){
				this.outline = new Ext.Template(outlineTpl).insertFirst(this.wrap,{},true);
			},
			initMove : function(){
				this.dragIcon = new Ext.Template(dragTpl).insertFirst(this.wrap,{},true);
			},
			initResize : function(){
				var sf = this,
					ismarginwidth = sf.ismarginwidth,
					ismarginheight = sf.ismarginheight;
				sf.resizeIcon = new Ext.Template(resizeTpl).insertFirst(sf.wrap,{},true);
				if(sf.resizable.indexOf('x')!=-1){
					sf.setupwidthIcon = new Ext.Template(marginSizeIcon).insertFirst(sf.wrap,{
						title:ismarginwidth?'边距宽度':'绝对宽度',
						cls:ismarginwidth?'marginwidth-icon':'width-icon'
					},true);
				}
				if(sf.resizable.indexOf('y')!=-1){
					sf.setupheightIcon = new Ext.Template(marginSizeIcon).insertFirst(sf.wrap,{
						title:ismarginheight?'边距高度':'绝对高度',
						cls:ismarginheight?'marginheight-icon':'height-icon'
					},true);
				}
			},
			initClose : function(){
				this.closeIcon = new Ext.Template(closeTpl).insertFirst(this.wrap,{},true);
			},
			initEvents : function(){
				var sf = this;
				Abstract.prototype.initEvents.call(sf);
		    	sf.addEvents(
		    	'destroy');
		    	sf.processListener('on');
		    },
			processListener : function(ou){
				var sf = this;
				sf.wrap[ou]('focus',sf.onFocus,sf)
					[ou]('blur',sf.onBlur,sf)
					[ou]('click',sf.onClick,sf)
					[ou]('dblclick',sf.onDblClick,sf)
					[ou]('mousedown',sf.onMouseDown,sf)
					[ou]('keydown',sf.onKeyDown,sf)
					[ou]('mouseover',sf.onMouseOver,sf)
					[ou]('mouseout',sf.onMouseOut,sf);
				dropEvent[ou](sf.onDropEnd,sf);
				sf.movable && sf.dragIcon[ou]('mousedown',sf.onMoveStart,sf);
				if(sf.resizable){
					sf.resizeIcon[ou]('mousedown',sf.onResizeStart,sf);
					screenResizeEvent[ou](sf.onScreenResize,sf);
					if(sf.resizable.indexOf('x')!=-1){
						sf.setupwidthIcon[ou]('click',sf.onSetupWidthClick,sf)[ou]('mousedown',stopEvent,sf);
					}
					if(sf.resizable.indexOf('y')!=-1){
						sf.setupheightIcon[ou]('click',sf.onSetupHeightClick,sf)[ou]('mousedown',stopEvent,sf);
					}
				}
				sf.closable && sf.closeIcon[ou]('click',sf.close,sf)[ou]('mousedown',stopEvent,sf);
			},
			setupWidth : function(value){
				var sf =this,
					t = sf.setupwidthIcon,
					ismarginwidth = value == 'MARGIN_WIDTH';
				if(sf.ismarginwidth == ismarginwidth)return false;
				if(sf.ismarginwidth = ismarginwidth){
					t.addClass('marginwidth-icon')
						.removeClass('width-icon')
						.set({'title':'边距宽度'});
					sf.getRecord().set(TAB_FIELD_MARGINWIDTH,screenwidth - sf.width);
				}else{
					t.addClass('width-icon')
						.removeClass('marginwidth-icon')
						.set({'title':'绝对宽度'});
				}
			},
			setupHeight : function(value){
				var sf =this,
					t = sf.setupheightIcon,
					ismarginheight = value == 'MARGIN_HEIGHT';
				if(sf.ismarginheight == ismarginheight)return false;
				if(sf.ismarginheight = ismarginheight){
					t.addClass('marginheight-icon')
						.removeClass('height-icon')
						.set({'title':'边距高度'});
					sf.getRecord().set(TAB_FIELD_MARGINHEIGHT,screenheight - sf.height);
				}else{
					t.addClass('height-icon')
						.removeClass('marginheight-icon')
						.set({'title':'绝对高度'});
				}
			},
			onSetupWidthClick : function(e,t){
				var sf = this;
				sf.getRecord().set(TAB_FIELD_SETUPWIDTH,sf.ismarginwidth?'ABSOLUTE_WIDTH':'MARGIN_WIDTH');
			},
			onSetupHeightClick : function(e,t){
				var sf = this;
				sf.getRecord().set(TAB_FIELD_SETUPHEIGHT,sf.ismarginheight?'ABSOLUTE_HEIGHT':'MARGIN_HEIGHT');
			},
			onScreenResize : function(width,height){
				var sf = this,
					record = sf.getRecord();
				sf.resizable.indexOf('x')!=-1 &&
					sf.ismarginwidth && record.set(TAB_FIELD_WIDTH,width - sf.marginwidth)//sf.setWidth(width - sf.marginwidth);
				sf.resizable.indexOf('y')!=-1 &&
					sf.ismarginheight && record.set(TAB_FIELD_HEIGHT,height - sf.marginheight)//sf.setHeight(height - sf.marginheight);
			},
			onResizeStart : function(e){
				var sf = this;
				action = true;
				startPos = e.xy;
				sf.outline.setStyle({
					zIndex : 1,
					width : sf.wrap.getWidth()+'px',
					height : sf.wrap.getHeight()+'px'
				});
				Ext.getBody().on('mousemove',sf.onResizeMove,sf)
					.on('mouseup',sf.onResizeEnd,sf);
				cancelFunc = 'onResizeEnd';
				stopEvent(e);
			},
			onResizeMove : function(e){
				var sf = this,
					wrap = sf.wrap,
					xy = wrap.getXY(),
					dx = e.xy[0] - startPos[0],
					dy = e.xy[1] - startPos[1],
					w = MAX(sf.width+dx,sf.getMinWidth()),
					h = MAX(sf.height+dy,sf.getMinHeight()),
					log='';
				if(e.ctrlKey || e.altKey){
					w-=w%((e.ctrlKey?5:1)*(e.altKey?10:1));
					h-=h%((e.ctrlKey?5:1)*(e.altKey?10:1));
				}
				if(sf.resizable.indexOf('x')!=-1){
					sf.outline.setWidth(w);
					log+='W:'+w;
				}
				if(sf.resizable.indexOf('y')!=-1){
					sf.outline.setHeight(h);
					log+='H:'+h;
				}
				Tip.log(log).show(xy[0]+w/2,xy[1]+h+Tip.height());
			},
			onResizeEnd : function(iscancel){
				var sf = this,
					ol = sf.outline.dom.style;
				if(iscancel !== true){
					if(sf.resizable.indexOf('x')!=-1){
						sf.getRecord().set(TAB_FIELD_WIDTH,parseInt(ol.width));
						//sf.setWidth(parseInt(ol.width));
					}
					if(sf.resizable.indexOf('y')!=-1){
						sf.getRecord().set(TAB_FIELD_HEIGHT,parseInt(ol.height));
//						sf.setHeight(parseInt(ol.height));
					}
				}
				ol.cssText='';
				action = false;
				Tip.hide();
				Ext.getBody().un('mousemove',sf.onResizeMove,sf)
					.un('mouseup',sf.onResizeEnd,sf);
			},
			onMoveStart : function(e,t){
				var sf = DRAG_TYPE = this;
				Ext.getBody().on('mouseup',sf.onDropEnd,sf)
					.on('mousemove',sf.onMove,sf);
				startPos = e.xy;
				stopEvent(e);
			},
			onMove : function(e,t){
				var xy = e.xy,
					x = xy[0],
					y = xy[1],
					sf = this,
					wrap = sf.wrap;
				if((x !=startPos[0] || y !=startPos[1]) && !action){
					Tip.log(wrap.is('td')?wrap.parent('table'):wrap,0.8).show(x+Tip.width()/2+20,y+Tip.height()/2+20,false);
					sf.fireEvent('drag',sf);
					dragEvent.fire();
					cancelFunc = 'cancelDrag';
					action = true;
					sf.focus();
				}
			},
			cancelDrag : function(){
				var sf = this,
					ref = sf.ref;
				ref.owner.add(sf,ref.index);
				dropEvent.fire();
				Proxy.hide();
				delete sf.ref;
				sf.focus();
			},
			onDropEnd : function(iscancel){
				var sf = this;
				Ext.getBody().un('mouseup',sf.onDropEnd,sf)
					.un('mousemove',sf.onMove,sf);
				Tip.hide(false);
				action = false;
			},
			onFocus : function(e){
				var sf = this,
					ds = sf.dataset;
				if(!sf.isFocus){
					sf.isFocus = true;
					sf.wrap.addClass('editor-focus')
						.on('mousemove',sf.onMouseMove,sf);
					sf.getRecord() && ds.locate(ds.indexOf(sf.getRecord())+1,false);
					stopEvent(e);
				}
			},
			onBlur : function(){
				var sf = this;
				if(sf.isFocus){
					sf.isFocus = false;
					sf.wrap.removeClass('editor-focus')
						.un('mousemove',sf.onMouseMove,sf);
					return true;
				}
			},
			onMouseOver : function(e){
				!action && this.wrap.addClass('editor-hover');
				stopEvent(e);
			},
			onMouseOut : function(e){
				!action && this.wrap.removeClass('editor-hover');
				stopEvent(e);
			},
			onMouseMove : function(e){},
			onMouseDown : function(e,t){
				var sf = this,
					wrap = sf.wrap;
				if(!sf.isFocus &&!sf.editing){
					sf.focus();
					stopEvent(e);
				}
			},
			onKeyDown : function(e){
				var sf = this;
				if(sf.isFocus){
					switch(e.keyCode){
						case 18:stopEvent(e);break;
						case 27:action?sf.cancelAction():sf.blur();break;
						case 46:
						case 8:sf.close(e);
					}
					e.keyCode == 18 &&
						stopEvent(e);
				}
			},
			onDblClick : function(e){},
			onClick : function(e){},
			cancelAction : function(){
				cancelFunc && this[cancelFunc](true);
			},
			onClose : function(){
				var sf = this;
				sf.dataset.remove(sf.getRecord());
			},
			close : function(e){
				var sf = this,
					xy = e.xy,
					win=$A.showConfirm('警告','是否删除当前'+sf.type+'控件？',sf.onClose.createDelegate(sf),function(){
						sf.focus();
					}),
					vw = $A.getViewportWidth(),
					w = win.wrap.getWidth(),
					x = xy[0],y;
				if(e.type == 'keydown'){
					var t = Ext.fly(e.target);
					xy = t.getXY();
					x = xy[0]+t.getWidth();
				}
				x-=w/2
				y = xy[1];
				if(x+w > vw){
					x = vw-w;
				}
				win.move(x,y);
			},
			destroy : function(){
				var sf = this;
				Abstract.prototype.destroy.call(sf);
				sf.processListener('un');
				sf.wrap.remove();
			}
		});
	}(),
	Input = Ext.extend(Observable,{
		initComponent : function(config){
			var sf = this,
				wrap = sf.wrap = new Ext.Template(sf.wrapTplt).append(tempdiv,{
					width:sf.width,
					height:sf.height
			},true);
			sf.el = wrap.child('input');
		},
		setHeight:function(h){
			if(Observable.prototype.setHeight.call(this,h)!=false){
				this.el.setHeight(h);
			}
		}
	}),
	Box = function(){
		var dropIndex=-1,
			thTpl = ['<th class="layout-th empty-text no-prompt" data-column="{columnindex}">',
				createDiv('text-content',{},'Prompt'),
				createDiv('box-column-outline'),
			'</th>'],
			tdTpl = ['<td unselectable="on"  class="layout-td-cell {cls}" style="padding:6px">',
				createDiv('box-td-content'),
				createDiv('box-column-outline'),
			'</td>'],
			sizeIconTpl = '<span class="box-size-panel" unselectable="on"></span>',
			sizePanelTpl = [
			'<div class="editor-menu-view item-shadow" >',
				'<div class="editor-menu-view-header">',
					'行列',
				'</div>',
				'<div class="editor-menu-view-content">',
					'<table width="100%">',
						'<tr>',
							'<td>行：</td>',
							'<td><input style="width:40px;" data-size="row_count"></input></td>',
							'<td>列：</td>',
							'<td><input style="width:40px;" data-size="column_count"></input></td>',
						'</tr>',
					'</table>',
				'</div>',
			'</div>'],
			sizePanel;
		return Ext.extend(Observable,{
			wrapTplt : [
			'<table cellspacing="0" cellpadding="0">',
				'<tr><td tabIndex="0" hideFocus class="layout-table box-editor can-drop editor-wrap empty-box">',
					'<div class="editor-input item-tf item-wrap"><input class="item-textField" style="text-align:left;text-indent:5px" autocomplete="off" type="input" tabIndex="-1"></input></div>',
					'<table cellpadding="0" cellspacing="0" border="0" style="width:{width}px">',
						'<tbody>',
							'<tr></tr>',
						'</tbody>',
					'</table>',
				'</td></tr>',
			'</table>'],
			constructor : function(config){
				var sf = this;
				Observable.prototype.constructor.call(sf,config);
				sf.redraw();
			},
			initComponent : function(config){
				var sf = this,
					wrap = sf.wrap = new Ext.Template(sf.wrapTplt).append(tempdiv,{
						width:sf.width
				},true).child('>tbody>tr>td'),
					editor = sf.editor = wrap.child('>.editor-input');
				editor.el = editor.child('input');
				sf.body = wrap.child('table');
				sf.children=[];
//				sf.height = Options.get(sf.type).height;
			},
			initOthers : function(){
				var sf = this;
				Observable.prototype.initOthers.call(sf);
				sf.sizable && sf.initSize();
			},
			initSize : function(){
				var sf = this;
				sf.sizeIcon = new Ext.Template(sizeIconTpl).insertFirst(sf.wrap,{},true);
				if(!sizePanel){
					sizePanel = new Ext.Template(sizePanelTpl).insertFirst(Ext.getBody(),{},true);
					sizePanel.rowInput = sizePanel.child('input[data-size=row_count]');
					sizePanel.columnInput = sizePanel.child('input[data-size=column_count]');
				}
				sf.refreshSizePanel();
			},
			isEmpty : function(){
				return !this.children.length;
			},
			refreshSizePanel :function(){
				var sf = this,
					column = sf.column||-1,
					row = sf.row||-1;
				if(column == -1){column = 1}
				if(row == -1){row = '∞'};
				sf.sizeIcon.update(row+'×'+column);
			},
			processListener : function(ou){
				var sf = this;
				Observable.prototype.processListener.call(sf,ou);
				dragEvent[ou](sf.onDrag,sf);
				sf.sizable && sf.sizeIcon[ou]('click',sf.showSizePanel,sf);
			},
			showSizePanel : function(e,t){
				t = Ext.fly(t);
				sizePanel.setStyle({display:'block'}).appendTo(this.wrap);
				var sf = this,
					xy = t.getXY(),
					width = t.getWidth(),
					x = xy[0],
					y = xy[1],
					vw = screenwidth,
					vh = screenheight,
					scroll = screenWrap.getScroll(),
					sl = scroll.left,
        			st = scroll.top,
					w = sizePanel.getWidth(),
					h = sizePanel.getHeight();
				if(x+width+w>vw+sl){
					x -=w;
				}else{
					x+=width;
				}
				if(y+h>vh+st){
					y=vh-h;
				}
				sf.bindSizePanel();
				sizePanel.moveTo(x,y);
				Ext.getBody().on('mousedown',sf.triggerSizePanel,sf);
				sf.wrap.addClass('editor-focus');
				
			},
			bindSizePanel : function(){
				var sf= this;
				sizePanel.rowInput.on('change',sf.onSizeChange,sf).dom.value = sf.row||0;
				sizePanel.columnInput.on('change',sf.onSizeChange,sf).dom.value = sf.column||1;
			},
			unBindSizePanel : function(){
				var sf= this;
				sizePanel.rowInput.un('change',sf.onSizeChange,sf);
				sizePanel.columnInput.un('change',sf.onSizeChange,sf);
			},
			triggerSizePanel : function(e,t){
				t = GET(t);
				if(this.sizeIcon!=t&&!sizePanel.contains(t)){
					this.hideSizePanel();
				}
			},
			hideSizePanel : function(){
				var sf = this;
				sf.unBindSizePanel();
				sizePanel.setStyle({display:''})
				Ext.getBody().un('mousedown',sf.triggerSizePanel,sf);
				!sf.isFocus && sf.wrap.removeClass('editor-focus');
			},
			refreshSize : function(row,column){
				var sf = this;
				sf.row = Number(row);
				sf.column = Number(column);
				sf.refreshSizePanel();
				sf.redraw();
			},
			onSizeChange : function(e,t){
				var sf = this;
				sf.getRecord().set(GET(t).getAttributeNS('','data-size'), t.value);
			},
			showEditor : function(target,el,attr,emptytext){
				var sf = this;
				sf.editing = true;
				sf.bindEditor(target,el,attr,emptytext);
				sf.editor.el
					//.on('keydown',sf.onEditorKeyDown,sf)
					.on('blur',sf.hideEditor,sf).focus();
				!sf.isFocus && sf.wrap.addClass('editor-focus');
			},
//				showEditorBy : function(isShift){
//					var sf = this,
//						columns = sf.getColumns(),
//						col = sf.editor.column;
//					sf.updatePrompt(col);
//					(col = columns[columns.indexOf(col)+(isShift?-1:1)])?
//						sf.bindEditor(col):sf.hideEditor();
//				},
			bindEditor : function(target,el,attr,emptytext){
				var sf = this,
					ed = sf.editor;
				ed.binder={
					el:el,
					attr:attr,
					emptytext:emptytext
				};
				ed.el.dom.value = el[attr]||'';
				(ed.setXY(target.getXY())
					.setHeight(target.getHeight())
					.setWidth(target.getWidth())).target = target;
			},
			hideEditor : function(){
				var sf = this,
					ed = sf.editor,
					target = ed.target;
				sf.editing = false;
				sf.updatePrompt(target);
				ed.setXY([-1000,-1000]);
				ed.el
					//.un('keydown',sf.onEditorKeyDown,sf)
					.un('blur',sf.hideEditor,sf).blur();
				!sf.isFocus && sf.wrap.removeClass('editor-focus');
			},
			updatePrompt : function(target){
				var sf = this,
					ed = sf.editor,
					binder = ed.binder,
					attr = binder.attr,
					text = binder.el[attr] = ed.el.dom.value,
					w;
				target[Ext.isEmpty(text)?'addClass':'removeClass']('empty-text')
					.child('.text-content')
					.update((text||binder.emptytext)+(attr=='prompt'?':':''));
				if(false &&attr=='prompt' 
					&& !Ext.isEmpty(text) 
					&& (w=sf.getLabelMinWidth())>sf.getLabelWidth()){
					sf.setLabelWidth(w);
				}
			},
			onClick : function(e,t){
				var sf = this,
					target = t = GET(t);
				if(target.is('.layout-th')||(target = t.parent('.layout-th'))){
					var childindex  = target.getAttributeNS('','data-childindex'),
						child = sf.children[childindex];
					child && sf.showEditor(target,child,'prompt','Prompt');
				}
			},
			onDrag : function(){
				var sf = this;
				sf.wrap.on('mousemove',sf.onDragOver,sf)
    				.on('mouseleave',sf.onDragLeave,sf)
    				.on('mouseup',sf.onDrop,sf);
			},
			onDragOver : function(e,t){
				var sf = this,
					x = e.xy[0],
					y = e.xy[1];
				Tip.isShow() && Tip.show(x+Tip.width()/2+20,y+Tip.height()/2+20,false);
		    	Task.start(function(){
					t = GET(t);
					t = t.is('.box-editor')?t:t.parent('.box-editor');
					if(t){
						var wrap = sf.wrap,
				    		children = sf.children,
				    		xy = wrap.getXY(),
							_x = x - xy[0],
							_y = y - xy[1],
							w=0,
							h=0;
						dropIndex = -1;
						sf.body.select('>tbody>tr').each(function(tr,trs,row){
							h+=tr.getHeight();
							if(_y<h){
								tr.select('>.layout-td-cell').each(function(td,tds,column){
									var halfwidth = (td.getWidth()+td.prev().getWidth())/2;
									w+=halfwidth;
									if(_x<w){
										dropIndex = Number(td.getAttributeNS('','data-childindex')||-1);
										return true;
									}
									w+=halfwidth;
								});
								return true;
							}
						});
						if(dropIndex == -1){
							dropIndex = children.length;	
						}
						if(sf.dropIndex != dropIndex){
							if(Proxy.isShow()){
								Proxy.hide();
							}
							sf.dropIndex = dropIndex;
							sf.redraw(true);
						}
					}
		    	},50);
				stopEvent(e);
		    },
		    onDragLeave : function(e,t){
		    	Task.end();
    			Proxy.hide();
		    },
			onDrop : function(e,t){
				var sf = this;
				Task.end();
				if(Proxy.isShow()){
					if(Ext.isString(DRAG_TYPE)){
						sf.dataset.create(getData(DRAG_TYPE,dropIndex,sf.id),dropIndex);
					}else{
						var r = DRAG_TYPE.getRecord(),
							pid = r.get(TAB_FIELD_PARENTTABCODE),
							seq = r.get(TAB_FIELD_TABSEQ);
						if(pid == sf.id && seq == dropIndex){
							DRAG_TYPE.cancelDrag();
							stopEvent(e);
							return;
						}
						r.set(TAB_FIELD_PARENTTABCODE,sf.id);
						r.set(TAB_FIELD_TABSEQ,dropIndex);
					}
				}
				dropEvent.fire();
				stopEvent(e);
			},
			onDropEnd:function(){
				var sf = this;
				Observable.prototype.onDropEnd.call(sf);
				sf.wrap.un('mousemove',sf.onDragOver,sf)
    				.un('mouseleave',sf.onDragLeave,sf)
    				.un('mouseup',sf.onDrop,sf);
		    	delete sf.dropIndex;
			},
			add : function(obj,index){
				var sf = this,
					cindex = sf.children.indexOf(obj);
				if(cindex == index)return;
				else if(cindex != -1){
					sf.onChildRemove(obj);
				}
				sf.pushChild(obj,index);
				obj.on('resize',sf.onChildResize,sf);
				obj.on('destroy',sf.onChildRemove,sf);
				obj.on('drag',sf.onChildRemove,sf);
				obj.fireEvent('resize',obj);
				sf.redraw();
				obj.focus();
				Proxy.un('hide',sf.onProxyHide,sf);
				Proxy.hide();
			},
			create : function(record,index){
				var sf = this,
					type = Types.get(record.get(TAB_FIELD_TABTYPE));
				if(!type)return;
				var el = new pub[type](applyIfDefined({},getConfig(record),Options.get(type)));
				sf.add(el,index);
				return el;
			},
			onChildRemove : function(child){
				var sf = this,
					preChild = child.previousSibling,
					nextChild = child.nextSibling,
					array = sf.children,
					index = array.indexOf(child);
				array.splice(index,1);
				if(preChild){
					preChild.nextSibling = nextChild;
				}
				if(nextChild){
					nextChild.previousSibling = preChild;
				}
				delete child.previousSibling;
				delete child.nextSibling;
				child.un('destroy',sf.onChildRemove,sf);
				child.un('resize',sf.onChildResize,sf);
				child.un('drag',sf.onChildRemove,sf);
				child.ref={
					array:array,
					index:index,
					owner:sf
				}
				sf.redraw();
			},
			pushChild : function(child,index){
				var sf = this,
					children = sf.children,
					preChild = children[index-1],
					nextChild = children[index],
					cr;
				children.splice(index,0,child);
				if(preChild){
					child.previousSibling = preChild;
					preChild.nextSibling = child;
				}
				if(nextChild){
					nextChild.previousSibling = child;
					child.nextSibling = nextChild;
				}
				cr = child.getRecord();
				while(nextChild){
					var nr = nextChild.getRecord(),
						n_seq = nr.get(TAB_FIELD_TABSEQ),
						c_seq = cr.get(TAB_FIELD_TABSEQ);
					if(c_seq<n_seq){
						nextChild = null;
					}else{
						nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
						cr = nextChild.getRecord();
						nextChild = nextChild.nextSibling;
					}
				}
				cr = child.getRecord();
				while(preChild){
					var pr = preChild.getRecord(),
						p_seq = pr.get(TAB_FIELD_TABSEQ),
						c_seq = cr.get(TAB_FIELD_TABSEQ);
					if(c_seq>p_seq){
						preChild = null;
					}else{
						pr.set(TAB_FIELD_TABSEQ,c_seq-1);
						cr = preChild.getRecord();
						preChild = preChild.previousSibling;
					}
				}
			},
			onChildResize : function(child){
				var sf = this,
					td = child.wrap.parent('td');
//				sf.body.setWidth(0);
//				record.set(TAB_FIELD_WIDTH,sf.wrap.getWidth());
//				sf.height = sf.wrap.getHeight();
				td && td.parent('tr').select('>th>.box-column-outline').setHeight(td.getHeight());
				sf.fireEvent('resize',sf);
			},
		    redraw : function(drop){
		    	var sf = this,
		    		columns = sf.column||-1,
		    		rows = sf.row||-1,
		    		body = sf.body,
		    		o_body = body.child('tbody'),
		    		n_body = DOC.createElement('tbody'),
		    		dropchildren = sf.children,
    				row = 0,
    				twidth=0,
    				proxy,
    				tr,
    				cols=sf.columns=[];
				body.dom.appendChild(n_body);
				if(drop){
					proxy = createProxy(DRAG_TYPE);
	    			dropchildren.splice(dropIndex,0,Ext.apply(proxy,{
	    				type:Ext.isString(DRAG_TYPE)?DRAG_TYPE:DRAG_TYPE.type
	    			}));
				}
				var cl = dropchildren.length;
				if(cl){
					if(columns == -1 ){
						if(rows == -1){
							columns = 1;
							rows = cl;
						}else{
							columns = Math.ceil(cl/rows);
						}
					}else if(rows == -1){
						rows = Math.ceil(cl/columns);
					}
					for(var i=0;i<rows;i++){
						tr = GET(n_body.insertRow(-1));
						var isBreak = false;
						for(var j=0;j<columns;j++){
							var index = i*columns+j,
								child = dropchildren[index]
				    		if(child){
				    			var th = sf.createEmptyTh(tr,j,true),
					    			td = sf.createEmptyTd(tr,j == columns-1,true),
					    			content = td.child('.box-td-content');
				    			if(i == 0){
					    			cols.push({
					    				wrap:td,
					    				labelwrap:th.child('.text-content').setWidth(0),
					    				noPrompt:true
					    			})
								}else if(!cols[j].noPrompt){
									th.removeClass('no-prompt');
								}		
				    			if(child.prompt||child.type=='TextField'){
				    				cols[j].labelwrap.setWidth(sf.labelwidth);
				    				cols[j].noPrompt = false;
				    				Ext.fly(n_body).select('th[data-column='+j+']').removeClass('no-prompt');
				    			}
								if(child === proxy){
									sf.showProxy(content,proxy);
								}else{
									var wrap = child.wrap;
									if(wrap.is('td'))wrap = wrap.parent('table');
					    			wrap.appendTo(content);
					    			th.set({'data-childindex':index}).child('.text-content').update(child.prompt||'Prompt');
					    			td.set({'data-childindex':index})
					    			!Ext.isEmpty(child.prompt) &&
					    				th.removeClass('empty-text');
								}
				    			th.parent('tr').select('>th>.box-column-outline').setHeight(th.getHeight());
				    		}else{
								isBreak = true;
								break;
				    		}
						}
						if(isBreak)break;
					}
				}else{
					var tr = GET(n_body.insertRow(-1)),
						th = sf.createEmptyTh(tr,0,true),
		    			td = sf.createEmptyTd(tr,true,true),
		    			content = td.child('.box-td-content');
		    		cols.push({
	    				wrap:td,
	    				labelwrap:th.child('.text-content').setWidth(0),
	    				noPrompt:true
	    			})
				}
				if(sf.isEmpty()){
					sf.wrap.addClass('empty-box');
					sf.body.setWidth(Options.get(sf.type).width);
				}else{
					sf.wrap.removeClass('empty-box');
					sf.body.setStyle({
						width:''
					});
				}
	    		drop && dropchildren.remove(proxy);
		    	o_body.remove();
		    },
		    createEmptyTh : function(tr,columnindex,returnEl){
		    	return new Ext.Template(thTpl).append(tr,{
		    		columnindex:columnindex
				},returnEl);
		    },
		    createEmptyTd : function(tr,isLast,returnEl){
		    	return new Ext.Template(tdTpl).append(tr,{
					cls : isLast?'box-last-cell':''
				},returnEl);
		    },
		    showProxy : function(t,proxy){
		    	var sf = this,
			    	w = proxy.width,
			    	h = proxy.height;
		    	Proxy.height(h)
			    	.width(w)
			    	.show(t)
			    	.on('hide',sf.onProxyHide,sf);
//	    		(t.getWidth(true) < w||t.getHeight(true) < h) &&
//	    			sf.wrap.removeClass('empty-box');
//		    	sf.body.setStyle({
//					width:''
//				});
		    },
		    onProxyHide : function(){
		    	var sf = this;
		    	delete sf.dropIndex;
		    	sf.redraw();
		    	Proxy.un('hide',sf.onProxyHide,sf);
		    },
		    setWidth : function(w){
				var sf = this;
				if(w == sf.width)return;
				sf.body.setWidth(w);
				sf.width = sf.body.getWidth();
				sf.fireEvent('resize',sf);
			}
		});
	}(),	
	pub={
		TextField : Ext.extend(Input,{
			type:'TextField',
			wrapTplt : ['<DIV tabindex="0" class="item-tf item-wrap editor-wrap" style="width:{width}px;height:{height}px;" >',
				'<DIV class="item-input-wrap">',
					'<INPUT  style="height:{height}px;text-indent:2px;" disabled class="item-textField" />',
				'</DIV>',
			'</DIV>']
		}),
		VBox : Ext.extend(Box,{
			type : 'VBox'
		}),
		HBox : Ext.extend(Box,{
			type : 'HBox'
		}),
		Form : Ext.extend(Box,{
			type : 'Form',
			wrapTplt : [
			'<table cellspacing="0" cellpadding="0">',
				'<tr><td tabIndex="0" hideFocus class="layout-table box-editor form-editor can-drop editor-wrap empty-box">',
					'<div class="editor-input item-tf item-wrap"><input class="item-textField" style="text-align:left;text-indent:5px" autocomplete="off" type="input" tabIndex="-1"></input></div>',
					'<table cellpadding="0" cellspacing="0" border="0" style="width:{width}px" class="layout-table layout-form layout-title">',
						'<thead>',
							'<tr>',
								'<th class="form_head empty-text">',
									'<div class="text-content">Title</div>',
									'<div unselectable="on" class="box-row-outline"></div>',
								'</th>',
							'</tr>',
						'</thead>',	
						'<tbody>',
							'<tr></tr>',
						'</tbody>',
					'</table>',
				'</td></tr>',
			'</table>'],
			initComponent : function(config){
				var sf = this;
				Box.prototype.initComponent.call(sf,config);
				sf.headTitle = sf.wrap.child('.form_head');
			},
			redraw : function(drop){
				Box.prototype.redraw.call(this,drop);
				this.refreshHead();
			},
			refreshHead : function(){
				this.headTitle.dom.colSpan = this.columns.length*2;
			}
		}),
		FieldBox : function(){
			var startX,endX,
				resizeIndex = -1,
				dropIndex = -1,
				dropColumnIndex = -1,
				resizeLabel = false,
				splitComplete = false,
				columnX,
				wrapTplt = [
					'<table cellpadding="0" cellspacing="0">',
						'<tr><td tabIndex="0" hideFocus class="layout-table box-editor can-drop editor-wrap empty-box">',
						'<div class="screen-editor-spliter" hideFocus="true"></div>',
						'<div class="editor-input item-tf item-wrap"><input class="item-textField" style="text-align:left;text-indent:5px" autocomplete="off" type="input" tabIndex="-1"></input></div>',
						'<table cellpadding="0" cellspacing="0">',
							'<thead>',
								'<tr>',
									'<th class="fieldbox_head empty-text">',
										'<div class="text-content">Title</div>',
										'<div unselectable="on" class="box-row-outline"></div>',
									'</th>',
								'</tr>',
							'</thead>',
							'<tbody>',
								'<tr></tr>',
							'</tbody>',
						'</table>',
						'</td></tr>',
					'</table>'
				],
				thTpl = ['<th class="layout-th empty-text" data-column="{columnindex}">',
					'<div class="text-content" unselectable="on">Prompt</div>',
					'<div unselectable="on" class="box-column-outline"></div>',
				'</th>'],
				tdTpl = ['<td unselectable="on"  class="layout-td-cell {cls}" style="padding:6px">',
					'<div class="box-td-content" unselectable="on"></div>',
					'<div unselectable="on" class="box-column-outline"></div>',
				'</td>'],
				FieldBoxColumn = Ext.extend(Abstract,{
					type:'FieldBoxColumn',
					initComponent : function(config){
						this.children = [];
					},
					initEvents : function(){
						var sf = this;
						Abstract.prototype.initEvents.call(sf);
				    	sf.addEvents(
				    	'childremove');
				    },
					refreshBox : function(){
						var sf = this,
							wrap = sf.wrap,
							table = wrap.parent('table');
						sf.totalMarginWidth = wrap.getPadding('lr') + wrap.getBorderWidth('lr')+table.getBorderWidth('lr'),
						sf.totalMarginHeight = wrap.getPadding('tb') + table.getBorderWidth('tb');
					},
					onChildRemove : function(child){
						var sf = this,
							preChild = child.previousSibling,
							nextChild = child.nextSibling,
							array = sf.children,
							index = array.indexOf(child);
						array.splice(index,1);
						if(preChild){
							preChild.nextSibling = nextChild;
						}
						if(nextChild){
							nextChild.previousSibling = preChild;
						}
						delete child.previousSibling;
						delete child.nextSibling;
						child.ref={
							array:array,
							index:index,
							owner:sf
						}
						child.un('resize',sf.onChildResize,sf);
						child.un('destroy',sf.onChildRemove,sf);
						child.un('drag',sf.onChildRemove,sf);
						sf.redraw();
					},
					redraw : function(drop){
				    	this.fireEvent('redraw',this);
				    },
				    add : function(obj,index){
						var sf = this,
							cindex = sf.children.indexOf(obj);
						if(cindex == index)return;
						else if(cindex != -1){
							sf.onChildRemove(obj);
						}
						sf.pushChild(obj,index);
						obj.on('resize',sf.onChildResize,sf);
						obj.on('destroy',sf.onChildRemove,sf);
						obj.on('drag',sf.onChildRemove,sf);
						obj.fireEvent('resize',obj);
						sf.redraw();
						obj.focus();
					},
					create : function(record,index){
						var sf = this,
							type = Types.get(record.get(TAB_FIELD_TABTYPE));
						if(!type)return;
						var el = new pub[type](applyIfDefined({},getConfig(record),Options.get(type)));
						sf.add(el,index);
						return el;
					},
					pushChild : function(child,index){
						var sf = this,
							children = sf.children,
							preChild = children[index-1],
							nextChild = children[index],
							cr;
						children.splice(index,0,child);
						if(preChild){
							child.previousSibling = preChild;
							preChild.nextSibling = child;
						}
						if(nextChild){
							nextChild.previousSibling = child;
							child.nextSibling = nextChild;
						}
						cr = child.getRecord();
						while(nextChild){
							var nr = nextChild.getRecord(),
								n_seq = nr.get(TAB_FIELD_TABSEQ),
								c_seq = cr.get(TAB_FIELD_TABSEQ);
							if(c_seq<n_seq){
								nextChild = null;
							}else{
								nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
								cr = nextChild.getRecord();
								nextChild = nextChild.nextSibling;
							}
						}
						cr = child.getRecord();
						while(preChild){
							var pr = preChild.getRecord(),
								p_seq = pr.get(TAB_FIELD_TABSEQ),
								c_seq = cr.get(TAB_FIELD_TABSEQ);
							if(c_seq>p_seq){
								preChild = null;
							}else{
								pr.set(TAB_FIELD_TABSEQ,c_seq-1);
								cr = preChild.getRecord();
								preChild = preChild.previousSibling;
							}
						}
					},
					onChildResize : function(child){
						var sf = this,
							dt = child.getWidth() - sf.getFieldWidth(true),
							td = child.wrap.parent('td');
						dt>0 &&
							sf.getRecord().set(TAB_FIELD_FIELDWIDTH,sf.getFieldWidth()+dt);
						td && td.parent('tr').select('>th>.box-column-outline').setHeight(td.getHeight());
					},
					getWidth : function(){
						return this.labelwidth+this.fieldwidth;
					},
					setWidth : function(w){
						this.setFieldWidth(w - this.getLabelWidth());
					},
					getFieldMinWidth : function(){
						var sf = this,
							minWidth = sf.minwidth;
						EACH(sf.children,function(child){
							minWidth = MAX(child.getWidth(),minWidth);
						});
						return minWidth + sf.totalMarginWidth;
					},
					getMinWidth : function(){
						return this.getLabelWidth()+this.getFieldMinWidth();
					},
					getLabelMinWidth : function(){
						var sf = this,
							w = sf.labelminwidth;
						if(sf.children.length){
							EACH(sf.children,function(child){
								w = MAX(w,thDiv.update(child.prompt||'prompt').getWidth())
							});
						}else{
							w = MAX(w,thDiv.update('prompt').getWidth());
						}
						return w;
					},
					getLabelWidth : function(){
						return this.labelwidth;
					},
					setLabelWidth : function(w){
						var sf = this;
						if(sf.labelwidth == w)return;
						sf.labelwidth = w;
						sf.labelwrap.child('.text-content').setWidth(w);
						sf.fireEvent('resize');
					},
					getFieldWidth : function(content){
						var sf = this;
						return sf.fieldwidth - (content?sf.totalMarginWidth:0);
					},
					setFieldWidth : function(w){
						var sf = this;
						if(sf.fieldwidth == w)return;
						sf.fieldwidth = w = Math.max(w,sf.getFieldMinWidth());
						sf.wrap.child('.box-td-content').setWidth(w - sf.totalMarginWidth);
						sf.fireEvent('resize');
					}
				});
			return Ext.extend(Observable,{
				type : 'FieldBox',
				constructor : function(config){
					var sf = this;
					Observable.prototype.constructor.call(sf,config);
					sf.createColumn(sf.width);
				},
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTplt).append(tempdiv,{
					},true).child('>tbody>tr>td'),
						editor = sf.editor = wrap.child('>.editor-input');
					editor.el = editor.child('input')//.on('focus',sf.focusEditor,sf);
					sf.body = wrap.child('table');
					sf.headTitle = wrap.child('.fieldbox_head');
					sf.spliter = wrap.child('.screen-editor-spliter');
					sf.children = [];
				},
				processListener : function(ou){
					var sf = this;
					Observable.prototype.processListener.call(sf,ou);
					dragEvent[ou](sf.onDrag,sf);
				},
			    isEmpty : function(){
			    	var isEmpty = true;
			    	EACH(this.children,function(child){
			    		if(child.children.length){
			    			return isEmpty = false;
			    		}
			    	});
			    	return isEmpty;
			    },
				showEditor : function(target,el,attr,emptytext,col){
					var sf = this;
					sf.editing = true;
					sf.bindEditor(target,el,attr,emptytext,col);
					sf.editor.el
						//.on('keydown',sf.onEditorKeyDown,sf)
						.on('blur',sf.hideEditor,sf).focus();
					sf.wrap.addClass('editor-focus');
				},
//				showEditorBy : function(isShift){
//					var sf = this,
//						columns = sf.getColumns(),
//						col = sf.editor.column;
//					sf.updatePrompt(col);
//					(col = columns[columns.indexOf(col)+(isShift?-1:1)])?
//						sf.bindEditor(col):sf.hideEditor();
//				},
				bindEditor : function(target,el,attr,emptytext,col){
					var sf = this,
						ed = sf.editor;
					ed.binder={
						el:el,
						attr:attr,
						emptytext:emptytext,
						col:col
					};
					ed.el.dom.value = el[attr]||'';
					(ed.setXY(target.getXY())
						.setHeight(target.getHeight())
						.setWidth(target.getWidth())).target = target;
				},
//				focusEditor : function(){
//					this.wrap.addClass('editor-focus');
//				},
				hideEditor : function(){
					var sf = this,
						ed = sf.editor,
						target = ed.target;
					sf.editing = false;
					sf.updatePrompt(target);
					ed.setXY([-1000,-1000]);
					ed.el
						//.un('keydown',sf.onEditorKeyDown,sf)
						.un('blur',sf.hideEditor,sf).blur();
					!sf.isFocus && sf.wrap.removeClass('editor-focus');
				},
				updatePrompt : function(target){
					var sf = this,
						ed = sf.editor,
						binder = ed.binder,
						attr = binder.attr,
						col = binder.col,
						text = binder.el[attr] = ed.el.dom.value,
						w;
					target[Ext.isEmpty(text)?'addClass':'removeClass']('empty-text')
						.child('.text-content')
						.update((text||binder.emptytext)+(attr=='prompt'?':':''));
					if(attr=='prompt' 
						&& !Ext.isEmpty(text) 
						&& (w=col.getLabelMinWidth())>col.getLabelWidth()){
						col.setLabelWidth(w);
					}
				},
				onClick : function(e,t){
					var sf = this,
						target = t = GET(t);
					if(t==sf.headTitle||(target = t.parent('.fieldbox_head'))){
						sf.showEditor(target,sf,'title','Title');
					}else if((target = t).is('.layout-th')||(target = t.parent('.layout-th'))){
						var columnindex = target.getAttributeNS('','data-column'),
							childindex  = target.getAttributeNS('','data-childindex'),
							col = sf.children[columnindex],
							child = col.children[childindex];
						child && sf.showEditor(target,child,'prompt','Prompt',col);
					}
				},
				onDrag : function(){
					var sf = this;
					sf.wrap.on('mousemove',sf.onDragOver,sf)
	    				.on('mouseleave',sf.onDragLeave,sf)
	    				.on('mouseup',sf.onDrop,sf);
				},
				onDragOver : function(e,t){
					var sf = this,
						x = e.xy[0],
						y = e.xy[1];
					Tip.isShow() && Tip.show(x+Tip.width()/2+20,y+Tip.height()/2+20,false);
			    	Task.start(function(){
						t = GET(t);
						t = t.is('.layout-td-cell')?t:t.parent('.layout-td-cell');
						if(t){
							dropColumnIndex = t.parent().select('>.layout-td-cell').indexOf(t);
							var col = sf.children[dropColumnIndex],
								wrap = sf.wrap,
					    		children = col.children,
								_y = y - wrap.getXY()[1],
								h=0;
							dropIndex = -1;
							EACH(children,function(child,index){
								var halfchildheight = child.getHeight()/2;
								h+=halfchildheight;
								if(_y<h){
									dropIndex = index;
									return false;
								}else{
									h+=halfchildheight;
								}
							});
							if(dropIndex == -1){
								dropIndex = children.length;
							}
							if(col.dropIndex != dropIndex){
								if(Proxy.isShow()){
									Proxy.hide();
								}
								col.dropIndex = dropIndex;
								sf.redraw(true);
							}
						}
			    	},50);
					stopEvent(e);
			    },
			    onDragLeave : function(e,t){
			    	Task.end();
	    			Proxy.hide();
			    },
				onDrop : function(e,t){
					var sf = this,
						col = sf.children[dropColumnIndex];
					Task.end();
					if(Proxy.isShow()){
						if(Ext.isString(DRAG_TYPE)){
							sf.dataset.create(getData(DRAG_TYPE,dropIndex,col.id),dropIndex);
						}else{
							var r = DRAG_TYPE.getRecord(),
								pid = r.get(TAB_FIELD_PARENTTABCODE),
								seq = r.get(TAB_FIELD_TABSEQ);
							if(pid == col.id && seq == dropIndex){
								DRAG_TYPE.cancelDrag();
								stopEvent(e);
								return;
							}
							r.set(TAB_FIELD_PARENTTABCODE,col.id);
							r.set(TAB_FIELD_TABSEQ,dropIndex);
						}
						Proxy.un('hide',sf.onProxyHide,sf);
						Proxy.hide();
					}
					dropEvent.fire();
					stopEvent(e);
				},
				onDropEnd:function(){
					var sf = this;
					Observable.prototype.onDropEnd.call(sf);
					sf.wrap.un('mousemove',sf.onDragOver,sf)
	    				.un('mouseleave',sf.onDragLeave,sf)
	    				.un('mouseup',sf.onDrop,sf);
	    			if(dropColumnIndex != -1)
			    		delete sf.children[dropColumnIndex].dropIndex;
				},
				redraw : function(drop){
			    	var sf = this,
			    		columns = sf.children,
			    		totalRow = 0,
			    		body = sf.body,
			    		o_body = body.child('tbody'),
			    		n_body = DOC.createElement('tbody'),
	    				columnlength = columns.length,
	    				dropchildren,
	    				row = 0,
	    				proxy,
	    				tr;
		    		EACH(columns,function(col){
		    			totalRow = MAX(col.children.length,totalRow);
		    		});
					body.dom.appendChild(n_body);
					if(drop === true){
						proxy = createProxy(DRAG_TYPE);
						var dropcolumn = columns[dropColumnIndex];
			    		dropchildren= dropcolumn.children
		    			dropchildren.splice(dropIndex,0,proxy);
		    			totalRow = MAX(dropchildren.length,totalRow);
					}
		    		do{
			    		EACH(columns,function(col,index){
				    		if(index == 0){
				    			tr = GET(n_body.insertRow(-1));
				    		}
			    			var children = col.children,
				    			child = children[row],
				    			th = sf.createEmptyTh(tr,index,true),
				    			td = sf.createEmptyTd(tr,index == columnlength-1,true),
				    			content = td.child('.box-td-content'),
				    			fieldwidth = col.getFieldWidth();
							if(row == 0){
								col.wrap = td;
								col.labelwrap = th;
								col.refreshBox();
								content.setWidth(children.indexOf(proxy)!=-1?Math.max(proxy.width,fieldwidth):fieldwidth-col.totalMarginWidth);
								th.child('.text-content').setWidth(col.getLabelWidth());
							}
				    		if(child){
								if(child === proxy){
									sf.showProxy(content,proxy);
								}else{
									var wrap = child.wrap;
									if(wrap.is('td'))wrap = wrap.parent('table');
					    			wrap.appendTo(content);
					    			th.set({'data-childindex':row}).child('.text-content').update((child.prompt||'Prompt')+':');
					    			!Ext.isEmpty(child.prompt) &&
					    				th.removeClass('empty-text');
								}
				    			th.parent('tr').select('>th>.box-column-outline').setHeight(th.getHeight());
				    		}
				    		if(index == columnlength-1){
				    			row++;
				    		}
				    	});
		    		}while(row<totalRow);
		    		if(sf.isEmpty()){
						sf.wrap.addClass('empty-box');
					}else{
						sf.wrap.removeClass('empty-box');
					}
		    		drop === true && dropchildren.remove(proxy);
			    	o_body.remove();
			    },
			    showProxy : function(t,proxy){
			    	var sf = this,
			    		w = proxy.width,
			    		h = proxy.height;
//		    		t.getHeight() < h &&
//		    			sf.wrap.removeClass('empty-box');
			    	Proxy.height(h)
				    	.width(w)
				    	.show(t)
				    	.on('hide',sf.onProxyHide,sf);
			    },
			    onProxyHide : function(){
			    	var sf = this;
			    	delete sf.children[dropColumnIndex].dropIndex;
			    	sf.redraw();
			    	Proxy.un('hide',sf.onProxyHide,sf);
			    },
				createEmptyTh : function(tr,columnindex,returnEl){
				    	return new Ext.Template(thTpl).append(tr,{
				    		columnindex:columnindex
						},returnEl);
				    },
			    createEmptyTd : function(tr,isLast,returnEl){
			    	return new Ext.Template(tdTpl).append(tr,{
						cls : isLast?'box-last-cell':''
					},returnEl);
			    },
			    create : function(record,index){
					var sf = this,
						el = new FieldBoxColumn(applyIfDefined({},getConfig(record),Options.get('FieldBoxColumn')));
					sf.add(el,index);
					return el;
				},
				add : function(obj,index){
					var sf = this,
						cindex = sf.children.indexOf(obj);
					if(cindex == index)return;
					else if(cindex != -1){
						sf.onChildRemove(obj);
					}
					sf.pushChild(obj,index);
					obj.on('redraw',sf.redraw,sf);
					obj.on('resize',sf.onChildResize,sf);
					obj.on('destroy',sf.onChildRemove,sf);
					sf.refreshHead();
					sf.redraw();
				},
				pushChild : function(child,index){
					var sf = this,
						children = sf.children,
						preChild = children[index-1],
						nextChild = children[index],
						cr;
					children.splice(index,0,child);
					if(preChild){
						child.previousSibling = preChild;
						preChild.nextSibling = child;
					}
					if(nextChild){
						nextChild.previousSibling = child;
						child.nextSibling = nextChild;
					}
					cr = child.getRecord();
					while(nextChild){
						var nr = nextChild.getRecord(),
							n_seq = nr.get(TAB_FIELD_TABSEQ),
							c_seq = cr.get(TAB_FIELD_TABSEQ);
						if(c_seq<n_seq){
							nextChild = null;
						}else{
							nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
							cr = nextChild.getRecord();
							nextChild = nextChild.nextSibling;
						}
					}
					cr = child.getRecord();
					while(preChild){
						var pr = preChild.getRecord(),
							p_seq = pr.get(TAB_FIELD_TABSEQ),
							c_seq = cr.get(TAB_FIELD_TABSEQ);
						if(c_seq>p_seq){
							preChild = null;
						}else{
							pr.set(TAB_FIELD_TABSEQ,c_seq-1);
							cr = preChild.getRecord();
							preChild = preChild.previousSibling;
						}
					}
				},
				createColumn : function(width,index){
					var sf = this,
						data = {
						label_width : sf.labelwidth,
						field_width : width - sf.labelwidth
					};
					data[TAB_FIELD_TABCODE] = 'editor-'+(++AUTO_ID);
					data[TAB_FIELD_TABTYPE] = Types.find('FieldBoxColumn');
					data[TAB_FIELD_TABSEQ] = index||0;
					data[TAB_FIELD_PARENTTABCODE] = sf.id;
					sf.dataset.create(data);
				},
				onChildRemove : function(child){
					var sf = this,
						preChild = child.previousSibling,
						nextChild = child.nextSibling,
						array = sf.children,
						index = array.indexOf(child);
					array.splice(index,1);
					if(preChild){
						preChild.nextSibling = nextChild;
					}
					if(nextChild){
						nextChild.previousSibling = preChild;
					}
					delete child.previousSibling;
					delete child.nextSibling;
					child.un('redraw',sf.redraw,sf);
					child.un('resize',sf.onChildResize,sf);
					child.un('destroy',sf.onChildRemove,sf);
					sf.redraw();
				},
				resizeColumn : function(width,index){
					var col = this.children[index]
					col.getRecord().set(resizeLabel?TAB_FIELD_LABELWIDTH:TAB_FIELD_FIELDWIDTH,resizeLabel?width:width-col.getLabelWidth());
				},
				refreshHead : function(){
					this.headTitle.dom.colSpan = this.children.length*2;
				},
				onChildResize : function(){
					var sf = this,
						wrap = sf.wrap;
					sf.width = wrap.getWidth();
//					sf.height = wrap.getHeight();
				},
//				onChildRemove : function(child,array,index,col){
//					var sf = this;
//					if(sf.isEmpty()){
//						sf.wrap.addClass('empty-box');
//					}
//					child.ref={
//						array:array,
//						index:index,
//						cindex:sf.children.indexOf(col),
//						owner:sf
//					}
//					sf.redraw();
//				},
				getMinWidth : function(){
					var sf = this,
						minwidth = 0;
					EACH(sf.children,function(col){
						minwidth += col.getMinWidth();
					});
					return minwidth;
				},
				setWidth : function(w,no){
					var sf = this,
						dt = sf.width - w;
					if(dt == 0)return;
					var col = sf.children[sf.children.length - 1];
					if(!no){
						col.setWidth(col.getWidth()-dt);
					}
					Observable.prototype.setWidth.call(sf,w);
					
				},
				getHeight : function(){
					return this.wrap.getHeight();
				},
				onBlur : function(){
					var sf = this;
					Observable.prototype.onBlur.call(sf) &&
						sf.wrap.removeClass(['can-split','can-col-resize']);
				},
				onDblClick : function(e){
					var sf = this;
					if(sf.wrap.hasClass('can-col-resize')){
						var	next = sf.children[resizeIndex + 1];
						!resizeLabel && next && $A.showConfirm('警告','是否删除右侧列？',function(){
							sf.dataset.remove(next.getRecord())
//							sf.removeColumn(next);
//							sf.focus();
						});
					}
				},
				onMouseDown : function(e){
					var sf = this,
						wrap = sf.wrap;
					if(sf.isFocus){
						stopEvent(e);
						if(wrap.hasClass('can-split'))
							sf.onSplitStart(e);
						else if(wrap.hasClass('can-col-resize'))
							sf.onColumnResizeStart(e);
					}
					Observable.prototype.onMouseDown.call(sf,e);
				},
				onMouseMove : function(e){
					var sf = this;
					!action && sf.wrap[sf.canSplit(e)?'addClass':'removeClass']('can-split')
							[sf.canColumnResize(e)?'addClass':'removeClass']('can-col-resize');
				},
				onColumnResizeStart : function(e){
					if(resizeIndex == -1) return;
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						wrapH = wrap.getHeight(),
						y = xy[1];
					columnX = 0;
					EACH(sf.children,function(col,index){
						if(index == resizeIndex){
							return false;
						}else{
							columnX += col.getWidth();
						}
					});	
					endX = startX = x - xy[0] + 1; 
					sf.spliter
						.setXY([x,y])
						.setHeight(wrapH);
					Ext.getBody()
						.on('mousemove',sf.onColumnResizeMove,sf)
						.on('mouseup',sf.onColumnResizeEnd,sf);
					action = true;
					cancelFunc = 'onColumnResizeEnd';
				},
				onColumnResizeMove : function(e){
					var sf = this,
						xy = sf.wrap.getXY(),
						_x = xy[0],
						col = sf.children[resizeIndex],
						next = sf.children[resizeIndex+1],
						colminwidth = resizeLabel?col.getLabelMinWidth():col.getMinWidth();
					endX = e.xy[0] - _x + 1; 
					if(e.ctrlKey || e.altKey){
						endX-=endX%((e.ctrlKey?5:1)*(e.altKey?10:1));
					}
					if(endX < columnX + colminwidth){
						endX = columnX + colminwidth;
					}
					sf.spliter.setX(endX + _x - 1);
					Tip.log('X:'+endX).show(xy[0]+endX,xy[1]+sf.wrap.getHeight()/2);
				},
				onColumnResizeEnd : function(iscancel){
					var sf = this;
					if(endX != startX && iscancel !== true){
						sf.resize(endX);
					}
					sf.spliter.setXY([-10000,-10000]);
					Ext.getBody().un('mousemove',sf.onColumnResizeMove,sf)
						.un('mouseup',sf.onColumnResizeEnd,sf);
					action = false;
					Tip.hide();
				},
				onSplitStart : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						y = xy[1],
						height = e.xy[1] - y;
					startX = x - xy[0] + 1; 
					sf.spliter.setXY([x,y]).setHeight(height);
					Ext.getBody().on('mousemove',sf.onSplitMove,sf)
						.on('mouseup',sf.onSplitEnd,sf);
					action = true;
					cancelFunc = 'onSplitEnd';
				},
				onSplitMove : function(e){
					var wrap = this.wrap,
						height = e.xy[1] - wrap.getXY()[1],
						wrapH = wrap.getHeight();
					if(splitComplete = height >= wrapH){
						height = wrapH;
					}
					this.spliter.setHeight(height);
				},
				onSplitEnd : function(iscancel){
					var  sf = this;
					Ext.getBody().un('mousemove',sf.onSplitMove,sf)
						.un('mouseup',sf.onSplitEnd,sf);
					if(splitComplete && iscancel !== true){
						sf.split(startX);
					}
					sf.spliter
						.setXY([-10000,-10000])
					action = false;
					splitComplete = false;
				},
				resize : function(x){
					var sf = this;
					EACH(sf.children,function(col,index){
						if(index == resizeIndex){
							sf.resizeColumn(x,index);
							return false;
						}else{
							x-=col.getWidth();
						}
					});
				},
				split : function(x){
					var sf = this;
					EACH(sf.children,function(col,index){
						var w = col.getWidth();
						if(w > x){
							col.getRecord().set(TAB_FIELD_FIELDWIDTH,x-col.getLabelWidth());
							sf.createColumn(w-x,index+1);
							return false;
						}else{
							x-=w;
						}
					});
				},
				canSplit : function(e){
					var sf = this,
						columns = sf.children,
						wrap = sf.wrap,
						w = wrap.getWidth(),
						xy = wrap.getXY(),
						x = e.xy[0] - xy[0],
						ret = false,
						first = columns[0];
					if(x > first.getMinWidth()){
						w=0;
						EACH(columns,function(col,index){
							w += col.getWidth();
							var next = columns[index + 1];
							if(x < w - col.getMinWidth() - col.totalMarginWidth){
								ret = true;
								return false;
							}else if(next && x > w + next.getMinWidth()){
								ret = true;
							}else{
								return ret = false;
							}
						});
					}
					return ret;
				},
				canColumnResize : function(e){
			        var sf = this,
			        	v = 0,      
			            xy = sf.wrap.getXY(),
						x = e.xy[0] - xy[0],
						ret = false;
			        resizeIndex = -1;
			        EACH(sf.children,function(col,index){
			        	v +=col.getLabelWidth();
			            if(x < v+5 && x > v-5){
			                ret = true;
			                resizeLabel = true;
			                resizeIndex = index;
			                return false;
			            }
			            v += col.getFieldWidth();
			            if(x < v+5 && x > v-5){
			                ret = true;
			                resizeLabel = false;
			                resizeIndex = index;
			                return false;
			            }
			        });
			        return ret;
			    }
			});
		}(),
		Grid : function(){
			var DRAG_ITEM,
				navbarHeight = 26,
				splitComplete = false,
				resizeIndex = -1,
				dropIndex = -1,
				dropInLock = false,
				highlightLeft,
				highlightRight,
		 		wrapTpl = [
					'<div tabIndex="0" hideFocus class="grid-editor editor-wrap can-not-drop" style="width:{width}px">',
						'<div class="screen-editor-spliter" hideFocus="true"></div>',
						'<div class="editor-input item-tf item-wrap"><input class="item-textField" style="text-align:center" autocomplete="off" type="input" tabIndex="-1"></input></div>',
						'<table class="item-grid-wrap" cellpadding="0" cellspacing="0" border="0">',
							'{toolbar}',
							'<tr>',
								'<td class="layout-td-cell">',
									'<div class="item-grid" style="height:{height}px">',
										'<DIV class="grid-la" unselectable="on" style="width:0;display:none">',
											'<DIV class="grid-lh" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;text-align:left;height:25px;">',
												'<table cellspacing="0" atype="grid.lht" cellpadding="0" border="0">',
													'<tr class="grid-hl">',
													'</tr>',
													'<tr height="25">',
													'</tr>',
												'</table>',
											'</DIV>',
										'</DIV>',
										'<DIV class="grid-ua" unselectable="on" style="width:{unlockwidth}px;">',
											'<DIV class="grid-uh" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;text-align:left;height:25px;">',
												'<table cellspacing="0" atype="grid.uht" cellpadding="0" border="0">',
													'<tr class="grid-hl">',
														'<th atype="fixed-cell" width="34"> </th>',
													'</tr>',
													'<tr height="25">',
													'</tr>',
												'</table>',
											'</DIV>',
										'</DIV>',
										'<DIV style="clear:both;"></DIV>',
									'</div>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td>',
									'<div class="item-toolbar grid-navbar">',
										'<div class="navbar-{theme}" unselectable="on"></div>',
									'</div>',
								'</td>',
							'</tr>',
						'</table>',
					'</div>'
				],
				headTpl = '<th style="width:{width}px"></th>',
				promptTpl = '<td unselectable="on" class="grid-hc" atype="grid.head"><div unselectable="on">&#160;</div></td>';
				//editorTpl = '<div class="grid-editor-input item-tf item-wrap"><input class="item-textField" autocomplete="off" type="input" tabIndex="-1"></input></div>';
			return Ext.extend(Observable,{
				type:'Grid',
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTpl).append(tempdiv,{
							width:sf.width,
							height:sf.height - 2 - navbarHeight,
							unlockwidth:sf.width - 2,
							theme:THEME
						},true),
						wb = sf.wb = wrap.child('.item-grid'),
        				editor = sf.editor = wrap.child('>.editor-input');//new Ext.Template(editorTpl).insertFirst(wrap,{},true);
					sf.ua = wb.child('.grid-ua');
					sf.uh = wb.child('.grid-uh');
					sf.la = wb.child('.grid-la');
					sf.lh = wb.child('.grid-lh');
        			sf.spliter = wrap.child('.screen-editor-spliter');
        			editor.el = editor.child('input')//.on('focus',sf.focusEditor,sf);
					sf.lockcolumns = [];
					sf.unlockcolumns = [];
					sf.lockwidth = sf.unlockwidth = 0;
				},
				createColumn : function(width){
					var sf = this,
						uhl = sf.uh.child('.grid-hl'),
						col;
					sf.unlockcolumns.push(col={
						width:width,
						hl : new Ext.Template(headTpl).append(uhl,{
							width:width
						},true),
						promptEl : new Ext.Template(promptTpl).append(uhl.next(),{},true),
						prompt : '',
						lock : false
					});
					uhl.child('[atype=fixed-cell]').appendTo(uhl);
					sf.syncColumnSize();
					sf.showEditor(col);
				},
				removeColumn : function(col,deep){
					var sf = this,
						lock = col.lock,
						columns = lock?sf.lockcolumns:sf.unlockcolumns,
				 		index = columns.indexOf(col);
			        index != -1 &&
			            columns.splice(index, 1);
			        if(deep){
			        	col.promptEl.remove();
				        col.hl.remove();
			        }else{
				        col.promptEl.appendTo(tempdiv);
				        col.hl.appendTo(tempdiv);
			        }
			        sf.syncColumnSize(lock);
			        return index;
				},
				addColumn : function(col,index){
					var sf = this,
						lock = col.lock,
						columns = lock?sf.lockcolumns:sf.unlockcolumns,
						hl = sf[lock?'lh':'uh'].child('.grid-hl'),
						promptEl = hl.next(),
						length = hl.query('>[atype!=fixed-cell]').length;
					columns.splice(index, 0 , col);
			        sf.syncColumnSize(lock);
			        if(index == length||index ==-1||Ext.isEmpty(index)){
			        	col.hl.appendTo(hl);
						col.promptEl.appendTo(promptEl);
						if(!lock){
							var uhl = sf.uh.child('.grid-hl');
							uhl.child('[atype=fixed-cell]').appendTo(uhl);
						}
			        }else{
			        	col.hl.insertBefore(hl.select('>*').item(index));
						col.promptEl.insertBefore(promptEl.select('>*').item(index));
			        }
				},
				syncColumnSize : function(islock){
					var sf = this,w = 0;
					if(islock){
						EACH(sf.lockcolumns,function(col){
							w+=col.width;
						});
						if(w == 0){
							sf.la.setWidth(0).setStyle({display:'none'});
						}else{
							sf.la.setWidth(++w);
						}
						sf.lockwidth = w
						sf.ua.setWidth(sf.width - w - 2);
					}else{
						EACH(sf.unlockcolumns,function(col){
							w+=col.width;
						});
						sf.unlockwidth = w;
					}
					sf.uh.setWidth(MAX(sf.width - sf.lockwidth - 2,sf.unlockwidth))
						.child('[atype=grid.uht]')
						.setWidth(sf.unlockwidth+34);
				},
				getColumns : function(){
					return this.lockcolumns.concat(this.unlockcolumns);
				},
				showEditor : function(col){
					var sf = this;
					sf.bindEditor(col);
					sf.editing = true;
					sf.editor.el.on('keydown',sf.onEditorKeyDown,sf)
						.on('blur',sf.hideEditor,sf).focus();
					sf.wrap.addClass('editor-focus');
				},
				showEditorBy : function(isShift){
					var sf = this,
						columns = sf.getColumns(),
						col = sf.editor.column;
					sf.updatePrompt(col);
					(col = columns[columns.indexOf(col)+(isShift?-1:1)])?
						sf.bindEditor(col):sf.hideEditor();
				},
				bindEditor : function(col){
					if(!col)return;
					var sf = this,
						el = col.promptEl,
						ed = sf.editor;
					sf.editing = false;
					sf.focusColumn(col);
					ed.el.dom.value = col.prompt;
					(ed.setXY(el.getXY())
						.setWidth(el.getWidth())).column = col;
				},
				hideEditor : function(){
					var sf = this,
						ed = sf.editor,
						col = ed.column;
					sf.updatePrompt(col);
					ed.setXY([-1000,-1000]);
					ed.el.un('keydown',sf.onEditorKeyDown,sf)
						.un('blur',sf.hideEditor,sf).blur();
					!sf.isFocus && sf.wrap.removeClass('editor-focus');
				},
				updatePrompt : function(col){
					col.promptEl.child('div').update(col.prompt = this.editor.el.dom.value);
				},
				focusColumn : function(col){
					var sf = this,
			            ua = sf.ua,
			            sleft = ua.getScroll().left,
			            ll = 0, tw = 0, lw = 0 , lr;
			        EACH(sf.getColumns(),function(c){
			            if(c == col) {
			                tw = c.width;
			            }
			            if(c.hidden !== true){
			                if(c.lock === true){
			                    lw += c.width;
			                }else{
			                    if(tw==0) ll += c.width;
			                }
			            }
			        });
			        lr = ll + tw;
			        if(ll<sleft){
			            ua.scrollTo('left',ll);
			        }else if((lr-sleft)>(sf.width-lw)){
			            ua.scrollTo('left',lr  - sf.width + lw + (ua.dom.scrollHeight > ua.dom.clientHeight? 16 : 0));
			        }
				},
				setWidth : function(w){
					var sf = this;
        			if(sf.width == w) return;
					Observable.prototype.setWidth.call(sf,w);
					sf.syncColumnSize(true);
				},
				setHeight : function(h){
					var sf = this;
        			if(sf.height == h) return;
        			sf.height = h;
        			sf.wb.setHeight(h-2-navbarHeight);
        			sf.fireEvent('resize',sf);
				},
				getMinWidth : function(){
					var sf = this;
					return sf.lockwidth+Observable.prototype.getMinWidth.call(sf);
				},
				highlightColumn : function(columns,index){
					this.unhighlightColumn();	
					highlightLeft = columns[index-1];
					highlightRight = columns[index];
					highlightLeft && highlightLeft.promptEl.addClass('grid-highligh-hc');
					highlightRight && highlightRight.promptEl.addClass('grid-highligh-r-hc');
				},
				unhighlightColumn : function(){
					highlightLeft && highlightLeft.promptEl.removeClass('grid-highligh-hc');
					highlightRight && highlightRight.promptEl.removeClass('grid-highligh-r-hc');
					highlightLeft = highlightRight = null;
				},
				onEditorKeyDown : function(e){
					var sf = this,keyCode = e.keyCode;
					if(keyCode == 9 || keyCode == 13){
						sf.showEditorBy(e.shiftKey);
						stopEvent(e);
					}
				},
//				onEditorBlur : function(e,t){
//			        var sf = this,ced = sf.editor.el;
//			        if(ced != GET(t)) {  
//			            sf.hideEditor();
//			        }
//			    },
				onClick : function(e,t){
					t = GET(t);
					if(t.hasClass('grid-hc')||(t = t.parent('.grid-hc'))){
						var sf = this;
						EACH(sf.getColumns(),function(col){
							if(col.promptEl == t){
								sf.showEditor(col);
								return false;
							}
						})
					}
				},
				onMouseDown : function(e,t){
					var sf = this,
						wrap = sf.wrap;
					Observable.prototype.onMouseDown.call(sf,e,t);
					if(sf.isFocus){
						stopEvent(e);
						t = Ext.fly(t);
						if(wrap.hasClass('can-split'))
							sf.onSplitStart(e);
						else if(wrap.hasClass('can-col-resize'))
							sf.onColumnResizeStart(e);
						else if(t.is('.grid-hc')||(t = t.parent('.grid-hc')))
							sf.onColumnDragStart(e,t);
					}
				},
				onMouseMove : function(e){
					var sf = this;
					!action && sf.wrap[(sf.canSplit(e))?'addClass':'removeClass']('can-split')
						[sf.canColumnResize(e)?'addClass':'removeClass']('can-col-resize');
				},
				onBlur : function(){
					var sf = this;
					Observable.prototype.onBlur.call(sf) &&
						sf.wrap.removeClass(['can-split','can-col-resize']);
				},
				onColumnDragStart : function(e,t){
					var sf = this;
					action = true;
					startPos = e.xy;
					DRAG_ITEM = sf.getColumns()[sf.wb.select('.grid-hc').indexOf(t)];
					Ext.getBody().on('mousemove',sf.onColumnDragMove,sf)
						.on('mouseup',sf.onColumnDragEnd,sf);
					cancelFunc = 'onColumnDragEnd';
				},
				onColumnDragMove : function(e){
					var sf = this,
						wrap = sf.wrap;
					if(e.xy[0] != startPos[0] || e.xy[1] != startPos[1]){//chrome bug fixed
						Ext.getBody().addClass('screen-editor-grid-no-drop');
						if(sf.canDrop(e)){
							wrap.addClass('grid-can-drop')
								.removeClass('grid-can-not-drop');
							sf.highlightColumn(dropInLock?sf.lockcolumns:sf.unlockcolumns,dropIndex);
						}else{
							sf.unhighlightColumn();
							wrap.addClass('grid-can-not-drop');
						}
					}
				},
				onColumnDragEnd : function(iscancel){
					var sf = this;
					iscancel !== true && dropIndex != -1 && sf.drop();
					action = false;
					DRAG_ITEM = null;
					dropIndex = -1;
					sf.wrap.removeClass(['grid-can-drop','grid-can-not-drop']);
					sf.unhighlightColumn();
					Ext.getBody().removeClass('screen-editor-grid-no-drop').un('mousemove',sf.onColumnDragMove,sf)
						.un('mouseup',sf.onColumnDragEnd,sf);
				},
				drop : function(){
					var sf = this,
						index = sf.removeColumn(DRAG_ITEM);
					if(DRAG_ITEM.lock == dropInLock && index<dropIndex){
						dropIndex--;
					}
					DRAG_ITEM.lock = dropInLock;
					sf.addColumn(DRAG_ITEM,dropIndex);
				},
				onSplitStart : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						y = xy[1],
						height = e.xy[1] - y;
					startX = x - xy[0] + 1; 
					sf.spliter.setXY([x,y]).setHeight(height);
					Ext.getBody().on('mousemove',sf.onSplitMove,sf)
						.on('mouseup',sf.onSplitEnd,sf);
					action = true;
					cancelFunc = 'onSplitEnd';
				},
				onSplitMove : function(e){
					var wrap = this.wrap,
						height = e.xy[1] - wrap.getXY()[1],
						wrapH = wrap.getHeight();
					if(splitComplete = height >= wrapH){
						height = wrapH;
					}
					this.spliter.setHeight(height);
				},
				onSplitEnd : function(iscancel){
					var  sf = this;
					Ext.getBody().un('mousemove',sf.onSplitMove,sf)
						.un('mouseup',sf.onSplitEnd,sf);
					iscancel !== true && splitComplete &&
						sf.split(startX);
					sf.spliter.setXY([-10000,-10000]);
					action = splitComplete = false;
				},
				onColumnResizeStart : function(e){
					if(resizeIndex == -1) return;
					var sf = this,
						wb = sf.wb,
						x = e.xy[0],
						xy = wb.getXY(),
						wrapH = wb.getHeight(),
						y = xy[1];
					columnX = 0;
					EACH(sf.getColumns(),function(col,index){
						if(index == resizeIndex){
							return false;
						}else{
							columnX += col.width;
						}
					});	
					endX = startX = x - xy[0] + 1; 
					sf.spliter
						.setXY([x,y])
						.setHeight(wrapH);
					Ext.getBody().on('mousemove',sf.onColumnResizeMove,sf)
						.on('mouseup',sf.onColumnResizeEnd,sf);
					action = true;
					cancelFunc = 'onColumnResizeEnd';
				},
				onColumnResizeMove : function(e){
					var sf = this,
						wb = sf.wb,
						xy = wb.getXY(),
						_x = xy[0],
						columns = sf.getColumns(),
						col = columns[resizeIndex];
					endX = e.xy[0] - _x + 1; 
					if(e.ctrlKey || e.altKey){
						endX-=endX%((e.ctrlKey?5:1)*(e.altKey?10:1));
					}
					if(endX < columnX + sf.columnminwidth){
						endX = columnX + sf.columnminwidth;
					}
					sf.spliter.setX(endX + _x - 1);
					Tip.log('W:'+(endX+sf.ua.getScroll().left)).show(endX + _x - 1,xy[1]+wb.getHeight()/2);
				},
				onColumnResizeEnd : function(iscancel){
					var sf = this;
					if(endX != startX && iscancel !== true){
						sf.resizeColumn(endX + sf.ua.getScroll().left);
					}
					sf.spliter.setXY([-10000,-10000]);
					Ext.getBody().un('mousemove',sf.onColumnResizeMove,sf)
						.un('mouseup',sf.onColumnResizeEnd,sf);
					action = false;
					Tip.hide();
				},
				resizeColumn : function(x){
					var sf = this;
					EACH(sf.getColumns(),function(col,index){
						if(index == resizeIndex){
							col.hl.setWidth(col.width = x);
							sf.syncColumnSize(col.lock);
							return false;
						}else{
							x-=col.width;
						}
					});
				},
				split : function(x){
					var sf = this,
						w = 0;
					EACH(sf.getColumns(),function(col,index){
						w+=col.width;
					});
					sf.createColumn(x - w);
				},
				showLockArea : function(){
					var sf=this;
					sf.lockcolumns.push(DRAG_ITEM);
					sf.la.setStyle({display:''});
					sf.syncColumnSize(true);
					sf.lockcolumns=[];
					sf.isShowLockArea = true;
				},
				hideLockArea : function(){
					var sf=this;
					if(sf.isShowLockArea){
						sf.la.setStyle({display:'none'});
						sf.syncColumnSize(true);
						sf.isShowLockArea = false;
					}
				},
				canDrop : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0] - wrap.getXY()[0]
						columns = sf.getColumns(),
						lockcolumns = sf.lockcolumns,
						dragIndex = columns.indexOf(DRAG_ITEM),
						ret = false;
						w = 0;
					dropIndex = -1;
					if(x < 0){
						if(!lockcolumns.length){
							sf.showLockArea();
						}else if(DRAG_ITEM == columns[0]){
							return ret;
						}
						dropIndex = 0;
						dropInLock = true;
						ret  = true;
					}else{
						if(!lockcolumns.length){
							sf.hideLockArea();
						}
						dropInLock = x<sf.lockwidth;
						EACH(columns,function(col,index){
							var halfcolwidth = col.width/2;
							w += halfcolwidth;
							if(x < w){
								dropIndex = index;
								ret  = true;
								return false;
							}
							w += halfcolwidth;
						});
						if(!ret){
							dropIndex = columns.length;
							ret = true;
						}
						if(DRAG_ITEM.lock == dropInLock && ( dragIndex == dropIndex || dragIndex == dropIndex-1)){
							ret = false;
							dropIndex = -1;
						}
						if(ret){
							if(dropIndex<lockcolumns.length){
								dropInLock = true;
							}else if(dropIndex>lockcolumns.length||!dropInLock){
								dropIndex-=lockcolumns.length;
								dropInLock = false;
							}
						}
					}
					return ret;
				},
				canSplit : function(e){
					var sf = this,
						wrap = sf.wrap,
						w = wrap.getWidth(),
						x = e.xy[0] - wrap.getXY()[0],
						ret = false;
					if(x > sf.columnminwidth){
						ret = true;
						w=0;
						EACH(sf.getColumns(),function(col,index){
							w += col.width;
							if(x > w + sf.columnminwidth){
								ret = true;
							}else{
								return ret = false;
							}
						});
					}
					return ret;
				},
				canColumnResize : function(e){
					var sf = this,
						t = e.target,
						wrap = sf.wrap;
					if(!sf.uh.contains(t)&&!sf.lh.contains(t))return false;
					var v = -sf.ua.getScroll().left,      
			            xy = sf.wb.getXY(),
						x = e.xy[0] - xy[0],
						ret = false;
			        resizeIndex = -1;
			        EACH(sf.getColumns(),function(col,index){
			            v += col.width;
			            if(x < v+5 && x > v-5){
			                ret = true;
			                resizeIndex = index;
			                return false;
			            }
			        });
			        return ret;
				},
				destroy : function(){
					Observable.prototype.destroy.call(this);
					this.editor.remove();
				}
			});
		}(),
		TabPanel : function(){
			var dropIndex = -1,
				stripTpl=[
				'<div class="strip"  unselectable="on" onselectstart="return false;">',
					'<div class="strip-left"></div>',
					'<div style="width:{stripwidth}px;" class="strip-center">{title}<div class="tab-close"></div></div>',
					'<div class="strip-right"></div>',
				'</div>'],
				bodyTpl='<div class="tab"><table cellspacing="0" cellpadding="0"><tbody><tr></tr></tbody></table></div>',
				wrapTpl = [
				'<div tabIndex="0" hideFocus class="tab-editor editor-wrap can-drop" style="width:{width}px;height:{height}px;">',
					'<table cellSpacing="0" cellPadding="0" border="0" class="item-tab">',
						'<tbody>',
							'<tr>',
								'<td>',
									'<div atype="scroll-left" class="tab-scroll tab-scroll-left scroll-disabled" style="display:none"></div>',
									'<div class="item-tab-strip" style="overflow:hidden;width:{headwidth}px">',
										'<div class="clearfix" atype="tab.strips" style="border-bottom:1px solid #cccccc"><div class="item-tab-add">+</div></div>',
									'</div>',
									'<div atype="scroll-right" class="tab-scroll tab-scroll-right" style="display:none"></div>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td style="padding-right:2px">',
									'<div class="item-tab-body" style="height:{bodyheight}px;"></div>',
								'</td>',
							'</tr>',
						'</tbody>',
					'</table>',
				'<div>'],
				tdTpl = '<td style="padding:8px 0 0 8px"></td>',
				Tab = Ext.extend(Abstract,{
					type:'Tab',
					initComponent : function(config){
						var sf = this;
						sf.strip = new Ext.Template(stripTpl).append(sf.head,{
							stripwidth:sf.stripwidth-6,
							title:sf.title||''
						},true);
						sf.body = (sf.wrap = new Ext.Template(bodyTpl).append(sf.wrapbody,{},true)).child('table');
						sf.children=[];
					},
					createEmptyTd : function(tr){
				    	return new Ext.Template(tdTpl).append(tr,{},true);
				    },
				    showProxy : function(t,proxy){
				    	var sf = this;
						Proxy.height(proxy.height)
							.width(proxy.width)
							.show(t)
				    		.on('hide',sf.onProxyHide,sf);
				    },
				    onProxyHide : function(){
				    	var sf = this;
				    	Proxy.getWrap().parent().remove();
				    	delete sf.dropIndex;
				    	Proxy.un('hide',sf.onProxyHide,sf);
				    },
					redraw : function(drop){
				    	var sf = this,
				    		body = sf.body,
				    		o_body = body.child('tbody'),
				    		n_body = DOC.createElement('tbody'),
							dropchildren = sf.children,
							proxy,
							row=0;
						body.dom.appendChild(n_body);
						if(drop){
							proxy = createProxy(DRAG_TYPE);
			    			dropchildren.splice(dropIndex,0,proxy);
						}
			    		EACH(dropchildren,function(child){
			    			var tr = GET(n_body.insertRow(-1)),
				    			td = sf.createEmptyTd(tr);
							if(child === proxy){
								sf.showProxy(td,proxy);
							}else{
								var wrap = child.wrap;
								if(wrap.is('td'))wrap = wrap.parent('table');
				    			wrap.appendTo(td);
							}
			    		});
			    		drop && dropchildren.remove(proxy);
			    		o_body.remove();
				    },
				    add : function(obj,index){
						var sf = this,
							cindex = sf.children.indexOf(obj);
						if(cindex == index)return;
						else if(cindex != -1){
							sf.onChildRemove(obj);
						}
						sf.pushChild(obj,index);
						obj.on('drag',sf.onChildRemove,sf);
						obj.on('destroy',sf.onChildRemove,sf);
						sf.redraw();
						obj.focus();
						Proxy.un('hide',sf.onProxyHide,sf);
						Proxy.hide();
					},
					create : function(record,index){
						var sf = this,
							type = Types.get(record.get(TAB_FIELD_TABTYPE));
						if(!type)return;
						var el = new pub[type](applyIfDefined({},getConfig(record),Options.get(type)));
						sf.add(el,index);
						return el;
					},
					onChildRemove : function(child){
						var sf = this,
							preChild = child.previousSibling,
							nextChild = child.nextSibling,
							array = sf.children,
							index = array.indexOf(child);
						array.splice(index,1);
						if(preChild){
							preChild.nextSibling = nextChild;
						}
						if(nextChild){
							nextChild.previousSibling = preChild;
						}
						delete child.previousSibling;
						delete child.nextSibling;
						child.un('destroy',sf.onChildRemove,sf);
						child.un('drag',sf.onChildRemove,sf);
						sf.redraw();
					},
					pushChild : function(child,index){
						var sf = this,
							children = sf.children,
							preChild = children[index-1],
							nextChild = children[index],
							cr;
						children.splice(index,0,child);
						if(preChild){
							child.previousSibling = preChild;
							preChild.nextSibling = child;
						}
						if(nextChild){
							nextChild.previousSibling = child;
							child.nextSibling = nextChild;
						}
						cr = child.getRecord();
						while(nextChild){
							var nr = nextChild.getRecord(),
								n_seq = nr.get(TAB_FIELD_TABSEQ),
								c_seq = cr.get(TAB_FIELD_TABSEQ);
							if(c_seq<n_seq){
								nextChild = null;
							}else{
								nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
								cr = nextChild.getRecord();
								nextChild = nextChild.nextSibling;
							}
						}
						cr = child.getRecord();
						while(preChild){
							var pr = preChild.getRecord(),
								p_seq = pr.get(TAB_FIELD_TABSEQ),
								c_seq = cr.get(TAB_FIELD_TABSEQ);
							if(c_seq>p_seq){
								preChild = null;
							}else{
								pr.set(TAB_FIELD_TABSEQ,c_seq-1);
								cr = preChild.getRecord();
								preChild = preChild.previousSibling;
							}
						}
					},
					active : function(){
						this.strip.addClass('active');
						this.wrap.setStyle({
							left:'0',
							top:'0'
						});
					},
					unactive : function(){
						this.strip.removeClass('active');
						this.wrap.setStyle({
							left:'',
							top:''
						});
					},
					setWidth : function(w){
						var sf = this;
						if(w == sf.width)return;
						sf.width = w;
						sf.fireEvent('resize',sf);
					},
					setHeight : function(h){
						var sf = this;
						if(h == sf.height)return;
						sf.height = h;
						sf.fireEvent('resize',sf);
					},
					setStripWidth : function(w){
						var sf = this;
						if(w == sf.stripwidth)return;
						sf.stripwidth = w;
						sf.strip.child('.strip-center').setWidth(w-6);
						sf.fireEvent('stripresize',sf);
					},
					getStripWidth : function(){
						return this.stripwidth;
					},
				    focus : function(){
				    	var sf = this,
							ds = sf.dataset;
						ds.locate(ds.indexOf(sf.getRecord())+1,false);
				    }
				});
			return Ext.extend(Observable,{
				type:'TabPanel',
//				constructor : function(config){
//					Observable.prototype.constructor.call(this,config);
//				},
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTpl).append(tempdiv,{
							width:sf.width,
							height:sf.height,
							headwidth:sf.width-38,
							bodyheight:sf.height-29
						},true),
						h = sf.head = wrap.child('div[atype=tab.strips]'), 
						s = sf.stripwrap = h.parent();
					sf.body = wrap.child('.item-tab-body');
					sf.scrollLeft = wrap.child('div[atype=scroll-left]');
					sf.scrollRight = wrap.child('div[atype=scroll-right]');
					sf.addBtn = wrap.child('.item-tab-add');
					sf.children=[];
					sf.id +='-tabpanel';
					tab_groups[sf.group]=sf;
					sf.selectTab(sf.create(sf.record));
					delete sf.record;
				},
				processListener: function(ou){
					var sf = this;
			    	Observable.prototype.processListener.call(sf,ou);
			    	sf.stripwrap//[ou]('click',sf.onClick, sf)
			    		[ou]('mousewheel',sf.onHeadMouseWheel, sf)
			    		.parent()[ou]('mousedown',sf.onHeadMouseDown, sf);
			    	sf.addBtn[ou]('click',sf.onAdd,sf);
		    		dragEvent[ou](sf.onDrag,sf);
			    },
			    getRecord : function(){
					return this.children[0].getRecord();
				},
			    onClose : function(){
					var sf = this,
						ds = sf.dataset;
					EACH([].concat(sf.children),function(child){
						ds.remove(child.getRecord());
					});
				},
			    onAdd : function(){
			    	var sf = this,
			    		data = Ext.apply({},sf.children[0].getRecord().data);
					data[TAB_FIELD_TABCODE] = 'editor-'+(++AUTO_ID);
					data[TAB_FIELD_TABSEQ] = sf.children.length;
					data[TAB_FIELD_TABDESC] = '';
					sf.dataset.create(data);
		    	},
				create : function(record,index){
					var sf = this,
						el = new Tab(applyIfDefined({
							head:sf.head,
							wrapbody:sf.body,
							panel:sf
						},getConfig(record),Options.get('Tab')));
					sf.add(el,isNaN(index)?sf.children.length:index);
					return el;
				},
				add : function(obj,index){
					var sf = this,
						cindex = sf.children.indexOf(obj);
					if(cindex == index)return;
					else if(cindex != -1){
						sf.onChildRemove(obj);
					}
					sf.pushChild(obj,index);
					obj.on('destroy',sf.onChildRemove,sf);
					obj.on('drag',sf.onChildRemove,sf);
					sf.redraw();
					obj.focus();
					Proxy.un('hide',sf.onProxyHide,sf);
					Proxy.hide();
				},
				add : function(tab,index){
					var sf = this;
					sf.pushChild(tab,index);
					tab.on('stripresize',sf.onTabStripResize,sf);
					tab.on('destroy',sf.onTabRemove,sf);
					tab.fireEvent('stripresize');
				},
				pushChild : function(child,index){
					var sf = this,
						children = sf.children,
						preChild = children[index-1],
						nextChild = children[index],
						cr;
					children.splice(index,0,child);
					if(preChild){
						child.previousSibling = preChild;
						preChild.nextSibling = child;
					}
					if(nextChild){
						nextChild.previousSibling = child;
						child.nextSibling = nextChild;
					}
					cr = child.getRecord();
					while(nextChild){
						var nr = nextChild.getRecord(),
							n_seq = nr.get(TAB_FIELD_TABSEQ),
							c_seq = cr.get(TAB_FIELD_TABSEQ);
						if(c_seq<n_seq){
							nextChild = null;
						}else{
							nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
							cr = nextChild.getRecord();
							nextChild = nextChild.nextSibling;
						}
					}
					cr = child.getRecord();
					while(preChild){
						var pr = preChild.getRecord(),
							p_seq = pr.get(TAB_FIELD_TABSEQ),
							c_seq = cr.get(TAB_FIELD_TABSEQ);
						if(c_seq>p_seq){
							preChild = null;
						}else{
							pr.set(TAB_FIELD_TABSEQ,c_seq-1);
							cr = preChild.getRecord();
							preChild = preChild.previousSibling;
						}
					}
				},
				selectTab : function(index){
					var sf = this,
						tab = isNaN(index)?index:sf.children[index];
					if(sf.currentTab){
						sf.currentTab.unactive();
					}
					sf.currentTab = tab;
					tab.active();
					tab.focus();
				},
				findTabById:function(id){
					var _tab;
					EACH(this.children,function(tab){
						if(tab.id == id){
							_tab = tab;
							return false;							
						}
					});
					return _tab;
				},
				onDrag : function(){
			    	var sf = this;
			    	sf.wrap.on('mousemove',sf.onDragOver,sf)
			    		.on('mouseleave',sf.onDragLeave,sf)
			    		.on('mouseup',sf.onDrop,sf);
					Ext.getBody().addClass('screen-editor-item-no-drop');
			    },
			    onDragOver : function(e,t){
			    	t = GET(t);
			    	var sf = this;
			    	if(t.is('.strip')||(t=t.parent('.strip'))){
						 sf.selectTab(t.parent().select('.strip').indexOf(t));
			    	}else{
				    	var x = e.xy[0],
				    		y = e.xy[1];
						Tip.isShow() && Tip.show(x+Tip.width()/2+20,y+Tip.height()/2+20,false);
				    	Task.start(function(){
					    	var	tab = sf.currentTab,
					    		children = tab.children,
								_y = y - sf.body.getXY()[1],
								h=0;
							dropIndex = -1;
							EACH(children,function(child,index){
								var halfchildheight = child.getHeight()/2;
								h+=halfchildheight;
								if(_y<h){
									dropIndex = index;
									return false;
								}else{
									h+=halfchildheight;
								}
							});
							if(dropIndex == -1){
								dropIndex = children.length;
							}
							if(tab.dropIndex != dropIndex){
								if(Proxy.isShow()){
									Proxy.hide();
								}
								tab.dropIndex = dropIndex;
								tab.redraw(true);
							}
				    	},50);
			    	}
					stopEvent(e);
			    },
			    onDragLeave : function(e,t){
			    	Task.end();
			    	Proxy.hide();
			    },
			    onDrop : function(e,t){
			    	var sf = this,
			    		tab = sf.currentTab;
		    		Task.end();
					if(Proxy.isShow()){
						if(Ext.isString(DRAG_TYPE)){
							sf.dataset.create(getData(DRAG_TYPE,dropIndex,tab.id),dropIndex);
						}else{
							var r = DRAG_TYPE.getRecord(),
								pid = r.get(TAB_FIELD_PARENTTABCODE),
								seq = r.get(TAB_FIELD_TABSEQ);
							if(pid == tab.id && seq == dropIndex){
								DRAG_TYPE.cancelDrag();
								stopEvent(e);
								return;
							}
							r.set(TAB_FIELD_PARENTTABCODE,tab.id);
							r.set(TAB_FIELD_TABSEQ,dropIndex);
						}
					}
					dropEvent.fire();
					stopEvent(e);
			    },
				onDropEnd:function(){
					var sf = this;
					Observable.prototype.onDropEnd.call(sf);
					sf.wrap.un('mousemove',sf.onDragOver,sf)
			    		.un('mouseleave',sf.onDragLeave,sf)
			    		.un('mouseup',sf.onDrop,sf);
					Ext.getBody().un('mouseup',sf.onItemListMouseUp,sf)
						.removeClass('screen-editor-item-no-drop');
					DRAG_TYPE = null;
					delete sf.currentTab.dropIndex;
				},
				onHeadMouseWheel : function(e){
					var delta = e.getWheelDelta();
			        if(delta > 0){
			            this.scrollTo('left');
			            stopEvent(e);
			        }else if (delta < 0){
			            this.scrollTo('right');
			            stopEvent(e);
			        }
				},
				onHeadMouseDown : function(e,t){
					var el=GET(t),
						strip = el.parent('.strip'),
						sf=this;
					if(el.hasClass('tab-close')){
						el.removeClass('tab-btn-over').addClass('tab-btn-down');
					}else if(el.hasClass('tab-scroll') && !el.hasClass('scroll-disabled')){
						function _scroll(){
							if(el===sf.scrollLeft)
								sf.scrollTo('left');
							else 
								sf.scrollTo('right');
						}
						_scroll();
						Ext.getBody().on('mouseup',sf.stopScroll,sf);
						sf.scrollInterval=setInterval(function(){
							if(el.hasClass('tab-scroll')&&!el.hasClass('scroll-disabled')){
								_scroll();
							}else
								sf.stopScroll();
						},100);
					}else if(strip && strip.hasClass('strip') && !strip.hasClass('active') && !strip.hasClass('scroll-disabled')){
						sf.selectTab(strip.parent().select('.strip').indexOf(strip));
					}
				},
				stopScroll : function(){
					var sf = this;
					if(sf.scrollInterval){
						clearInterval(sf.scrollInterval);
						delete sf.scrollInterval;
					}
					Ext.getBody().un('mouseup',sf.stopScroll,sf);
				},
				scrollTo : function(lr){
					var sf = this,
						stripwrap = sf.stripwrap,
						scrollRight = sf.scrollRight,
						scrollLeft = sf.scrollLeft,
						sl = stripwrap.getScroll().left,
						sw = Options.get('Tab').stripwidth;
					if(lr=='left'){
						stripwrap.scrollTo('left',sl-sw);
						scrollRight.removeClass('scroll-disabled');
						if(stripwrap.getScroll().left<=0){
							scrollLeft.addClass('scroll-disabled').replaceClass('tab-scroll-left-over','tab-scroll-left');
							sf.stopScroll();
						}
					}else if(lr=='right'){
						stripwrap.scrollTo('left',sl+sw);
						scrollLeft.removeClass('scroll-disabled');
						if(stripwrap.getScroll().left+stripwrap.getWidth()>=sf.head.getWidth()){
							scrollRight.addClass('scroll-disabled').replaceClass('tab-scroll-right-over','tab-scroll-right');
							sf.stopScroll();
						}
					}
				},
//				onTabResize : function(tab){
//					var sf = this,
//						width = tab.getWidth(),
//						height = tab.getHeight();
//					if(sf.width != width){
//						sf.setWidth(width);
//					}
//					if(sf.height != height){
//						sf.setHeight(height);
//					}
//				},
				onTabRemove : function(tab){
					var sf = this,
						children = sf.children,
						index = children.indexOf(tab);
					children.splice(index,1);
					tab.un('stripresize',sf.onTabStripResize,sf);
					tab.un('destroy',sf.onTabRemove,sf);
					if(!children.length){
						sf.destroy();					
					}
				},
				onTabStripResize : function(){
					var sf = this,
						w = 27;
					EACH(sf.children,function(tab){
						w+=tab.getStripWidth();
					});
					sf.head.setWidth(w);
					sf.refreshScrollStatus();
				},
				refreshScrollStatus : function(){
					var sf = this,
						head = sf.head,
						stripwrap = sf.stripwrap,
			    		scrollLeft = sf.scrollLeft,
			    		scrollRight= sf.scrollRight;
					if(stripwrap.getWidth()<head.getWidth()){
						scrollLeft.setStyle({display:''});
						scrollRight.setStyle({display:''});
						stripwrap.setStyle('padding-left','1px');
						var sl=stripwrap.getScroll().left,
							sw=stripwrap.getWidth(),
							hw=head.getWidth();
						scrollLeft[sl<=0?'addClass':'removeClass']('scroll-disabled');
						if(sl+sw>=hw){
							if(!scrollRight.hasClass('scroll-disabled'))
								scrollRight.addClass('scroll-disabled');
							else 
								stripwrap.scrollTo('left',hw-sw);
						}else 
							scrollRight.removeClass('scroll-disabled');
			    	}else{
						scrollLeft.setStyle({display:'none'});
						scrollRight.setStyle({display:'none'});
						stripwrap.setStyle('padding-left','0').scrollTo('left',0);
			    	}
				},
				setWidth : function(w){
					var sf = this;
					if(Observable.prototype.setWidth.call(sf,w)!=false){
						var stripwrap = sf.stripwrap;
						stripwrap.setWidth(w-38);
						sf.refreshScrollStatus();
						EACH(sf.children,function(tab){
							tab.getRecord().set(TAB_FIELD_WIDTH,w);
						});
					}
				},
				setHeight : function(h){
					var sf = this;
					if(Observable.prototype.setHeight.call(sf,h)!=false){
						sf.body.setHeight(h-27);
						EACH(sf.children,function(tab){
							tab.getRecord().set(TAB_FIELD_HEIGHT,h);
						});
					}
				},
				setupWidth : function(value){
					var sf =this;
					if(Observable.prototype.setupWidth.call(sf,value)!=false){
						EACH(sf.children,function(tab){
							tab.getRecord().set(TAB_FIELD_SETUPWIDTH,value);
						});
					}
				},
				setupHeight : function(value){
					var sf =this;
					if(Observable.prototype.setupHeight.call(sf,value)!=false){
						EACH(sf.children,function(tab){
							tab.getRecord().set(TAB_FIELD_SETUPHEIGHT,value);
						});
					}
				}
			});
		}()
	};
pub.Table = function(){
	return Ext.extend(pub.Grid,{
		type:'Table'
	});
}();
$A.ScreenEditor = function(){
	var dropIndex = -1,
		tdTpl = '<td style="padding:{padding}px"></td>',
		tempdivTpl = '<div class="hidden-element"></div>',
		thdivTpl = ['<table cellpadding="0" cellspacing="0" class="hidden-element">',
			'<tr>',
				'<th class="layout-th" width="10">',
					'<div></div>',
				'</th>',
			'</tr>',
		'</table>'],
		sortFunc = function(o1,o2){
			o1.children.sort(sortFunc);
			o2.children.sort(sortFunc);
			return o1.record.get(TAB_FIELD_TABSEQ) - o2.record.get(TAB_FIELD_TABSEQ);
		};
	return Ext.extend($A.Component, {
		constructor : function(config){
			var sf = this;
			THEME = config.theme;
			sf.children = [];
			Tip.init();
			Proxy.init();
			Options.init();
			if(!tempdiv)
				tempdiv= new Ext.Template(tempdivTpl)
					.insertFirst(Ext.getBody());
			if(!thDiv)
				thDiv = new Ext.Template(thdivTpl)
							.insertFirst(Ext.getBody(),{},true)
							.child('div');
			$A.ScreenEditor.superclass.constructor.call(sf, config);
			sf.resolutionslider.setValue(sf.screenresolution);
		},
		initComponent : function(config) {
			var sf = this;
			$A.ScreenEditor.superclass.initComponent.call(sf, config);
			sf.editorItemList = sf.wrap.child('.screen-editor-item-list');
			sf.screenBody = (screenWrap = sf.wrap.child('.screen-editor-screen-wrap')).child('.screen-body');
			sf.menubar = sf.wrap.child('.editor-menubar');
			Ext.isIE && Ext.getBody().addClass('old-ie');
			sf.resolutionslider = $(sf.id+'_slider');
		},
		bind : function(ds,columnds){
			if(Ext.isString(ds)){
	            ds = $(ds);
	            if(!ds) return;
	        }
	        if(Ext.isString(columnds)){
	            columnds = $(columnds);
	            if(!columnds) return;
	        }
	        var sf = this;
	        TAB_DS = ds;
	        TAB_COLUMN_DS = columnds;
	        sf.processDataSetLiestener('on');
	        $A.onReady(function(){
				sf.onLoad();
	        });
		},
		processListener : function(ou){
			var sf = this;
			$A.ScreenEditor.superclass.processListener.call(sf, ou);
			sf.resolutionslider[ou]('change',sf.onResolutionChange,sf);
			sf.editorItemList[ou]('mousedown',sf.onItemListMouseDown,sf);
			sf.menubar[ou]('click',sf.onMenuClick,sf)
				[ou]('mousedown',sf.onMenuMouseDown,sf);
			dragEvent[ou](sf.onDrag,sf);
			dropEvent[ou](sf.onDropEnd,sf);
		},
		processDataSetLiestener : function(ou){
			var sf = this,ds = TAB_DS;
	        if(ds){
//	            ds[ou]('ajaxfailed', sf.onAjaxFailed, sf);
//	            ds[ou]('metachange', sf.onRefresh, sf);
	            ds[ou]('update', sf.onUpdate, sf);
//	            ds[ou]('reject', sf.onUpdate, sf);
	            ds[ou]('add', sf.onAdd, sf);
//	            ds[ou]('submit', sf.onBeforSubmit, sf);
//	            ds[ou]('submitfailed', sf.onAfterSuccess, sf);
//	            ds[ou]('submitsuccess', sf.onAfterSuccess, sf);
//	            ds[ou]('query', sf.onBeforeLoad, sf);
	            ds[ou]('load', sf.onLoad, sf);
//	            ds[ou]('loadfailed', sf.onAjaxFailed, sf);
//	            ds[ou]('valid', sf.onValid, sf);
//	            ds[ou]('beforeremove', sf.onBeforeRemove, sf); 
	            ds[ou]('remove', sf.onRemove, sf);
//	            ds[ou]('clear', sf.onLoad, sf);
//	            ds[ou]('refresh',sf.onRefresh,sf);
//	            ds[ou]('fieldchange', sf.onFieldChange, sf);
	            ds[ou]('indexchange', sf.onIndexChange, sf);
//	            ds[ou]('select', sf.onSelect, sf);
//	            ds[ou]('unselect', sf.onUnSelect, sf);
//	            ds[ou]('selectall', sf.onSelectAll, sf);
//	            ds[ou]('unselectall', sf.onUnSelectAll, sf);
//	            ds[ou]('wait', sf.onWait, sf);
//	            ds[ou]('afterwait', sf.onAfterSuccess, sf);
	        }
		},
		initEvents : function(){
	    	this.addEvents(
	    	/**
	         * @event drop
	         * 组件放入事件.
	         * @param {Component} this 当前组件.
	         * @param {EventObject} e 鼠标事件对象.
	         */
	    	'drop');
	    	this.processListener('on');
	    },
	    onAdd : function(ds,record,index){
	    	var group = record.get(TAB_FIELD_TABGROUP),
	    		parent = (group?tab_groups[group]:ElementManager.get(record.get(TAB_FIELD_PARENTTABCODE)))||this;
	    	parent.create(record,index);
	    },
	    onRemove : function(ds,record){
	    	var el = ElementManager.get(record.get(TAB_FIELD_TABCODE));
	    	el.destroy();
	    },
	    onUpdate : function(ds,record,name,value,oldvalue){
	    	var el = ElementManager.get(record.get(TAB_FIELD_TABCODE));
	    	if(el.type == 'Tab'){
				el = el.panel;	    		
	    	}
	    	switch(name){
	    		case TAB_FIELD_TABCODE:
	    			var el = ElementManager.get(oldvalue);
	    			ElementManager.remove(el);
	    			el.id = value;
	    			ElementManager.put(el);
	    			EACH(el.children,function(child){
	    				child.getRecord().set(TAB_FIELD_PARENTTABCODE,value);
	    			});
	    			break;
	    		case TAB_FIELD_WIDTH:
	    			record.set(TAB_FIELD_MARGINWIDTH,screenwidth - value);
	    			el.setWidth(value);
	    			break;
	    		case TAB_FIELD_HEIGHT:
	    			record.set(TAB_FIELD_MARGINHEIGHT,screenheight - value);
	    			el.setHeight(value);
	    			break;
	    		case TAB_FIELD_MARGINWIDTH:
	    			record.set(TAB_FIELD_WIDTH,screenwidth - value);
	    			break;
	    		case TAB_FIELD_MARGINHEIGHT:
	    			record.set(TAB_FIELD_HEIGHT,screenheight - value);
	    			break;
	    		case TAB_FIELD_SETUPWIDTH:
	    			el.setupWidth(value);
	    			break;
	    		case TAB_FIELD_SETUPHEIGHT:
	    			el.setupHeight(value);
	    			break;
	    		case TAB_FIELD_FIELDWIDTH:
	    			el.setFieldWidth(value);
	    			break;
	    		case TAB_FIELD_LABELWIDTH:
	    			el.setLabelWidth(value);
	    			break;
    			case TAB_FIELD_ROWCOUNT:
    			case TAB_FIELD_COLUMNCOUNT:
    				el.refreshSize && el.refreshSize(record.get(TAB_FIELD_ROWCOUNT),record.get(TAB_FIELD_COLUMNCOUNT));
	    			break;
    			case TAB_FIELD_PARENTTABCODE :
	    		case TAB_FIELD_TABSEQ : {
	    			var parent = ElementManager.get(record.get(TAB_FIELD_PARENTTABCODE))||this;
	    			parent.add(el,record.get(TAB_FIELD_TABSEQ));
	    			break;
	    		}
	    			
	    	}
	    },
	    clear : function(){
	    	ElementManager.clear();
	    	tab_groups={};
	    	this.children = [];
	    	this.redraw();
	    },
	    onLoad : function(){
	    	var sf = this,
	    		datas = TAB_DS.getAll();
    		sf.clear();
	    	if(datas.length){
		    	var map1 = {},map2 = {},array = [];
		    	EACH(datas,function(r){
		    		var id = r.get(TAB_FIELD_TABCODE);
		    		map1[id] = map2[id]={
		    			record:r,
		    			children:[]
		    		};
		    	});
		    	for(var key in map2){
					var node = map2[key],
						parent = map2[node.record.get(TAB_FIELD_PARENTTABCODE)];
					if(parent){
						parent.children.push(node);
						delete map1[key];
					}
				}
				for(var key in map1){
					array.push(map2[key]);
				}
				array.sort(sortFunc);
				sf.createElements(array,sf);
	    	}
	    },
	    onIndexChange : function(ds,r){
	    	var type = Types.get(r.get(TAB_FIELD_TABTYPE));
	    	if(type == 'TabPanel'){
				var group = r.get(TAB_FIELD_TABGROUP),
					tabpanel = tab_groups[group];
				if(tabpanel){
					tabpanel.selectTab(tabpanel.findTabById(r.get(TAB_FIELD_TABCODE)));
				}
	    	}else{
		    	var el = ElementManager.get(r.get(TAB_FIELD_TABCODE));
		    	el && el.focus();
	    	}
	    },
	    createElements : function(arr,parent){
	    	var sf = this,index = 0 ;
	    	EACH(arr,function(node){
	    		var record = node.record,el;
	    		if(record.get('enabled_flag') == 'Y'){
	    			el = parent.create(record,index++);
	    			if(el.type == 'TabPanel'){
	    				parent = el;
	    				el = el.currentTab;
	    			}
	    			sf.createElements(node.children,el);
	    		}
	    	});
	    },
	    onMenuClick : function(e,t){
	    	t = Ext.fly(t);
	    	if(t.hasClass('ico-menu-collapse')){
			   	CURRENT_MENU_VIEW.setStyle({
	    			display:''
	    		})
	    		.parent('.editor-menu-button')
	    		.removeClass('selected');
	    	}else if((t.hasClass('editor-menu-button')||(t=t.parent('.editor-menu-button')))&&!t.hasClass('selected')){
	    		CURRENT_MENU_VIEW && CURRENT_MENU_VIEW.setStyle({
		    			display:''
		    		})
		    		.parent('.editor-menu-button')
		    		.removeClass('selected');
	    		if(CURRENT_MENU_VIEW = t.child('.editor-menu-view')){
		    		t.addClass('selected');
		    		CURRENT_MENU_VIEW.setStyle({
		    			display:'block'
		    		});
	    		}
	    	}
	    },
	    onMenuMouseDown : function(e,t){
	    	t = Ext.fly(t);
	    	if(t.parent('.editor-menu-can-move')||t.is('.editor-menu-can-move')){
		    	var sf = this,
		    		view = CURRENT_MENU_VIEW,
		    		xy = view.getXY(),
		    		eventXY = e.xy,
		    		relativeX =  eventXY[0] - xy[0],
		    		relativeY = eventXY[1] - xy[1],
		    		onMenuMouseMove = function(e){
		    			view.moveTo(e.xy[0] - relativeX,e.xy[1] - relativeY);
				    },
				    onMenuMouseUp = function(){
				    	Ext.getBody().un('mousemove',onMenuMouseMove,sf)
								.un('mouseup',onMenuMouseUp,sf)
				    };
				Ext.getBody().on('mousemove',onMenuMouseMove,sf)
					.on('mouseup',onMenuMouseUp,sf)
			}
	    },
	    onResolutionChange : function(slider,v){
	    	this.setScreenSize(v);
	    },
	    onDrag : function(){
	    	var sf = this;
	    	screenWrap.on('mousemove',sf.onDragOver,sf)
	    		.on('mouseleave',sf.onDragLeave,sf)
	    		.on('mouseup',sf.onDrop,sf);
			Ext.getBody().addClass('screen-editor-item-no-drop');
	    },
	    onDragOver : function(e,t){
	    	var sf = this,
	    		x = e.xy[0],
	    		y = e.xy[1];
			Tip.isShow() && Tip.show(x+Tip.width()/2+20,y+Tip.height()/2+20,false);
	    	Task.start(function(){
		    	var	children = sf.children,
					_y = y - screenWrap.getXY()[1],
					h=0;
				dropIndex = -1;
				EACH(children,function(child,index){
					var halfchildheight = child.getHeight()/2;
					h+=halfchildheight;
					if(_y<h){
						dropIndex = index;
						return false;
					}else{
						h+=halfchildheight;
					}
				});
				if(dropIndex == -1){
					dropIndex = children.length;
				}
				if(sf.dropIndex != dropIndex){
					if(Proxy.isShow()){
						Proxy.hide();
					}
					sf.dropIndex = dropIndex;
					sf.redraw(true);
				}
	    	},50);
	    },
	    redraw : function(drop){
	    	var sf = this,
	    		o_body = sf.screenBody.child('tbody'),
	    		n_body = DOC.createElement('tbody'),
				dropchildren = sf.children,
				proxy,
				row=0;
			sf.screenBody.dom.appendChild(n_body);
			if(drop){
				proxy = createProxy(DRAG_TYPE,true);
    			dropchildren.splice(dropIndex,0,proxy);
			}
    		EACH(dropchildren,function(child){
    			var tr = GET(n_body.insertRow(-1)),
	    			td = sf.createEmptyTd(tr);
				if(child === proxy){
					sf.showProxy(td,proxy);
				}else{
					var wrap = child.wrap;
					if(wrap.is('td'))wrap = wrap.parent('table');
	    			wrap.appendTo(td);
				}
    		});
    		drop && dropchildren.remove(proxy);
    		o_body.remove();
	    },
	    createEmptyTd : function(tr){
	    	return new Ext.Template(tdTpl).append(tr,{padding:3},true);
	    },
	    showProxy : function(t,proxy){
	    	var sf = this;
			Proxy.height(proxy.height)
				.width(proxy.width)
				.show(t)
	    		.on('hide',sf.onProxyHide,sf);
	    },
	    onProxyHide : function(){
	    	Proxy.getWrap().parent().remove();
	    	delete this.dropIndex;
	    	Proxy.un('hide',this.onProxyHide,this);
	    },
	    onDragLeave : function(e,t){
	    	Task.end();
	    	Proxy.hide();
	    },
	    onDrop : function(e,t){
	    	var sf = this;
    		Task.end();
			if(Proxy.isShow()){
				if(Ext.isString(DRAG_TYPE)){
					TAB_DS.create(getData(DRAG_TYPE,dropIndex),dropIndex);
				}else{
					var r = DRAG_TYPE.getRecord(),
						pid = r.get(TAB_FIELD_PARENTTABCODE),
						seq = r.get(TAB_FIELD_TABSEQ);
					if(Ext.isEmpty(pid) && seq == dropIndex){
						DRAG_TYPE.cancelDrag();
						stopEvent(e);
						return;
					}
					r.set(TAB_FIELD_PARENTTABCODE,'');
					r.set(TAB_FIELD_TABSEQ,dropIndex);
				}
			}
			dropEvent.fire();
			stopEvent(e);
	    },
		onDropEnd:function(){
			var sf = this;
			screenWrap.un('mousemove',sf.onDragOver,sf)
	    		.un('mouseleave',sf.onDragLeave,sf)
	    		.un('mouseup',sf.onDrop,sf);
			Ext.getBody().un('mouseup',sf.onItemListMouseUp,sf)
				.removeClass('screen-editor-item-no-drop');
			DRAG_TYPE = DRAG_CATEGORY = null;
			delete sf.dropIndex;
		},
		onItemListMouseDown : function(e,t){
			var sf = this;
			t = GET(t);
			if(t.is('.screen-editor-item')){
				DRAG_TYPE = t.getAttributeNS('','data-type');
				DRAG_CATEGORY = t.parent('ul').getAttributeNS('','data-category');
				Ext.getBody().on('mouseup',sf.onItemListMouseUp,sf);
				dragEvent.fire();
			}
		},
		onItemListMouseUp : function(){
			dropEvent.fire();
		},
		onChildRemove : function(child){
			var sf = this,
				preChild = child.previousSibling,
				nextChild = child.nextSibling,
				array = sf.children,
				index = array.indexOf(child);
			child.ref={
				array:array,
				index:index,
				owner:sf
			}
			array.splice(index,1);
			if(preChild){
				preChild.nextSibling = nextChild;
			}
			if(nextChild){
				nextChild.previousSibling = preChild;
			}
			delete child.previousSibling;
			delete child.nextSibling;
			sf.redraw();
			child.un('destroy',sf.onChildRemove,sf);
			child.un('drag',sf.onChildRemove,sf);
		},
		create : function(record,index){
			var sf = this,
				type = Types.get(record.get(TAB_FIELD_TABTYPE));
			if(!type)return;
			var el = new pub[type](applyIfDefined({},getConfig(record),Options.get(type)));
			sf.add(el,index);
			return el;
		},
		add : function(obj,index){
			var sf = this,
				cindex = sf.children.indexOf(obj);
			if(cindex == index)return;
			else if(cindex != -1){
				sf.onChildRemove(obj);
			}
			sf.pushChild(obj,index);
			obj.on('destroy',sf.onChildRemove,sf);
			obj.on('drag',sf.onChildRemove,sf);
			sf.redraw();
			obj.focus();
			Proxy.un('hide',sf.onProxyHide,sf);
			Proxy.hide();
		},
		pushChild : function(child,index){
			var sf = this,
				children = sf.children,
				preChild = children[index-1],
				nextChild = children[index],
				cr;
			children.splice(index,0,child);
			if(preChild){
				child.previousSibling = preChild;
				preChild.nextSibling = child;
			}
			if(nextChild){
				nextChild.previousSibling = child;
				child.nextSibling = nextChild;
			}
			cr = child.getRecord();
			while(nextChild){
				var nr = nextChild.getRecord(),
					n_seq = nr.get(TAB_FIELD_TABSEQ),
					c_seq = cr.get(TAB_FIELD_TABSEQ);
				if(c_seq<n_seq){
					nextChild = null;
				}else{
					nr.set(TAB_FIELD_TABSEQ,c_seq - -1);
					cr = nextChild.getRecord();
					nextChild = nextChild.nextSibling;
				}
			}
			cr = child.getRecord();
			while(preChild){
				var pr = preChild.getRecord(),
					p_seq = pr.get(TAB_FIELD_TABSEQ),
					c_seq = cr.get(TAB_FIELD_TABSEQ);
				if(c_seq>p_seq){
					preChild = null;
				}else{
					pr.set(TAB_FIELD_TABSEQ,c_seq-1);
					cr = preChild.getRecord();
					preChild = preChild.previousSibling;
				}
			}
		},
		setScreenSize : function(size){
			var wh = size.split('*');
			screenWrap.setStyle({
				width : (screenwidth = Number(wh[0])) - 20 + 'px',
				height : (screenheight = Number(wh[1])) - 10 + 'px'
			});
			screenResizeEvent.fire(screenwidth,screenheight);
		}
	});
}();
$A.SliderBar = Ext.extend($A.Component, {
	initComponent : function(config){
		var sf = this;
		$A.SliderBar.superclass.initComponent.call(sf, config);
		var wrap = sf.wrap,
			opt = sf.options;
		sf.calib = wrap.child('.slider-bar-calib');
		sf.itemlist = wrap.child('.slider-bar-items');
		sf.tria = wrap.child('.slider-tria');
		sf.slider = wrap.child('.slider');
		if(opt) {
            sf.setOptions(opt);
		}else{
            sf.clearOptions();
		}
	},
	processListener : function(ou){
		var sf = this;
		$A.SliderBar.superclass.processListener.call(sf, ou);
		sf.wrap[ou]('mousedown',sf.onMouseDown,sf)
	},
	processDataSet: function(ou){
		var sf = this,
			ds = sf.optionDataSet,
			loadFn = sf.render;
		if(ds){
            ds[ou]('load', loadFn, sf);
            ds[ou]('query', loadFn, sf);
           	ds[ou]('add', loadFn, sf);
            ds[ou]('update', loadFn, sf);
            ds[ou]('remove', loadFn, sf);
            ds[ou]('clear', loadFn, sf);
            ds[ou]('reject', loadFn, sf);
		}
	},
	onMouseDown : function(e,t){
		var sf = this;
		t = Ext.fly(t);
		if(t.hasClass('slider')){
			sf.onSliderDown();
		}else if(t.hasClass('slider-bar-calib')||t.parent('.slider-bar-calib')){
			sf.onSliderMove(e);
		}
	},
	onSliderDown : function(){
		var sf = this;
		sf.slider.addClass('selected');
		Ext.getBody().on('mousemove',sf.onSliderMove,sf)
			.on('mouseup',sf.onSliderUp,sf);
	},
	onSliderMove : function(e){
		var sf = this,
			ds = sf.optionDataSet;
		if(ds){
			var records = ds.getAll();
			sf.setValue(records[MIN(MAX(0, ROUND((e.xy[1] - sf.wrap.getY()-12)/24)),records.length - 1)].get(sf.valuefield));
		}
	},
	onSliderUp : function(){
		var sf = this;
		sf.slider.removeClass('selected');
		Ext.getBody().un('mousemove',sf.onSliderMove,sf)
			.un('mouseup',sf.onSliderUp,sf);
	},
	setOptions : function(name){
		var sf = this,
			ds = typeof(name)==='string'?$(name) : name;
		if(sf.optionDataSet != ds){
			sf.processDataSet('un');
			sf.optionDataSet = ds;
			sf.processDataSet('on');
			sf.render();
			if(!Ext.isEmpty(sf.value)) sf.setValue(sf.value, true);
		}
	},
	clearOptions : function(){
		var sf = this;
		sf.processDataSet('un');
		sf.optionDataSet = null;
		sf.clear();
	},
	clear : function(){
		var sf = this;
		sf.calib.update('');
		sf.itemlist.update('');
	},
	render : function(){
		var sf= this,
			ds = sf.optionDataSet,
			records = ds.getAll(),
			length = records.length,
			displayfield = sf.displayfield;
		sf.calib.update(Array(length).join('<li></li>'));
		sf.itemlist.update(records.map(function(r,index){
			return '<li'+(function(){
				switch(index){
					case 0:
					case length-1:
					case ROUND((length-1)/2):return ' class="strong">';
					default:return '>';
				}	
			})()+r.get(displayfield)+'</li>';
		}).join(''));
		sf.tria.setStyle({
			'border-bottom-width':24*length - 24 + 'px'
		});
	},
	positionSlider : function(index){
		var sf = this;
		if(sf.selectIndex){
			sf.itemlist.select('li:nth-child('+(sf.selectIndex+1)+')').removeClass('selected');
		}
		sf.selectIndex = index;
		sf.itemlist.select('li:nth-child('+(index+1)+')').addClass('selected');
		sf.slider.setStyle({
			top:24*index+'px'
		});
	},
	setValue : function(v,silent){
		if(this.value == v)return;
		var sf = this,
			ds = sf.optionDataSet;
		$A.SliderBar.superclass.setValue.call(this, v, silent);
		if(ds){
			sf.positionSlider(ds.indexOf(ds.find('value',v)));
		}
	}
});
})();
