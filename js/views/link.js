define(function () {
	var $svg = $('#svgarrows'),
		$vp = $('#viewport'),
		arrowHeadWidth = 8,
		arrowHeadHeight = 5,
		svg, svgArrowGroup, svgTempLine, svgTempArrowHead, svgTempArrowHeadPath;

	$svg.svg({onLoad: function(svgCanvas){
		svg = svgCanvas;
		svgArrowGroup = svg.group({stroke: '#AAAAAA', strokeWidth: 1});
		svg.group({stroke: '#AAAAAA', strokeWidth: 1, id:'arrows'});
	
		svgTempLine = svg.line(svgArrowGroup, 0, 0, 0, 0, {id:'svg-line-temparrow'});
		svgTempArrowHeadPath = svg.createPath();
		svgTempArrowHead = svg.path(svgArrowGroup, createArrowHead(svgTempArrowHeadPath),{fill: 'none'});
	}});
	
		
	$(svgArrowGroup).on({
		'mouseover' : function(){
			var $this = $(this);
			$this.add($this.next()).attr({
				stroke : '#000000',
				strokeWidth : 2
			});
		},
		'mouseout' :  function(){
			var $this = $(this);
			$this.add($this.next()).attr({
				stroke : '#AAAAAA',
				strokeWidth : 1
			});
		}
	}, 'line');

	function renderArrow(line, arrowHead, params){
		var angle = Math.atan2(params.y1 - params.y2, params.x1 - params.x2) * 180 / Math.PI + 180;
			
		svg.change(arrowHead, {
			transform:'translate('+params.x2+','+params.y2+') rotate('+angle+')'
		});
		
		svg.change(line, params);
	}
	
	function createArrowHead(path){
		return path.moveTo(-arrowHeadWidth, -arrowHeadHeight).line(0, 0).line(-arrowHeadWidth, arrowHeadHeight);
	}
	
	return Backbone.View.extend({
		initialize : function (params) {
			console.log("from inside view", params);
			this.$fromConnector = $('#' + params.from.connectorId);
			this.$toConnector = $('#' + params.to.connectorId);
			this.xOffsetFrom = this.$fromConnector.width();
			this.yOffsetFrom = this.$fromConnector.height() / 2;
			this.xOffsetTo = 0;
			this.yOffsetTo = this.$toConnector.height() / 2;
			this.svgLine = svg.line(svgArrowGroup, 0, 0, 0, 0, {id:'svg-line-' + params.id});
			this.svgArrowHeadPath = svg.createPath();
			this.svgArrowHead = svg.path(svgArrowGroup, createArrowHead(this.svgArrowHeadPath),{fill: 'none'});
		},
		render : function () {
			var fromPos = this.$fromConnector.offset(),
				toPos = this.$toConnector.offset(),
				vpOffset = $vp.position(),
				line = {
					x1	  : fromPos.left + this.xOffsetFrom - vpOffset.left, 
					y1	  : fromPos.top  + this.yOffsetFrom - vpOffset.top, 
					x2	  : toPos.left   + this.xOffsetTo - vpOffset.left, 
					y2	  : toPos.top    + this.yOffsetTo - vpOffset.top
				};
				
			renderArrow(this.svgLine, this.svgArrowHead, line);
			
			return this;
		},
		remove : function(){
			console.log('remove links');
		}
	}, {
		renderDynamicArrow : function(params){			
			if(!params){
				$(svgTempLine).add(svgTempArrowHead).hide();
				return;
			}
			
			$(svgTempLine).add(svgTempArrowHead).show();
			
			var $connector = params.connectorElmnt,
				mouseX = params.mouseX,
				mouseY = params.mouseY,
				vpOffset = $vp.position(),
				fromPos = $connector.offset(),
				line;
			
			
			if(params.connectorType === 'to'){
				line = {
					x2	  : fromPos.left - vpOffset.left, 
					y2	  : fromPos.top  + $connector.height() / 2 - vpOffset.top, 
					x1	  : mouseX - vpOffset.left, 
					y1	  : mouseY - vpOffset.top
				};
			}else{
				line  = {
					x1	  : fromPos.left + $connector.width() - vpOffset.left, 
					y1	  : fromPos.top  + $connector.height() / 2 - vpOffset.top, 
					x2	  : mouseX - vpOffset.left, 
					y2	  : mouseY - vpOffset.top
				};
			}
			
			renderArrow(svgTempLine, svgTempArrowHead, line);
		}
	});
});
