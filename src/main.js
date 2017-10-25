var game = new Phaser.Game(1120, 608, Phaser.CANVAS, '');

game.state.add('sandbox', state_sandbox);

game.state.start('sandbox');
