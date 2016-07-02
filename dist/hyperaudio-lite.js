(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hyperaudioLite"] = factory();
	else
		root["hyperaudioLite"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var hyperaudiolite = function () {

	  var hal = {},
	      transcript,
	      words,
	      paras,
	      player,
	      paraIndex,
	      start,
	      end;

	  function getParameter(name) {
	    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
	        results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	  }

	  function init(mediaElementId) {
	    words = transcript.getElementsByTagName('a');
	    paras = transcript.getElementsByTagName('p');
	    player = document.getElementById(mediaElementId);
	    paraIndex = 0;
	    words[0].classList.add('active');
	    paras[0].classList.add('active');
	    transcript.addEventListener('click', setPlayHead, false);
	    player.addEventListener('timeupdate', checkPlayHead, false);

	    //check for queryString params
	    start = getParameter('s');

	    if (!isNaN(parseFloat(start))) {
	      player.currentTime = start / 10;
	      player.play();
	    }

	    end = parseFloat(getParameter('d')) + parseFloat(start);
	  }

	  function setPlayHead(e) {
	    var target = e.target ? e.target : e.srcElement;
	    target.setAttribute('class', 'active');
	    var timeSecs = parseInt(target.getAttribute('data-m')) / 1000;

	    if (!isNaN(parseFloat(timeSecs))) {
	      end = null;
	      player.currentTime = timeSecs;
	      player.play();
	    }
	  }

	  function checkPlayHead(e) {
	    //check for end time of shared piece

	    if (end && end / 10 < player.currentTime) {
	      player.pause();
	      end = null;
	    }

	    var activeitems = transcript.getElementsByClassName('active');
	    var activeitemsLength = activeitems.length;

	    for (var a = 0; a < activeitemsLength; a++) {
	      if (activeitems[a]) {
	        // TODO: look into why we need this
	        activeitems[a].classList.remove('active');
	      }
	    }

	    // Establish current paragraph index
	    var currentParaIndex;

	    for (var i = 1; i < words.length; i++) {
	      if (parseInt(words[i].getAttribute('data-m')) / 1000 > player.currentTime) {
	        // TODO: look for a better way of doing this
	        var strayActive = transcript.getElementsByClassName('active')[0];
	        strayActive.classList.remove('active');

	        // word time is in the future - set the previous word as active.
	        words[i - 1].classList.add('active');
	        words[i - 1].parentNode.classList.add('active');

	        paras = transcript.getElementsByTagName('p');

	        for (var aa = 0; aa < paras.length; aa++) {
	          if (paras[aa].classList.contains('active')) {
	            currentParaIndex = aa;
	            break;
	          }
	        }

	        if (currentParaIndex !== paraIndex) {
	          Velocity(words[i].parentNode, 'scroll', {
	            container: hypertranscript,
	            duration: 800,
	            delay: 0
	          });
	          paraIndex = currentParaIndex;
	        }

	        break;
	      }
	    }
	  }

	  hal.init = function (transcriptId, mediaElementId) {
	    transcript = document.getElementById(transcriptId);
	    init(mediaElementId);
	  };

	  hal.loadTranscript = function (url, callback) {
	    var xmlhttp;

	    if (window.XMLHttpRequest) {
	      // code for IE7+, Firefox, Chrome, Opera, Safari
	      xmlhttp = new XMLHttpRequest();
	    } else {
	      // code for IE6, IE5
	      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	    }

	    xmlhttp.onreadystatechange = function () {
	      if (xmlhttp.readyState === 4) {
	        if (xmlhttp.status === 200) {
	          transcript = document.getElementById('hypertranscript');
	          transcript.innerHTML = xmlhttp.responseText;
	          callback();
	        } else if (xmlhttp.status === 400) {
	          alert('There was an error 400');
	        } else {
	          alert('something else other than 200 was returned');
	        }
	      }
	    };

	    xmlhttp.open('GET', url, true);
	    xmlhttp.send();
	  };

	  return hal;
	}();

	exports.default = hyperaudiolite;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;