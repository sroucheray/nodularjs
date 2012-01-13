define(['views/selector'], function (SelectorView) {
	return Backbone.Model.extend({
		initialize : function(params){
		},
		createView : function (callBack) {
			var selectorView = new SelectorView({
				model : this
			});
			
			if(typeof callBack === 'function'){
				callBack.call(this, selectorView);
			}
		}
	});
});
