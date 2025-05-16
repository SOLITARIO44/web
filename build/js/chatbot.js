"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Referencias de elementos
  var chatbotWidget = document.getElementById('chatbot-widget');
  var chatbotHeader = document.getElementById('chatbot-header');
  var chatbotToggleIcon = document.getElementById('chatbot-toggle-icon');
  var chatbotMessages = document.getElementById('chatbot-messages');
  var userInput = document.getElementById('chatbot-user-input');
  var sendButton = document.getElementById('chatbot-send-btn');

  // Estado inicial
  var isMinimized = true;
  var isWaitingForResponse = false;

  // Respuestas predefinidas (puedes reemplazar esto con una API real)
  var botResponses = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'ayuda': 'Puedo ayudarte con información sobre nuestros productos, servicios o responder preguntas frecuentes.',
    'gracias': '¡De nada! Estoy aquí para ayudarte.',
    'default': 'No entiendo tu mensaje. ¿Podrías reformularlo o ser más específico?'
  };

  // Mensaje inicial
  addBotMessage('¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?');

  // Función para alternar el estado del chat
  function toggleChat() {
    isMinimized = !isMinimized;
    chatbotWidget.classList.toggle('minimized', isMinimized);
    chatbotToggleIcon.textContent = isMinimized ? '▼' : '▲';
    if (!isMinimized) {
      userInput.focus();
      // Scroll al final de los mensajes
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }

  // Agregar mensaje del bot
  function addBotMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message chatbot-message-bot';
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }

  // Agregar mensaje del usuario
  function addUserMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message chatbot-message-user';
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }

  // Mostrar indicador de escritura
  function showTypingIndicator() {
    var typingElement = document.createElement('div');
    typingElement.className = 'chatbot-message chatbot-message-bot chatbot-message-typing';
    typingElement.id = 'typing-indicator';
    for (var i = 0; i < 3; i++) {
      var dot = document.createElement('span');
      typingElement.appendChild(dot);
    }
    chatbotMessages.appendChild(typingElement);
    scrollToBottom();
  }

  // Ocultar indicador de escritura
  function hideTypingIndicator() {
    var typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  }

  // Scroll al final de los mensajes
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Procesar el mensaje del usuario
  function processUserMessage(message) {
    // Simple procesamiento de texto (en un caso real, conectarías con una API)
    message = message.toLowerCase().trim();
    var response = botResponses.default;

    // Buscar coincidencias en respuestas predefinidas
    for (var key in botResponses) {
      if (message.includes(key)) {
        response = botResponses[key];
        break;
      }
    }

    // Simular respuesta con retraso
    showTypingIndicator();
    setTimeout(function () {
      hideTypingIndicator();
      addBotMessage(response);
      isWaitingForResponse = false;
      sendButton.disabled = false;
    }, 1000);
  }

  // Enviar mensaje
  function sendMessage() {
    var message = userInput.value.trim();
    if (message && !isWaitingForResponse) {
      addUserMessage(message);
      userInput.value = '';
      isWaitingForResponse = true;
      sendButton.disabled = true;
      processUserMessage(message);
    }
  }

  // Event Listeners
  chatbotHeader.addEventListener('click', toggleChat);
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Enfoque automático al abrir
  userInput.addEventListener('focus', function () {
    if (isMinimized) {
      toggleChat();
    }
  });
});