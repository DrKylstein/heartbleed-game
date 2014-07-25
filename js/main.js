/*
 * entry point, glue code
 * K. Delaney
 * R. Murrer
 */

var sounds = ["sounds/key1.mp3","sounds/key2.mp3","sounds/key3.mp3","sounds/key4.mp3","sounds/key5.mp3", "sounds/success.mp3", "sounds/fail.mp3", "sounds/bonus1.mp3", "sounds/lose.mp3"];

$(document).ready(function() {
  //generate addresses
  // make sure it is high enough so that it takes up 4 hex places (could add padder?)
  var address = 4500 + Math.floor(Math.random() * 50000);   
  var formatter = function(x) { return "<p>0x" + x.toString(16) + "</p>";  };

  // start column1
  var abuffer = "";
  for (var i=0; i<17; i++)
  {
    abuffer += formatter(address);
    address += 96; // 12 chars * 8 bits
  }
  $('#addresses-1').html(abuffer);


  // start column2 
  abuffer = "";
  for (var i=0; i<17; i++)
  {
    abuffer += formatter(address);
    address += 96; // 12 chars * 8 bits
  }
  $('#addresses-2').html(abuffer);
    
  //init components
  var display = new view_module.MemoryDisplay('#terminal-container');
  var messageBox = new view_module.MessageBox('#console');
  var soundManager = new soundmanager_module.SoundManager(sounds);
  var memory = new game_module.MemoryContents();
  var game = new game_module.HeartbleedGame(memory, soundManager);
  
  //attach handlers
  //game.onMessage = $.proxy(messageBox.add, messageBox);
  memory.onChange = $.proxy(display.change, display);
  memory.onReset = $.proxy(display.reset, display);
  display.onSelection = $.proxy(game.tryItem, game);
  display.onHover = function() {
    soundManager.playSound("key1");
  }
  
  //set messages and sounds
  game.onReset = function(){
    messageBox.clear();
    messageBox.add("Connection established.");
    messageBox.add("Dumping buffer... Done.");
  }
  //when correct password is entered
  game.onSuccess = function() {
    messageBox.add('ACCESS GRANTED');
    messageBox.add('Taking total control... Done.');
    soundManager.playSound('success');
  }
  //when incorrect password is entered
  game.onFail = function(ratio) {
    messageBox.add('ACCESS DENIED');
    messageBox.add(ratio+' correct.');
    soundManager.playSound('fail', 25);
  }
  game.onDudRemoved = function() {
    messageBox.add('Dud removed.');
      soundManager.playSound('bonus1', 25);
  }
  game.onTriesReset = function() {
    messageBox.add('Tries reset.');
      soundManager.playSound('bonus1');
  }
  game.onGameOver = function() {
    messageBox.add('CONNECTION TERMINATED');
    messageBox.add('Backtrace detected!');
      soundManager.playSound('lose', 50);
  }
  
  //set up simple gui elements
  // tries counter
  var triesBox = $('#tries');  
  game.onTriesChange = function(num) {
    var blocks = "";
    for(var i = 0; i < num; i++) {
      blocks += "# ";
    }
    triesBox.html('<span id="number-attempts">'+num+'</span> ATTEMPT(S) LEFT: <span id="blocks">'+blocks+'</span>');
  }
  //power button
  function terminalOn() {
    $('body').removeClass('offbackground'); 
    $('#terminal-container').removeClass('offterminal');
    game.reset();
    $('#power').click(terminalOff);
  }
  function terminalOff() {
    $('body').addClass('offbackground'); 
    $('#terminal-container').addClass('offterminal');
    $('#power').click(terminalOn);
  }
  terminalOn();
  //sound button
  function soundOn() {
    $('body').removeClass('musicoffbackground'); 
    soundManager.setEnabled(true);
    $('#volume').click(soundOff);
  }
  function soundOff() {
    $('body').addClass('musicoffbackground'); 
    soundManager.setEnabled(false);
    $('#volume').click(soundOn);
  }
  soundOn();

});
