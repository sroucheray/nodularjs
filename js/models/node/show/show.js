define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : {
			name     : 'Show',
			viewPath : 'views/node/show/show',
			inputs   : [
				{
					label : 'show',
					default	  : ''
				}
			]
		},
		setInputValue : function (inputId, val){
			this.trigger('change:model', val);
		}
	});
});
