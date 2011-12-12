define(['models/link'], function (Link) {
	return Backbone.Collection.extend({
		model : Link,
		initialize : function(params){
			
		},
		createLink : function(source, target){
			console.log(target, source);
			//connectorElmnt jQuery(span#c2output.connector?)
			//connectorName "output"
			//connectorType to/from
			if(source.connectorType === target.connectorType){
				console.log('Error, can\'t connect two of the same type');
			}else{
				//TODO: test if the input is busy
				
			}
		}
	});
});
