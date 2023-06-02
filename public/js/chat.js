const socket = io()

/*  HTML Events  */

const $messageForm = document.getElementById('message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormTextarea = $messageForm.querySelector('textarea')
const $locationBtn = document.getElementById('send-location')

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  $messageFormInput.disabled = true

  let message_text = $messageFormTextarea.value
  $messageFormTextarea.value = ''
  $messageFormTextarea.focus()
  socket.emit('send-message', message_text, () => {
    $messageFormInput.disabled = false
  })
})

$locationBtn.addEventListener('click', (e) => {
  $locationBtn.disabled = true
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('send-location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }, (message) => {
      console.log(message);
      $locationBtn.disabled = false
    })
  });
})


/*  Socket Events */

socket.on('message', (message) => {
  console.log(message.text);
})

socket.on('message-sent', (message) => {
  document.getElementById('message-list').innerHTML += `<div class="card mb-2 p-2">${moment(message.createdAt).format('H:mm')} - ${message.text}</div>`
})

socket.on('location-message', (location) => {
  document.getElementById('message-list').innerHTML += `
    <div class="card mb-2 p-2 d-block">
      <span>${moment(location.createdAt).format('H:mm')} - </span>
      <a href="${location.text}" target="_blank">This is my location</a>
    </div>`
})
