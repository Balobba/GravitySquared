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


/*
 * Boost powerup
 */
function boost(game, player) {
  player.activeBoost = true;
  player.boostDuration = 50;
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
