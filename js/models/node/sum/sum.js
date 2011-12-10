define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		initialize : function (params) {
			var defaults = {
				name:'Somme'
			};
			
			NodeModel.prototype.initialize.call(this, _.extend(defaults, params));
		}
	});
});
