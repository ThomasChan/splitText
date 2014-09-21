/*!
  splitText.js v1.1
  Dependence TimelineLite
  Copyright (C) 2014 by thomas chan
  Email: chenjunhao5818@gmail.com
  init time: 2014/09/20 PM 4:40
  update time: 2014/09/21 PM 3:20
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

    //  animate the 'typeOption'
    var _animate = function ( selector, typeOption, option, p ) {
      var tl = new TimelineLite();

      tl.add("stagger", option.delay);
      tl.to( selector, 0.1, {opacity: 1}, 0)
        .staggerFrom(
          typeOption,
          option.duration,
          {
              opacity: option.opacity,
              x: option.x,
              y: option.y,
              rotationX: option.rotationX,
              rotationY: option.rotationY,
              rotationZ: option.rotationZ,
              ease:Back.easeOut
          },
          0.1,
          "stagger",
          function () {
            if ( option.restore === true ) { _querySelector( selector ).innerHTML = p; };
            if( option.fn ) option.fn();
          }
        );
    };

    //  set default option
    var _option = function ( option ) {
      return {
        type:  option.type || 'chars',
        duration: option.duration || 0.8,
        opacity: option.opacity || 0,
        x: option.x || 0,
        y: option.y || -60,
        rotationX: option.rotationX || 0,
        rotationY: option.rotationY || 0,
        rotationZ: option.rotationZ || 180,
        delay: option.delay || "+=0.6",
        restore: option.restore || true,
        fn: option.fn || function () { }
      }
    };

    //  init
    var init = function ( selector, option ) {

      CSSPlugin.defaultTransformPerspective = 400;

      var p = _getTheText( selector );

      var arr = _getLineArray( p.now );

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

      setTimeout( _animate( selector, typeOption, option, p.original ), 500);
    };

    init( selector, _option( option ) );
  };

})( window );
