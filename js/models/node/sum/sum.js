define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : {
			name     : 'Somme',
			viewPath : 'views/node/sum/sum',
			inputs   : [
				{
					label	  : 'v0',
					'default' : 0
				},
				{
					label	  : 'v1',
					'default' : 0
				}
			],
			outputs  : [
				{
					label	  : 'result',
					'default' : 0
				}
			]
		},
		process : function(){
			var result = 0;
			_.each(this.get('inputValues'), function(val){
				result += val;
			});
			_.each(this.get('outputLinks'), function(outputLink){
				outputLink.node.updateInput(outputLink.connectorId, result);
			});
		}
	});
});
