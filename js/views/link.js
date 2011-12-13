define(function () {
	var svg = $('#svgarrows').svg('get'),
		$arrowsGroup = $("svg #arrows"),
		$vp = $('#viewport'),
		arrowHeadWidth = 8,
		arrowHeadHeight = 5;
	
	return Backbone.View.extend({
		initialize : function (params) {
			console.log("from inside view", params);
			this.$fromConnector = $('#' + params.from.connectorId);
			this.$toConnector = $('#' + params.to.connectorId);
			this.xOffsetFrom = this.$fromConnector.width();
			this.yOffsetFrom = this.$fromConnector.height() / 2;
			this.xOffsetTo = 0//$toConnector.width();
			this.yOffsetTo = this.$toConnector.height() / 2;
			this.svgLine = svg.line($arrowsGroup, 0, 0, 0, 0, {id:'svg-line-' + params.id});
			this.svgArrowHeadPath = svg.createPath();
			this.svgArrowHead = svg.path(
				$arrowsGroup, 
				this.svgArrowHeadPath.moveTo(-arrowHeadWidth, -arrowHeadHeight).line(0, 0).line(-arrowHeadWidth, arrowHeadHeight),{fill: 'none'});
		},
		render : function () {
			var fromPos = this.$fromConnector.offset(),
				toPos = this.$toConnector.offset(),
				vpOffset = $vp.position(),
				line = {
					x1:fromPos.left + this.xOffsetFrom - vpOffset.left, 
					y1:fromPos.top  + this.yOffsetFrom - vpOffset.top, 
					x2:toPos.left   + this.xOffsetTo - vpOffset.left, 
					y2:toPos.top    + this.yOffsetTo - vpOffset.top
				},
				angle = Math.atan2(line.y1 - line.y2, line.x1 - line.x2) * 180 / Math.PI + 180;
			
			svg.change(this.svgLine, line);
			
			
			svg.change(this.svgArrowHead, {
				transform:'translate('+line.x2+','+line.y2+') rotate('+angle+')'
			});
			
			return this;
		},
		remove : function(){
			console.log('remove links');
		}
	});
});
