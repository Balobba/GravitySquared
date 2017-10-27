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

  var tnt = game.add.sprite(x, y, 'tnt_active');
  tnt.animations.add('boom', [0,1,2,3,4,5,6,7,8,9,10,11]);
  tnt.animations.play('boom', 40, false, function(){tnt.destroy();});
  game.physics.arcade.enable(tnt);
  tnt.baseSpeed = -200;
  tnt.speedConst = -1;
  tnt.scale.setTo(1.5, 1.5);
  tnt.anchor.setTo(0.5, 0.5);
  game.animationGroup.add(tnt);

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

  var boost = game.add.sprite(-96, 0, 'boost_active');
  boost.animations.add('vroom', [0,1]);
  boost.animations.play('vroom', 5, true);
  game.physics.arcade.enable(boost);
  boost.powerupType = powerupEnum.BOOST;
  boost.anchor.setTo(0.2,0.5);

  player.addChild(boost);


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
  otherPlayer.body.velocity.y = 0;
  player.body.gravity.y = 0;
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

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
      if(dist < 200){
        p2.activeShockwave = true;
        p2.shockwaveY = -Math.cos(angle) * 1000;
        p2.shockwaveX = -Math.sin(angle) * 1000;
        p2.shockwaveDuration = 10;
      }
    }
  });
  var shockwave = game.add.sprite(0, 0, 'shockwave_active');
  shockwave.anchor.setTo(0.5, 0.5);
  shockwave.scale.setTo(4,4);
  shockwave.animations.add('blam', [0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
  shockwave.animations.play('blam', 160, false, function(){shockwave.destroy();});
  game.physics.arcade.enable(shockwave);
  shockwave.powerupType = powerupEnum.SHOCKWAVE;

  player.addChild(shockwave);
}


/*
 * A random function that could generate a powerup
 * uses upper and lower level to calculate position
 */
function generatePowerup(game) {
  var powerUpRand = Math.random();
  if(powerUpRand < 0.02) {
    var rand = Math.random();
    var y = Math.floor((game.height/BLOCK_SIZE - (game.upperLevel + game.lowerLevel))*Math.random()) + game.upperLevel;
    var powerup;
    if(rand < 0.25) {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'tnt');
      addTNTAnimation(game, powerup);
    } else if (rand < 0.50) {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'swap');
      powerup.type = powerupEnum.SWAP;
    } else if (rand < 0.75) {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'boost');
      addBoostAnimation(game, powerup);
    } else {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'shockwave');
      addShockwaveAnimation(game, powerup);
    }
    powerup.baseSpeed = -200;
    powerup.speedConst = -1;
    game.physics.enable(powerup);
    game.powerUpGroup.add(powerup);
  }
}

function addTNTAnimation(game, powerup){
  powerup.type = powerupEnum.TNT;
  powerup.animations.add('tnt', [0,1]);
  powerup.animations.play('tnt', 2, true);

}

function addShockwaveAnimation(game, powerup){
  powerup.type = powerupEnum.SHOCKWAVE;
  powerup.animations.add('shockwave', [0,1,2,3,4,5,6,7,8,9]);
  powerup.animations.play('shockwave', 8, true);

}
function addBoostAnimation(game, powerup){
  powerup.type = powerupEnum.BOOST;
  powerup.animations.add('boost', [0,1,2,3,4,5]);
  powerup.animations.play('boost', 8, true);

}
