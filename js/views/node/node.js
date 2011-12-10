define(['text!templates/node/node.html', "mustache"], function (NodeTemplate, Mustache) {
	var $body = $('body');
	
	//Moving handlers
	function startMoveHandler(e) {
		var $node = $(this).parents('.node'),
			data = {
				el : $node,
				offsetX : e.originalEvent.pageX,
				offsetY : e.originalEvent.pageY,
				oPos : $node.position()
			};
			
		$('.node').css("z-index", "");
		
		$node.addClass("dragging").css("z-index", 1);
		
		$body.on('mousemove', "", data, movingHandler);
		
		$body.on('mouseup', '.node-header', data, endMoveHandler);

		$body.on('mouseup', "", data, endMoveHandler);
	}

	function movingHandler(e) {
		var d = e.data;
		
		d.el.css({
			'left' : e.originalEvent.pageX - d.offsetX + d.oPos.left + 'px',
			'top' : e.originalEvent.pageY - d.offsetY + d.oPos.top + 'px'
		});
	}

	function endMoveHandler(e) {
		$body.off('mousemove', "", movingHandler);
		
		e.data.el.removeClass("dragging");
	}
	
	//Resizing handlers
	function startResizeDownHandler(e) {
		var $node = $(this).parents('.node'),
			$content = $node.find(".node-content")
			data = {
				el : $content,
				offsetX : e.originalEvent.pageX,
				offsetY : e.originalEvent.pageY,
				oWidth : $content.width(),
				oHeight : $content.height()
			};
		console.log($node.size());	
		$('.node').css("z-index", "");
		
		$node.css("z-index", 1);
		
		$body.on('mousemove', "", data, resizingHandler);
		
		$body.on('mouseup', '.node-header', data, endResizeHandler);

		$body.on('mouseup', "", data, endResizeHandler);
	}
	
	function resizingHandler(e) {
		var d = e.data;
		
		d.el.css({
			'width' : e.originalEvent.pageX - d.offsetX + d.oWidth + 'px',
			'height' : e.originalEvent.pageY - d.offsetY + d.oHeight + 'px'
		});
	}

	function endResizeHandler(e) {
		$body.off('mousemove', "", resizingHandler);
	}
	
	//Register handlers
	$body.on({'mousedown' : startMoveHandler}, '.node-header');
	
	$body.on({'mousedown' : startResizeDownHandler}, '.resize-handler');
	
	
	return Backbone.View.extend({
		tagName : 'div', 
		className : 'node',
		initialize : function (params) {
			var $el = $(this.el);
			
			$el.attr({
				'id' : params.model.cid
			});
		},
		render : function (partials) {
			var $el = $(this.el);
			
			$el.html(Mustache.to_html(NodeTemplate, this.model.toJSON(), _.extend({header:"", body:"", footer:""}, partials)));
			
			$body.append($el);
			
			return this;
		}
	});
});
