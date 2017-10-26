function preloadState(game){
  preloadImages(game);
}

function preloadImages(game){
  /*
  * Images
  */
  game.load.image('swap', 'assets/powerup_swap.png');
  game.load.image('boost', 'assets/powerup_boost.png');
  game.load.image('shockwave', 'assets/powerup_shockwave.png');
  game.load.image('tnt', 'assets/powerup_tnt.png');

  game.load.image('player0', 'assets/player0.png');
  game.load.image('player1', 'assets/player1.png');
  game.load.image('player2', 'assets/player2.png');
  game.load.image('player3', 'assets/player3.png');

  game.load.image('box', 'assets/box.png');
  game.load.image('HUD', 'assets/HUD.png');

/*
* Spritesheet
*/

game.load.spritesheet('boost_active', 'assets/powerup_boost_active.png', 96, 32, 2);
game.load.spritesheet('tnt_active', 'assets/powerup_tnt_active.png', 96, 96, 11);
game.load.spritesheet('shockwave_active', 'assets/powerup_shockwave_active.png', 96, 96, 9);
game.load.spritesheet('swap_active_blue', 'assets/powerup_swap_active_blue.png', 96, 96, 7);
game.load.spritesheet('swap_active_orange', 'assets/powerup_swap_active_orange.png',96, 96, 7);

game.load.spritesheet('pickup', 'assets/powerup_pickup.png', 96, 96, 5);

}
