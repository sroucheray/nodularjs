define(['models/node/node'], function (NodeModel) {
	return NodeModel.extend({
		defaults : function(){
			return {		
				name     : 'Timer',
				viewPath : 'views/node/time/timer',
				inputs   : [],
				outputs	 : [
					{
						label : 'frames',
						'default' : 0
					}
				],
				canResize : false
			};
		},
		initialize : function(params){
			NodeModel.prototype.initialize.call(this, params);
			var timer = this;
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame       || 
						window.webkitRequestAnimationFrame || 
						window.mozRequestAnimationFrame    || 
						window.oRequestAnimationFrame      || 
						window.msRequestAnimationFrame     || 
						function( callback ){
							window.setTimeout(callback, 1000 / 60);
						};
			}());
			
			this.frames = 0;
			
			this.frameRequest = function(){
				if(!timer.isPaused){
					window.requestAnimFrame(timer.frameRequest);
					timer.setOutputValue(null, ++timer.frames);
				}
			};
		},
		start : function(){
			this.process();
		},
		pause : function(){
			this.isPaused = true;
		},
		stop : function(){
			this.pause();
			this.frames = 0;
			this.setOutputValue(null, 0);
		},
		process : function(){
			this.isPaused = false;
			this.frameRequest();
		}
	});
});
