"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Referencias a elementos DOM
  var contenedorRiel = document.querySelector('.contenedor-riel');
  var mapas = document.querySelectorAll('.mapa-calor');
  var indicadores = document.querySelectorAll('.indicador');
  var botonAnterior = document.querySelector('.control-riel.anterior');
  var botonSiguiente = document.querySelector('.control-riel.siguiente');
  var mapaActivo = 0;
  var totalMapas = mapas.length;

  // Actualizar fecha de última actualización
  document.getElementById('ultima-actualizacion-mapas').textContent = new Date().toLocaleString();

  // Funciones para controlar el carrusel
  function actualizarIndicadores() {
    indicadores.forEach(function (indicador, index) {
      if (index === mapaActivo) {
        indicador.classList.add('activo');
      } else {
        indicador.classList.remove('activo');
      }
    });
  }
  function scrollAMapa(index) {
    if (index < 0) index = 0;
    if (index >= totalMapas) index = totalMapas - 1;
    mapaActivo = index;

    // Calcular posición de scroll
    var mapa = mapas[index];
    var offset = mapa.offsetLeft - contenedorRiel.offsetLeft;

    // Scroll al mapa
    contenedorRiel.scrollTo({
      left: offset,
      behavior: 'smooth'
    });
    actualizarIndicadores();
  }

  // Event listeners para los controles
  botonAnterior.addEventListener('click', function () {
    scrollAMapa(mapaActivo - 1);
  });
  botonSiguiente.addEventListener('click', function () {
    scrollAMapa(mapaActivo + 1);
  });

  // Event listeners para los indicadores
  indicadores.forEach(function (indicador, index) {
    indicador.addEventListener('click', function () {
      scrollAMapa(index);
    });
  });

  // Observar el scroll del contenedor para actualizar indicadores
  var scrollTimeout;
  contenedorRiel.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      // Determinar qué mapa está más centrado en la vista
      var scrollPosition = contenedorRiel.scrollLeft;
      var containerWidth = contenedorRiel.clientWidth;
      var closestMap = 0;
      var closestDistance = Infinity;
      mapas.forEach(function (mapa, index) {
        var mapaCenter = mapa.offsetLeft + mapa.offsetWidth / 2 - contenedorRiel.offsetLeft;
        var containerCenter = scrollPosition + containerWidth / 2;
        var distance = Math.abs(mapaCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestMap = index;
        }
      });
      if (closestMap !== mapaActivo) {
        mapaActivo = closestMap;
        actualizarIndicadores();
      }
    }, 100);
  });

  // Inicializar el carrusel
  scrollAMapa(0);
});