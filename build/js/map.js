"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Coordenadas para centrar en el departamento de Lima
  var LIMA_CENTER = [-11.5, -76.5];

  // Crear mapa con vista inicial centrada en Lima, zoom para mostrar todo el departamento
  var map = L.map("map").setView(LIMA_CENTER, 8); // Zoom nivel 8 para mostrar todo Lima

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  var markers = {}; // Almacenar marcadores por estación

  function createCustomMarker(station) {
    var customIcon = L.divIcon({
      className: "custom-marker",
      html: "<div class=\"pulse\"></div><span>".concat(station.nombre, "</span>"),
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    });
    return L.marker([station.latitud, station.longitud], {
      icon: customIcon
    }).bindPopup("<b>".concat(station.nombre, "</b>")).on("click", function () {
      return selectStation(station.id);
    });
  }
  function formatDateTime(dateTimeString) {
    var dateObj = new Date(dateTimeString);
    if (isNaN(dateObj.getTime())) return {
      time: "-",
      date: "-"
    };
    var optionsDate = {
      day: "2-digit",
      month: "long",
      year: "numeric"
    };
    var formattedDate = dateObj.toLocaleDateString("es-ES", optionsDate);
    var formattedTime = dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    return {
      time: formattedTime,
      date: formattedDate
    };
  }
  function loadStations() {
    fetch("src/php/registros/stations.php").then(function (response) {
      return response.json();
    }).then(function (data) {
      if (!data || data.length === 0) throw new Error("No se encontraron estaciones.");
      var stationList = document.getElementById("station-list");
      stationList.innerHTML = ""; // Limpiar lista

      data.forEach(function (station) {
        if (!station.latitud || !station.longitud) return;
        var marker = createCustomMarker(station).addTo(map);
        markers[station.id] = marker;
        var li = document.createElement("li");
        li.textContent = station.nombre;
        li.dataset.id = station.id;
        li.addEventListener("click", function () {
          return selectStation(station.id);
        });
        stationList.appendChild(li);
      });

      // Seleccionar la primera estación por defecto
      if (data.length > 0) selectStation(data[0].id);
    }).catch(function (error) {
      return console.error("Error cargando estaciones:", error);
    });
  }
  function selectStation(stationId) {
    fetch("src/php/registros/values.php?station=".concat(stationId)).then(function (response) {
      return response.json();
    }).then(function (data) {
      var _data$nombre_estacion, _data$temperatura, _data$humedad, _data$uv_index;
      console.log("Datos recibidos:", data);
      document.getElementById("name-station").textContent = (_data$nombre_estacion = data.nombre_estacion) !== null && _data$nombre_estacion !== void 0 ? _data$nombre_estacion : "Estación desconocida";
      document.getElementById("temp-value").textContent = (_data$temperatura = data.temperatura) !== null && _data$temperatura !== void 0 ? _data$temperatura : "N/A";
      document.getElementById("humidity-value").textContent = (_data$humedad = data.humedad) !== null && _data$humedad !== void 0 ? _data$humedad : "N/A";
      document.getElementById("uv-index-value").textContent = (_data$uv_index = data.uv_index) !== null && _data$uv_index !== void 0 ? _data$uv_index : "N/A";
      var _formatDateTime = formatDateTime("".concat(data.fecha, " ").concat(data.hora)),
        time = _formatDateTime.time,
        date = _formatDateTime.date;
      document.getElementById("last-update").textContent = time;
      document.getElementById("time-register").textContent = date;
      updateGraph(stationId);
      if (markers[stationId]) {
        // Zoom moderado, centrado en la estación
        map.flyTo(markers[stationId].getLatLng(), 10, {
          duration: 1.5
        });
        markers[stationId].openPopup();
      }
    }).catch(function (error) {
      return console.error("Error obteniendo valores de estación:", error);
    });
  }
  window.selectStation = selectStation;
  loadStations();
});