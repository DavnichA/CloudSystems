var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    z = 0,
    q = 0,
    friction = 1 / 50,
    friction_two = 1 / 20;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;
  z += (lFollowX - z) * friction_two;
  q += (lFollowY - q) * friction_two;
  
  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
  translate_two = 'translate(' + z + 'px, ' + q + 'px) scale(1.0)';


  $('.background').css({
    '-webit-transform': translate_two,
    '-moz-transform': translate_two,
    'transform': translate_two
   });
    $('.background_two').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();

