function updateState(game){

  checkGameOver(game);

  // update each player
  game.playerGroup.forEach(function(p){
    game.powerUpGroup.forEach(function(pu){
      game.physics.arcade.collide(p,pu, function(){
        p.powerup = pu.type;
        pu.destroy();
      });
    });
    updatePlayerSpeed(p);
    setGravity(p);
    game.physics.arcade.collide(p, game.border);
    p.collide = false;
    game.boxGroup.forEach(function(b){
      game.physics.arcade.collide(p, b, function()
        {
          p.body.gravity.y *= 0.001;
          p.collide = true;
        });
    });

    // remove player if outside world bounds
    if(p.body.x < hudWidth -blockSize || p.body.x > game.width + blockSize
      || p.body.y < -blockSize || p.body.y > game.height + blockSize) {
      p.keyG.onDown.removeAll();
      p.keyW.onDown.removeAll();
      if(p.text)p.text.destroy();
      if(p.icon)p.icon.destroy();
      if(p.powerupIcon)p.powerupIcon.destroy();
      p.destroy();
    }
  });

  // check if new blocks needs to be generated
  if(!game.lastBlock || game.lastBlock.body.x < game.width + 170){
    generateBlock(game);
  }

  game.boxGroup.forEach(function(b){
    b.body.velocity.x = b.baseSpeed + b.speedConst*game.tick;
    if(b.body.x < hudWidth - blockSize) {
      b.destroy();
    }
  });
  game.powerUpGroup.forEach(function(p){
    p.body.velocity.x = p.baseSpeed + p.speedConst*game.tick;
    if(p.body.x < hudWidth - blockSize) {
      p.destroy();
    }
  });
  updateHud(game);
  sortGame(game);
}

function updateHud(game) {
  for(var i = 0; i < game.playerGroup.length; i++){
    var p = game.playerGroup.getAt(i);
    var name;
    if(p.powerupIcon) p.powerupIcon.destroy();
    if(p.powerup != null) {
      if(p.powerup === powerupEnum.TNT) {
        name = 'tnt';
      } else if(p.powerup === powerupEnum.BOOST) {
        name = 'boost';
      } else if(p.powerup === powerupEnum.SHOCKWAVE) {
        name = 'shockwave';
      } else if(p.powerup === powerupEnum.SWAP) {
        name = 'swap';
      }
      p.powerupIcon = game.add.sprite(16, p.hudY, name);
      game.hudGroup.add(p.powerupIcon);
    }
  }
}


function updatePlayerSpeed(p) {
  if(p.activeBoost) {
    p.body.velocity.x = 800+p.baseSpeed + p.speedConst * game.tick;
    p.boostDuration--;
    if(p.boostDuration < 0){
      p.activeBoost = false;
    }
  } else if(p.activeShockwave){
    p.body.velocity.x = p.shockwaveX;
    p.body.velocity.y = p.shockwaveY;
    p.shockwaveDuration--;
    if(p.shockwaveDuration < 0){
      p.activeShockwave = false;
    }
  } else{
    p.body.velocity.x = p.baseSpeed + p.speedConst * game.tick;
  }
}

/*
 * sort graphic in game
 */
function sortGame(game) {
  game.world.bringToTop(game.playerGroup);
  game.world.bringToTop(game.boxGroup);
  game.world.bringToTop(game.powerUpGroup);
  game.world.bringToTop(game.hudGroup);
}
