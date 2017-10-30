var game = new Phaser.Game(1120, 608, Phaser.CANVAS, '');
var activePlayers = 2;

// to be able to loop over all images
var playerNames = ['player0','player1','player2','player3','player4','player5','player6','player7'];
var playerStat = [
  {
    coords: {x: game.width/4, y: game.height*3/8},
    imageIndex: 0
  },
  {
    coords: {x: game.width/4, y: game.height*6/8},
    imageIndex: 1
  },

  {
    coords: {x: game.width+100, y: game.height*3/8},
    imageIndex: 2
  },
  {
    coords: {x: game.width+100, y: game.height*6/8},
    imageIndex: 3
  }];
game.state.add('sandbox', state_sandbox);
game.state.add('menu_startscreen', state_startscreen);
game.state.add('menu_credits', state_credits);
game.state.add('menu_startgame', state_menu_startgame);


game.state.start('menu_startscreen');
