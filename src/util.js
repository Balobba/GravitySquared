/*
 * Keybindings for the players
 */
var keyBindings = [
  {g:Phaser.Keyboard.Q, w: Phaser.Keyboard.A},
  {g:Phaser.Keyboard.P, w: Phaser.Keyboard.L},
  {g:Phaser.Keyboard.N, w: Phaser.Keyboard.M},
  {g:Phaser.Keyboard.C, w: Phaser.Keyboard.V}];

/*
 * Enum for player directions
 */
directionEnum = {
  UP : 0,
  DOWN : 1
}

/*
 * Enum for powerups
 */
powerupEnum = {
  TNT : 0,
  BOOST : 1,
  SWAP : 2,
  SHOCKWAVE : 3
}

function drawHud(game) {
  var style = { font: "15px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };

  for(var i = 0; i < game.playerGroup.length; i++) {
    var p = game.playerGroup.getAt(i);
    p.text = game.add.text(1, 64 + i*128, 'Player ' + (i+1), style);
    p.icon = game.add.sprite(16, 100 + i*128, playerNames[playerStat[i].imageIndex]);
    p.hudY = 144 + i * 128;
    game.hudGroup.add(p.text);
    game.hudGroup.add(p.icon);
  }
}

/*
 * Change direction of gravity on a player
 */
function changeGravity(player, checkCollision){
  if((checkCollision && player.collide) || !checkCollision){
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
  if(game.playerGroup.length <= 1  && !game.gameOver) {
    game.gameOver = true;
    game.time.events.add(Phaser.Timer.SECOND * 3, function() {gameOver(game)}, this);
    var style = { font: "64px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 10 };
    var text = game.add.text(game.width/2-200, game.height/3, 'Player ' + (game.playerGroup.getAt(0).index + 1) + ' wins!', style);
  }
}

/*
 * set gravity to GRAVITY on player
 * uses direction
 */
function setGravity(player){
  if(player.dir === directionEnum.UP){
    player.body.gravity.y = -GRAVITY;
  }else {
    player.body.gravity.y = GRAVITY;
  }
}

/*
 * Called when the game is over
 */
function gameOver(game) {
  game.state.restart();
}
