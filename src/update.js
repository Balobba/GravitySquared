function updateState(game){

  // update player
  game.playerGroup.forEach(function(p){
    p.body.velocity.x = 200;
    setGravity(p);
    game.physics.arcade.collide(p, game.border);
    game.boxGroup.forEach(function(b){
      game.physics.arcade.collide(p, b, function()
        {
          p.body.gravity.y = 0;
        });

    });

    // remove player if outside world bounds
    if(p.body.x < -32 || p.body.x > game.width + 32
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
    if(b.body.x < -32) {
      b.destroy();
    }
  });
}
