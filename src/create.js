function createState(game){
  //Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);


  game.tickCounter = 0;
  //Groups
  game.playerGroup = game.add.group();
  game.boxGroup = game.add.group();

  //background
  game.stage.backgroundColor = "#1FFFFF";

  game.world.bringToTop(game.playerGroup);
  game.world.bringToTop(game.boxGroup);

  createPlayer(game, 100, 350, constGravity, directionEnum.DOWN);
  createPlayer(game, 464, 100, constGravity, directionEnum.UP);

  for(var i = 0; i < 20; i++) {
    createBox(game, 700-i*30,450, 'box');
  }

  createBox(game, 500, 450-32, 'box');

}


function createBox(game, x, y, name){

  var box = game.add.sprite(x, y, name);
  game.physics.arcade.enable(box, debug);
  box.body.immovable = true;
  box.body.velocity.x = -200;
  box.body.friction.y = 0;
  game.boxGroup.add(box);
}

function createPlayer(game, x, y, gravity, dir){
  var player = game.add.sprite(x, y, 'player');
  game.physics.arcade.enable(player, debug);

  player.body.collideWorldBounds = true;
  player.body.gravity.y = gravity;
  player.body.friction.y = 0;
  player.dir = dir;
  setGravity(player);

  //key (spacebar)
  player.keyG = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].g);
  player.keyW = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].w);

  player.keyG.onDown.add(function(){changeGravity(player)}, this);



  game.playerGroup.add(player);

}
