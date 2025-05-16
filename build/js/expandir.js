"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var expandButtons = document.querySelectorAll('.expand-btn');
  expandButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var description = button.closest('.integrante').querySelector('.descripcion');

      // Alternar clase 'active'
      description.classList.toggle('active');

      // Cambiar el ícono del botón
      var plusIcon = button.querySelector('.plus-icon');
      if (description.classList.contains('active')) {
        plusIcon.textContent = '-';
      } else {
        plusIcon.textContent = '+';
      }
    });
  });
});