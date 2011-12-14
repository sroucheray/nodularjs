define(function (NodeTemplate, Mustache) {
	var $viewportContainer = $('#viewportContainer'),
		$body = $('body'),
		$viewport = $('#viewport'),
		isCtrlPressed = false;
	
			
	//Moving handlers
	function startMoveHandler(e) {
		var data;
			
		if(isCtrlPressed){
			data = {
				offsetX : e.originalEvent.pageX,
				offsetY : e.originalEvent.pageY,
				oPos : $viewport.position()
			};
			
			$viewportContainer.addClass('dragging');
			
			$viewportContainer.on('mousemove', '', data, movingHandler);
			
			$viewportContainer.on('mouseup', '#viewport', data, endMoveHandler);

			$body.on('mouseup', '', data, endMoveHandler);
		}
	}

	function movingHandler(e) {
		var d = e.data,
			deltaOffset = 2,
			xOffset = deltaOffset * (e.originalEvent.pageX - d.offsetX) + d.oPos.left,
			yOffset = deltaOffset * (e.originalEvent.pageY - d.offsetY) + d.oPos.top,
			textOffsetOne = xOffset + 'px ' + yOffset + 'px',
			textOffsetTwo = (xOffset-1) + 'px ' + (yOffset-1) + 'px',
			backgroundPositionText = textOffsetTwo + ',' + textOffsetTwo + ',' + textOffsetOne + ',' + textOffsetOne;
		
		$viewport.css({
			'left' : xOffset + 'px',
			'top' : yOffset + 'px'
		});
				
		$viewportContainer.css('backgroundPosition', backgroundPositionText);
	}

	function endMoveHandler(e) {
		$viewportContainer.off('mousemove', '', movingHandler);
		$viewportContainer.removeClass('dragging');
	}
	
	
	//Register handlers
	$('body').on({'mousedown' : startMoveHandler}, '#viewportContainer');
	
	//handle keypress
	$(document).on({'keydown keyup' : function(e){
		isCtrlPressed = e.type === 'keydown' && e.ctrlKey;
		
		$viewportContainer.toggleClass('draggable', isCtrlPressed);
		
		if(!isCtrlPressed){
			$viewportContainer
				.off('mousemove', '', movingHandler)
				.removeClass('dragging');
		}
	}});
	
	return Backbone.View.extend({
		tagName : 'body'
	});
});
