/*
 * Preload images for startscreen
 */
function menuscreen_preload(game){
  game.load.image('player0', 'assets/player0.png');

  // placeholder for buttons
  game.load.image('button', 'assets/button.png');
}

/*
 * Create menu
 */
function menuscreen_create(game){
  // set background color
  game.stage.backgroundColor = "#7443B6"; //REPLACE WITH SPLASHSCREEN LATER!


  // text styles
  game.styleTitle = { font: "32px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };
  game.stylePlayer = { font: "15px Arial", fill: "#ffffff", align: "center", fontWeight: 'bold', stroke: '#000000', strokeThickness: 4 };

  // Add static text
  game.title = game.add.text(30, 5, 'Menu', game.styleTitle);
  game.playerText = game.add.text(30, 45, 'Players: ' + activePlayers, game.styleTitle);


  // Start game button
  game.start =  game.add.button(game.width/2, game.height - 60, 'button'
    , function() {
      game.state.start('menu_startgame');

    }, this, 2, 1, 0);
}

function menuscreen_update(game){


}
