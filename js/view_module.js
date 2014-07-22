/*
 * View Module
 * K. Delaney
 */

"use strict";

var view_module = (function(){
  var module = {};
    
  var COLUMN_LENGTH = 17*12;
    
/*
 * Utilities
 */
    
  function escapeSymbols(s) {
    return s.replace(/<+/g, '<').replace(/>+/g, '>').replace(/"+/g, '"')
    .replace(/&+/g, '&');
  }
    
/*
 * MemoryDisplay class
 */
  
  function MemoryDisplay(id) {
    this.onSelection = function(index) {
      console.warn("Unset MemoryDisplay.onSelection called: "+index);
    };
    //not in spec: added as a way to hook sound effects to hover
    this.onHover = function(index) {
      console.warn("Unset MemoryDisplay.onHover called: "+index);
    };
    this.m_rootElement = $(id);
    this.m_leftElement = this.m_rootElement.find('.characters-1');
    this.m_rightElement = this.m_rootElement.find('.characters-2');
    this.m_leftLength = 0;
    //this.m_rightLength = 0;
    this.reset();
  }
  
  //not in spec: must be called if elements are removed, or to clear
  MemoryDisplay.prototype.reset = function MemoryDisplay_reset(size) {
    this.m_leftElement.empty();
    this.m_rightElement.empty();
    this.m_leftLength = 0;
  }
  //can only change with same length or add new element to end
  MemoryDisplay.prototype.change = function MemoryDisplay_change(index, content) {
    var selection = this.m_leftElement.find('.js-word-'+index);
    selection.add(this.m_rightElement.find('.js-word-'+index));
    if(selection.length == 0) {
      var html = [];
        
      for(var i = 0; i < content.length; i++) {
        html.push('<span class="char js-word-'+index+'">'+escapeSymbols(content.charAt(i))+'</span>');
      }
      for(var i = 0; i < html.length; i++) {
        //pick column
        var target = this.m_rightElement;
        if(this.m_leftLength < COLUMN_LENGTH) {
          target = this.m_leftElement;
          this.m_leftLength++;
        }
        
        //add element and bind handlers
        var context = this; //event `this` is not same as member `this`
        $(html[i]).appendTo(target)
          .click(function(){context.onSelection(index)})
          .hover(function(){context.onHover(index)});
      }
      
    } else {
      selection.each(function(i, element) {
        $(element).text(content.charAt(i));
      })
    }
    
  }

  module.MemoryDisplay = MemoryDisplay;
  
  /*
   * MessageBox class
   */
  function MessageBox(id) {
    this.m_rootElement = $(id);
  }
  
  MessageBox.prototype.add = function MessageBox_add(msg) {
    this.m_rootElement.append('<p>'+escapeSymbols(msg)+'</p>');
    this.m_rootElement.scrollTop(this.m_rootElement[0].scrollHeight);
  }
  
  MessageBox.prototype.clear = function MessageBox_clear() {
    this.m_rootElement.empty();
  }
  
  module.MessageBox = MessageBox;
  
  return module;
})();