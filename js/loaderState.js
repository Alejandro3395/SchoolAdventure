var preload = preload || {};
var style = { font: "50px Arial black", fill: "#ffffff" };
var style2 = { font: "27px Arial black", fill: "#000000" };

preload ={
		


	preload: function(){

		var text1 = game.add.text(game.world.centerX-150, 450, "Cargando ...", style);
	    text1.stroke = "#000000";
	    text1.strokeThickness = 16;
	    //  Apply the shadow to the Stroke only
	    text1.setShadow(2, 2, "#333333", 2, true, false);
		this.logo = game.add.sprite(game.world.centerX,game.world.centerY-50,'logo');
		this.logo.anchor.setTo(0.5);
		game.load.spritesheet('player', 'assets/player/ranger_m.png', 32, 32);
    	game.load.tilemap('map', 'assets/tilemaps/json/schoolAdventure.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.image('tiles1', 'assets/tilemaps/tiles/bunch_o__free_tiles_by_magiscarf-d6ih36g.png');
    	game.load.image('tiles2','assets/tilemaps/tiles/bunch_o__free_tiles_by_magiscarf-d6ih36g - copia.png');
        game.load.image('tiles3', 'assets/tilemaps/tiles/patron3.png');
        game.load.image('meeting','assets/meetingpoint.jpg');
        game.load.audio('mapsound','assets/sounds/mapSong.wav');
        game.stage.backgroundColor = "#848484";
  


	},
	create: function(){
		sound = game.add.audio('mapsound');
		sound.loop=true;
		
	},

	update: function(){
		if(sound.isDecoded){
			game.state.start("main");	
		}
	}
}