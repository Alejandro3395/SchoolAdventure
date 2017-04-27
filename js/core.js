
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

 game.state.add("boot",boot);
 game.state.add("preload", preload);
 game.state.add("main", adventure);
 game.state.start("boot");
