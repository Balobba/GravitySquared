var game = new Phaser.Game(800, 400, Phaser.CANVAS, '');

game.state.add('sandbox', state_sandbox);

game.state.start('sandbox');
