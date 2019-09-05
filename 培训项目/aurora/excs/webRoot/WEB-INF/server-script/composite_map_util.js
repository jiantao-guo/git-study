importClass(Packages.uncertain.composite.CompositeLoader);

function CmUtil() {

}

CmUtil.prototype.addChild = function(parent, option) {
	var data;
	if (option.prefix && option.namespace) {
		data = new CompositeMap(option.prefix, option.namespace, option.tag);
	} else {
		data = new CompositeMap(option.tag);
	}
	if (option.text) {
		data.setText(option.text);
	}
	parent.addChild(data);
	return data;
}

CmUtil.prototype.createNode = function(option) {
	var data;
	if (option.prefix && option.namespace) {
		data = new CompositeMap(option.prefix, option.namespace, option.tag);
	} else {
		data = new CompositeMap(option.tag);
	}
	if (option.text) {
		data.setText(option.text);
	}
	return data;
}

CmUtil.prototype.parseXml = function(xmStr) {
	var loader = new CompositeLoader();
	var map = loader.loadFromString(xmStr);
	return new CompositeMap(map);
}