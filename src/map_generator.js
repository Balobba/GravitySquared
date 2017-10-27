/*
 * Generate a new upper and lower block column
 */
function generateBlock(game){
  game.upperLevel = generateLimit(game.upperLevel);
  game.lowerLevel = generateLimit(game.lowerLevel);
  adjustLimits(game);
  generateColumns(game);
  generatePowerup(game);
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
