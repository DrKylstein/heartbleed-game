/*
 * View Module
 * K. Delaney
 */

var view_module = (function(){
  var module = {};
    
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
    this.reset();
  }
  
  //not in the spec: it's much easier if we know the number of elements
  //ahead of time.
  MemoryDisplay.prototype.reset = function MemoryDisplay_reset(size) {
    this.m_rootElement.empty();
    var parent = this;
    for(var i = 0; i < size; i++) {
      //wrapped in an anonymous function so that we get a constant value from 
      //i.
      (function(i) {
        $('<span class="js-codeword"></span>').appendTo(parent.m_rootElement)
        .click(function MemoryDisplay_word_click() {parent.onSelection(i)})
        .hover(function MemoryDisplay_word_hover() {parent.onHover(i)});
      })(i);
    }
  }
  
  MemoryDisplay.prototype.change = function MemoryDisplay_change(index, content) {
    var html = '';
    for(var i = 0; i < content.length; i++) {
      html += '<span class="char">'+escapeSymbols(content.charAt(i))+'</span>';
    }
    this.m_rootElement.children().eq(index).html(html);
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