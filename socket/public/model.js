var model = {
    getFullIdForObj: function (obj) {
        if (typeof(obj) != 'object') {
            console.error('not object');
            return 'not_object';
        }

        var class_name = obj._class_name;
        var id = obj.id;

        return class_name + '::' + id;
    }

}