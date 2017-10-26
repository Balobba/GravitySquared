var constGravity = 2000;
var hudWidth = 64;
var blockSize = 32;
var spawnOffset = 200;

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
  if(game.lowerLevel + game.upperLevel > game.height/blockSize - 2) {
    if(game.upperLevel > game.lowerLevel) {
      game.upperLevel -= (game.upperLevel + game.lowerLevel) - (game.height/blockSize - 2);
    } else {
      game.lowerLevel -= (game.upperLevel + game.lowerLevel) - (game.height/blockSize - 2);
    }
  }
  for(var i = 0; i < game.upperLevel; i++) {
    createBox(game, game.width + spawnOffset,i*blockSize, 'box');
  }
  for(var i = 0; i < game.lowerLevel; i++) {
    createBox(game, game.width + spawnOffset,game.height-i*blockSize-blockSize, 'box');
  }

  var powerUpRand = Math.random();
  if(powerUpRand < 0.02) {
    var rand = Math.random();
    var y = Math.floor((game.height/blockSize - (game.upperLevel + game.lowerLevel))*Math.random()) + game.upperLevel;
    var pu;
    if(rand < 0.25) {
      pu = game.add.sprite(game.width+spawnOffset, y*blockSize, 'tnt');
      pu.type = powerupEnum.TNT;
    } else if (rand < 0.50) {
      pu = game.add.sprite(game.width+spawnOffset, y*blockSize, 'swap');
      pu.type = powerupEnum.SWAP;
    } else if (rand < 0.75) {
      pu = game.add.sprite(game.width+spawnOffset, y*blockSize, 'boost');
      pu.type = powerupEnum.BOOST;
    } else {
      pu = game.add.sprite(game.width+spawnOffset, y*blockSize, 'shockwave');
      pu.type = powerupEnum.SHOCKWAVE;
    }
    pu.baseSpeed = -200;
    pu.speedConst = -1;
    game.physics.enable(pu);
    game.powerUpGroup.add(pu);
  }
}


// placeholder function for game over
function gameOver(game) {
  game.state.restart();
}

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

function swap(game, player) {
  var swapCandidates = []; // find all other player that you can swap with
  game.playerGroup.forEach(function(p) {
    if(p !== player) {
      swapCandidates.push(p);
    }
  });
  var otherPlayer = swapCandidates[Math.floor(Math.random()*swapCandidates.length)]; // pick a random player to swap with
  var x = player.body.x;
  var y = player.body.y;
  player.x = otherPlayer.body.x;
  player.y = otherPlayer.body.y;
  otherPlayer.x = x;
  otherPlayer.y = y;
  otherPlayer.body.gravity.y = 0;
  otherPlayer.body.velocity.x = 0;
  player.body.gravity.y = 0;
  player.body.velocity.x = 0;
  if(player.dir !== otherPlayer.dir) {
    changeGravity(player, false);
    changeGravity(otherPlayer, false);
  }


}
function boost(game, player) {
  player.activeBoost = true;
  player.boostDuration = 50;
}
function tnt(game,x, y) {
  var hit = true; 
  while(hit) {
    hit = false;
    game.boxGroup.forEach(function(b) {
      var dist = Math.sqrt(Math.pow(x-b.body.x, 2) + Math.pow(y-b.body.y,2));
      if (dist < 100) {
        hit = true;
        b.destroy();
      }
    });
  }
}
