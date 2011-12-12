define(['views/node/node', 'text!templates/node/sum/body.html'], function (NodeView, BodySumTemplate) {
	
	return NodeView.extend({
		tagName : 'div', 
		className : 'node',
		render : function (partials) {
			var partials = {
				body:BodySumTemplate
			};
			
			NodeView.prototype.render.call(this, partials);
			
			return this;
		}
	});
});
