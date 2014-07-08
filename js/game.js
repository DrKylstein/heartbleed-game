/*
 * Game Classes
 * K. Delaney
 */

/*
 * HeartbleedGame class
 */
function HeartbleedGame(memoryContents, soundManager) {
  //private
  this.m_memoryContents = memoryContents;
  this.m_soundManager = soundManager;
  this.m_tries = 4; //attempts left
  this.m_correctPassword = '';
  this.m_won = false;
  
  //public, just callbacks
  this.onMessage = function(str){};
  this.onReset = function(){};
  this.onTriesChange = function(num){};
}

HeartbleedGame.prototype.m_countMatches = function 
HeartbleedGame_m_countMatches(candidate) {
  var matches = 0;
  for(var i = 0; i < Math.min(candidate.length, this.m_correctPassword.length); i++) {
    if(candidate.charAt(i) == this.m_correctPassword.charAt(i)) {
      matches++;
    }
  }
  return matches;
}

HeartbleedGame.prototype.tryItem = function HeartbleedGame_tryItem(index) {
  var candidate = this.m_memoryContents.get(index);
  if(candidate == this.m_correctPassword) {
    this.onMessage('ACCESS GRANTED');
    this.m_won = true;
  } else {
    this.onTriesChange(--this.m_tries);
    this.onMessage('ACCESS DENIED');
    this.onMessage(this.m_countMatches(candidate)+'/'+this.m_correctPassword.length+' correct')
  }
}

HeartbleedGame.prototype.reset = function HeartbleedGame_reset() {
  this.m_won = false;
  this.m_tries = 4;
  //TODO: correctPassword, memoryContents.fill
}

/*
 * MemoryContents class
 */
function MemoryContents() {
  this.onChange = function(index, str){};
  this.m_items = ['forgotto', 'initiali', 'ze_oops!'];
}

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

MemoryContents.prototype.blankOut = function MemoryContents_blankOut(index) {
  if(index < this.m_items.length) {
    var oldString = this.m_items[index];
    this.m_items[index] = '.'.repeat(oldString.length);
    this.onChange(index, this.m_items[index]);
  }
}

MemoryContents.prototype.get = function MemoryContents_get(index) {
  return this.m_items[index];
}