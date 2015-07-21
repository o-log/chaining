var storage = {
    _obj_arr: [],

    getObject: function (obj_full_id){
        return storage._obj_arr[obj_full_id];
    },

    setObject: function (obj_full_id, obj){
        storage._obj_arr[obj_full_id] = obj;
    }
};