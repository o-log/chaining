var storage = {
    _obj_arr: [],

    getObject: function (obj_full_id){
        return storage._obj_arr[obj_full_id];
    },

    setObject: function (obj_full_id, obj){
        storage._obj_arr[obj_full_id] = obj;
    },

    getObjectDeferred: function(obj_full_id, success_callback){
        if (this._obj_arr[obj_full_id]){
            success_callback(this._obj_arr[obj_full_id]);
            return;
        }

        var api_url = 'localhost:3001';

        //var field_polymer = this;
        var class_name = Model.getClassNameFromObjFullId(obj_full_id);
        var obj_id = Model.getIdFromObjFullId(obj_full_id);

        var query_url = 'http://' + api_url + '/' + class_name + '/' + obj_id;

        $.ajax({
            url: query_url,
            success: this.onDeferredGetSuccess.bind(this, class_name, success_callback)
        });

    },

    onDeferredGetSuccess: function(class_name, success_callback, obj){
        Model.setClassNameForObj(obj, class_name);
        var obj_full_id = Model.getFullIdForObj(obj);
        storage.setObject(obj_full_id, obj);

        success_callback(obj);
    }
};