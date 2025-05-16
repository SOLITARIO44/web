"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".formulario");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío predeterminado

    // Obtener valores del formulario
    var formData = new FormData(form);
    var csrfToken = document.getElementById("csrf_token").value;

    // Validaciones básicas
    if (!validarFormulario(formData)) {
      return;
    }

    // Enviar datos al servidor
    fetch("/src/php/contactos/dbcontactos.php", {
      method: "POST",
      body: formData
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.success) {
        alert("Mensaje enviado correctamente");
        form.reset(); // Limpiar formulario después del envío
      } else {
        alert("Error: " + data.message);
      }
    }).catch(function (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al enviar el formulario.");
    });
  });
});
function validarFormulario(formData) {
  var nombre = formData.get("nombre").trim();
  var asunto = formData.get("asunto").trim();
  var email = formData.get("email").trim();
  var telefono = formData.get("telefono").trim();
  var mensaje = formData.get("mensaje").trim();
  var medioContacto = formData.get("medio_contacto");
  var departamento = formData.get("departamento");
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var telefonoRegex = /^[0-9]{9,15}$/;
  if (!nombre || nombre.length < 2 || nombre.length > 50) {
    alert("El nombre debe tener entre 2 y 50 caracteres.");
    return false;
  }
  if (!asunto || asunto.length < 5 || asunto.length > 100) {
    alert("El asunto debe tener entre 5 y 100 caracteres.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Correo electrónico inválido.");
    return false;
  }
  if (telefono && !telefonoRegex.test(telefono)) {
    alert("El teléfono debe contener entre 9 y 15 dígitos.");
    return false;
  }
  if (!mensaje || mensaje.length < 10) {
    alert("El mensaje debe tener al menos 10 caracteres.");
    return false;
  }
  if (!medioContacto) {
    alert("Debes seleccionar un medio de contacto.");
    return false;
  }
  if (!departamento) {
    alert("Debes seleccionar un departamento.");
    return false;
  }
  return true;
}