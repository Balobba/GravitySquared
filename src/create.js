function createState(game){
  //Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.gameOver = false;

  //Groups
  game.playerGroup = game.add.group();
  game.boxGroup = game.add.group();
  game.powerUpGroup = game.add.group();
  game.hudGroup = game.add.group();
  game.animationGroup = game.add.group();

  var hud = game.add.sprite(0,0,'HUD');
  hud.width = HUD_WIDTH;
  game.hudGroup.add(hud);

  //background
  game.stage.backgroundColor = "#7443B6"; //Needs to be replaced with image later!


  // create players
  // TODO do this more general
  for(var i = 0; i < activePlayers; i++){
    createPlayer(game, HUD_WIDTH + 10, 80+i*128, GRAVITY, Math.round(Math.random()), playerStat[i].imageIndex);

  }
  game.tick = 0;

  game.time.events.loop(Phaser.Timer.SECOND * 0.3, function() {game.tick++;}, this);

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.keyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
  game.keyF.onDown.add(function() {
    game.scale.startFullScreen(false);
  });

  drawHud(game);

  createStartBlocks(game);

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

/*
 * Create the first flat part of the world
 */
function createStartBlocks(game) {
  for(var i = 0; i < game.width/BLOCK_SIZE+10; i++) {
    createBox(game, i*BLOCK_SIZE,0, false);
    createBox(game, i*BLOCK_SIZE,game.height-BLOCK_SIZE, true);
  }
}

function createBox(game, x, y, building){
  var box;
  if(building){
    var frame = Math.round(Math.random()*4);
    box = game.add.sprite(x+BLOCK_SIZE/2, y+BLOCK_SIZE/2, 'building', frame);
    box.angle = ANGLES[Math.floor(Math.random()*ANGLES.length)];
  } else {
    box = game.add.sprite(x+BLOCK_SIZE/2, y+BLOCK_SIZE/2, 'cloud');
  }
  box.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(box);
  box.body.immovable = true;
  box.baseSpeed = -200;//-200
  box.speedConst = -1;//-1
  box.body.friction.y = 0;
  game.lastBlock = box;
  game.boxGroup.add(box);
}

function createPlayer(game, x, y, gravity, dir, imageIndex){
  var player = game.add.sprite(x, y, playerNames[imageIndex]);
  game.physics.arcade.enable(player);
  player.scale.setTo(0.8, 0.8);
  player.anchor.setTo(0.5, 0.5);
  player.speedConst = 1;
  player.baseSpeed = 200;
  player.powerup = null; //CAN BE EDITED FOR TESTING PURPOSES
  player.powerupIcon = null;

  player.body.gravity.y = gravity;
  player.body.friction.y = 0;
  player.dir = dir;

  setGravity(player);

  player.keyG = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].g);
  player.keyW = game.input.keyboard.addKey(keyBindings[game.playerGroup.length].w);

  player.keyG.onDown.add(function(){changeGravity(player, true)}, this);
  player.keyW.onDown.add(function(){usePowerUp(game,player)}, this);
  player.index = game.playerGroup.length;

  game.playerGroup.add(player);

}
