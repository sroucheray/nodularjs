define(['views/node/node', 'text!templates/node/timer/body.html'], function (NodeView, BodyTemplate) {
	
	return NodeView.extend({
		tagName : 'div', 
		className : 'node',
		render : function (partials) {
			var defaults = {
				body:BodyTemplate
			};
			_.extend(defaults, partials);
			
			NodeView.prototype.render.call(this, defaults);
			
			return this;
		},
		events: function(){
			return _.extend({
				'click .start' : 'start',
				'click .pause' : 'pause',
				'click .stop'  : 'stop'
			}, NodeView.prototype.events.call(this));
		},
		start : function(){
			this.model.start();
		},
		pause : function(){
			this.model.pause();
		},
		stop : function(){
			this.model.stop();
		}
	});
});
