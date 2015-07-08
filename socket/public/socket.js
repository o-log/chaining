var socket = io();
//var socket_reecived_count = 0;

socket.on('fetch_obj', function(obj){
    var class_name = obj._class_name;

    //console.log('received ' + socket_reecived_count);
    //socket_reecived_count++;

    var crud_list_component = crud.lists[class_name];
    crud_list_component.addObject(obj);
});
