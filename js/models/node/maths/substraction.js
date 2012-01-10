define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return this.mergeDefaults({
				name     : 'Substraction',
				templates : {
					body : 'a - b'
				},
				inputs   : [
					{
						label	  : 'a',
						'default' : 0
					},
					{
						label	  : 'b',
						'default' : 0
					}
				],
				outputs  : [
					{
						label	  : 'result',
						'default' : 0
					}
				]
			});
		},
		process : function(){
			var inputs = this.get('inputs');
			this.setOutputValue(null, inputs[0].value - inputs[1].value);
		}
	});
});
