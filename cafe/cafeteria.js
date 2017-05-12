var anchoJuego = 800
var altoJuego = 600

var game = new Phaser.Game(anchoJuego, altoJuego, Phaser.AUTO, 'game-block', 
    { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bullet', 'assets/cafeteria/bullet.png');
    game.load.image('enemyBullet', 'assets/cafeteria/enemy-bullet.png');
    game.load.spritesheet('enemy', 'assets/cafeteria/enemy.png', 32, 32);
    game.load.spritesheet('pingu', 'assets/cafeteria/player.png', 35, 39);
    game.load.spritesheet('kaboom', 'assets/cafeteria/explode.png', 32, 32);
    game.load.image('background', 'assets/cafeteria/background.png');
    game.load.image('mywall', 'assets/cafeteria/wall.png');
    game.load.image('buttonhome','assets/buttons/button.png');
    game.load.audio('soundtrack', 'assets/cafeteria/soundtrack.mp3');
    game.load.spritesheet('button', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia16black.png', 'assets/fonts/bitmapFonts/nokia16black.xml');


}

var player;
var bullets;
var bulletTime = 0;

var enemies;
var enemyBullet;
var firingTimer = 0;
var livingEnemies = [];

var explosions;
var mywall;

var score = 0;
var scoreString = '';
var scoreText;
var lives;
var stateText;

var cursors;
var fireButton;
var continueKey;
var restartKey;
var soundtrack;
var shootingSpeed = 2500;
var level = 1;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  El fondo del juego
    game.add.tileSprite(0, 0, 800, 600, 'background');

    //  Musica de fondo
    soundtrack = game.add.audio('soundtrack');
    soundtrack.loopFull(0.4);
    //game.sound.setDecodedCallback(soundtrack, start, this);

    // wall
    mywall = game.add.tileSprite(0,altoJuego-20, 800, 600, 'mywall');
    game.physics.enable(mywall, Phaser.Physics.ARCADE);

    // boton de pausa de la musica
    makeButton('Silenciar', anchoJuego-80, altoJuego-25);

    //  Las balas del jugador
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // las balas del enemigo
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
    
    //button home
    button = game.add.button(12.5 , 490 , 'buttonhome',goMainGame);


    //  El personaje del jugador
    player = game.add.sprite(400, 560, 'pingu');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.animations.add('walk', [ 0, 1 ], 10, true);
    

    //  Los enemigos
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    createEnemies();


    //  El puntuaje
    scoreString = 'Puntos: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: 'bold 34px Arial', fill: '#fff', backgroundColor: '#c58f5c' });

    //  Las vidas
    lives = game.add.group();
    game.add.text(game.world.width - 120, 10, 'Vidas: ', { font: 'bold 34px Arial', fill: '#ff3030' });

    //  El texto del estado de vidas 
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: 'bold 64px Arial', fill: '#000', align: 'center' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var pingu = lives.create(game.world.width - 100 + (30 * i), 60, 'pingu');
        pingu.anchor.setTo(0.5, 0.5);
        pingu.angle = 1;
        pingu.alpha = 0.7;
        pingu.scale.setTo(0.7,0.7);
    }

    //  la explosion
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupExplosion, this);

    //  Controles para poder jugar
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    continueKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    
}

function createEnemies () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var enemy = enemies.create(x * 48, y * 50, 'enemy');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.animations.add('automove', [ 0, 1, 2, 3 ], 20, true);
            enemy.play('automove');
            enemy.body.moves = false;
        }
    }

    enemies.x = 100;
    enemies.y = 50;

    //  inicializa el movimiento del grupo de enemigos
    var tween = game.add.tween(enemies).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  descender enemigo
    tween.onRepeat.add(descend, this);
}

function setupExplosion (explosion) {

    explosion.anchor.x = 0.5;
    explosion.anchor.y = 0.5;
    explosion.animations.add('kaboom', [ 0, 1, 2, 3, 3, 3, 3 ], 10, true);

}

function descend() {
    enemies.y += 10;
}

function update() {


    if (player.alive)
    {
        //  No mover el personaje al menos se presione una tecla de movimiento
        player.body.velocity.setTo(0, 0);
        player.animations.play('walk');

        //  Comprobar las teclas de movimiento
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }

        //  Comprobar la tecla de disparo
        if (fireButton.isDown)
        {
            fireBullet();
        }

        //  Tiempo entre disparos del enemigo
        if (game.time.now > firingTimer)
        {
            enemyFires();
        }

        //  Colisiones
        game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(enemies, player, enemyCrashPlayer, null, this);
        game.physics.arcade.collide(enemies, mywall, hitWall, null, this);
    }

}


function collisionHandler (bullet, enemy) {

    //  Cuando una bala colisiona con un enemigo se destruyen ambas
    bullet.kill();
    enemy.kill();

    //  Aumenta la puntuacion
    score += 20;
    scoreText.text = scoreString + score;

    //  Se crea una explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('kaboom', 30, false, true);

    //  Si se destruyeron todos los enemigos
    if (enemies.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);

        //  next level
        if (level == 5) {
            stateText.text = " ¡Ganaste!, \n Presiona la tecla C \n para salir";
            stateText.visible = true;
            level = 1;
            shootingSpeed = 2500;
            // regresar al juego principal
            continueKey.onDown.addOnce(goMainGame, this);
        } else {
            // aumentar nivel y dificultad
            level = level + 1;
            shootingSpeed = shootingSpeed - 500;

            stateText.text = " ¡Bien!, \n Presiona la tecla C \n para continuar \n al nivel " + level;
            stateText.visible = true;
            // game.input.onTap.addOnce(restart,this);
            continueKey.onDown.addOnce(restart, this);
        }

    }

}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    //  Se reduce el numero de vidas
    live = lives.getFirstAlive();
    if (live)
    {
        live.kill();
    }

    //  Se crea una explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    //  disminuye la puntuacion
    score -= 20;
    scoreText.text = scoreString + score;

    //  Si el jugador se queda sin vidas
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" ¡Perdiste! \n Presiona la tecla R \n para reiniciar";
        stateText.visible = true;

        scoreText.text = scoreString + "0";
        score = 0;

        //  Reiniciar
        // game.input.onTap.addOnce(restart,this);
        level = 1;
        shootingSpeed = 2500;
        restartKey.onDown.addOnce(restart, this);
    }

}

function enemyCrashPlayer(enemy, player) {

    //  Se crea una explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // el jugador se queda sin vidas
    player.kill();
    enemies.removeAll();
    enemyBullets.callAll('kill');

    stateText.text=" ¡Perdiste! \n Presiona la tecla R \n para reiniciar";
    stateText.visible = true;

    scoreText.text = scoreString + "0";
    score = 0;

    //  Reiniciar
    // game.input.onTap.addOnce(restart,this);
    level = 1;
    shootingSpeed = 2500;
    restartKey.onDown.addOnce(restart, this);
}

function hitWall(enemy, wall) {
    //  Se crea una explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // el jugador se queda sin vidas
    player.kill();
    enemies.removeAll();
    enemyBullets.callAll('kill');

    stateText.text=" ¡Perdiste! \n Presiona la tecla R \n para reiniciar";
    stateText.visible = true;

    scoreText.text = scoreString + "0";
    score = 0;

    //  Reiniciar
    // game.input.onTap.addOnce(restart,this);
    level = 1;
    shootingSpeed = 2500;
    restartKey.onDown.addOnce(restart, this);
}

function enemyFires () {

    //  se agarra la primera bala del grupo
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    enemies.forEachAlive(function(enemy){

        //  Se coloca cada enemigo vivo en un array
        livingEnemies.push(enemy);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        //  Se genera un numero aleatorio
        var random = game.rnd.integerInRange(0,livingEnemies.length-1);

        // Se selecciona un enemigo vivo aleatorio a disparar
        var shooter = livingEnemies[random];

        // el enemigo elegido dispara
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + shootingSpeed;
    }

}

function fireBullet () {

    //  Evitar disparar muy rapido
    if (game.time.now > bulletTime)
    {
        //  se agarra la primera bala del grupo
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  se dispara
            bullet.reset(player.x - 11, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 500;
        }
    }

}

function restart () {
    //  Un nuevo nivel inicia
    //  ...
    
    //  Reiniciar el contador de vidas
    lives.callAll('revive');

    //  Reiniciar enemigos vencidos
    enemies.removeAll();
    game.tweens.removeAll();
    createEnemies();

    //  Revivir al jugador
    player.revive();

    //  Se oculta el texto de estado
    stateText.visible = false;
}

function goMainGame() {
     window.location = ("../schoolAdventure.html");    

}

function makeButton(name, x, y) {
    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(1, 1.3);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);
}

function click(button) {
    if (button.name === 'Silenciar')
    {
        if (soundtrack.paused)
        {
            soundtrack.resume();
        }
        else
        {
            soundtrack.pause();
        }
    }
}
