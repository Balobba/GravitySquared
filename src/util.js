var debug = false;

function changeGravity(game){
  game.playerGroup.forEach(function(p){
    p.dir *= -1;
  });
}
