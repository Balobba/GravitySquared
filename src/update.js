function updateState(game){
  if(game.playerGroup.length <= 1 ) {
   gameOver(game);
  }

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

    if(!game.lastBlock || game.lastBlock.body.x < game.width){
      var randX = Math.random();
      var randY = Math.random();
      if(randX < 0.7) {
      } else if(randX < 0.85){
        game.downX--;
        game.downX = Math.max(game.downX, 1);
      } else {
        game.downX++;
      }
      if(randY < 0.7) {
      } else if(randY < 0.85){
        game.downY--;
        game.downY = Math.max(game.downY, 1);
      } else {
        game.downY++;
      }
      if(game.downY + game.downX > game.height/32 - 2) {
        if(game.downY > game.downX) {
          game.downY -= (game.downY + game.downX) - (game.height/32 - 2);
        } else {
          game.downX -= (game.downY + game.downX) - (game.height/32 - 2);
        }
      }
      for(var i = 0; i < game.downX; i++) {
        createBox(game, 830,i*32, 'box');
      }
      for(var i = 0; i < game.downY; i++) {
        createBox(game, 830,game.height-i*32-32, 'box');
      }



    }

    game.boxGroup.forEach(function(b){
      if(b.body.x < -32) {
        b.destroy();
      }
    });
  }
