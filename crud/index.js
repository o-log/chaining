var express = require('express');
//var mysql = require('mysql');

/*
var news_db_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database: 'news'
});

news_db_connection.connect();
 */

var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);
app.use('/public', express.static('public'));
app.use('/react_crud', express.static('react_crud'));
app.use('/vanilla_crud', express.static('vanilla_crud'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/ng.html', function(req, res){
    res.sendFile(__dirname + '/ng.html');
});
app.get('/pagejs.html', function(req, res){
    res.sendFile(__dirname + '/pagejs.html');
});
app.get('/react.html', function(req, res){
    res.sendFile(__dirname + '/react.html');
});
app.get('/vanilla.html', function(req, res){
    res.sendFile(__dirname + '/vanilla.html');
});
app.get('/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
});

/*
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
*/

http.listen(3000, function(){
    console.log('listening on *:3000');
});

/*
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
    dumpObjects(socket_obj, msg);
}

function dumpObjects(socket_obj, command){
    var class_name = command.class_name;
    var order_by = command.order_by;
    var limit = command.limit;

    if (!limit){
        limit = 100; // safety limit
    }

    if (!order_by){
        order_by = 'id';
    }

    var sql = 'select * from ?? where 1=1 ';
    var params = [class_name];

    //var where = [];
    //var where_params = [];

    if (command.filters){
        for (var i in command.filters){
            var filter = command.filters[i];

            sql += ' and ?? like ? ';
            params.push(filter.field_name);
            params.push(filter.value + '%');
        }
    }

    sql += ' order by ??';
    params.push(order_by);

    sql += ' limit ?';
    params.push(limit);

    console.log(sql, params);

    news_db_connection.query(sql, params, function(err, rows, fields) {
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
*/