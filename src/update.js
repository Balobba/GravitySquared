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

/*
 * Animation update
 */
    game.animationGroup.forEach(function(a){
      a.body.velocity.x = a.baseSpeed + a.speedConst*game.tick;
      if(a.body.x < HUD_WIDTH - BLOCK_SIZE) {
        a.destroy();
      }
    });

    // remove player if outside world bounds
    if(p.body.x < HUD_WIDTH -BLOCK_SIZE || p.body.x > game.width + BLOCK_SIZE
      || p.body.y < -BLOCK_SIZE || p.body.y > game.height + BLOCK_SIZE) {
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
    if(b.body.x < HUD_WIDTH - BLOCK_SIZE) {
      b.destroy();
    }
  });
  game.powerUpGroup.forEach(function(p){
    p.body.velocity.x = p.baseSpeed + p.speedConst*game.tick;
    if(p.body.x < HUD_WIDTH - BLOCK_SIZE) {
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
    p.body.velocity.y = 0;
    p.boostDuration--;
    if(p.boostDuration < 0){
      p.activeBoost = false;
      for(var i = p.children.length - 1; i >= 0; i--) {
        var c = p.children[i];
        if(c.powerupType == powerupEnum.BOOST){
          c.destroy();
        }

    }
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
