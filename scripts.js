'use strict';

// Cannot extend a customized element, such as HTMLVideoElement or HTMLMediaElement.
// https://bugs.chromium.org/p/chromium/issues/detail?id=619062
class HlsVideo extends HTMLElement {

  // Observe the following attributes for changes.
  static get observedAttributes () {
    return ['src', 'video-title'];
  }

  /**
   * Called when the element is created or upgraded.
   */
  constructor () {
    // Always call super first in constructor.
    super();

    // Create an element to hold the title.
    this.elTitle = document.createElement('h2');

    // Create a standard video element.
    this.elVideo = document.createElement('video');
    this.elVideo.controls = 'auto';
    this.elVideo.muted = true;

    this.hlsI = new Hls();
    this.hlsI.on(Hls.Events.MANIFEST_PARSED, this.elVideo.play.bind(this.elVideo));

    this.appendChild(this.elTitle);
    this.appendChild(this.elVideo);
  }

  /**
   * Called when an attribute is changed, appended, removed, or replaced on the element.
   * Only called for observed attributes.
   *
   * @param {string} attr     - The name of the attribute that was changed.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new (current) value of the attribute.
   */
  attributeChangedCallback (attr, oldValue, newValue) {

    if (attr === 'src') {
      this.play(newValue);
    }

    if (attr === 'video-title') {
      this.elTitle.textContent = newValue;
    }

  }

  /**
   * Plays the given HLS video stream.
   *
   * @param {string} url - The URL of the m3u8 file.
   */
  play (url) {
    if (!this.elVideo.paused) {
      this.reset();
    }

    this.hlsI.attachMedia(this.elVideo);
    this.hlsI.loadSource(url);
  }

  /**
   * Resets the HLS instance.
   */
  reset () {
    this.hlsI.detachMedia();
  }

};

(function () {

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

    // Define the custom element.
    customElements.define('hls-video', HlsVideo);
  };

  document.addEventListener('DOMContentLoaded', init);
})();