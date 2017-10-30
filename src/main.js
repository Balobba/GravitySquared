var game = new Phaser.Game(1120, 608, Phaser.CANVAS, '');
var activePlayers = 2;

// to be able to loop over all images and names
// Temporaty character names
var playerAvail = [
{image:'player0',name: 'Ice Cube'},
{image:'player1',name:'Eye' },
{image:'player2',name:'Cigar' },
{image:'player3',name:'Shades' },
{image:'player4',name:'Turquoise' },
{image:'player5',name:'Yellow' },
{image:'player6',name:'Pink' },
{image:'player7',name:'Léon' }
];
var playerStat = [
  {
    coords: {x: game.width/4, y: game.height*3/8},
    imageIndex: 0,
    controller: 'Q, W, E'
  },
  {
    coords: {x: game.width/4, y: game.height*6/8},
    imageIndex: 1,
    controller: 'I, O, P'
  },

  {
    coords: {x: game.width+100, y: game.height*3/8},
    imageIndex: 2,
    controller: 'B, N, M'
  },
  {
    coords: {x: game.width+100, y: game.height*6/8},
    imageIndex: 3,
    controller: 'X, C, V'
  }];
game.state.add('sandbox', state_sandbox);
game.state.add('menu_startscreen', state_startscreen);
game.state.add('menu_credits', state_credits);
game.state.add('menu_startgame', state_menu_startgame);


game.state.start('menu_startscreen');
