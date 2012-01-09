(function () {
	var devConfig = {
		order : 'libs/require/order',
		text : 'libs/require/text',
		mustache : 'libs/mustache/mustache-requirejs',
		view : 'views',
		templates : '../templates',
		nodeModel : 'models/node'
	},
	
	prodConfig = _.extend({
		templates : 'templates'
	}, devConfig);
	
	require.config({
		paths : devConfig
	});
	
	require([
			// Load our app module and pass it to our definition function
			'models/graph',
			'models/node/group'
			
			// Some plugins have to be loaded in order due to there non AMD compliance
			// Because these scripts are not "modules" they do not pass any values to the definition function below
		], function (Graph, Group) {
		
		var graph = new Graph();		
		graph.createView(function(graphView){
			/*nodes.bind('startLinkCreation', function(params){
				graph.set({
					dynamicArrow : {
						x1 : params.sourceX, 
						y1 : params.sourceY, 
						x2 : params.mouseX, 
						y2 : params.mouseY
					}
				});
			});*/
		});
		var group = new Group();
		group.addNode('models/node/timer/timer');
		group.addNode('models/node/console/console');
		group.addNode('models/node/show/show');
		group.addNode('models/node/show/show');
		group.addNode('models/node/maths/addition');
		group.addNode('models/node/maths/substraction');
		group.addNode('models/node/maths/multiplication');
		
	});
}());