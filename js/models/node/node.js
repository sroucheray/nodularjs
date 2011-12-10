define(function () {

	return Backbone.Model.extend({
		initialize : function (params) {
			var defaults = {
				name:'Bypass'
			};
			
			this.set(_.extend(defaults, params));
		},
		setIOs : function (ios) {
			if(!_.isEmpty(ios)){
				if (_.isArray(ios.inputs)) {
					this.set({
						'inputs' : ios.inputs
					});
				} else if (_.isString(object)) {
					this.set({
						'inputs' : ios.inputs.split(",")
					});
				}
				
				if (_.isArray(ios.outputs)) {
					this.set({
						'outputs' : ios.outputs
					});
				} else if (_.isString(object)) {
					this.set({
						'outputs' : ios.outputs.split(",")
					});
				}
			}
		},
		coordinates : function () {},
		allowedToEdit : function (account) {
			return true;
		}
	});
});
