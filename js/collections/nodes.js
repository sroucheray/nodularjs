define(['models/node/node', 'models/link', 'views/link'], function (Node, Link, LinkView) {
	var linkFrom;

	return Backbone.Collection.extend({
		model : Node,
		createNode : function(nodePath){
			var coll = this;
			require([nodePath], function(NodeModel, viewParams){
				var aNode = new NodeModel(),
					nodeViewTargetLink;
				
				coll.add(aNode);
				
				aNode.createView(function(aNodeView){
					aNodeView.render();
					
					aNodeView.bind('linkFrom', function(params){
						linkFrom = params;
					});
					
					aNodeView.bind('linkTo', function(linkTo){
						var aLink;
					
						if(linkFrom){
							aLink =	new Link({
								from : linkFrom.connectorType === 'from' ? linkFrom : linkTo,
								to   : linkTo.connectorType === 'to' ? linkTo : linkFrom
							});
							
							
							if(aLink.get('isValid')){
								aLink.createView(function(view){
									view.render();
									
									coll.getByCid(linkFrom.nodeId).bind('renderInvalidation', function(){
										view.render();
									});
									
									coll.getByCid(linkTo.nodeId).bind('renderInvalidation', function(){
										view.render();
									});
									//TODO: should remove the bindings on link remove
								});
							}
						}
					});
					
					aNodeView.bind('cancelLink', function(params){
						LinkView.renderDynamicArrow();
					});
					
					aNodeView.bind('startLinkCreation', function(params){
						LinkView.renderDynamicArrow(params);
					});
				});
			});
		}
	});
});
