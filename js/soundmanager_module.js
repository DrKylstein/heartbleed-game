/*
 * SoundManager Module
 * C. Brice
 */

var soundmanager_module = (function() {
  var module = {};

  /*
   * Utilities
   */
  
  
  function generateTags() {
  
  }
  
  function getNames(urls) {
	var re = /\w*(?=\.);	
	var names = [];
	for(int i=0; i<url.length;i++) {
		name = urls[i].search(re)[0].substring(1);
		names.push(name);
	}
	reutrn names;
  }
  
  /*
   * SoundManager class
   */
  //constructor
  function SoundManager(sounds) 
  {
    //private
    this.m_sounds = sounds;
    this.m_soundNames = getNames(sounds);
    this.enabled = true;
    
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
  SoundManager.prototype.playSound = function SoundManager_playSound(name) {
    
  }
  
  SoundManager.prototype.setEnabled = function SoundManager_setEnabled(enabled) {
    this.enabled = enabled;
  }
  
  SoundManager.prototype.pause = function SoundManager_pause() {
	
  }
  
  SoundManager.prototype.resume = function SoundManager_resume() {
	
  }

  //export
  module.SoundManager = SoundManager;
  
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
