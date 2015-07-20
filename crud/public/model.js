var Model = {
    getFullIdForObj: function (obj) {
        if (typeof(obj) != 'object') {
            console.error('not object');
            return 'not_object';
        }

        var class_name = obj._class_name;
        var id = Model.getIdForObj(obj);

        return class_name + '::' + id;
    },

    getIdForObj: function(obj){
        var class_name = obj._class_name;
        var id_field_name = Model.getIdFieldNameForClass(class_name);

        return obj[id_field_name];
    },

    getIdFieldNameForClass: function(class_name){
        var id_field_name = 'id';

        var class_config = crud.config[class_name];
        if (class_config){
            if (class_config.id_field_name){
                id_field_name = class_config.id_field_name;
            }
        }

        return id_field_name;
    },

    getTitleForObj: function(obj){
        var class_name = obj._class_name;

        var class_config = crud.config[class_name];
        if (class_config){
            if (class_config.title_field_name){
                var title_field_name = class_config.title_field_name;
                return obj[title_field_name];
            }
        }

        return Model.getFullIdForObj(obj);
    }

};
