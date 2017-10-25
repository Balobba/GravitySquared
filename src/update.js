function updateState(game){

  game.playerGroup.forEach(function(p){
    p.body.velocity.x = 210;
    game.boxGroup.forEach(function(b){
      game.physics.arcade.collide(p, b, function()
      {
        p.body.gravity.y = 0;

       });

    });
  });

    game.tickCounter++;
    if(game.tickCounter >= 4){
      game.tickCounter = 0;
      createBox(game, 830,450, 'box');
      createBox(game, 830,50, 'box');
    }
    game.boxGroup.forEach(function(b){
      if(b.body.x < -32) {
        b.destroy();
      }
    });
  }
