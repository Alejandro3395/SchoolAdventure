var preload = preload || {};
var mystyle = { font: "50px Arial black", fill: "#ffffff" };
var sound;
var killSound;

preload ={
		


	preload: function(){

		var text1 = game.add.text(game.world.centerX-150, 450, "Cargando ...", mystyle);
	    text1.stroke = "#000";
	    text1.strokeThickness = 16;
	    //  Apply the shadow to the Stroke only
	    text1.setShadow(2, 2, "#333333", 2, true, false);
		this.logo = game.add.sprite(game.world.centerX,game.world.centerY-50,'logo');
		this.logo.anchor.setTo(0.5);


		game.load.tilemap('map', 'assets/tilemap_src/json/level1_bookman.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile1','assets/tilemap_src/tiles/book-tileset.png');
		game.load.image('tile2','assets/tilemap_src/tiles/default_tiles_x.png');
		game.load.image('tile3','assets/tilemap_src/tiles/woodlandinn.png');
		game.load.image('tile4','assets/tilemap_src/tiles/open_tileset_2x.png');
		game.load.image('book','assets/tilemap_src/tiles/book.png');
		game.load.image('life', 'assets/lifes.png');
		game.load.spritesheet('enemy3','assets/player/green_penguin.png',32,32);
		game.load.spritesheet('enemy4','assets/player/orange_penguin.png',32,32);
		game.load.spritesheet('enemy','assets/player/red_penguin.png',32,32);
		game.load.spritesheet('enemy2','assets/player/pink_penguin.png',32,32);
		game.load.spritesheet('player','assets/player/player_penguin.png', 32,32);
		game.load.image('button','assets/button.png');
		game.load.audio('backgroundSound','assets/sounds/backgroundSound.mp3');
		game.load.audio('killSound','assets/sounds/shh.mp3');
		game.stage.backgroundColor = "#848484";
		game.time.advancedTiming = true;
		// Set the world size
	    game.world.setBounds(0, 0, 800, 600);

	    //Start the Arcade Physics systems
    	game.physics.startSystem(Phaser.Physics.ARCADE);
  


	},
	create: function(){
		sound = game.add.audio('backgroundSound');
		sound.loop=true;
		killSound = game.add.audio('killSound');
	},

	update: function(){
		if(sound.isDecoded){
			game.state.start("level1");		
		}
	}
}