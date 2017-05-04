// Objeto schoolAdventure
var adventure = adventure || {};

var map;
var backgroundlayer;
var cursors;
var player;
var groundLayer;
var collides;
var positionX;
var positionY;

//Crear clase boot
adventure = {
	
	create: function(){
    
    sound.play();
		//Start the Arcade Physics systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //Change the background colour
    game.stage.backgroundColor = "#a9f0ff";
 
    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    map = this.game.add.tilemap('map');
    map.addTilesetImage('patron1', 'tiles1');
    map.addTilesetImage('meetingpoint','meeting');
    map.addTilesetImage('patron2','tiles2');
    map.addTilesetImage('patron3','tiles3');

 
    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    middleGround = map.createLayer('middleGround'); 
    backgroundlayer = map.createLayer('BackgroundLayer');
    groundLayer = map.createLayer('GroundLayer');
    

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(0, 700, true, 'GroundLayer');
    map.setCollisionBetween(2500, 3800, true, 'GroundLayer');  
    map.setCollisionBetween(1600, 1650, true, 'GroundLayer');
    map.setCollisionBetween(2381, 2382, true, 'GroundLayer');
    map.setCollisionBetween(2442, 2443, true, 'GroundLayer');    
    map.setCollisionBetween(3674, 4122, true, 'GroundLayer');
    map.setCollisionBetween(5600, 5620, true, 'GroundLayer');
    map.setCollisionBetween(6600, 7000, true, 'GroundLayer');
    map.setCollisionBetween(7000, 7300, true, 'GroundLayer');
    map.setCollisionBetween(7300, 8000, true, 'GroundLayer');
    map.setCollisionBetween(8100, 8500, true, 'GroundLayer');

    map.setCollisionBetween(10000, 11100, true, 'GroundLayer');





    //map.setTileIndexCallback([4109, 4110, 4111, 4112, 4113, 4114, 4115, 4116, 4117, 4118, 4119, 4120, 4121, 4122, 4123],this.hitBuild,this,"GroundLayer");
   
    map.setTileLocationCallback(23, 62, 8, 15, this.hitBuild, this, "GroundLayer");
    map.setTileLocationCallback(111,54,24,4,this.bookManCall, this, "GroundLayer");
    map.setTileLocationCallback(40,40,2,5,this.cafeCall, this, "GroundLayer");

    //Debug collisions layer
    groundLayer.debug = true;

 

    //Se verigica que sea la primera entrada al juego
     //Add the sprite to the game and enable arcade physics on it
    if (sessionStorage.started) {
        player = game.add.sprite(Number(sessionStorage.positionX),Number(sessionStorage.positionY), 'player');
    } else {
        sessionStorage.positionX = game.world.centerX*1.8;
        sessionStorage.positionY = game.world.centerY*6.3;
        sessionStorage.started = 1;
        player = game.add.sprite(Number(sessionStorage.positionX),Number(sessionStorage.positionY), 'player');
    }
  
    player.debug = true;
    player.frame = 1;
    game.physics.arcade.enable(player);
 
    //Change the world size to match the size of this layer
    groundLayer.resizeWorld();


 
    //Create a running animation for the sprite and play it
    player.animations.add('right', [3,5,4], 10, true);

    player.animations.add('left',[11,10,9],10,true);

    player.animations.add('up', [0,1,2], 10, true);

    player.animations.add('down', [6,7,8], 10, true);


    player.animations.add('idle',[0],10,true);
    //Make the camera follow the sprite
    game.camera.follow(player);


    //Enable cursor keys so we can create some controls
    cursors = game.input.keyboard.createCursorKeys();

    var text1 = game.add.text(16*23,16*66, "Edificio \n     A", style2);
    var text2 = game.add.text(16*23,16*43, "Edificio \n     E", style2);
    var text2 = game.add.text(16*33,16*41, "Cafeteria", style2);
    var text2 = game.add.text(16*35,16*47, "Edificio\n      F", style2);
    var text3 = game.add.text(16*29,16*25, "Edificio \n     C", style2);
    var text4 = game.add.text(16*75,16*25, "Edificio \n     D", style2);
    var text5 = game.add.text(16*78,16*2, "Edificio \n     H", style2);
    var text6 = game.add.text(16*58,16*68, "Edificio \n     B", style2);
    var text7 = game.add.text(16*120,16*52, "Biblioteca", style2);





    },

	hitBuild: function(sprite, tile) {
        sessionStorage.positionX = sprite.x+5;
        sessionStorage.positionY = sprite.y;
	    window.location = ("tetris/index.html");
	    return true;
	},

    bookManCall: function(sprite, tile) {
        sessionStorage.positionX = sprite.x;
        sessionStorage.positionY = sprite.y+5;
        window.location = ("book_man/index.html");
        return true;
    },

    cafeCall: function(sprite, tile) {
        sessionStorage.positionX = sprite.x+5;
        sessionStorage.positionY = sprite.y;
        window.location = ("cafe/cafeteria.html");
        return true;
    },





	update: function(){
    	game.physics.arcade.collide(player, groundLayer);
        player.body.velocity.set(0);
     
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
            player.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
            player.play('right');
        }
        else if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
            player.play('up');
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
            player.play('down');
        }
        else
        {
            player.animations.stop();
        }

	}
    
}