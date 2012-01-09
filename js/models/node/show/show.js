define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return {
				name     : 'Show',
				viewPath : 'views/node/show/show',
				canResize: true,
				inputs   : [
					{
						label : 'show',
						default	  : ''
					}
				]
			}
		},
		setInputValue : function (inputId, val){
			this.trigger('change:model', val);
		}
	});
});
