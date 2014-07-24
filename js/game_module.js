/*
 * Game Module
 * K. Delaney
 */

var game_module = (function() {
  var module = {};
    
  /*
   * Constants
   */
    
    var START_TRIES = 4;

    var WORD_COUNT = 12;
    var BRACKET_COUNT = 5;
    var GARBAGE_COUNT = 20;
    
    var GAIN_TRIES = 1/4;
    
    var GARBAGE = '`~!@#$%^&*-_=+,./?;:"\'\\|';
    var BRACES = ['{}','[]','<>','()'];
    var GARBAGE_LENGTH = 16;
    
  /*
   * Utilities
   */
    
  //Fisher–Yates shuffles an array in place
  function shuffle(a) { 
    var counter = a.length;
    var temp;
    var index;
    
    while(counter > 0) {
      index = Math.floor(Math.random()*counter);
      counter--;
      temp = a[counter];
      a[counter] = a[index];
      a[index] = temp;
    }
    
    return a;
  }
  
  //Counts letters that are the same in each string
  function countMatches(candidate,secret) {
    var matches = 0;
    for(var i = 0; i < Math.min(candidate.length, secret.length);
    i++) {
      if(candidate.charAt(i) == secret.charAt(i)) {
        matches++;
      }
    }
    return matches;
  }
  
  /*
   * HeartbleedGame class
   */
  //constructor
  function HeartbleedGame(memoryContents, soundManager) 
  {
    //private
    this.m_memoryContents = memoryContents;
    this.m_soundManager = soundManager;
    this.m_tries = START_TRIES; //attempts left
    this.m_correctPassword = '';
    this.m_gameOver = false;
    this.m_duds = [];
    this.m_wordPool = [
      'enthronement',
      'untimeliness',
      'steeplejacks',
      'gesticulates',
      'spitefullest',
      'coefficients',
      'dispossesses',
      'discomposure',
      'electroplate',
      'anthologists',
      'uncultivated',
      'articulating',
      'peccadilloes',
      'brinkmanship',
      'carbohydrate',
      'computations',
      'fractionally',
      'orthographic',
      'precognition',
      'mythological',
      'ploughshares',
      'henceforward',
      'cloverleaves',
      'congregating',
      'intensifiers',
      'redecorating',
      'vicissitudes',
      'peacekeeping',
      'disincentive',
      'designations',
      'semitrailers',
      'thunderstorm',
      'boondoggling',
      'plasterboard',
      'scoutmasters',
      'unprejudiced',
      'misjudgments',
      'demographics',
      'belligerents'
    ];
    
    //public, just callbacks
    this.onReset = function(){
      console.warn("Unset HeartbleedGame.onReset called!");
    };
    this.onTriesChange = function(num){
      console.warn("Unset HeartbleedGame.onTriesChange called: "+num);
    };
    //when correct password is entered
    this.onSuccess = function() {
      console.warn("Unset HeartbleedGame.onSuccess called.");
    }
    //when incorrect password is entered
    this.onFail = function(ratio) {
      console.warn("Unset HeartbleedGame.onFail called: "+ratio);
    }
    this.onDudRemoved = function() {
      console.warn("Unset HeartbleedGame.onDudRemoved called.");
    }
    this.onTriesReset = function() {
      console.warn("Unset HeartbleedGame.onTriesReset called.");
    }
    this.onGameOver = function() {
      console.warn("Unset HeartbleedGame.onGameOver called");
    }
  }

  //methods
  HeartbleedGame.prototype.tryItem = function HeartbleedGame_tryItem(index) {
    if(this.m_gameOver == true) return;
    
    var candidate = this.m_memoryContents.get(index);
    
    //handle braces
    for(var i = 0; i < BRACES.length; i++) {
      var style = BRACES[i];
      if(candidate.charAt(0)===style.charAt(0) && 
      candidate.charAt(candidate.length-1)===style.charAt(1)) {
        if(Math.random() < GAIN_TRIES && this.m_tries < START_TRIES) {
          this.m_tries = START_TRIES;
          this.onTriesChange(this.m_tries);
          this.onTriesReset();//this.onMessage('Attempts reset.');
        } else {
          this.m_memoryContents.blankOut(this.m_memoryContents.find(this.m_duds.pop()));
          this.onDudRemoved();//this.onMessage('Dud removed.');
        }
        this.m_memoryContents.blankOut(index);
        return;
      }
    }
    
    //handle password attempts
    if(candidate == this.m_correctPassword) {
      this.onSuccess();//this.onMessage('ACCESS GRANTED');
      this.m_gameOver = true;
    } else {
      this.onTriesChange(--this.m_tries);
      this.onFail(countMatches(candidate, this.m_correctPassword)+'/'+
        this.m_correctPassword.length);
      if(this.m_tries <= 0) {
        this.m_gameOver = true;
        this.onGameOver();
      }
    }
  }
  HeartbleedGame.prototype.reset = function HeartbleedGame_reset() {
    this.onReset();
    this.m_gameOver = false;
    this.m_tries = START_TRIES;
    this.onTriesChange(this.m_tries);
    
    shuffle(this.m_wordPool);
    
    //choose password
    this.m_correctPassword = this.m_wordPool[0];
    console.log("The secret word is: "+this.m_correctPassword);
    
    //fill memory
    var contents = [];
    //fill words, keeping record of the duds
    this.m_duds = [];
    for(var i = 0; i < WORD_COUNT; i++) {
      contents.push(this.m_wordPool[i]);
      if(i > 0) {
        this.m_duds.push(this.m_wordPool[i]);
      }
    }
    
    function randomGarbage(l) {
      var s = '';
      for(var j = 0; j < l; j++) {
        s += GARBAGE.charAt(Math.floor(Math.random()*GARBAGE.length));
      }
      return s;
    }
    
    //fill braces
    for(var i = 0; i < BRACKET_COUNT; i++) {
      shuffle(BRACES);
      var style = BRACES[0];
      var l = Math.max(Math.floor(Math.random()*GARBAGE_LENGTH),1);
      var s = randomGarbage(l);
      contents.push(style.charAt(0)+s+style.charAt(1));
    }
    //fill garbage
    for(var i = 0; i < GARBAGE_COUNT; i++) {
      var l = Math.max(Math.floor(Math.random()*GARBAGE_LENGTH),1);
      contents.push(randomGarbage(l));
    }    
    //set deletion order
    shuffle(this.m_duds);
    
    //shuffle and submit
    shuffle(contents);
    this.m_memoryContents.fill(contents);
  }

  //export
  module.HeartbleedGame = HeartbleedGame;
  
  /*
   * MemoryContents class
   */
  
  //constructor
  function MemoryContents() {
    this.onChange = function(index, str){
      console.warn("Unset MemoryContents.onChange called: "+index+" : "+str);
    };    
    
    //not in spec, added to ease MemoryDisplay development:
    this.onReset = function(l){
      console.warn("Unset MemoryContents.onReset called: "+l);
    };
    
    this.m_items = ['forgotto', 'initiali', 'ze_oops!'];
  }
  
  //methods
  MemoryContents.prototype.fill = function MemoryContents_fill(items) {
    //notify view(s)
    this.onReset(items.length);
    for(var i = 0; i < items.length; i++) {
        this.onChange(i,items[i]);
    }
    //update internals
    this.m_items = items;
  }
  MemoryContents.prototype.blankOut = function MemoryContents_blankOut(index) {
    if(index >= 0 && index < this.m_items.length) {
      var oldString = this.m_items[index];
      this.m_items[index] = '.'.repeat(oldString.length);
      this.onChange(index, this.m_items[index]);
    }
  }
  MemoryContents.prototype.find = function MemoryContents_find(str) {
    return this.m_items.indexOf(str);
  }
  MemoryContents.prototype.get = function MemoryContents_get(index) {
    return this.m_items[index];
  }
  MemoryContents.prototype.size = function MemoryContents_size() {
    return this.m_items.length;
  }

  module.MemoryContents = MemoryContents;
  
  return module;
}());
