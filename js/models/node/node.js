define(function () {
	return Backbone.Model.extend({
		defaults : {		
			name      : 'Bypass',
			viewPath  : 'views/node/node',
			inputs    : ['input'],
			outputs   : ['output'],
			canResize : false
		},
		updateInput : function (inputName, value){
			console.log("Update input", inputName, value);
		},
		createView : function (callBack) {
			var thisModel = this;
			require([this.get('viewPath')], function(NodeView){
				var aNodeView = new NodeView({
					model:thisModel
				});
				
				thisModel.bind("change:inputs", function(e){
					aNodeView.render();
				});
				
				thisModel.bind("change:outputs", function(e){
					aNodeView.render();
				});
				
				callBack.call(thisModel, aNodeView);
			});
		}
	});
});
