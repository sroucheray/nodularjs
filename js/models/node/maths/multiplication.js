define(['models/node/node'], function (NodeModel) {

	return NodeModel.extend({
		defaults : function(){
			return this.mergeDefaults({
				name     : 'Multiplication',
				templates : {
					body : 'a x b'
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
			this.trigger('process:output:' + this.get('outputs')[0].id, inputs[0].value * inputs[1].value);
		}
	});
});
