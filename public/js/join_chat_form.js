class JoinChatForm extends HTMLElement {

  constructor () {
    super();
  }

  connectedCallback() {
  //   this.innerHTML = `
  //   <h1>Join Form</h1>
  // `
  this.renderJoinForm()
  }

  renderJoinForm () {
    this.innerHTML = `
      <div class="container d-flex justify-content-center bg-info-subtle">
        <form id="join-form">
          <div class="mb-3">
            <label for="userName" class="form-label">Name</label>
            <input type="text" class="form-control" id="userName" required>
          </div>
          <div class="mb-3">
            <label for="room" class="form-label">Room</label>
            <input type="text" class="form-control" id="room" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    `
  }

}

customElements.define('join-chat-form', JoinChatForm)