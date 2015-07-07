var express = require('express');
var mysql = require('mysql');

var news_db_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database: 'news'
});

news_db_connection.connect();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/static', express.static('public'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
});

var socket_obj = null;

io.on('connection', function(_socket_obj){
    socket_obj = _socket_obj;

    console.log('a user connected');

    socket_obj.on('objects_list', onObjectsList);
    socket_obj.on('update_object_field', onUpdateObjectField);

    socket_obj.on('disconnect', function(){
        console.log('user disconnected');
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function onUpdateObjectField(data){
    console.log('onUpdateObjectField');

    news_db_connection.query('update ?? set ?? = ? where id = ?',
        [data.object_class_name, data.field_name, data.field_value, data.object_id],
        function(err, rows, fields){
            if (err !== null){
                throw err;
            }
        }
    );


}

function onObjectsList(msg){
    var class_name = msg;
    console.log('message: ' + msg);
    //socket_obj.emit('chat message', 'hi! ' + msg);

    /*
    if (msg == 'blocks'){
        dumpBlocks(socket_obj, msg);
    }
    */

    dumpObjects(socket_obj, class_name);
}

function dumpObjects(socket_obj, class_name){
    news_db_connection.query('select * from ?? limit 10000', [class_name], function(err, rows, fields) {
        if (err) {
            throw err;
        }

        //console.log('The solution is: ', rows[0].solution);
        for (var i = 0; i < rows.length; i++){
            var row = rows[i];

            row._class_name = class_name;
            socket_obj.emit('fetch_obj', row);
        }
    });
}