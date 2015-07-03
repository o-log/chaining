var storage = {
    _obj_arr: [],

    getObject: function (obj_full_id){
        return storage._obj_arr[obj_full_id];
    }
};