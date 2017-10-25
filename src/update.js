function updateState(game){

  checkGameOver(game);


  // update player
  game.playerGroup.forEach(function(p){
    p.body.velocity.x = p.baseSpeed + p.speedConst * game.tick;
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
    if(p.body.x < hudWidth -32 || p.body.x > game.width + 32
      || p.body.y < -32 || p.body.y > game.height + 32) {
      p.keyG.onDown.removeAll();
      p.keyW.onDown.removeAll();
      p.destroy();
    }
  });

  // check if new blocks needs to be generated
  if(!game.lastBlock || game.lastBlock.body.x < game.width){
    generateBlock(game);
  }

  game.boxGroup.forEach(function(b){
    b.body.velocity.x = b.baseSpeed + b.speedConst*game.tick;
    if(b.body.x < hudWidth -32) {
      b.destroy();
    }
  });
  game.powerUpGroup.forEach(function(p){
    p.body.velocity.x = p.baseSpeed + p.speedConst*game.tick;
    if(p.body.x < hudWidth -32) {
      p.destroy();
    }
  });
}
