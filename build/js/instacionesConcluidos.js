"use strict";

// ================================
// instalaciones.js
// ================================
document.addEventListener('DOMContentLoaded', function () {
  // Carrusel de instalaciones
  var track = document.querySelector('.carrusel-instalaciones');
  var btnPrev = document.querySelector('.boton-anterior');
  var btnNext = document.querySelector('.boton-siguiente');
  if (track && btnPrev && btnNext) {
    // Función para calcular ancho de ítem incluyendo gap
    var updateItemWidth = function updateItemWidth() {
      var style = getComputedStyle(track);
      var gap = parseInt(style.gap) || 0;
      var item = track.querySelector('.instalacion');
      return item ? item.offsetWidth + gap : track.clientWidth;
    };
    var itemWidth = updateItemWidth();
    window.addEventListener('resize', function () {
      itemWidth = updateItemWidth();
    });
    btnNext.addEventListener('click', function () {
      track.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
      });
    });
    btnPrev.addEventListener('click', function () {
      track.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
      });
    });
    var updateButtons = function updateButtons() {
      btnPrev.disabled = track.scrollLeft <= 0;
      btnNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth;
    };
    track.addEventListener('scroll', updateButtons);
    updateButtons();
  }

  // Animación de conteo al hover en números
  var counters = document.querySelectorAll('.contador-instalaciones .numero');
  counters.forEach(function (numEl) {
    numEl.addEventListener('mouseenter', function () {
      var original = numEl.textContent;
      var plus = original.includes('+');
      var target = parseInt(original.replace(/\D/g, ''), 10);
      var count = 0;
      var step = Math.ceil(target / 100);
      var interval = setInterval(function () {
        count += step;
        if (count >= target) {
          numEl.textContent = target + (plus ? '+' : '');
          clearInterval(interval);
        } else {
          numEl.textContent = count;
        }
      }, 20);
    }, {
      once: true
    });
  });
});