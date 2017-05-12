var level2BM = level2BM || {};

var cursors;
var player;
var itemGroup;
var books=[];
var collectablesNum;
var  isValidTile=false;
var x,y;
var style = { font: "20px Arial black", fill: "#ffffffff" };
var lifes;
var counterPoints;
var scoreString = "";
var textpoints;
var gameoverText;
var winText;
var booksPicked ;
var totalLife ;

level2BM = {

	actionOnClick:function(){
		window.location = ("../schoolAdventure.html");
	},

	create: function(){
		collectablesNum = 40;
		booksPicked =0;
		totalLife = Number(sessionStorage.lives);
		counterPoints = Number(sessionStorage.points);

		sound.play();

		map  = this.game.add.tilemap('map');
		map.addTilesetImage('woodland','tile3');
		map.addTilesetImage('books','tile1');
		map.addTilesetImage('patron4','tile4');
		map.addTilesetImage('borders','tile2');
		spriteBatch = new Phaser.SpriteBatch(game.world);
		backgroundLayer = map.createLayer('BackgroundLayer');
		groundLayer = map.createLayer('GroundLayer');
		//add.button(x,y,callback)
		
	
		 map.setCollisionBetween(1, 520, true, 'GroundLayer');
		 map.setCollisionBetween(1000, 3200, true, 'GroundLayer');

		 itemGroup = game.add.group();

		 //putTile(tile, x, y, layer)
		 //map.putTile(null,0,1,groundLayer);

		groundLayer.debug = false;

		//game.add.image(0,0,'flatmap');



	    //*** Create all the books ***
	    for(i=0;i<collectablesNum;i++){
	    	while(!isValidTile){
	    		// ancho
				x= Math.floor(Math.random() * 32) + 1;
				// alto
				y= Math.floor(Math.random() * 17) + 1;

				x2= Math.floor(Math.random() * 38) + 1;
				y2= Math.floor(Math.random() * 14) + 1;

				x = Math.min(x,x2);
				y = Math.min(y,y2);

				

	    		if(!(map.hasTile(x, y, groundLayer))){
	    			isValidTile = true;
	    		} 
	    		
	    	}

	    	books[i] = game.add.sprite(x*tileSize, y*tileSize, "book");
	    	game.physics.arcade.enable(books[i]);
	    	isValidTile = false;
	    }
	    

	        		// ** Create player
		player = game.add.sprite(1 * tileSize, 1 * tileSize, 'player', 0);
	    player.animations.add('N', [0, 1, 2,3, 4, 5, 6, 7], 10, true);
	    player.animations.add('S', [24, 25, 26,27, 28, 29, 30, 31], 10, true);
	    player.animations.add('W', [16, 17, 18,19, 20, 21, 22, 23], 10, true);
	    player.animations.add('E', [8, 9, 10,11, 12, 13, 14, 15], 10, true);

	

		//  ***  create an enemy   ***  
	    librarian = game.add.sprite(23 * tileSize, 1 * tileSize, 'enemy', 0);
	    librarian.animations.add('N', [0, 1, 2,3, 4, 5, 6, 7], 10, true);
	    librarian.animations.add('S', [24, 25, 26,27, 28, 29, 30, 31], 10, true);
	    librarian.animations.add('W', [16, 17, 18,19, 20, 21, 22, 23], 10, true);
	    librarian.animations.add('E', [8, 9, 10,11, 12, 13, 14, 15], 10, true);

	    		//  ***  create an enemy2   ***  
	    librarian2 = game.add.sprite(2* tileSize, 15 * tileSize, 'enemy2', 0);
	    librarian2.animations.add('N', [0, 1, 2,3, 4, 5, 6, 7], 10, true);
	    librarian2.animations.add('S', [24, 25, 26,27, 28, 29, 30, 31], 10, true);
	    librarian2.animations.add('W', [16, 17, 18,19, 20, 21, 22, 23], 10, true);
	    librarian2.animations.add('E', [8, 9, 10,11, 12, 13, 14, 15], 10, true);

	    	    		//  ***  create an enemy3   ***  
	    librarian3 = game.add.sprite(17* tileSize, 15 * tileSize, 'enemy3', 0);
	    librarian3.animations.add('N', [0, 1, 2,3, 4, 5, 6, 7], 10, true);
	    librarian3.animations.add('S', [24, 25, 26,27, 28, 29, 30, 31], 10, true);
	    librarian3.animations.add('W', [16, 17, 18,19, 20, 21, 22, 23], 10, true);
	    librarian3.animations.add('E', [8, 9, 10,11, 12, 13, 14, 15], 10, true);


	
	        
	     game.physics.arcade.enable(player);
	    // enable physics on the librarians enemy
	    game.physics.arcade.enable(librarian);
	    game.physics.arcade.enable(librarian2);
	    game.physics.arcade.enable(librarian3);

	    librarian.body.collideWorldBounds = true;
	    librarian2.body.collideWorldBounds = true;
	    librarian3.body.collideWorldBounds = true;


	    setInterval(function(){ 

		    easystar.findPath(currentEnemy2Xtile, currentEnemyY2tile, currentPlayerXtile, currentPlayerYtile, function( path ) {
		        		

		        	    if (path === null) {
		        	        console.log("The path to the destination point was not found.");
		        	    } 
		        	    
		        	    if (path) {
		        	    	currentNextPointX = path[1].x;
		        	        currentNextPointY = path[1].y;
		        	    }


						if (currentNextPointX == currentEnemy2Xtile && currentNextPointY < currentEnemyY2tile)
		        	    {
		        	    	// up 	
		        	    	enemy2Direction = "N";
		        	     
		        	    	
		        	    }

		        	    else if (currentNextPointX < currentEnemy2Xtile && currentNextPointY == currentEnemyY2tile)
		        	    {
		        	    	// left
		        	     
		        	    	enemy2Direction = "W";
		        	    	
		        	    }
		        	    else if (currentNextPointX > currentEnemy2Xtile && currentNextPointY == currentEnemyY2tile)
		        	    {
		        	   

		        	    	// right
		        	    	enemy2Direction = "E";
		        	    
		        	    }

		        	    else if (currentNextPointX == currentEnemy2Xtile && currentNextPointY > currentEnemyY2tile)
		        	    {
		        	 

		        	    	// down   	
		        	    	enemy2Direction = "S";
		        	    	
		        	    }

		        	    else
		        	    {
		        	    	
		        	    	enemy2Direction = "STOP";
		        	    	
		        	    }
		        	    
		        	    if (enemy2Direction != "STOP"){
		        	    	librarian2.animations.play(enemy2Direction);
		        			
		        		}
		        	    
		        });

		       		easystar.calculate();
		        	
		        }, timeStep);

	    setInterval(function(){ 
	        	
	        easystar.findPath(currentEnemyXtile, currentEnemyYtile, currentPlayerXtile, currentPlayerYtile, function( path ) {
	        	    if (path === null) {
	        	        console.log("The path to the destination point was not found.");
	        	    } 
	        	    
	        	    if (path) {
	        	    	currentNextPointX = path[1].x;
	        	        currentNextPointY = path[1].y;
	        	    }


					if (currentNextPointX == currentEnemyXtile && currentNextPointY < currentEnemyYtile)
	        	    {
	        	    	// up 	
	        	    	enemyDirection = "N";
	        	    	
	        	    }

	        	    else if (currentNextPointX < currentEnemyXtile && currentNextPointY == currentEnemyYtile)
	        	    {
	        	    	// left
	        	    	enemyDirection = "W";
	        	    	
	        	    }
	        	    else if (currentNextPointX > currentEnemyXtile && currentNextPointY == currentEnemyYtile)
	        	    {
	        	    	// right
	        	    	enemyDirection = "E";
	        	    
	        	    }

	        	    else if (currentNextPointX == currentEnemyXtile && currentNextPointY > currentEnemyYtile)
	        	    {
	        	    	// down   	
	        	    	enemyDirection = "S";
	        	    	
	        	    }

	        	    else
	        	    {
	        	    	
	        	    	enemyDirection = "STOP";
	        	    	
	        	    }
	        	    
	        	    if (enemyDirection != "STOP"){
	        	    	librarian.animations.play(enemyDirection);
	        			
	        		}
	        	    
	        	});

	        	easystar.calculate();
	        	
	        }, timeStep);

	   	    setInterval(function(){ 
	        	
	        easystar.findPath(currentEnemy3Xtile, currentEnemy3Ytile, currentPlayerXtile, currentPlayerYtile, function( path ) {
	        	    if (path === null) {
	        	        console.log("The path to the destination point was not found.");
	        	    } 
	        	    
	        	    if (path) {
	        	    	currentNextPointX = path[1].x;
	        	        currentNextPointY = path[1].y;
	        	    }


					if (currentNextPointX == currentEnemy3Xtile && currentNextPointY < currentEnemy3Ytile)
	        	    {
	        	    	// up 	
	        	    	enemy3Direction = "N";
	        	    	
	        	    }

	        	    else if (currentNextPointX < currentEnemy3Xtile && currentNextPointY == currentEnemy3Ytile)
	        	    {
	        	    	// left
	        	    	enemy3Direction = "W";
	        	    	
	        	    }
	        	    else if (currentNextPointX > currentEnemy3Xtile && currentNextPointY == currentEnemy3Ytile)
	        	    {
	        	    	// right
	        	    	enemy3Direction = "E";
	        	    
	        	    }

	        	    else if (currentNextPointX == currentEnemy3Xtile && currentNextPointY > currentEnemy3Ytile)
	        	    {
	        	    	// down   	
	        	    	enemy3Direction = "S";
	        	    	
	        	    }

	        	    else
	        	    {
	        	    	
	        	    	enemy3Direction = "STOP";
	        	    	
	        	    }
	        	    
	        	    if (enemy3Direction != "STOP"){
	        	    	librarian3.animations.play(enemy3Direction);
	        			
	        		}
	        	    
	        	});

	        	easystar.calculate();
	        	
	        }, timeStep);


	     cursors = game.input.keyboard.createCursorKeys();

	       //Make the camera follow the sprite
    	groundLayer.resizeWorld();
    	game.camera.follow(player);
    	game.camera.roundPx = false;
    	//Puntuacion
    	scoreString = "Puntuacion: ";
    	textpoints = game.add.text(10, 0, scoreString + counterPoints, style);
    	textpoints.fixedToCamera = true;


    	//Lifes
    	lives = game.add.group();
    	var lifes = game.add.text( 550, 0, 'Vidas: ', style);
    	lifes.fixedToCamera = true;

    	 for (var i = 0; i < totalLife; i++){
	        var life = lives.create(550+lifes.width+ (32 * i), 0, 'life');
	        //life.anchor.setTo(0.5, 0.5);
	        //life.angle = 90;
	        //life.alpha = 0.4;
    	 }
    	lives.fixedToCamera = true;

    	button = game.add.button(12.5 ,16.6*tileSize ,  'button',this.actionOnClick);
    	button.fixedToCamera=true;

     	gameoverText = game.add.text(game.world.centerX-225,game.world.centerY,' ', { font: '50px Arial', fill: '#fff' });
    	gameoverText.anchor.setTo(0.5, 0.5);
    	gameoverText.visible = false;
    	gameoverText.fixedToCamera = true;

    	winText = game.add.text(game.world.centerX-225,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    	winText.anchor.setTo(0.5, 0.5);
    	winText.visible = false;
    	winText.fixedToCamera = true;


	},

	hitPlayer: function(){
		live = lives.getFirstAlive();
		if (live){

				    	counterPoints = counterPoints - 200;
				    	textpoints.text= scoreString + counterPoints;
				        live.kill();
				        player.x= 1 * tileSize;
				        player.y= 1 * tileSize;

				        killSound.play();

		}

		// When the player dies
		if (lives.countLiving() < 1)
		{
		 		player.kill();
		        gameoverText.text=" Juego Terminado \n";
		        gameoverText.visible = true;
		        

		//the "click to restart" handler
		//game.input.onTap.addOnce(restart,this);
		}

	},
	update: function(){
		
		game.physics.arcade.collide(player, groundLayer);
		game.physics.arcade.collide(librarian, groundLayer);
		game.physics.arcade.collide(librarian2, groundLayer);
		game.physics.arcade.collide(librarian3,groundLayer);

		 player.body.velocity.set(0);

		if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
            player.play('W');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
            player.play('E');
        }
        else if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
            player.play('N');
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
            player.play('S');
        }
        else
        {
            player.animations.stop();
        }



		  // Move the ENEMY
	        var enemySpeed = 60;
	       
	        if (enemyDirection == "W") {
	        	librarian.body.velocity.x = -enemySpeed;
	        }
	        else if (enemyDirection == "E")
	        {
	        	librarian.body.velocity.x = enemySpeed;
	        }
	        else if (enemyDirection == "N") {
	        	librarian.body.velocity.y = -enemySpeed;
	        }
	        else if (enemyDirection == "S")
	        {
	        	librarian.body.velocity.y = enemySpeed;
	        }

	        else if (enemyDirection == "STOP")
	        {
	        	librarian.body.velocity.x = 0;
	        	librarian.body.velocity.y = 0;
	        }
	        else // JUST IN CASE IF enemyDirection wouldnt exist we stop the librarian movement
	        {
	        	librarian.body.velocity.x = 0;
	        	librarian.body.velocity.y = 0;
	        }

	       	var enemy2Speed = 50;
	       
	        if (enemy2Direction == "W") {
	        	librarian2.body.velocity.x = -enemy2Speed;
	        }
	        else if (enemy2Direction == "E")
	        {
	        	librarian2.body.velocity.x = enemy2Speed;
	        }
	        else if (enemy2Direction == "N") {
	        	librarian2.body.velocity.y = -enemy2Speed;
	        }
	        else if (enemy2Direction == "S")
	        {
	        	librarian2.body.velocity.y = enemy2Speed;
	        }

	        else if (enemy2Direction == "STOP")
	        {
	        	librarian2.body.velocity.x = 0;
	        	librarian2.body.velocity.y = 0;
	        }
	        else // JUST IN CASE IF enemyDirection wouldnt exist we stop the librarian movement
	        {
	        	librarian2.body.velocity.x = 0;
	        	librarian2.body.velocity.y = 0;
	        }

	        var enemy3Speed = 65;
	       
	        if (enemy3Direction == "W") {
	        	librarian3.body.velocity.x = -enemy3Speed;
	        }
	        else if (enemy3Direction == "E")
	        {
	        	librarian3.body.velocity.x = enemy3Speed;
	        }
	        else if (enemy3Direction == "N") {
	        	librarian3.body.velocity.y = -enemy3Speed;
	        }
	        else if (enemy3Direction == "S")
	        {
	        	librarian3.body.velocity.y = enemy3Speed;
	        }

	        else if (enemy3Direction == "STOP")
	        {
	        	librarian3.body.velocity.x = 0;
	        	librarian3.body.velocity.y = 0;
	        }
	        else // JUST IN CASE IF enemyDirection wouldnt exist we stop the librarian movement
	        {
	        	librarian3.body.velocity.x = 0;
	        	librarian3.body.velocity.y = 0;
	        }

	        for(i=0;i<collectablesNum;i++){
		         game.physics.arcade.overlap(books[i], player ,function(e){

		        	e.destroy();
		        	counterPoints += 100;
				    textpoints.text= scoreString + counterPoints;
				    booksPicked +=1;
				   
				    if(booksPicked >= collectablesNum){
				    	gameoverText.text=" !Bien¡\n Oprime C para pasar al nivel 3";
				        gameoverText.visible = true;
				        continueKey.onDown.addOnce(function(){ 
				        	sessionStorage.points = counterPoints;
				        	sessionStorage.lives = lives.countLiving();
				        	game.state.start("level3");

				    	}, this);

				    }	        	
		        	
		        });
	     	}

	     	  game.physics.arcade.overlap(librarian, player ,this.hitPlayer);
	     	  game.physics.arcade.overlap(librarian2, player ,this.hitPlayer);
	     	  game.physics.arcade.overlap(librarian3,player,this.hitPlayer);

	        currentPlayerXtile = Math.floor(player.body.position.x / tileSize);
		    currentPlayerYtile = Math.floor(player.body.position.y / tileSize);	
		     

		     // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE  

		   currentEnemyXtile = Math.floor(librarian.body.position.x / tileSize);
	        currentEnemyYtile = Math.floor(librarian.body.position.y / tileSize);

	         currentEnemy2Xtile = Math.floor(librarian2.body.position.x / tileSize);;
	        currentEnemyY2tile = Math.floor(librarian2.body.position.y / tileSize);;

	        currentEnemy3Xtile = Math.floor(librarian3.body.position.x / tileSize);;
	        currentEnemy3Ytile = Math.floor(librarian3.body.position.y / tileSize);;



	      
	}

	//  render:function() {

	//     // Sprite debug info
	//     game.debug.spriteInfo(player, 32, 32);

	// }

}