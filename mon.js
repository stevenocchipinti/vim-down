var fs = require('fs');
var showdown = require('showdown');
var converter = new showdown.Converter({
  tables: true
});
var filename = 'hello.md';

fs.watchFile(filename, (curr, prev) => {
  fs.readFile(filename, 'utf8', (err, contents) => {
    console.log();
  });
});


var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  fs.readFile(filename, 'utf8', (err, contents) => {
    res.send(converter.makeHtml(contents));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
