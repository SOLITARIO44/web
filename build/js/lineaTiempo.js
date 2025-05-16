"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll('.contenido-evolucion');
  var mostrarItems = function mostrarItems() {
    var triggerBottom = window.innerHeight * 0.85;
    items.forEach(function (item) {
      var boxTop = item.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        item.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', mostrarItems);
  mostrarItems(); // Para que se active en el primer scroll
});