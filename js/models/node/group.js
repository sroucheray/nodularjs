define(['models/node/node', 'collections/nodes', 'views/link'], function (Node, NodesCollection, LinkView) {
	var linkFrom;
	
	return Node.extend({
		defaults : {		
			name      : 'Group',
			viewPath  : 'views/node/group',
			inputs    : [],
			outputs   : [],
			canResize : false,
			coll : new NodesCollection()
		},
		addNode : function(nodePath){
			var coll = this.get('coll');
			require([nodePath], function(NodeModel){
				var nodeModel = new NodeModel();
				
				coll.add(nodeModel);
							
				require([nodeModel.get('viewPath')], function(NodeView){
					var nodeView = new NodeView({model:nodeModel});
					
					nodeModel.bind("change:inputs", function(){
						nodeView.render();
					});
					
					nodeModel.bind("change:outputs", function(){
						nodeView.render();
					});
					
					if(typeof nodeView.updateFromModel === 'function'){
						nodeModel.bind('change:model', nodeView.updateFromModel, nodeView);
					}
					
					nodeView.render();
					
					nodeView.bind('linkFrom', function(params){
						linkFrom = params;
					});
					
					nodeView.bind('linkTo', function(linkTo){
						var linkedNodes = {};
					
						if(linkFrom){
							linkedNodes.from = linkFrom.connectorType === 'from' ? linkFrom : linkTo;
							linkedNodes.to = linkedNodes.from === linkFrom ? linkTo : linkFrom;

							coll.get(linkedNodes.from.nodeId).linkTo(linkedNodes.from, coll.get(linkedNodes.to.nodeId), linkedNodes.to);
						}
					});
					
					nodeView.bind('cancelLink', function(params){
						LinkView.renderDynamicArrow();
					});
					
					nodeView.bind('startLinkCreation', function(params){
						LinkView.renderDynamicArrow(params);
					});
				});
			});
		}
	});
});
