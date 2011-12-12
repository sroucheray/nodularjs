define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		initialize : function (params) {
			var defaults = {
				name:'Somme',
				viewPath:'views/node/sum/sum',
				inputs : ['v0', 'v1'],
				outputs : 'result',
			};
			
			NodeModel.prototype.initialize.call(this, _.extend(defaults, params));
		}
	});
});
