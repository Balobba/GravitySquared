/*
 * Keybindings for the players
 */
var keyBindings = [
  {g:Phaser.Keyboard.Q, w: Phaser.Keyboard.W, s: Phaser.Keyboard.E},
  {g:Phaser.Keyboard.I, w: Phaser.Keyboard.O, s: Phaser.Keyboard.P},
  {g:Phaser.Keyboard.B, w: Phaser.Keyboard.N, s: Phaser.Keyboard.M},
  {g:Phaser.Keyboard.X, w: Phaser.Keyboard.C, s: Phaser.Keyboard.V}];

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
  SHOCKWAVE : 3,
  SHIELD : 4
}

/*
 * Creates text
 * returns a text object
 */
function createText(text, size, x, y) {
  var style = { font: size+"px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };
  var textWithSpaces = '';
  for(var i = 0; i < text.length-1; i++){
    textWithSpaces += text[i] + ' ';
  }
  if(text.length)
    textWithSpaces += text[text.length - 1];
  return game.add.text(x, y, textWithSpaces, style);
}



function drawHud(game) {
  var style = { font: "15px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };

  for(var i = 0; i < game.playerGroup.length; i++) {
    var p = game.playerGroup.getAt(i);
    p.text = game.add.text(1, 12 + i*135, 'Player ' + (i+1), style);
    p.icon = game.add.sprite(16, 40 + i*135, playerNames[playerStat[i].imageIndex]);
    p.shieldIcon = game.add.sprite(16, 112 + i*135,'shield', 5);
    p.shieldIcon.scale.setTo(0.7, 0.7);
    p.shieldIcon.maxHeight = p.shieldIcon.height;
    p.hudY = 76 + i * 135;
    game.hudGroup.add(p.text);
    game.hudGroup.add(p.shieldIcon);
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
