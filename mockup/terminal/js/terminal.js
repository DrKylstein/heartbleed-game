"use strict";

var terminal = {};


// adds addresses in hex format to terminal
terminal.addAddresses = function ()
{
  var address = 6666;   // make sure it is high enough so that it takes up 4 hex places (could add padder?)
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

};


//wait until document is ready
$(document).ready(function() 
{
  terminal.addAddresses();


});

