(function () {
	var devConfig = {
		/*jquery : 'js/libs/jquery/jquery',
		underscore : 'js/libs/underscore/underscore',
		backbone : 'js/libs/backbone/backbone',
		text : 'js/libs/require/text',*/
		order : 'libs/require/order',
		text : 'libs/require/text',
		mustache : 'libs/mustache/mustache-requirejs',
		view : 'views',
		templates : '../templates'
	};
	
	var prodConfig = _.extend({
		/*jquery : 'libs/jquery/jquery-min',
		underscore : 'libs/underscore/underscore-min',
		backbone : 'libs/backbone/backbone',
		text : 'libs/require/text',*/
		templates : 'templates'
	}, devConfig);
	
	require.config({
		paths : devConfig
	});
	
	require([
			// Load our app module and pass it to our definition function
			'collections/nodes',
			'models/graph',
			'models/node/group'
			
			// Some plugins have to be loaded in order due to there non AMD compliance
			// Because these scripts are not "modules" they do not pass any values to the definition function below
		], function (NodesCollection, Graph, Group) {
		
		//var nodes  = new NodesCollection();
		
		/*nodes.bind('linkTerminationFound', function(params){
			graph.set({'target' : params});
		});
		
		nodes.bind('linkTerminationNotFound', function(params){
			graph.unset('target');
		});
		*/
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
		group.addNode('models/node/sum/sum');
		
		//nodes.createNode('models/node/node');
		//nodes.createNode('models/node/sum/sum');		
	});
}());