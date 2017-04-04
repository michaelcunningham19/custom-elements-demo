(function () {
  'use strict';

  var video1, video2;

  /**
   * Swaps the source and title attributes of both example videos.
   *
   * @param {object} event - The event object.
   */
  function onSwap (event) {
    event.preventDefault();

    var video1Title = video1.getAttribute('video-title');
    var video1Src = video1.getAttribute('src');

    video1.setAttribute('src', video2.getAttribute('src'));
    video1.setAttribute('video-title', video2.getAttribute('video-title'));

    video2.setAttribute('src', video1Src);
    video2.setAttribute('video-title', video1Title)
  };

  /**
   * Function called on the DOMContentLoaded event.
   */
  function init () {
    var elSwap = document.getElementById('swap');
    elSwap.addEventListener('click', onSwap);

    video1 = document.getElementById('video1');
    video2 = document.getElementById('video2');
  };

  document.addEventListener('DOMContentLoaded', init);
})();