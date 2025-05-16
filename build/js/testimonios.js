"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var testimoniosContainer = document.querySelector('.testimonios-contenedor');
  var testimonios = document.querySelectorAll('.testimonio');

  // Si hay más de 3 testimonios, convertimos la sección en un carrusel
  if (testimonios.length > 3) {
    var seccionTestimonios = document.querySelector('.testimonios');
    seccionTestimonios.classList.add('testimonios-carrusel');

    // Agregamos controles de navegación (opcional)
    var controlsContainer = document.createElement('div');
    controlsContainer.className = 'testimonios-controles';

    // Botón anterior
    var prevButton = document.createElement('button');
    prevButton.className = 'control-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

    // Botón siguiente
    var nextButton = document.createElement('button');
    nextButton.className = 'control-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

    // Agregamos los botones al contenedor
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(nextButton);

    // Insertamos los controles después del contenedor de testimonios
    testimoniosContainer.parentNode.insertBefore(controlsContainer, testimoniosContainer.nextSibling);

    // Funcionalidad de los botones
    prevButton.addEventListener('click', function () {
      testimoniosContainer.scrollBy({
        left: -testimoniosContainer.offsetWidth / 2,
        behavior: 'smooth'
      });
    });
    nextButton.addEventListener('click', function () {
      testimoniosContainer.scrollBy({
        left: testimoniosContainer.offsetWidth / 2,
        behavior: 'smooth'
      });
    });

    // Agregamos indicadores de página (opcional)
    var paginationContainer = document.createElement('div');
    paginationContainer.className = 'testimonios-paginacion';
    var totalPages = Math.ceil(testimonios.length / 3);
    for (var i = 0; i < totalPages; i++) {
      var dot = document.createElement('span');
      dot.className = i === 0 ? 'dot active' : 'dot';
      paginationContainer.appendChild(dot);
    }
    seccionTestimonios.appendChild(paginationContainer);

    // Actualizar indicadores de página al desplazarse
    testimoniosContainer.addEventListener('scroll', function () {
      var scrollPosition = testimoniosContainer.scrollLeft;
      var maxScroll = testimoniosContainer.scrollWidth - testimoniosContainer.clientWidth;
      var currentPage = Math.round(scrollPosition / maxScroll * (totalPages - 1));
      document.querySelectorAll('.dot').forEach(function (dot, index) {
        dot.classList.toggle('active', index === currentPage);
      });
    });
  }
});