define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return this.mergeDefaults({
				name     : 'Console.log',
				inputs   : [
					{
						label : 'log',
						'default' : ''
					}
				]
			});
		},
		setInputValue : function (inputId, val){
			console.log(val);
		}
	});
});
