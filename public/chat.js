var output1 = document.getElementById('output1');
var message = document.getElementById('message');
var send = document.getElementById('send');
var feedback = document.getElementById('feedback');
var roomMessage = document.getElementsByClassName('room-message');
var users = document.getElementsByClassName('users');

var socket = io.connect('http://localhost:3000');

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var username = urlParams.get('username');
var roomname = urlParams.get('roomname');
console.log(username, roomname);

if (roomMessage) {
    roomMessage.innerHTML = `Connected in room ${roomname}`;
}

socket.emit('joined-user', {
    username: username,
    roomname: roomname
});

if ( send ) {
    send.addEventListener('click', () => {
        socket.emit('chat', {
            username: username,
            message: message.value,
            roomname: roomname
        });
        message.value = '';
    })
}
if (message) {
    message.addEventListener('keypress', () => {
        socket.emit('typing', { username: username, roomname: roomname});
    });
}
socket.on('joined-user', (data) => {
    if (output1) {
      output1.innerHTML += '<p>--> <strong><em>' + data.username + '</stong> has joined the Room </em></p>';
    }
});

socket.on('chat', (data) => {
    if (output1) {
     output1.innerHTML += '<p><strong>' + data.username + '</strong>:' + data.message + '</p>'
    }
});

socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

socket.on('online-users', (data) => {
    if (users) {
    users.innerHTML = '';
    data.forEach(user => {
        users.innerHTML += `<p>${user}</p>` 
    });
}
})