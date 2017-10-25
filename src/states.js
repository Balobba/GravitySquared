var state_sandbox = {
  preload: function() {
    preloadState(game);
  },
  create: function() {
    game.activePlayers = 2;
    createState(game);
  },
  update: function() {
    updateState(game);
  },
  shutdown: function() {
  },
  render: function () {
  }
};
