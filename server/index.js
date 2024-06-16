const express = require('express')
const socketIo = require('socket.io')
const opengpg = require('openpgp');
const path = require('path');
const app  = express()
var http = require('http').Server(app);
const users = []
var io = require('socket.io')(http);
app.use(require('cors')({ origin: '*' }))
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})
io.on('connection', function(socket){
console.log(`New connection`)
socket.on('setUserName', (data, publicKey)=>{
    console.log(data, publicKey)
    if(users.indexOf(data)==-1){
       users.push(data)
       socket.emit('userSet', {username:data})
    }else{
       console.log('server mai')
       socket.emit('userExists', `${data} already exists, please change your Username to join the chat`)
    }
 })
// just pass them all on as encrypted pgp messages
socket.on('typing', (data)=>{
    if(data.typing==true)
       io.emit('display', data)
    else
       io.emit('display', data)
  })
    socket.on('chat message', function(...args){
      io.emit('chat message', ...args);
    });
    // socket.on('iwantthepgpkeys')
  });
  http.listen(3001, function(){
    console.log('listening on *:3000');
  });
  