/*
 * Generate a new upper and lower block column
 * Also generate powerup
 */
function generateBlock(game){
  game.upperLevel = generateLimit(game.upperLevel);
  game.lowerLevel = generateLimit(game.lowerLevel);
  adjustLimits(game);
  generateColumns(game);
  generatePowerup(game);
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
      powerup.type = powerupEnum.TNT;
    } else if (rand < 0.50) {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'swap');
      powerup.type = powerupEnum.SWAP;
    } else if (rand < 0.75) {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'boost');
      powerup.type = powerupEnum.BOOST;
    } else {
      powerup = game.add.sprite(game.width+SPAWN_OFFSET, y*BLOCK_SIZE, 'shockwave');
      powerup.type = powerupEnum.SHOCKWAVE;
    }
    powerup.baseSpeed = -200;
    powerup.speedConst = -1;
    game.physics.enable(powerup);
    game.powerUpGroup.add(powerup);
  }
}

/*
 * Take current level
 * Keep the same, increase by 1 or decrease by 1
 */
function generateLimit(limit){
  var rand= Math.random();
  if(rand< 0.7) {
  } else if(rand< 0.85){
    limit--;
    limit = Math.max(limit, 1);
  } else {
    limit++;
  }
  return limit;
}
 
/*
 * Adjust the limits
 * They can never be closer than 2 blocks
 */
function adjustLimits(game) {
  if(game.lowerLevel + game.upperLevel > game.height/BLOCK_SIZE - 2) {
    if(game.upperLevel > game.lowerLevel) {
      game.upperLevel -= (game.upperLevel + game.lowerLevel) - (game.height/BLOCK_SIZE - 2);
    } else {
      game.lowerLevel -= (game.upperLevel + game.lowerLevel) - (game.height/BLOCK_SIZE - 2);
    }
  }
}

/*
 * Generate both upper and lower column
 */
function generateColumns(game) {
  for(var i = 0; i < game.upperLevel; i++) {
    createBox(game, game.width + SPAWN_OFFSET,i*BLOCK_SIZE, 'box');
  }
  for(var i = 0; i < game.lowerLevel; i++) {
    createBox(game, game.width + SPAWN_OFFSET,game.height-i*BLOCK_SIZE-BLOCK_SIZE, 'box');
  }
}
