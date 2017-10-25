var debug = true;
var constGravity = 1000;

function changeGravity(player){
  player.dir++;
  if(player.dir >= 2){
    player.dir = 0;
  }
  setGravity(player);
}

function setGravity(player){
  if(player.dir === directionEnum.UP){
    player.body.gravity.y = -1*constGravity;
  }else {
    player.body.gravity.y = constGravity;
  }
}

directionEnum = {
  UP : 0,
  DOWN : 1
}

// placeholder function for game over
function gameOver(game) {
  game.state.restart();
}

var keyBindings = [{g:Phaser.Keyboard.SPACEBAR, w: Phaser.Keyboard.W},
  {g:Phaser.Keyboard.O, w: Phaser.Keyboard.P}, ]
