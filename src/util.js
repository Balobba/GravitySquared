var constGravity = 1000;
var hudWidth = 64;

/*
 * Keybindings for the players
 */
var keyBindings = [{g:Phaser.Keyboard.SPACEBAR, w: Phaser.Keyboard.W},
  {g:Phaser.Keyboard.O, w: Phaser.Keyboard.P}, ];

/*
 * Enum for player directions
 */
directionEnum = {
  UP : 0,
  DOWN : 1
}

function drawHud(game) {
  var style = { font: "16px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };

  for(var i = 0; i < game.playerGroup.length; i++) {
    var p = game.playerGroup.getAt(i); 
    p.text = game.add.text(1, 64 + i*128, 'player ' + i, style);
    p.icon = game.add.sprite(16, 100 + i*128, 'player' + i);
  }
}

/*
 * Change direction of gravity on a player
 */
function changeGravity(player){
  if(player.collide){
    player.dir++;
    if(player.dir >= 2){
      player.dir = 0;
    }
    setGravity(player);
  }
}

/*
 * Check if game over/win condition is set
 * will call gameOver()
 */
function checkGameOver(game) {
  if(game.playerGroup.length <= 1 ) {
    gameOver(game);
  }
}

/*
 * set gravity to constGravity on player
 * uses direction
 */
function setGravity(player){
  if(player.dir === directionEnum.UP){
    player.body.gravity.y = -1*constGravity;
  }else {
    player.body.gravity.y = constGravity;
  }
}

/*
 * Generate a new upper and lower block column
 */
function generateBlock(game){
  var randUp = Math.random();
  var randLow = Math.random();
  if(randUp < 0.7) {
  } else if(randUp < 0.85){
    game.upperLevel--;
    game.upperLevel = Math.max(game.upperLevel, 1);
  } else {
    game.upperLevel++;
  }
  if(randLow < 0.7) {
  } else if(randLow < 0.85){
    game.lowerLevel--;
    game.lowerLevel = Math.max(game.lowerLevel, 1);
  } else {
    game.lowerLevel++;
  }
  if(game.lowerLevel + game.upperLevel > game.height/32 - 2) {
    if(game.upperLevel > game.lowerLevel) {
      game.upperLevel -= (game.upperLevel + game.lowerLevel) - (game.height/32 - 2);
    } else {
      game.lowerLevel -= (game.upperLevel + game.lowerLevel) - (game.height/32 - 2);
    }
  }
  for(var i = 0; i < game.lowerLevel; i++) {
    createBox(game, 830,i*32, 'box');
  }
  for(var i = 0; i < game.upperLevel; i++) {
    createBox(game, 830,game.height-i*32-32, 'box');
  }
}


// placeholder function for game over
function gameOver(game) {
  game.state.restart();
}

