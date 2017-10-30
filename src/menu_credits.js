/*
 * Preload images for menu
 */
function credits_preload(game){


  game.load.image('buttonback', 'assets/buttonback.png');
  game.load.image('background', 'assets/menu_background.png');
}

/*
 * Create menu
 */
function credits_create(game){
  // set background color
  game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);

  game.creditsTitle = createText('Created by:', 40, game.width/2, game.height*1/10);
  game.creditsTitle.anchor.setTo(0.5,0.5);

  game.creditsText2 = createText('Oscar Magnusson', 34, game.width/2, game.height*3/10);
  game.creditsText2.anchor.setTo(0.5,0.5);

  game.creditsText3 = createText('Github: balobba', 24, game.width/2, game.height*3/10+60);
  game.creditsText3.anchor.setTo(0.5,0.5);

  game.creditsText4 = createText('Oscar Johansson', 34, game.width/2, game.height*3/10+150);
  game.creditsText4.anchor.setTo(0.5,0.5);

  game.creditsText5 = createText('Github: oscarjohansson94', 24, game.width/2, game.height*3/10+210);
  game.creditsText5.anchor.setTo(0.5,0.5);

  game.back =  game.add.button(game.width/2, game.height*9/10, 'buttonback'
    , function() {
      game.state.start('menu_startscreen');
    }, this, 2, 1, 0);
    game.back.anchor.setTo(0.5, 0.5);

}

/*
 * Update function for menu
 */
function credits_update(game){

}
