define(['text!templates/node/node.html', 'mustache'], function (NodeTemplate, Mustache) {
	var $viewport = $('#viewport'),
		$body = $('body');
	
	//Moving handlers
	function startMoveHandler(e) {
		var $node = $(this).parents('.node'),
			data = {
				el : $node,
				offsetX : e.originalEvent.pageX,
				offsetY : e.originalEvent.pageY,
				oPos : $node.position()
			};
			
		$('.node').css('z-index', '');
		
		$node.addClass('dragging').css('z-index', 1);
		
		$viewport.on('mousemove', '', data, movingHandler);
		
		$body.on('mouseup', '', data, endMoveHandler);
		
		return false;
	}

	function movingHandler(e) {
		var d = e.data;
		
		d.el.css({
			'left' : e.originalEvent.pageX - d.offsetX + d.oPos.left + 'px',
			'top' : e.originalEvent.pageY - d.offsetY + d.oPos.top + 'px'
		});
		
		d.el.trigger('moving');
		
		return false;
	}

	function endMoveHandler(e) {
		$viewport.off('mousemove', '', movingHandler);
		
		e.data.el.removeClass('dragging');
		
		return false;
	}
	
	//Resizing handlers
	function startResizeDownHandler(e) {
		var $node = $(this).parents('.node'),
			$content = $node.find('.node-content'),
			data = {
				node : $node,
				el : $content,
				offsetX : e.originalEvent.pageX,
				offsetY : e.originalEvent.pageY,
				oWidth : $content.width(),
				oHeight : $content.height()
			};
		$('.node').css('z-index', '');
		
		$node.addClass('resizing').css('z-index', 1);
		
		$viewport.on('mousemove', '', data, resizingHandler);
		
		$body.on('mouseup', '', data, endResizeHandler);
		
		return false;
	}
	
	function resizingHandler(e) {
		var d = e.data;
		
		d.el.css({
			'width' : e.originalEvent.pageX - d.offsetX + d.oWidth + 'px',
			'height' : e.originalEvent.pageY - d.offsetY + d.oHeight + 'px'
		});
		
		d.el.trigger('resizing');
		
		return false;
	}

	function endResizeHandler(e) {
		e.data.node.removeClass('resizing');
		
		$viewport.off('mousemove', '', resizingHandler);
		
		return false;
	}
	
	//Register handlers
	$viewport.on({'mousedown' : startMoveHandler}, '.node-header');
	
	$viewport.on({'mousedown' : startResizeDownHandler}, '.resize-handler');
	
	
	return Backbone.View.extend({
		tagName : 'div', 
		className : 'node',
		events: function(){
			return {
				moving : 'renderInvalidation',
				resizing : 'renderInvalidation'
			};
		},
		initialize : function (params) {
			var $el = $(this.el),
				thisView = this;
			
			$el.attr({'id' : params.model.id});
			
			function moveForLinkCreationHandler(e){
				var offset = e.data.connectorElmnt.offset();
				
				thisView.trigger('startLinkCreation', _.extend({
						mouseX : e.originalEvent.pageX,
						mouseY : e.originalEvent.pageY
					},
					e.data)
				);
			}
			
			$el.on({'mousedown' : function(e){
				var $connector = $(this);
				
				thisView.trigger('linkFrom', {
					nodeId : $connector.data('node'),
					connectorId : $connector.attr('id'),
					connectorType : $connector.hasClass('connector-in') ? 'to' : 'from'
				});
			
				$body.on({'mousemove' : moveForLinkCreationHandler}, {
					connectorElmnt : $connector,
					connectorName : $connector.data('name'),
					connectorType : $connector.hasClass('connector-in') ? 'to' : 'from'
				});
			
			}}, '.connector');
			
			$el.on({'mouseup' : function(e){
				var $connector = $(this);
				
				thisView.trigger('linkTo', {
					nodeId : $connector.data('node'),
					connectorId : $connector.attr('id'),
					connectorType : $connector.hasClass('connector-in') ? 'to' : 'from'
				});
				
				//return false;
			}}, '.connector');
			
			
			$body.on({'mouseup' : function(e){
				thisView.trigger('cancelLink');
				$body.off({'mousemove' : moveForLinkCreationHandler});
			}});
			
		},
		render : function (partials) {
			var $el = $(this.el),
				$header,
				$viewportContent,
				$footer,
				$in,
				$out,
				templates = {
					header:'', 
					body:'', 
					footer:''
				},
				headerFooterHeight;
				
			if(this.model.has('templates')){
				_.extend(templates, this.model.get('templates'));
			}

			$el.html(Mustache.to_html(NodeTemplate, _.extend({cid:this.model.id}, this.model.toJSON()), _.extend(templates, partials)));
			
			$viewport.append($el);
			
			$header = $el.find('.node-header');
			$viewportContent = $el.find('.node-body');
			$footer = $el.find('.node-footer');
			$in = $el.find('.node-in');
			$out = $el.find('.node-out');
			
			headerFooterHeight = $header.outerHeight() + $footer.outerHeight();
			$el.children('.node-content').css({
				'minHeight' : Math.max($viewportContent.outerHeight() + headerFooterHeight, $in.outerHeight() + headerFooterHeight, $out.outerHeight() + headerFooterHeight),
				'minWidth'  : Math.max($viewportContent.outerWidth(), $header.outerWidth(), $in.outerWidth() + $out.outerWidth())
			});
			
			return this;
		},
		renderInvalidation : function(){
			this.model.trigger('renderInvalidation');
		}
	});
});
