/*!

  splitText.js v1.0.0

  Dependence TimelineLite

  Copyright (C) 2014 by thomas chan
  Email: chenjunhao5818@gmail.com
  time: 2014/09/20 PM 4:40


  now this plugin just has one method and one animation effect;

  used:
    splitText( '#foo', {
        type: 'chars',
        animate: 'bounceInDown',
        duration: 0.8,
        delay: "+=0.6",
        restore: true
    } )

  option: {
      type:  [ 'chars' | 'lines' ],
      animate: 'bounceInDown',
      duration: 0 ~ 1,
      delay: "[ -= | += ] 0 ~ 1",
      restore: [ true | false ]
  }
*/


(function ( window ) {
  "use strict";

  var splitText = window.splitText = function ( selector, option ) {

    //  'selector' can be a string or an array
    var _querySelector = function ( selector ) {
      if ( typeof selector === 'string' ) {
        if ( selector.match( /\#/ ) ) { // 'selector' is id string
          if ( selector.match( /\s/g ) ) { // if 'selector' has space
            var query_id = selector.split(' ')[0],
                query_para = selector.split(' ')[1];
            if ( query_para.match( /\#/ ) ) {
              return document.querySelector( query_id ).querySelector( query_para );
            } else if ( query_para.match( /\./ ) ) {
              return document.querySelector( query_id ).querySelectorAll( query_para )[0];
            } else {
              return document.querySelector( query_id ).querySelectorAll( query_para )[0];
            }
          } else {
            return document.querySelector( selector );
          }
        } else if ( selector.match( /\./g ) ) { // 'selector' is class string
          if ( selector.match( /\s/g ) ) { // if 'selector' has space
            var query_class = selector.split(' ')[0],
                query_para = selector.split(' ')[1];
            if ( query_para.match( /\#/ ) ) {
              return document.querySelector( query_class ).querySelector( query_para );
            } else if ( query_para.match( /\./ ) ) {
              return document.querySelector( query_class ).querySelectorAll( query_para )[0];
            } else {
              return document.querySelector( query_class ).querySelectorAll( query_para )[0];
            }
          } else {
            return document.querySelector( selector );
          }
        } else {
          return document.querySelector( selector );
        }
      } else if ( selector instanceof Array ) {
        return selector;
      } else {
        throw new Error('The "selector" paramater should be a string, like "#foo", or an array, like "["this is a paragraph", "and this is second line"]"');
      }
    }

    //  get the paragraph content that want to split
    //  return an object include
    var _getTheText = function ( selector ) {
      return {
        "original": _querySelector( selector ).innerHTML.replace( /\r?\n/g, '<br>' ),
        "now": _querySelector( selector ).innerHTML.split( /\r?\n/g )
      };
    };

    //  split the paragraph each line and each character into array
    var _getLineArray = function ( arr ) {
      var lines_array = [];

      for ( var i = 0; i < arr.length; ++i ) {
        var arr_words = arr[i].split(' '),words_array = [];
        for( var w = 0; w <arr_words.length; ++w  ){
          var chars_array = [];
          for ( var x = 0; x < arr_words[w].length; ++x ) {
            chars_array.push( '<div class="splitText_chars">' + arr_words[w][x] + '</div>' );
          };
          words_array.push( '<div class="splitText_words">' + chars_array.join('') + '</div>&nbsp;' );
        };
        lines_array.push( '<div class="splitText_lines">' + words_array.join('') + '</div>' );
      };

      return lines_array.join('');
    };

    var _animate = {
      bounceInDown: function( selector, duration, delay, typeOption, restore, p ){
        var tl = new TimelineLite();
            tl.add("stagger", delay);
            tl.to( selector, 0.1, {opacity: 1}, 0)
              .staggerFrom( typeOption, duration, {opacity: 0, y:-60, rotation: 180, ease:Back.easeOut}, 0.1, "stagger", function(){
                if( restore === true ){ _querySelector( selector ).innerHTML = p; };
              });
      }
    };

    var option = option || {
      type: 'chars',
      animate: 'bounceInDown',
      duration: 0.8,
      delay: "+=0.6",
      restore: true
    };


    var init = function ( selector, option ) {

      var p = _getTheText( selector ),
          arr = _getLineArray( p.now );
      var typeOption;
      if ( typeof option.type === 'string' ) {
        if ( option.type === 'chars' ) {
          typeOption = '.splitText_chars';
        } else if ( option.type === 'words' ) {
          typeOption = '.splitText_words';
        } else if ( option.type === 'lines' ) {
          typeOption = '.splitText_lines';
        }
      } else {
        throw new Error('The option object type paramater should be a string, like "chars", or "words", or "lines"');
      }

      _querySelector( selector ).innerHTML = arr;

      setTimeout(function () {
        _animate[ option.animate]( selector, option.duration, option.delay, typeOption, option.restore, p.original );
      }, 1000);
    };


    init( selector, option );
  };

})( window );
