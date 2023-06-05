const { io } = require('socket.io-client');
const $ = require('jquery');
class JoinChatForm extends HTMLElement {

  constructor () {
    super();
  }

  connectedCallback() {
  this.renderJoinForm()
  this.addEventListeners()
  }

  renderJoinForm () {
    this.innerHTML = `
      <div class="container d-flex justify-content-center bg-info-subtle">
        <form id="join-form">
          <div class="mb-3">
            <label for="userName" class="form-label">Name</label>
            <input type="text" class="form-control" id="userName" autocomplete="off" required>
            <span class="border-danger text-danger d-none username-error">Username is already in use!</span>
          </div>
          <div class="mb-3">
            <label for="room" class="form-label">Room</label>
            <input type="text" class="form-control" id="room" autocomplete="off" required>
          </div>
          <button type="submit" class="btn btn-primary" id="join-room">Submit</button>
        </form>
      </div>
    `
  }

  addEventListeners () {
    $(this).find('#join-room').on('click', this.emitJoinEvent.bind(this))
  }

  emitJoinEvent (e) {
    e.preventDefault()

    this.socket = io();
    let username = $(this).find('#userName').val()
    let room = $(this).find('#room').val()
    this.socket.emit('join', { username, room }, (error) => {
      $(this).find('.username-error').addClass('d-none')
      if (error) {
        $(this).find('#userName').addClass('border-danger')
        $(this).find('.username-error').removeClass('d-none')
        return;
      }
      this.joinRoom(username, room)
    })
  }

  joinRoom (username, room) {
    const ele = document.createElement('chat-window')
    ele.username = username
    ele.room = room
    ele.socket = this.socket
    document.body.innerHTML = ''
    document.body.appendChild(ele)
  }

}

customElements.define('join-chat-form', JoinChatForm)