"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var imagenPrincipal = document.getElementById('imagenPrincipal');
  var contenedorVideo = null;

  /**
   * Muestra una imagen en el contenedor principal
   * @param {string} src - Ruta de la imagen
   */
  function cambiarImagen(src) {
    imagenPrincipal.src = src;
    imagenPrincipal.style.display = 'block';

    // Eliminar contenedor de video si existe
    if (contenedorVideo) {
      contenedorVideo.remove();
      contenedorVideo = null;
    }
  }

  /**
   * Muestra un video en el contenedor principal
   * @param {string} src - URL del video de YouTube
   */
  function cambiarVideo(src) {
    // Ocultar la imagen
    imagenPrincipal.style.display = 'none';

    // Eliminar video anterior si existe
    if (contenedorVideo) {
      contenedorVideo.remove();
    }

    // Crear nuevo contenedor de video
    contenedorVideo = document.createElement('div');
    contenedorVideo.id = 'contenedorVideo';
    contenedorVideo.className = 'foto-principal';
    var iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = src;
    iframe.title = 'Video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    contenedorVideo.appendChild(iframe);
    var contenedor = document.querySelector('.foto-izquierda');
    contenedor.insertBefore(contenedorVideo, document.querySelector('.miniaturas'));
  }

  /**
   * Asignar eventos a todas las miniaturas
   */
  document.querySelectorAll('.miniatura').forEach(function (miniatura) {
    miniatura.addEventListener('click', function () {
      var tipo = miniatura.dataset.tipo;
      var src = miniatura.dataset.src;
      if (tipo === 'video') {
        cambiarVideo(src);
      } else if (tipo === 'imagen') {
        cambiarImagen(src);
      }
    });
  });
});