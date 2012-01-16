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
			'views/graph',
			'models/selector',		
			'models/node/group'
			
			// Some plugins have to be loaded in order due to there non AMD compliance
			// Because these scripts are not "modules" they do not pass any values to the definition function below
		], function (GraphView, Selector, Group) {
		
		var graph = new GraphView(),
			group = new Group(),
			selector = new Selector();
			
		selector.createView(function(view){
			view.render();
		});
		
		selector.bind('create:node', function(data){
			group.addNode('models/node/' + data.path, data);
		});
		
		/*group.addNode('models/node/timer/timer');
		group.addNode('models/node/console/console');
		group.addNode('models/node/show/show');
		group.addNode('models/node/show/show');
		group.addNode('models/node/maths/addition');
		group.addNode('models/node/maths/substraction');
		group.addNode('models/node/maths/multiplication');*/
		
	});
}());