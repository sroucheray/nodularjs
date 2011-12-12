define(['models/node/node'], function (Node) {
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
					coll.bind('startLinkCreation', function(params){
						
						$(aNodeView.el).find('.connector').each(function(){
							if(!nodeViewTargetLink || nodeViewTargetLink === this){
								var $this = $(this),
									pos = $this.offset(),
									width = $this.width(),
									height = $this.height(),
									isOver = params.mouseX > pos.left && params.mouseX < pos.left + width &&
											 params.mouseY > pos.top && params.mouseY < pos.top + height;
								$this.toggleClass('over', isOver);
								
								var data = {
									connectorElmnt : $this,
									connectorName : $this.data('name'),
									connectorType : $this.hasClass('connector-in') ? 'to' : 'from'
								};
								
								
								if(isOver){
									nodeViewTargetLink = this;
									coll.trigger('linkTerminationFound', _.extend(data, {set : true}));
								}else if(nodeViewTargetLink === this){
									coll.trigger('linkTerminationNotFound', _.extend(data, {set : false}));
									nodeViewTargetLink = null;
								}
								
								//console.log(params.mouseX > pos.left && params.mouseX < pos.left + width,
								//		params.mouseY > pos.top && params.mouseY < pos.top + height);
							}
						});
						
					});
					
					aNodeView.bind('startLinkCreation', function(params){
						coll.trigger('startLinkCreation', _.extend({nodeSource : aNode}, params));
					});
					
					aNodeView.bind('endLinkCreation', function(params){
						coll.trigger('endLinkCreation', params);
					});
				});
			});
		}
	});
});
