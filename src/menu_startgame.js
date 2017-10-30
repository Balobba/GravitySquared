/*
 * Preload images for menu
 */
function menustart_preload(game){
  game.load.image('player0', 'assets/player0.png');
  game.load.image('player1', 'assets/player1.png');
  game.load.image('player2', 'assets/player2.png');
  game.load.image('player3', 'assets/player3.png');
  game.load.image('player4', 'assets/player4.png');
  game.load.image('player5', 'assets/player5.png');
  game.load.image('player6', 'assets/player6.png');
  game.load.image('player7', 'assets/player7.png');

  // placeholder for buttons
  game.load.image('button', 'assets/button.png');
  game.load.image('buttonstart', 'assets/buttonstart.png');
  game.load.image('buttonback', 'assets/buttonback.png');

}

/*
 * Create menu
 */
function menustart_create(game){
  Client.newGame()
  // set background color
  game.stage.backgroundColor = "#7443B6";

  game.players = [];

  // Add static text
  game.title = createText('Menu',40 ,30,5);
  game.playerText = createText('Players: ' + activePlayers,20 ,30, 45);

  // Button to add one player
  /*
  game.playersAdd = game.add.button(210, 46, 'button'
    , function() {
      if(activePlayers < MAX_PLAYERS){
        activePlayers++;
        addPlayer(game,activePlayers-1);
      }
    }, this, 2, 1, 0);
  game.playersAdd.anchor.setTo(0.5, 0.5);
  game.playersAdd.angle = 270;
  */

  // Button to remove one player
  game.playersSub = game.add.button(210, 86, 'button'
    , function() {
      if(activePlayers > MIN_PLAYERS) {
        activePlayers--;
        removePlayer(game);
      }
    }, this, 2, 1, 0);
  game.playersSub.anchor.setTo(0.5, 0.5);
  game.playersSub.angle = 90;

  // Init players
  for(var i = 0; i < activePlayers; i++){
    addPlayer(game, i);
  }

  // Start game button
  game.start =  game.add.button(game.width/2, game.height*7/10, 'buttonstart'
    , function() {
      game.state.start('sandbox');

    }, this, 2, 1, 0);
    game.start.anchor.setTo(0.5, 0.5);

  game.back =  game.add.button(game.width/2, game.height*9/10, 'buttonback'
      , function() {
        game.state.start('menu_startscreen');
      }, this, 2, 1, 0);
      game.back.anchor.setTo(0.5, 0.5);
}

/*
 * Add a player to the game
 * Controlled by buttons
 */
function addPlayer(game, index) {
  var player = {};
  var stat = playerStat[index];

  // Button to change image
  player.buttonDown = game.add.button(stat.coords.x - 40, stat.coords.y, 'button'
    , function() {
      stat.imageIndex--;
      stat.imageIndex = Math.max(stat.imageIndex, 0);
      player.icon.loadTexture(playerNames[stat.imageIndex]);
    }, this, 2, 1, 0);
  player.buttonDown.anchor.setTo(0.5, 0.5);
  player.buttonDown.angle = 180;

  // Button to change image
  player.buttonUp = game.add.button(stat.coords.x + 40, stat.coords.y, 'button'
    , function() {
      stat.imageIndex++;
      stat.imageIndex = Math.min(stat.imageIndex, playerNames.length-1);
      player.icon.loadTexture(playerNames[stat.imageIndex]);
    }, this, 2, 1, 0);
  player.buttonUp.anchor.setTo(0.5, 0.5);

  // Display the image of choice
  player.icon = game.add.sprite(stat.coords.x , stat.coords.y, playerNames[stat.imageIndex]);
  player.icon.anchor.setTo(0.5, 0.5);

  game.players.push(player);
}

/*
 * Remove player from the game
 * Controlled by buttons
 */
function removePlayer(game) {
  var player = game.players[game.players.length - 1];
  player.icon.destroy();
  player.buttonDown.destroy();
  player.buttonUp.destroy();
  game.players.splice(game.players.length - 1, 1);
}

/*
 * Update function for menu
 */
function menustart_update(game){
  game.playerText.text = 'P l a y e r s : ' + activePlayers;

}
