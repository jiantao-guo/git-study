/*
    var jms = new JMS();
    jms.sendMessage('topic', 'message', [{
        key: 'key1',
        value: 'value1'
    }, {
        key: 'key2',
        value: 'value2'
    }]);

 */

function JMS() {

}
/*
 * [{key:'kkkkey',value:'vvvalue'}]
 * 
 */
JMS.prototype.sendMessage = function(topic, message, properties, trx) {
	var context = $ctx.getData();
	var pps = new CompositeMap('property').getData();
	properties = properties || [];
	for ( var i = 0; i < properties.length; i++) {
		var p = this.createProperty(properties[i]);
		p.putToMap(context, pps, true);
	}
	var msg = new Packages.aurora.application.features.msg.Message(message, pps);
	var dispatcher = null;
	if (trx) {
		dispatcher = $ctx['_instance.aurora.application.features.msg.IMessageDispatcher'];
	} else {
		var messageStub = $instance('aurora.application.features.msg.IMessageStub');
		dispatcher = messageStub.getDispatcher();
	}
	dispatcher.send(topic, msg, context);
};

JMS.prototype.createProperty = function(obj) {
	var p = new Packages.aurora.application.features.msg.Property();
	p.setKey(obj.key);
	p.setValue(obj.value);
	return p;
};
