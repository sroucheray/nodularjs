define(function () {
	return Backbone.Model.extend({
		initialize : function (params) {
			var defaults = {
				name:'Bypass',
				viewPath:'views/node/node',
				inputs :  'input',
				outputs : 'output',
				canResize : false
			};
			
			_.extend(defaults, params);
			
			if(defaults.hasOwnProperty('inputs')){
				this.setIOLabels({inputs:defaults.inputs});
				delete defaults.inputs;
			}
			
			if(defaults.hasOwnProperty('outputs')){
				this.setIOLabels({outputs:defaults.outputs});
				delete defaults.outputs;
			}
			
			this.set(defaults);
		},
		setIOLabels : function (ios) {
			if(!_.isEmpty(ios)){
				if (_.isArray(ios.inputs)) {
					this.set({
						'inputs' : ios.inputs
					});
				} else if (_.isString(ios.inputs)) {
					this.set({
						'inputs' : ios.inputs.split(",")
					});
				}
				
				if (_.isArray(ios.outputs)) {
					this.set({
						'outputs' : ios.outputs
					});
				} else if (_.isString(ios.outputs)) {
					this.set({
						'outputs' : ios.outputs.split(",")
					});
				}
			}
		},
		updateInput : function (inputName, value){
			console.log("Update input", inputName, value);
		},
		createView : function (callBack) {
			var thisModel = this;
			require([this.get('viewPath')], function(NodeView){
				var aNodeView = new NodeView({
					model:thisModel
				});
				
				thisModel.bind("change:inputs", function(e){
					aNodeView.render();
				});
				
				thisModel.bind("change:outputs", function(e){
					aNodeView.render();
				});
				
				
				callBack.call(thisModel, aNodeView);
			});
		}
	});
});
