var socket = io();

socket.on('fetch_obj', function(obj){
    var obj_full_id = getFullIdForObj(obj);
    storage._obj_arr[obj_full_id] = obj;

    var new_block_element = $('<div>');
    new_block_element.text(obj.region + ' ' + obj.id + ' ' + obj.title);
    new_block_element.data('crud_obj_full_id', obj_full_id);

    new_block_element.click(crud.crudObjectInListOnClick);

    var obj_list_container = $('#obj_list_container');
    if (obj_list_container.length == 0){
        obj_list_container = $('<div>');
        obj_list_container.attr('id', 'obj_list_container');
        $('body').append(obj_list_container);
    }

    obj_list_container.append(new_block_element);
});
