define(['models/link'], function (Link) {
	return Backbone.Collection.extend({
		model : Link,
		initialize : function(params){
			
		},
		add : function(link, nodeA, nodeB){
			
			//TODO: test for circular reference 
			console.log("Create link view");
			
			link.createView(function(view){
				view.render();
				
				nodeA.bind('renderInvalidation', function(){
					view.render();
				});
				
				nodeB.bind('renderInvalidation', function(){
					view.render();
				});
				//TODO: should remove the bindings on link remove
			});
			
			Backbone.Collection.prototype.add.call(this, link);
		}
	});
});
