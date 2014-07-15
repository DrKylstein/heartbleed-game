"use strict";

var terminal = {};

terminal.passwords = 
[
  "SOUL", "CRUSHING", "MELANIE", "WISH", 
  "SEMESTER", "WASOVER", "DERPLE", "GOD", 
  "LOVE", "MOOK", "ELEVEN", "INCH" 
];

terminal.codes = 
[
  "([*_3x])", "{{{__!%~}}}", "[___cdr(cons 2x)_]", "([:)"
];

terminal.noise = 
[
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", 
  "+", "-", "|", "[", "]", "{", "}", "_", "\'", "\"", ",", ";",
  ".", "\\", "/", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
];


// returns a random integer between 0 and x
terminal.rand = function (x) { return Math.floor(Math.random() * x); };


// adds addresses in hex format to terminal
terminal.addAddresses = function ()
{
  // make sure it is high enough so that it takes up 4 hex places (could add padder?)
  var address = 4500 + terminal.rand(50000);   
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


terminal.addCharacters = function()
{

  // places spans around a single char
  var charFormatter = function(x) { return "<span class='char'>" + x + "</span>" };


  // first col
  var cbuffer = "";
  for (var i=0; i<204; i++)
  {

    // simply insert noise
    if (i !=0 && i%12 === 0) 
    {
      cbuffer += "<br>";
    }

    cbuffer += charFormatter(terminal.noise[terminal.rand(terminal.noise.length)]);
    $("#characters-1").html(cbuffer);
  }

  //  second col
  cbuffer = "";
  for (var i=0; i<204; i++)
  {

  // simply insert noise
    if (i !=0 && i%12 === 0) 
    {
      cbuffer += "<br>";
    }

    cbuffer += charFormatter(terminal.noise[terminal.rand(terminal.noise.length)]);
    $("#characters-2").html(cbuffer);
  }


};

//wait until document is ready
$(document).ready(function() 
{
  terminal.addAddresses();
  terminal.addCharacters();


});

