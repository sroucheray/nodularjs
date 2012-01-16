define(['models/node/node', 'views/link'], function (Node, LinkView) {
	var linkFrom;

	return Backbone.Collection.extend({
		model : Node,
		add : function(nodes, options){
			Backbone.Collection.prototype.add.call(this, nodes, options);
		}
	});
});
