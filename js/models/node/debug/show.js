define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return {
				name     : 'Show',
				viewPath : 'views/node/debug/show',
				canResize: true,
				inputs   : [
					{
						label : 'show',
						'default' : ''
					}
				],
				outputs	: [
					{
						label : 'shown',
						'default' : ''
					}
				]
			};
		},
		setInputValue : function (inputId, val){
			NodeModel.prototype.setInputValue.call(this, inputId, val);
			this.trigger('change:model', val);
		}
	});
});
