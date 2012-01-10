define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return {
				name     : 'Console.log',
				viewPath : 'views/node/node',
				inputs   : [
					{
						label : 'log',
						'default' : ''
					}
				]
			};
		},
		setInputValue : function (inputId, val){
			console.log(val);
		}
	});
});
