define(['models/node/node', 'views/link'], function (Node, LinkView) {
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
						var aLink, 
							linkedNodes = {};
					
						if(linkFrom){
							linkedNodes.from = linkFrom.connectorType === 'from' ? linkFrom : linkTo;
							linkedNodes.to = linkedNodes.from === linkFrom ? linkTo : linkFrom;

							coll.get(linkedNodes.from.nodeId).linkTo(linkedNodes.from, coll.get(linkedNodes.to.nodeId), linkedNodes.to);
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
