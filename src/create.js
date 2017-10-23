function createState(game){
  //Physics
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.world.defaultContactMaterial.friction = 0;
  game.physics.p2.restitution = 0; //sort of friction

  //Groups
  game.playerGroup = game.add.group();
  game.boxGroup = game.add.group();

  //background
  game.stage.backgroundColor = "#1FFFFF";

  game.world.bringToTop(game.playerGroup);
  game.world.bringToTop(game.boxGroup);

  createPlayer(game, 100, 350, 100);
  createPlayer(game, 464, 100, 50);

  for(var i = 0; i < 20; i++) {
    createBox(game, 700-i*32,397, 'box');
  }

  createBox(game, 500, 365, 'box');
  //key (spacebar)
  game.key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.key.onDown.add(function(){changeGravity(game)}, this);
}


function createBox(game, x, y, name){

  var box = game.add.sprite(x, y, name);
  game.physics.p2.enable(box, debug);
  box.body.static = true;
  game.boxGroup.add(box);
}

function createPlayer(game, x, y, gravity){
  var player = game.add.sprite(x, y, 'player');
  game.physics.p2.enable(player, debug);

  player.body.collideWorldBounds = true;

  player.maxVel = gravity;
  player.body.velocity.y = gravity;

  player.dir = -1;
  game.playerGroup.add(player);

}
