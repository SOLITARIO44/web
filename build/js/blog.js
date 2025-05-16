"use strict";

// FAQ: Expansión y colapso
document.querySelectorAll('.faq-pregunta').forEach(function (pregunta) {
  pregunta.addEventListener('click', function () {
    var respuesta = pregunta.nextElementSibling;
    var icono = pregunta.querySelector('.faq-icono i');

    // Alternar visibilidad
    if (respuesta.style.display === 'block') {
      respuesta.style.display = 'none';
      icono.classList.remove('fa-minus');
      icono.classList.add('fa-plus');
    } else {
      respuesta.style.display = 'block';
      icono.classList.remove('fa-plus');
      icono.classList.add('fa-minus');
    }
  });
});

// Botón "Volver arriba" visible al hacer scroll
var btnVolverArriba = document.querySelector('.volver-arriba');
if (btnVolverArriba) {
  btnVolverArriba.style.display = 'none'; // Ocultar inicialmente

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btnVolverArriba.style.display = 'flex';
    } else {
      btnVolverArriba.style.display = 'none';
    }
  });
  btnVolverArriba.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Scroll suave para navegación interna
document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
  enlace.addEventListener('click', function (e) {
    var destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Confirmación de suscripción (simulado)
var formularioSuscripcion = document.querySelector('.formulario-suscripcion');
if (formularioSuscripcion) {
  formularioSuscripcion.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("¡Gracias por suscribirte! Te mantendremos informado.");
    this.reset();
  });
}

// Simulación de recomendación en sección "Protección"
var botonRecomendacion = document.querySelector('.selector-proteccion .boton--primario');
if (botonRecomendacion) {
  botonRecomendacion.addEventListener('click', function (e) {
    var _document$querySelect;
    e.preventDefault();
    var actividad = ((_document$querySelect = document.querySelector('.selector-actividad select')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || "actividad no especificada";
    alert("Recomendaci\xF3n personalizada generada para: \"".concat(actividad, "\"."));
  });
}