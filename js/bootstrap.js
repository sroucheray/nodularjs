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
			'models/node/node',
			'views/node/node',
			'models/node/sum/sum',
			'views/node/sum/sum'
			
			// Some plugins have to be loaded in order due to there non AMD compliance
			// Because these scripts are not "modules" they do not pass any values to the definition function below
		], function (Node, NodeView, Sum, SumView) {
		
		var aNode = new Node();
		var aNodeView = new NodeView({
			model:aNode
		});
		
		aNode.bind("change:inputs", function(e){
			console.log("Render input", e);
			aNodeView.render();
		});
		
		aNode.bind("change:outputs", function(e){
			console.log("Render output", e);
			aNodeView.render();
		});
		
		
		aNode.setIOs({
				inputs : ["input1", "input2", "input3", "input4"],
				outputs : ["output1", "output2", "output3", "output4"]
		});
		
		
		var aNode2 = new Sum();
		var aNodeView2 = new SumView({
			model:aNode2
		});
		
		aNode2.bind("change:inputs", function(e){
			aNodeView2.render();
		});
		
		aNode2.bind("change:outputs", function(e){
			aNodeView2.render();
		});
		
		
		aNode2.setIOs({
				inputs : ["data 1", "entrée n°2", "test"],
				outputs : ["simple sortie1", "o2"], 
		});
		
	});
}());