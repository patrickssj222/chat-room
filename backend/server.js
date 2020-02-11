const express = require("express");
const app = express();
const localStorage = require("local-storage");
const path = require("path");


app.use(express.static(path.join(__dirname,'build')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.post('/login',(req,res)=>{
   console.log(req);
});



const port = process.env.PORT || 3000;
const server = app.listen(port);

console.log('App is listening on port ' + port);

const io = require('socket.io')(server,{
    origins:"http://localhost:* http://127.0.0.1:*",
});
io.on('connection', function(socket){
    //Listening to filename
    socket.on('send', function(data){
        console.log("send: ", data);
        io.emit('receive', data);
    });
});