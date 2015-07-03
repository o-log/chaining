var socket = io();

socket.on('fetch_obj', function(obj){
    var class_name = obj._class_name;

    var crud_list_component = crud_lists[class_name];
    crud_list_component.addObject(obj);
});
