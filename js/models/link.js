define(["views/link"], function (LinkView) {
	return Backbone.Model.extend({
		defaults : {
			isValid : false
		},
		initialize : function (params) {
			var from = params.from,
				to = params.to;
			
			if(from.nodeId === to.nodeId){
				if(from.connectorId === to.connectorId){
					console.log("Same connector");
				}else{
					console.log("Simple Circular reference");
				}
				//TODO: check for advanced circular references (maybe outside from here)
			}else if(from.connectorType === to.connectorType){
				console.log("Connector are of the same type");
			}else{
				console.log("link created");
				this.set({isValid:true, id:from.connectorId+to.connectorId});
			}
		},
		createView : function (callBack) {
			var aLinkView = new LinkView({
				from : this.get('from'), 
				to   : this.get('to'),
				id   : this.id,
				model : this
			});
			callBack.call(this, aLinkView);
		}
	});
});
