
// Creates overlay on the screen where touch events will simulate the keyboard:
//  +-----------------+
//  |        Up       |
//  +---+---------+---+
//  |   |         |   |
//  | L |  Space  | R |
//  +---+---------+---+
(function initGamepad() {
  'use strict';

  function key(code, type, e_) {
    var e = document.createEvent("KeyboardEvent");
    if ("initKeyEvent" in e) {
      // https://developer.mozilla.org/en/DOM/event.initKeyEvent
      e.initKeyEvent(type, true, true, document.defaultView, false, false, false, false, code, code);
    } else {
      // total hack, but Impact needs only keyCode
      e = document.createEvent("Event");
      e.initEvent(type, true, true);
      Object.defineProperty(e, 'keyCode', { get : function() { return code; } });
    }
    document.dispatchEvent(e);     

    if ('stopPropagation' in e_) {
      e_.stopPropagation();
    }
    e_.preventDefault();
  }

  function bindKeySimulationEvents(div, code) {
    div.addEventListener('touchstart', key.bind(null, code, 'keydown'));
    div.addEventListener('touchend', key.bind(null, code, 'keyup'));
    div.addEventListener('mousedown', key.bind(null, code, 'keydown'));
    div.addEventListener('mouseup', key.bind(null, code, 'keyup'));
  }

  var overlay = document.createElement('div');
  //overlay.setAttribute('data-debug', 'data-debug');
  document.body.appendChild(overlay);

  // left : 37, up : 38, right : 39, space : 32
  overlay.className = 'gamepad';
  overlay.setAttribute('style', 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1000;' +
                                '-moz-user-select:none; -webkit-user-select: none;');
  var up = document.createElement('div');
  up.setAttribute('style', 'position: absolute; top: 0; right: 0; bottom: 66%; left: 0;');
  bindKeySimulationEvents(up, 38);
  overlay.appendChild(up);

  var left = document.createElement('div');
  left.setAttribute('style', 'position: absolute; top: 34%; right: 75%; bottom: 0; left: 0;');
  bindKeySimulationEvents(left, 37);
  overlay.appendChild(left);

  var right = document.createElement('div');
  right.setAttribute('style', 'position: absolute; top: 34%; right: 0; bottom: 0; left: 75%;');
  bindKeySimulationEvents(right, 39);
  overlay.appendChild(right);

  var space = document.createElement('div');
  space.setAttribute('style', 'position: absolute; top: 34%; right: 25%; bottom: 0; left: 25%;');
  bindKeySimulationEvents(space, 32);
  overlay.appendChild(space);
})();

