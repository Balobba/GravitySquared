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
  game.load.image('background', 'assets/menu_background.png');

  game.load.image('button', 'assets/button.png');
  game.load.image('buttonstart', 'assets/buttonstart.png');
  game.load.image('buttonback', 'assets/buttonback.png');

}

/*
 * Create menu
 */
function menustart_create(game){
  // set background color
  game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);

  game.players = [];

  // Add static text
  game.title = createText('Menu',40 ,30,5);
  game.playerText = createText('Players: ' + activePlayers,20 ,30, 45);

  // Button to add one player
  game.playersAdd = game.add.button(210, 46, 'button'
    , function() {
      if(activePlayers < MAX_PLAYERS){
        activePlayers++;
        addPlayer(game,activePlayers-1);
      }
    }, this, 2, 1, 0);
  game.playersAdd.anchor.setTo(0.5, 0.5);
  game.playersAdd.angle = 270;

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
      player.icon.loadTexture(playerAvail[stat.imageIndex].image);
      player.playerName.text = addSpaces(playerAvail[stat.imageIndex].name);
    }, this, 2, 1, 0);
  player.buttonDown.anchor.setTo(0.5, 0.5);
  player.buttonDown.angle = 180;

  // Button to change image
  player.buttonUp = game.add.button(stat.coords.x + 40, stat.coords.y, 'button'
    , function() {
      stat.imageIndex++;
      stat.imageIndex = Math.min(stat.imageIndex, playerAvail.length-1);
      player.icon.loadTexture(playerAvail[stat.imageIndex].image);
      player.playerName.text = addSpaces(playerAvail[stat.imageIndex].name);
    }, this, 2, 1, 0);
  player.buttonUp.anchor.setTo(0.5, 0.5);

  // Display the image of choice
  player.icon = game.add.sprite(stat.coords.x , stat.coords.y, playerAvail[stat.imageIndex].image);
  player.icon.anchor.setTo(0.5, 0.5);

  //Display the controller for each player
  player.controllerText = createText(stat.controller, 20, stat.coords.x, stat.coords.y+50);
  player.controllerText.anchor.setTo(0.5, 0.5);

  //Display the player character names
  player.playerName = createText(playerAvail[stat.imageIndex].name, 20, stat.coords.x, stat.coords.y-50);
  player.playerName.anchor.setTo(0.5, 0.5);
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
  player.controllerText.destroy();
  player.playerName.destroy();
  game.players.splice(game.players.length - 1, 1);
}

/*
 * Update function for menu
 */
function menustart_update(game){
  game.playerText.text = addSpaces('Players:' + activePlayers);

}
