function updateState(game){

  game.playerGroup.forEach(function(p){
    p.body.velocity.y = p.maxVel*(-1*p.dir);
    p.body.velocity.x = 400;
  });
}
