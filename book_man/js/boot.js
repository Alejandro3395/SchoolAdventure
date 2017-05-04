var boot = boot || {};

boot ={

	preload: function(){
		game.load.image('logo','assets/logo_fmat.png');
		game.load.image('progressBar','assets/progressBar.jpg');
		
		
	},
	create: function(){
		


		game.state.start("preload");
	}
}