/*
 * SoundManager Module
 * C. Brice
 */

var soundmanager_module = (function() {
  var module = {};

  /*
   * Utilities
   */
  
  
  function generateTags(urls) {
    var tags = [];
    for(var i=0;i<urls.length;i++) {
      var tag = document.createElement('audio');
      tag.src = tag.baseURI.replace("/index.html",urls[i]);
      tags.push(tag);
    }
    return tags;
  }
  
  function getNames(urls) {
    var re = /(\/\w*)(?=\.)/;
    var names = [];
    for(var i=0;i<urls.length;i++) {
      var matches = urls[i].match(re);
      if(matches != null) {
        var name = matches[0].substring(1);
        names.push(name);
      }
    }
    return names;
  }
  
  /*
   * SoundManager class
   */
  //constructor
  function SoundManager(sounds) 
  {
    //private
    this.m_urls = sounds;
    this.m_soundNames = getNames(sounds);
    this.m_tags = generateTags(sounds);
    this.m_playing = null;
    
    //public
    this.enabled = true;
    
  }

  //methods
  SoundManager.prototype.playSound = function SoundManager_playSound(name) {
    if(this.enabled) {
      var id = this.m_soundNames.indexOf(name);
      if(id != null) {
        if(this.m_playing != null)
          this.m_playing.pause();
        this.m_playing = this.m_tags[id];
        this.m_playing.play();
      }
    }
  }
  
  SoundManager.prototype.setEnabled = function SoundManager_setEnabled(enabled) {
    this.enabled = enabled;
  }
  
  SoundManager.prototype.pause = function SoundManager_pause() {
    if(this.m_playing != null)
      this.m_playing.pause();
  }
  
  SoundManager.prototype.resume = function SoundManager_resume() {
    if(this.enabled && this.m_playing != null)
      this.m_playing.play();
  }

  //export
  module.SoundManager = SoundManager;
  
  return module;
}());
