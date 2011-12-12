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
			
			this.bind('change:dynamicArrow', function(){
				graphView.renderDynamicArrow(this.get('dynamicArrow'));
			})
			
			this.bind('change:arrows', function(){
				graphView.renderArrows(this.get('arrows'));
			})
			
			callBack.call(this, graphView);
		}
	});
});
