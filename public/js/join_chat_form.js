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
        <form id="join-form" action="./chat.html">
          <div class="mb-3">
            <label for="userName" class="form-label">Name</label>
            <input type="text" class="form-control" id="userName" autocomplete="off" required>
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
    document.querySelector('#join-room').addEventListener('click', this.joinRoom.bind(this))
  }

  joinRoom (e) {
    e.preventDefault()
    const ele = document.createElement('chat-window')
    ele.userName = document.querySelector('#userName').value
    ele.roomName = document.querySelector('#room').value
    document.body.innerHTML = ''
    document.body.appendChild(ele)
  }

}

customElements.define('join-chat-form', JoinChatForm)