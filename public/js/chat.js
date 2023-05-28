const socket = io()

socket.on('message', (message) => {
  console.log(message);
})

socket.on('message-sent', (message) => {
  document.getElementById('message-list').innerHTML += `<div class="card mb-2 p-2">${message}</div>`
})

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault()
  let message_box = document.getElementById('message')
  let message_text = message_box.value
  message_box.value = ''
  socket.emit('send-message', message_text)
})

document.getElementById('send-location').addEventListener('click', () => {
  // if(navigator.geolocation) console.log('in here');
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit('send-location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })
  });
})
