define(['views/link'], function (LinkView) {
	function checkCircularReference(nodeTo, nodeFrom){
		var id = nodeFrom.cid,
			isCircular;
		
		function isCircularReference(nodeTo){
			_.each(nodeTo.get('outputLinks'), function(outputLink){
				if(outputLink.node.cid === id){
					isCircular = true;
					return false;
				}else{
					isCircularReference(outputLink.node);
				}
			});
		}
		
		isCircularReference(nodeTo);
		
		return isCircular;
	}

	return Backbone.Model.extend({
		defaults : {		
			name     : 'Bypass',
			viewPath : 'views/node/node',
			inputs : [
				{
					label : 'input',
					defaultVal : null
				}
			],
			outputs : [
				{
					label : 'output',
					defaultVal : null
				}
			],
			canResize 		: false
		},
		initialize : function(params){
			_.each(this.get('inputs'), function(input){
				if(!input.hasOwnProperty('id')){
					input.id = _.uniqueId('input');
				}
			});
			_.each(this.get('outputs'), function(output){
				if(!output.hasOwnProperty('id')){
					output.id = _.uniqueId('output');
				}
			});
		
			this.set({
				inputLinks : [],
				outputLinks : []
			});
			
			this.inputValues = {};
		},
		linkTo : function(from, nodeTo, to){
			var nodeFrom = this,
				linkView, 
				outputLinks = this.get('outputLinks'), 
				linkAlreadyExist;
			if(from.nodeId === to.nodeId){
				if(from.connectorId === to.connectorId){
					console.log('Same connector');
				}else{
					console.log('Simple Circular reference');
				}
			}else if(from.connectorType === to.connectorType){
				console.log('Connector are of the same type');
			}else if(checkCircularReference(nodeTo, nodeFrom)){
				console.log('Advanced Circular reference');
			}else{
				linkAlreadyExist = _.find(outputLinks, function(outputLink){
					return outputLink.node === nodeTo && outputLink.connectorId === to.connectorId;
				});
				
				if(linkAlreadyExist){
					console.log("Link already exist");
				}else{				
					console.log('link created');
					
					outputLinks.push({
						node : nodeTo,
						connectorId : to.connectorId
					});
					console.log('process:output:' + from.connectorId);
					nodeFrom.bind('process:output:' + from.connectorId, function(val){
						nodeTo.setInputValue(to.connectorId, val);
					}, nodeTo);
						
					linkView =	new LinkView({
						fromConnectorId : from.connectorId,
						toConnectorId   : to.connectorId
					});
					
					linkView.render();
					
					nodeFrom.bind('renderInvalidation', linkView.render, linkView);
					nodeTo.bind('renderInvalidation', linkView.render, linkView);
					
					linkView.bind('removeLink', function(){
						var outputLinks = nodeFrom.get('outputLinks');

						nodeFrom.unbind('renderInvalidation', linkView.render);
						nodeTo.unbind('renderInvalidation', linkView.render);
						outputLinks = _.reject(nodeFrom.get('outputLinks'), function(outputLink){
							return outputLink.node === nodeTo && outputLink.connectorId === to.connectorId;
						});
						
						nodeFrom.set({'outputLinks' : outputLinks});
						linkView.remove();
						linkView = null;
						
						nodeFrom.unbind('process:output:' + from.connectorId);
					});
				}
			}			
		},
		setInputValue : function (inputId, val){
			var input = _.find(this.get('input'), function(anInput){ return anInput.id === inputId; });
			input.value = val;
			this.trigger('process:process', input);
		},
		process : function(){
			this.trigger('process:output', this.inputValues.input);
		}
	});
});
