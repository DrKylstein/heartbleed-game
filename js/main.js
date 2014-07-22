/*
 * entry point, glue code
 * K. Delaney
 */

$(document).ready(function() {
  var display = new view_module.MemoryDisplay('#characters');
  var messageBox = new view_module.MessageBox('#console');
  var soundManager = new soundmanager_module.SoundManager('');
  var memory = new game_module.MemoryContents();
  var game = new game_module.HeartbleedGame(memory, soundManager);
  $('#power').click(function(){
    game.reset();
  });
  game.onMessage = $.proxy(messageBox.add, messageBox);
  memory.onChange = $.proxy(display.change, display);
  memory.onReset = $.proxy(display.reset, display);
  //game.onTriesChange = ?;
  game.onReset = $.proxy(messageBox.clear, messageBox);
  display.onSelection = $.proxy(game.tryItem, game);
  
  game.reset();
});
