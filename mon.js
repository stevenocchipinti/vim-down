var fs = require('fs');
var showdown = require('showdown');
var converter = new showdown.Converter({
  tables: true
});
var filename = 'hello.md';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/node_modules/github-markdown-css/github-markdown.css');
});

function emitContent() {
  fs.readFile(filename, 'utf8', (err, contents) => {
    io.emit('file_changed', {
      content: converter.makeHtml(contents)
    });
  });
}

io.on('connection', function(socket){
  emitContent();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


fs.watchFile(filename, (curr, prev) => {
  emitContent();
});
