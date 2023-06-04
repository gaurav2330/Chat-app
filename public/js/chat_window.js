const { io } = require('socket.io-client');
class ChatWindow extends HTMLElement {

  constructor () {
    super();
    this.socket = null
  }

  connectedCallback () {
    this.renderChatWindow()
    this.setGlobalValues()
    this.addEventListeners()
    this.addSocketEventListeners()
  }

  disConnectedCallback () {
    this.socket.disconnect();
  }

  renderChatWindow () {
    this.innerHTML = `
      <div class="container justify-content-center bg-aero">
        <h1 id="welcome-message">Chat App</h1>
        <div id='message-list' class="mb-3">
          <div class="card mb-2 p-2">This is the first message</div>
        </div>
        <form id="message-form">
          <div class="mb-3">
            <textarea placeholder="Message" id="message" style="width: 30rem;"></textarea>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
        <button id="send-location" class="btn btn-secondary">Send Location</button>
      </div>
    `
  }

  setGlobalValues () {
    this.socket = io();
    this.messageForm = document.getElementById('message-form')
    this.messageFormInput = this.messageForm.querySelector('input')
    this.messageFormTextarea = this.messageForm.querySelector('textarea')
    this.locationBtn = document.getElementById('send-location')
  }

  addEventListeners () {
    this.messageForm.addEventListener('submit', this.sendMessage.bind(this))
    this.locationBtn.addEventListener('click', this.sendLocation.bind(this))
  }

  addSocketEventListeners () {
    this.socket.on('message', (message) => {
      console.log(message.text);
    })

    this.socket.on('message-sent', (message) => {
      document.getElementById('message-list').innerHTML += `<div class="card mb-2 p-2">${moment(message.createdAt).format('H:mm')} - ${message.text}</div>`
    })

    this.socket.on('location-message', (location) => {
      document.getElementById('message-list').innerHTML += `
        <div class="card mb-2 p-2 d-block">
          <span>${moment(location.createdAt).format('H:mm')} - </span>
          <a href="${location.text}" target="_blank">This is my location</a>
        </div>`
    })
  }

  sendMessage (e) {
    e.preventDefault()
    this.messageFormInput.disabled = true

    let message_text = this.messageFormTextarea.value
    this.messageFormTextarea.value = ''
    this.messageFormTextarea.focus()
    this.socket.emit('send-message', message_text, () => {
      this.messageFormInput.disabled = false
    })
  }

  sendLocation (e) {
    this.locationBtn.disabled = true
    navigator.geolocation.getCurrentPosition((position) => {
      this.socket.emit('send-location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      }, (message) => {
        console.log(message);
        this.locationBtn.disabled = false
      })
    });
  }
}

customElements.define('chat-window', ChatWindow)