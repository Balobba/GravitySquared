var game = new Phaser.Game(1120, 608, Phaser.CANVAS, '');
var activePlayers = 2;

// to be able to loop over all images
var playerNames = ['player0','player1','player2','player3'];

var playerStat = [
  {
    coords: {x: 100, y: 200},
    imageIndex: 0
  }, 
  {
    coords: {x: 100, y: 400},
    imageIndex: 1
  }, 
    
  {
    coords: {x: 500, y: 200},
    imageIndex: 2
  }, 
  {
    coords: {x: 500, y: 400},
    imageIndex: 3
  }]; 
game.state.add('sandbox', state_sandbox);
game.state.add('menu_startgame', state_menu_startgame);

game.state.start('menu_startgame');
