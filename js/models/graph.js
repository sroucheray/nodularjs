define(['views/graph'], function (GraphView) {
	var targetNode;
	
	return Backbone.Model.extend({
		initialize : function(params){
			this.set({'arrows' : []});
		},
		createView : function (callBack) {
			var graphView = new GraphView({
				model : this
			});
			
			callBack.call(this, graphView);
		}
	});
});
