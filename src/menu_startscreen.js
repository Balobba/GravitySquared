/*
 * Preload images for startscreen
 */
function menuscreen_preload(game){
  game.load.image('player0', 'assets/player0.png');

  // placeholder for buttons
  game.load.image('buttonmultiplayer', 'assets/buttonmultiplayer.png');
  game.load.image('buttoncredits', 'assets/buttoncredits.png');
}

/*
 * Create menu
 */
function menuscreen_create(game){
  // set background color
  game.stage.backgroundColor = "#7443B6"; //REPLACE WITH SPLASHSCREEN LATER!


  // Start game button

  game.multiplayer =  game.add.button(game.width/2, game.height*7/10, 'buttonmultiplayer'
    , function() {
      game.state.start('menu_startgame');
    }, this, 2, 1, 0);
    game.multiplayer.anchor.setTo(0.5,0.5);

    game.credits =  game.add.button(game.width/2, game.height*9/10, 'buttoncredits'
      , function() {
        game.state.start('menu_credits');
      }, this, 2, 1, 0);
      game.credits.anchor.setTo(0.5,0.5);

}

function menuscreen_update(game){


}
