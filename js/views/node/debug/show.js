define(['views/node/node', 'text!templates/node/show/body.html'], function (NodeView, BodyTemplate) {
	return NodeView.extend({
		tagName : 'div', 
		className : 'node',
		render : function (partials) {
			var defaults = {
				body:BodyTemplate
			};
			_.extend(defaults, partials);
			
			NodeView.prototype.render.call(this, defaults);
			
			this.$show = $(this.el).find('.show-show');

			return this;
		},
		updateFromModel : function(val){
			this.$show.html(String(val));
		}
	});
});
