define(['text!templates/selector.html', 'mustache'], function (SelectorTemplate, Mustache) {
	return Backbone.View.extend({
		id : 'selector',
		initialize : function(){
		},
		render : function(){
			var selector = this,
				$el = $('#selector'),
				$sb, $spans, $notices;
				
			$.getJSON('js/models/nodes.json', function(data) {
				$el.html(Mustache.to_html(SelectorTemplate, data));
				
				$sb = $el.children('.searchbox');
				$spans = $el.find('span').not('.notice');
				$notices = $el.find('.notice');
				
				//Handle filtering
				$sb.keyup(function(){
					//TODO: filtering input
					$spans.show().not('[data-cat*="'+$sb.val()+'"]').not('[data-tags*="'+$sb.val()+'"]').hide();
					
					$notices.each(function(index, notice){
						var $notice = $(notice),
							$next = $notice.nextUntil('.notice:visible').filter(':visible');
						$notice.toggle($next.length !== 0);
					});
				});	
				
				
				
				////////////////
				
				$el.on({
					'dragstart' : function (e) {
						e.originalEvent.dataTransfer.effectAllowed = 'copy';
						e.originalEvent.dataTransfer.setData("text/plain", $(this).data('path'));
						// this/e.target is the source node.
						$(this).addClass('moving');
					},
					'dragend' : function (e) {
						$spans.each(function(index, span){
							$(span).removeClass('moving');
						});
					}
				}, 'span');
				
				$('#viewport').on({
					'dragenter' : function (e) {
						$(this).addClass('over');
					},
					'dragover'  : function (e) {
						if (e.preventDefault) {
							e.preventDefault(); // Allows us to drop.
						}
						e.originalEvent.dataTransfer.dropEffect = 'copy';
						//console.log(e.originalEvent.offsetX)
						return false;
					},
					'dragleave' : function (e) {
						// this/e.target is previous target element.
						$(this).removeClass('over');
					},
					'drop' : function (e) {
						// this/e.target is current target element.
						if (e.stopPropagation) {
							e.stopPropagation(); // stops the browser from redirecting.
						}
						selector.model.trigger('create:node', {
							path : e.originalEvent.dataTransfer.getData("text/plain"),
							x : e.originalEvent.offsetX || e.originalEvent.layerX,
							y : e.originalEvent.offsetY || e.originalEvent.layerY,
						});
						return false;
					}
				});
				
				
				/*$spans.each(function(index, span){
					var $span = $(span);
					span.setAttribute('draggable', 'true'); // Enable columns to be draggable.
					$span.on('dragstart', handleDragStart, false);
					$span.addEventListener('dragenter', handleDragEnter, false);
					$span.addEventListener('dragover', handleDragOver, false);
					$span.addEventListener('dragleave', handleDragLeave, false);
					$span.addEventListener('drop', handleDrop, false);
					$span.addEventListener('dragend', handleDragEnd, false);
				});*/
				/*[].forEach.call(cols_, function (col) {
					col.setAttribute('draggable', 'true'); // Enable columns to be draggable.
					col.addEventListener('dragstart', this.handleDragStart, false);
					col.addEventListener('dragenter', this.handleDragEnter, false);
					col.addEventListener('dragover', this.handleDragOver, false);
					col.addEventListener('dragleave', this.handleDragLeave, false);
					col.addEventListener('drop', this.handleDrop, false);
					col.addEventListener('dragend', this.handleDragEnd, false);
				});*/
				
				
				
				
				
				///////////////
				
				
				
			});		
		}
	});
});
