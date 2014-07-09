/*
 * Game Module
 * K. Delaney
 */

var game_module = (function() {
  var module = {};
    
  /*
   * Constants
   */
    
    START_TRIES = 4;
    CODES_COUNT = 8;
    
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
    this.m_won = false;
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
      'anthologists'
    ];
    
    //public, just callbacks
    this.onMessage = function(str){
      console.warn("Unset HeartbleedGame.onMessage called: "+str);
    };
    this.onReset = function(){
      console.warn("Unset HeartbleedGame.onReset called!");
    };
    this.onTriesChange = function(num){
      console.warn("Unset HeartbleedGame.onTriesChange called: "+num);
    };
  }

  //methods
  HeartbleedGame.prototype.tryItem = function HeartbleedGame_tryItem(index) {
    var candidate = this.m_memoryContents.get(index);
    if(candidate == this.m_correctPassword) {
      this.onMessage('ACCESS GRANTED');
      this.m_won = true;
    } else if(candidate.startsWith('{') && candidate.endsWith('}')) {
      this.m_memoryContents.blankOut(this.m_duds.pop());
      this.onMessage('Dud removed.');
    } else {
      this.onTriesChange(--this.m_tries);
      this.onMessage('ACCESS DENIED');
      this.onMessage(countMatches(candidate, this.m_correctPassword)+'/'+
        this.m_correctPassword.length+' correct.');
    }
  }
  HeartbleedGame.prototype.reset = function HeartbleedGame_reset() {
    this.m_won = false;
    this.m_tries = START_TRIES;
    
    shuffle(this.m_wordPool);
    
    //choose password
    this.m_correctPassword = this.m_wordPool[0];
    console.log("The secret word is: "+this.m_correctPassword);
    
    //fill memory
    var contents = [];
    //fill words, keeping record of the duds
    this.m_duds = [];
    for(var i = 0; i < CODES_COUNT/2; i++) {
      contents.push(this.m_wordPool[i]);
      if(i > 0) {
        this.m_duds.push(this.m_wordPool[i]);
      }
    }
    //fill garbage
    for(var i = 0; i < CODES_COUNT/2; i++) {
      contents.push('{..........}');
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
    this.m_items = ['forgotto', 'initiali', 'ze_oops!'];
  }
  
  //methods
  MemoryContents.prototype.fill = function MemoryContents_fill(items) {
    //notify view(s)
    for(var i = 0; i < Math.max(this.m_items.length, items.length); i++) {
      if(i < items.length) {
        this.onChange(i,items[i]);
      } else {
        this.onChange(i,'');
      }
    }
    //update internals
    this.m_items = items;
  }
  //has changed from design doc: now specify a string to find
  MemoryContents.prototype.blankOut = function MemoryContents_blankOut(str) {
    index = this.m_items.indexOf(str);
    if(index >= 0) {
      var oldString = this.m_items[index];
      this.m_items[index] = '.'.repeat(oldString.length);
      this.onChange(index, this.m_items[index]);
    }
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
