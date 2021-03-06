function updateState(game){

  checkGameOver(game);

  // update each player
  game.playerGroup.forEach(function(p){
    game.powerUpGroup.forEach(function(pu){
      game.physics.arcade.collide(p,pu, function(){
        p.powerup = pu.type;
        pickUpItemAnimaton(game, p);
        pu.destroy();
      });
    });
    updatePlayerShield(p);
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
    if(!p.collide && !p.activeShockwave && !p.activeBoost)
      p.body.velocity.x = (p.baseSpeed + p.speedConst * game.tick)*0.25;



    // remove player if outside world bounds
    if(p.body.x < HUD_WIDTH -BLOCK_SIZE || p.body.x > game.width + BLOCK_SIZE
      || p.body.y < -BLOCK_SIZE || p.body.y > game.height + BLOCK_SIZE) {
      p.keyG.onDown.removeAll();
      p.keyW.onDown.removeAll();
      if(p.text)p.text.destroy();
      if(p.icon)p.icon.destroy();
      if(p.powerupIcon)p.powerupIcon.destroy();
      deathAnimaton(game, p);
      p.shieldIcon.destroy();
      p.destroy();
    }
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
    p.shieldIcon.height = p.shieldIcon.maxHeight*(p.shieldDuration/p.shieldMaxDuration);
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
      p.powerupIcon = game.add.sprite(HUD_WIDTH/2-BLOCK_SIZE/2, p.hudY, name);
      game.hudGroup.add(p.powerupIcon);
    }
  }
}


function pickUpItemAnimaton(game, player){

  var itemPickup = game.add.sprite(player.body.x, player.body.y, 'pickup');
  itemPickup.animations.add('pickupanim', [0,1,2,3,4]);
  itemPickup.animations.play('pickupanim', 20, false);
  itemPickup.animations.currentAnim.onComplete.add(function(){itemPickup.destroy();}, this);
  game.physics.arcade.enable(itemPickup);
  itemPickup.baseSpeed = -200;
  itemPickup.speedConst = -1;
  itemPickup.scale.setTo(1.5, 1.5);
  itemPickup.anchor.setTo(0.5, 0.5);
  game.powerUpGroup.add(itemPickup);
}

function deathAnimaton(game, player){

  var deathAnimation = game.add.sprite(player.body.x+BLOCK_SIZE*2, player.body.y, 'death');
  deathAnimation.animations.add('deathanim', [0,1,2,3,4]);
  deathAnimation.animations.play('deathanim', 20, false);
  deathAnimation.animations.currentAnim.onComplete.add(function(){deathAnimation.destroy();}, this);
  game.physics.arcade.enable(deathAnimation);
  deathAnimation.scale.setTo(4, 4);
  deathAnimation.anchor.setTo(0.5, 0.5);
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
  game.world.bringToTop(game.animationGroup);
  game.world.bringToTop(game.hudGroup);
  game.world.bringToTop(game.statusText);
}

function updatePlayerShield(p){
  if(p.shield != null) {
    p.shieldDuration--;
    if(p.shieldDuration < 0) {
      p.shield.destroy();
      p.shield = null;
      p.activeShield = false;
    }
  } else if(p.shieldDuration < p.shieldMaxDuration) {
    p.shieldDuration += 0.5;
  }
}
