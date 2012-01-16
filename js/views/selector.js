define(['text!templates/selector.html', 'mustache'], function (SelectorTemplate, Mustache) {
	var blankRegex = /\s+/;
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
					var inputTextArray = $sb.val().split(blankRegex),
						filteredSpans = $spans.show();
					
					_.each(inputTextArray, function(text){
						$spans.not('[data-cat*="'+text+'"]').not('[data-tags*="'+text+'"]').hide();
					});
					
					$notices.each(function(index, notice){
						var $notice = $(notice),
							$next = $notice.nextUntil('.notice:visible').filter(':visible');
						$notice.toggle($next.length !== 0);
					});
				});	
				
				
				//Handle drag and drop
				$el.on({
					'dragstart' : function (e) {
						e.originalEvent.dataTransfer.effectAllowed = 'copy';
						e.originalEvent.dataTransfer.setData("text/plain", $(this).data('path'));
						$(this).addClass('moving');
					},
					'dragend' : function (e) {
						$spans.each(function(index, span){
							$(span).removeClass('moving');
						});
					}
				}, 'span');
				
				$('#viewportContainer').on({
					'dragenter' : function (e) {
						$(this).addClass('over');
					},
					'dragover'  : function (e) {
						e.preventDefault();
						e.originalEvent.dataTransfer.dropEffect = 'copy';
						return false;
					},
					'dragleave' : function (e) {
						$(this).removeClass('over');
					},
					'drop' : function (e) {
						var viewportPos = $('#viewport').position();
						if (e.stopPropagation) {
							e.stopPropagation(); // stops the browser from redirecting.
						}
						selector.model.trigger('create:node', {
							path : e.originalEvent.dataTransfer.getData("text/plain"),
							viewState : {
								position : {
									left : (e.originalEvent.offsetX || e.originalEvent.layerX) - viewportPos.left,
									top :  (e.originalEvent.offsetY || e.originalEvent.layerY) - viewportPos.top
								}
							}
						});
						return false;
					}
				});
			});		
		}
	});
});
