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
    this.m_pullTime = Date.now();

    //public
    this.scores = []; 
    this.pullScores();
  }

  //methods
  Highscore.prototype.getScores = function Highscore_getScores() {    
    if(Date.now()-this.m_pullTime == 2000) {
      pullScores();
    }
    return this.scores;
  }

  Highscore.prototype.pullScores = function Highscore_pullScores() {
    var self = this;
    $.getJSON("http://game.brice.io/api/highscores", function(data) {
      self.scores = data;
    });
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

  Highscore.prototype.showScores = function() {
    var scores = this.getScores();
    $.each(scores, function(i, item) {
      $("#scores > tbody").append("<tr><td>"+(i+1)+"</td><td>"+item.name+"</td><td>"+item.score+"</td></tr>");
    });
  }

  //export
  module.Highscore = Highscore;
  
  return module;
}());
