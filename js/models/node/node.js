define(['views/link'], function (LinkView) {
	var NodeModel;
	
	function checkCircularReference(nodeTo, nodeFrom){
		var id = nodeFrom.id,
			isCircular;
		
		function isCircularReference(nodeTo){
			_.each(nodeTo.get('outputLinks'), function(outputLink){
				if(outputLink.node.id === id){
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
	
	NodeModel = Backbone.Model.extend({
		defaults : function(){
			return {		
				name     : 'Bypass',
				viewPath : 'views/node/node',
				inputs : [
					{
						label : 'input',
						'default' : null
					}
				],
				outputs : [
					{
						label : 'output',
						'default' : null
					}
				],
				canResize : false,
				selected : false
			};
		},
		mergeDefaults : function(newDefaults){
			_.defaults(newDefaults, NodeModel.prototype.defaults());
			return newDefaults;
		},
		initialize : function(params){
			_.each(this.get('inputs'), function(input){
				if(!input.hasOwnProperty('id')){
					input.id = _.uniqueId('input');
				}
				input.value = input['default'];
			});
			_.each(this.get('outputs'), function(output){
				if(!output.hasOwnProperty('id')){
					output.id = _.uniqueId('output');
				}
				output.value = output['default'];
			});
		
			this.set({
				inputLinks : [],
				outputLinks : [],
				id : _.uniqueId('node')
			});
			
		},
		linkTo : function(from, nodeTo, to){
			var nodeFrom = this,
				linkView, 
				outputLinks = this.get('outputLinks'), 
				linkAlreadyExist,
				nodeToUpdate,
				renderLink;
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
					//console.log('link created');
					
					outputLinks.push({
						node : nodeTo,
						connectorId : to.connectorId
					});
					
					nodeToUpdate = function(val){
						nodeTo.setInputValue(to.connectorId, val);
					};
					
					nodeFrom.bind('process:output:' + from.connectorId, nodeToUpdate, nodeTo);
					
					nodeToUpdate(nodeFrom.getOutputValue(from.connectorId));					
					
					linkView =	new LinkView({
						fromConnectorId : from.connectorId,
						toConnectorId   : to.connectorId
					});
					
					renderLink = function(){
						linkView.render();
					};
					
					renderLink();
					
					nodeFrom.bind('renderInvalidation', renderLink);
					nodeTo.bind('renderInvalidation', renderLink);
					
					linkView.bind('removeLink', function(){
						var outputLinks = _.reject(nodeFrom.get('outputLinks'), function(outputLink){
							return outputLink.node === nodeTo && outputLink.connectorId === to.connectorId;
						});

						nodeFrom.unbind('renderInvalidation', renderLink);
						nodeTo.unbind('renderInvalidation', renderLink);
						
						nodeFrom.set({'outputLinks' : outputLinks});

						linkView.remove();
						linkView = null;
						
						nodeFrom.unbind('process:output:' + from.connectorId, nodeToUpdate);
					});
				}
			}			
		},
		setInputValue : function (inputId, val){
			var input = _.find(this.get('inputs'), function(anInput){ 
				return anInput.id === inputId; 
			});
			if(input){
				input.value = val;
				//this.trigger('process:process', input);
				this.process();
			}
		},
		getInputValue : function(inputId){
			var input;
			if(!inputId){
				return this.get('inputs')[0].value;
			}else{
				input = _.find(this.get('inputs'), function(anInput){ 
					return anInput.id === inputId; 
				});
				
				return input.value;
			}
		},
		setOutputValue : function(outputId, val){
			var output;
			if(!outputId){
				this.get('outputs')[0].value = val;
				this.trigger('process:output:'+this.get('outputs')[0].id, val);
			}else{
				output = _.find(this.get('outputs'), function(anOutput){ 
					return anOutput.id === outputId; 
				});
				
				output.value = val;
				
				this.trigger('process:output:' + outputId, val);
			}
		},
		getOutputValue : function(outputId){
			var output;
			if(!outputId){
				return this.get('outputs')[0].value;
			}else{
				output = _.find(this.get('outputs'), function(anOutput){ 
					return anOutput.id === outputId; 
				});
				
				return output.value;
			}
		},
		process : function(){
			this.setOutputValue(null, this.getInputValue());
		}
	});
	
	return NodeModel;
});
