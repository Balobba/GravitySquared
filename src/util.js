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
    p.icon = game.add.sprite(16, 100 + i*128, 'player' + i);
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

/*
 * Called when player press powerup button
 * Perform powerup
 */
function usePowerUp(game, player) {
  if(player.powerup === powerupEnum.TNT) {
    tnt(game,player.body.x, player.body.y);
  } else if(player.powerup === powerupEnum.SWAP) {
    swap(game, player);
  } else if(player.powerup === powerupEnum.BOOST) {
    boost(game,player);
  } else if(player.powerup === powerupEnum.SHOCKWAVE) {
    shockwave(game,player);
  }
  player.powerup = null;
}

/*
 * Shockwave powerup
 */
function shockwave(game, player) {
  game.playerGroup.forEach(function(p2) {
    if(p2 !== player){
      var dist = Math.sqrt(Math.pow(player.body.x-p2.body.x, 2) + Math.pow(player.body.y-p2.body.y,2));

      var angle = Math.atan2(player.body.x - p2.body.x,player.body.y - p2.body.y);
      if(dist < 70){
        p2.activeShockwave = true;
        p2.shockwaveY = Math.cos(angle) * 1000;
        p2.shockwaveX = -Math.sin(angle) * 1000;
        p2.shockwaveDuration = 10; 
      }
    }
  });
}

/*
 * Swap powerup
 */
function swap(game, player) {

  var swapCandidates = [];

  // pick a random player to swap with
  game.playerGroup.forEach(function(p) {
    if(p !== player) {
      swapCandidates.push(p);
    }
  });
  var otherPlayer = swapCandidates[Math.floor(Math.random()*swapCandidates.length)]; 
  
  // Save player coords
  var x = player.body.x;
  var y = player.body.y;
  
  // Swap coordinates
  player.x = otherPlayer.body.x;
  player.y = otherPlayer.body.y;
  otherPlayer.x = x;
  otherPlayer.y = y;
  
  // Remove any velocity
  otherPlayer.body.gravity.y = 0;
  otherPlayer.body.velocity.x = 0;
  player.body.gravity.y = 0;
  player.body.velocity.x = 0;
  
  // Check if gravity needs to change
  if(player.dir !== otherPlayer.dir) {
    changeGravity(player, false);
    changeGravity(otherPlayer, false);
  }
}

/*
 * Boost powerup
 */
function boost(game, player) {
  player.activeBoost = true;
  player.boostDuration = 50;
}

/*
 * TNT powerup
 */
function tnt(game,x, y) {
  for(var i = game.boxGroup.length - 1; i >= 0; i--){
    var b = game.boxGroup.getAt(i);
    var dist = Math.sqrt(Math.pow(x-b.body.x, 2) + Math.pow(y-b.body.y,2));
    if (dist < 100) {
      b.destroy();
    }
  }
}
