define(['views/node/node', 'text!templates/node/sum/body.html', "mustache"], function (NodeView, BodySumTemplate, Mustache) {
	
	return NodeView.extend({
		tagName : 'div', 
		className : 'node',
		initialize : function (params) {
			var $el = $(this.el);
			
			$el.attr({
				'id' : params.model.cid
			});
		},
		render : function (partials) {
			var partials = {
				body:BodySumTemplate
			};
			NodeView.prototype.render.call(this, partials);
			
			return this;
		}
	});
});
