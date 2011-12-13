define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : {
			name     : 'Somme',
			viewPath : 'views/node/sum/sum',
			inputs   : ['v0', 'v1'],
			outputs  : ['result'],
		}
	});
});
