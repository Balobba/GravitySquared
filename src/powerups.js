/*
 * Called when player press powerup button
 * Perform powerup
 */
function usePowerUp(game, player) {
  if(player.powerup === powerupEnum.TNT) {
    tnt(game,player.body.x, player.body.y);
  } else if(player.powerup === powerupEnum.SWAP) {
    startSwap(game, player);
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
  tnt.animations.play('boom', 40, false);
  tnt.animations.currentAnim.onComplete.add(function(){tnt.destroy();}, this);
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
 * Activate shield
 */
function shield(game, player) {
  if(player.shieldDuration >= player.shieldMaxDuration){

    player.shield = game.add.sprite(0, 0, 'shield', 0);
    player.shield.animations.add('start', [0,1,2,3,4]);
    player.shield.animations.add('loop', [5,6,7,8]);
    player.shield.animations.getAnimation('start').onComplete.add(function() {
      player.shield.animations.play('loop', 5, true);
      player.activeShield = true;
    }, this);
    player.shield.animations.play('start', 10, false);
    game.physics.arcade.enable(player.shield);
    player.shield.powerupType = powerupEnum.SHIELD;
    player.shield.anchor.setTo(0.5,0.5);
    player.addChild(player.shield);
  }
}

/*
 * Swap powerup
 */
function startSwap(game, player) {
  var swapCandidates = [];

  // pick a random player to swap with
  game.playerGroup.forEach(function(p) {
    if(p !== player) {
      swapCandidates.push(p);
    }
  });
  var otherPlayer = swapCandidates[Math.floor(Math.random()*swapCandidates.length)];


  //Active animations on player

  var swapPlayer = game.add.sprite(0, 0, 'swap_active_pink');
  swapPlayer.animations.add('swapP', [0,1,2,3,4,5,6,6,6,6,5,4,3,2,1,0]);
  swapPlayer.animations.play('swapP', 10, false,function(){swapPlayer.destroy();});
  game.physics.arcade.enable(swapPlayer);
  swapPlayer.powerupType = powerupEnum.SWAP;
  swapPlayer.anchor.setTo(0.5,0.5);
  if(player)
  player.addChild(swapPlayer);

  //Activate animations on enemy

  var swapEnemy = game.add.sprite(0, 0, 'swap_active_turquoise');
  swapEnemy.animations.add('swapE', [0,1,2,3,4,5,6,6,6,6,5,4,3,2,1,0]);
  swapEnemy.animations.play('swapE', 10, false);
  swapEnemy.animations.currentAnim.onComplete.add(function(){
    swap(game, player, otherPlayer);
    swapEnemy.destroy();
  }, this);
  game.physics.arcade.enable(swapEnemy);
  swapEnemy.powerupType = powerupEnum.SWAP;
  swapEnemy.anchor.setTo(0.5,0.5);

  if(otherPlayer)
  otherPlayer.addChild(swapEnemy);

}


function swap(game, player, otherPlayer){
  if(player && otherPlayer && !player.activeShield && !otherPlayer.activeShield){
    // Save player coords
    var x = player.x;
    var y = player.y;

    // Swap coordinates
    player.x = otherPlayer.x;
    player.y = otherPlayer.y;
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
}

/*
 * Shockwave powerup
 */
function shockwave(game, player) {
  game.playerGroup.forEach(function(p2) {
    if(p2 !== player && !p2.activeShield){
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
  shockwave.animations.play('blam', 160, false);
  shockwave.animations.currentAnim.onComplete.add(function(){shockwave.destroy();}, this);
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
      addSwapAnimation(game, powerup);
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

function addSwapAnimation(game, powerup){
  powerup.type = powerupEnum.SWAP;
  powerup.animations.add('swap', [0,1,2,3,4,5,6,7,8]);
  powerup.animations.play('swap', 20, true);
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
