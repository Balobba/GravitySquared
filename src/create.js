function createState(game){
  //Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);


  //Groups
  game.playerGroup = game.add.group();
  game.boxGroup = game.add.group();

  //background
  game.stage.backgroundColor = "#1FFFFF";

  game.world.bringToTop(game.playerGroup);
  game.world.bringToTop(game.boxGroup);

  createPlayer(game, 100, 350, constGravity, directionEnum.DOWN);
  createPlayer(game, 464, 100, constGravity, directionEnum.UP);

  for(var i = 0; i < game.width/32+5; i++) {
    createBox(game, i*32,0, 'box');
    createBox(game, i*32,game.height-32, 'box');
  }

  game.border = game.add.sprite(game.width,0);
  game.border.enableBody = true;
  game.physics.arcade.enable(game.border);
  game.border.body.setSize(10,game.height, 0 ,0);
  game.border.body.immovable = true;
  game.downY = 0;
  game.downX = 0;

}


function createBox(game, x, y, name){

  var box = game.add.sprite(x, y, name);
  game.physics.arcade.enable(box, debug);
  box.body.immovable = true;
  box.body.velocity.x = -200;
  box.body.friction.y = 0;
  game.lastBlock = box;
  game.boxGroup.add(box);
}

function createPlayer(game, x, y, gravity, dir){
  var player = game.add.sprite(x, y, 'player');
  player.tint = Math.random() * 0xffffff; 
  game.physics.arcade.enable(player, debug);

  player.body.gravity.y = gravity;
  player.body.friction.y = 0;
  player.dir = dir;

  setGravity(player);

  player.keyG = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].g);
  player.keyW = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].w);

  player.keyG.onDown.add(function(){changeGravity(player)}, this);

  game.playerGroup.add(player);

}
