"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.carousel .track');
  var items = Array.from(track.children);

  // Clonar tus N ítems para tener 2N en el track
  items.forEach(function (item) {
    track.append(item.cloneNode(true));
  });
});