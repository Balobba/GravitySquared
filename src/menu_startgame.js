/*
 * Preload images for menu
 */
function menustart_preload(game){
  game.load.image('player0', 'assets/player0.png');
  game.load.image('player1', 'assets/player1.png');
  game.load.image('player2', 'assets/player2.png');
  game.load.image('player3', 'assets/player3.png');

  // placeholder for buttons
  game.load.image('box', 'assets/box.png');
}

/*
 * Create menu
 */
function menustart_create(game){
  // set background color
  game.stage.backgroundColor = "#1FFFFF";

  game.players = [];

  // text styles
  game.styleTitle = { font: "32px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };
  game.stylePlayer = { font: "15px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };

  // Add static text
  game.title = game.add.text(30, 5, 'Menu', game.styleTitle);
  game.playerText = game.add.text(30, 45, 'Players: ' + activePlayers, game.styleTitle);
  
  // Button to add one player
  game.playersAdd = game.add.button(200, 30, 'box'
    , function() {
      if(activePlayers < MAX_PLAYERS){
        activePlayers++;
        addPlayer(game,activePlayers-1);
      }
    }, this, 2, 1, 0);

  // Button to remove one player
  game.playersSub = game.add.button(200, 70, 'box'
    , function() {
      if(activePlayers > MIN_PLAYERS) {
        activePlayers--;
        removePlayer(game);
      }
    }, this, 2, 1, 0);

  // Init players
  for(var i = 0; i < activePlayers; i++){
    addPlayer(game, i);
  }

  // Start game button
  game.start =  game.add.button(game.width/2, game.height - 60, 'box'
    , function() {
      game.state.start('sandbox');

    }, this, 2, 1, 0);
}

/*
 * Add a player to the game
 * Controlled by buttons
 */
function addPlayer(game, index) {
  var player = {};
  var stat = playerStat[index];

  // Button to change image
  player.buttonDown = game.add.button(stat.coords.x - 40, stat.coords.y, 'box'
    , function() {
      stat.imageIndex--;
      stat.imageIndex = Math.max(stat.imageIndex, 0);
      player.icon.loadTexture(playerNames[stat.imageIndex]);
    }, this, 2, 1, 0);

  // Button to change image
  player.buttonUp = game.add.button(stat.coords.x + 40, stat.coords.y, 'box'
    , function() {
      stat.imageIndex++;
      stat.imageIndex = Math.min(stat.imageIndex, 3);
      player.icon.loadTexture(playerNames[stat.imageIndex]);
    }, this, 2, 1, 0);
  
  // Display the image of choice
  player.icon = game.add.sprite(stat.coords.x , stat.coords.y, playerNames[stat.imageIndex]);

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
  game.playerText.text = 'Players: ' + activePlayers;

}
