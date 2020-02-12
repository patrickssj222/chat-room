const express = require("express");
const app = express();
const localStorage = require("local-storage");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.static(path.join(__dirname,'build')));
app.use(bodyParser.json());
app.use(cors());
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
app.post('/api/user/sign-up',(req,res)=> {
    if(localStorage.get(req.body.username)){
        res.status(409).end(JSON.stringify({"error": "Username already exists."}));
    }
    else{
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            localStorage.set(req.body.username, hash);
        });
        res.send(JSON.stringify({"status": 200, "error": null, "data": null}));
    }
});
app.post('/api/user/login',(req,res)=>{
   if(localStorage.get(req.body.username)){
        bcrypt.compare(req.body.password, localStorage.get(req.body.username), function(err, result) {
            if(result){
                res.send(JSON.stringify({"status": 200, "error": null, "data": req.body.username}));
            }
            else{
                res.status(401).send(JSON.stringify({"error": "Password mismatch."}));
            }
        });
   }
   else{
       res.status(404).end(JSON.stringify({"error": "Unable to find username."}));
   }
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