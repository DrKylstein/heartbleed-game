/*
 * Highscore Module
 * C. Brice
 */

var highscore_module = (function() {
  var module = {};

  /*
   * Utilities
   */
  
  
  /*
   * Highscore class
   */
  //constructor
  function Highscore(name) 
  {
    //private
    if(typeof name !== "undefined")  this.m_name = name;
   
    //public
    this.scores = [];
    
  }

  //methods
  Highscore.prototype.getScores = function Highscore_getScores() {
    $.getJSON("/api/highscores", function(data) {
      this.scores = data;
    });
    
    return this.scores;
  }
  
  Highscore.prototype.postScore = function Highscore_postScore(name, score) {
    var t_name = this.m_name;
    if(typeof name !== "undefined") t_name = name;
    
    $.post( "/api/highscores", { name: t_name, score: score }, function(data) {
      alert(data);
    });
  }
  
  Highscore.prototype.setName = function Highscore_postScore(name) {
    this.m_name = name;
  }

  //export
  module.Highscore = Highscore;
  
  return module;
}());
