var state_sandbox = {
  preload: function() {
    preloadState(game);

  },
  create: function() {
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

var state_menu_startgame = {
  preload: function() {
    menustart_preload(game);
  },
  create: function() {
    menustart_create(game);
  },
  update: function() {
    menustart_update(game);
  },
  shutdown: function() {
  },
  render: function () {
  }
};

var state_startscreen = {
  preload: function() {
    menuscreen_preload(game);
  },
  create: function() {
    menuscreen_create(game);
  },
  update: function() {
    menuscreen_update(game);
  },
  shutdown: function() {
  },
  render: function () {
  }
};
