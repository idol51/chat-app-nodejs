const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const https = require('https');




const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/room', (req, res) => {
    console.log(req);
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`);
});

app.get('/room', (req, res) => {
    res.render('room');
})


const server = app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});

const io = socket(server);
require('./utils/socket')(io);