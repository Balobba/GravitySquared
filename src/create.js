function createState(game){
  //Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //Groups
  game.playerGroup = game.add.group();
  game.boxGroup = game.add.group();
  game.powerUpGroup = game.add.group();

  game.hud = game.add.sprite(0,0,'HUD');
  game.hud.width = hudWidth;


  //background
  game.stage.backgroundColor = "#1FFFFF";

  // sort graphic in game
  game.world.bringToTop(game.playerGroup);
  game.world.bringToTop(game.boxGroup);
  game.world.bringToTop(game.hud);
  game.world.bringToTop(game.powerUpGroup);

  // create players
  // TODO do this more general
  for(var i = 0; i < game.activePlayers; i++){
    createPlayer(game, hudWidth + 10, 80+i*128, constGravity, Math.round(Math.random()));

  }
  game.tick = 0;

  game.time.events.loop(Phaser.Timer.SECOND * 0.3, function() {game.tick++;}, this);

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.keyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
  game.keyF.onDown.add(function() {
    game.scale.startFullScreen(false);
  });

  drawHud(game);

  // Create the first boxes, the first screen
  // TODO do this more general or somewhere else
  for(var i = 0; i < game.width/32+10; i++) {
    createBox(game, i*32,0, 'box');
    createBox(game, i*32,game.height-32, 'box');
  }

  // Border so player can collide with right wall
  game.border = game.add.sprite(game.width,0);
  game.border.enableBody = true;
  game.physics.arcade.enable(game.border);
  game.border.body.setSize(10,game.height, 0 ,0);
  game.border.body.immovable = true;

  // Used for knowing on which level the map is
  game.upperLevel = 1;
  game.lowerLevel = 1;

}


function createBox(game, x, y, name){
  var box = game.add.sprite(x, y, name);
  game.physics.arcade.enable(box);
  box.body.immovable = true;
  box.baseSpeed = -200;
  box.speedConst = -1;
  box.body.friction.y = 0;
  game.lastBlock = box;
  game.boxGroup.add(box);
}

function createPlayer(game, x, y, gravity, dir){
  var player = game.add.sprite(x, y, 'player' + game.playerGroup.length);
  game.physics.arcade.enable(player);
  player.scale.setTo(0.8, 0.8);
  player.speedConst = 1;
  player.baseSpeed = 200;

  player.body.gravity.y = gravity;
  player.body.friction.y = 0;
  player.dir = dir;

  setGravity(player);

  player.keyG = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].g);
  player.keyW = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].w);

  player.keyG.onDown.add(function(){changeGravity(player)}, this);

  game.playerGroup.add(player);

}
