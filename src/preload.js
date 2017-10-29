function preloadState(game){
  preloadImages(game);
}

function preloadImages(game){
  /*
  * Images
  */

  game.load.image('player0', 'assets/player0.png');
  game.load.image('player1', 'assets/player1.png');
  game.load.image('player2', 'assets/player2.png');
  game.load.image('player3', 'assets/player3.png');
  game.load.image('player4', 'assets/player4.png');
  game.load.image('player5', 'assets/player5.png');
  game.load.image('player6', 'assets/player6.png');
  game.load.image('player7', 'assets/player7.png');

  game.load.image('cloud', 'assets/cloud.png');
  game.load.image('HUD', 'assets/HUD.png');
  game.load.image('background', 'assets/background.png');

/*
* Spritesheet
*/

game.load.spritesheet('swap', 'assets/powerup_swap.png', 32, 32, 9);
game.load.spritesheet('boost', 'assets/powerup_boost.png', 32, 32, 6);
game.load.spritesheet('shockwave', 'assets/powerup_shockwave.png', 32, 32, 10);
game.load.spritesheet('tnt', 'assets/powerup_tnt.png', 32, 32, 2);


game.load.spritesheet('boost_active', 'assets/powerup_boost_active.png', 96, 32, 2);
game.load.spritesheet('tnt_active', 'assets/powerup_tnt_active.png', 96, 96, 11);
game.load.spritesheet('shockwave_active', 'assets/powerup_shockwave_active.png', 96, 96, 14);
game.load.spritesheet('swap_active_turquoise', 'assets/powerup_swap_active_turquoise.png', 96, 96, 7);
game.load.spritesheet('swap_active_pink', 'assets/powerup_swap_active_pink.png',96, 96, 7);

game.load.spritesheet('pickup', 'assets/powerup_pickup.png', 96, 96, 5);
game.load.spritesheet('building', 'assets/building.png', 32, 32, 5);
game.load.spritesheet('death', 'assets/deathanimation.png', 96, 96, 5);

}
