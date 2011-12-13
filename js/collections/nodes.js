define(['models/node/node', 'collections/links', 'models/link'], function (Node, LinksCollection, Link) {
	var links = new LinksCollection(),
		linkFrom;

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
								links.add(aLink, coll.getByCid(linkFrom.nodeId), coll.getByCid(linkTo.nodeId));
							}
						}
					});
					
					aNodeView.bind('cancelLink', function(params){
						linkFrom = null;
					});
				});
			});
		}
	});
});
