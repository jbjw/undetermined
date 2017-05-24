// const serverUrl = 'http://localhost'
// const socket = require('socket.io-client')(serverUrl)
// var io = require('socket.io-client')
var io = require('socket.io-client')
// import io from 'socket.io-client'
// var socket = io('http://localhost:5000')
var socket = io.connect('http://94349fe6.ngrok.io');

socket.on('connect', function() {
	console.log('connected')
	socket.emit('chat message', 'hi i am client')
})

socket.on('user joined', function(x) {
	console.log('dsa', x)
})

socket.emit('chat_message', 'blah', 'test chat message')
