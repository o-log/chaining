var crud = {
    crud_config: {
        'blocks': {
            'objects_list': {
                'columns': [
                    {'field_name': 'id'},
                    {'field_name': 'title'}
                ]
            },
            'object_editor': [
                {'field_name': 'title'},
                {'field_name': 'body'},
                {'field_name': 'pages'}
            ]
        },
        'operator': {
            'objects_list': {
                'columns': [
                    {'field_name': 'id'},
                    {'field_name': 'title'}
                ]
            },
            'object_editor': [
                {'field_name': 'title'}
            ]
        },
        'tv_city': {
            'object_editor': [
                {'field_name': 'name'}
            ]
        },
        'tv_channel': {
            'object_editor': [
                {'field_name': 'name'}
            ]
        }
    },

    showClassesList: function () {
        var classes_list_component = new CrudClassesList();
        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(classes_list_component);

        return false;
    },

    crudClassOnClick: function () {
        var class_name = $(this).data('crud_class_name');

        crud.showClassObjectsList(class_name);

        return false;
    },

    showClassObjectsList: function (class_name) {
        var list = new CrudClassObjectsList(class_name);
        crud_lists[class_name] = list;

//$('body').append(list);
        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(list);
    },

    crudObjectInListOnClick: function () {
        var obj_full_id = $(this).data('crud_obj_full_id');

        //$('#obj_list_container').remove(); // remove list only after reading obj attrs from one

        var editor_html = crud.renderEditorForObjFullId(obj_full_id);
        //$('body').prepend(editor_html);
        //$(editor_html).insertAfter(this);

        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').innerHTML = editor_html;

        return false;
    },


    renderEditorForObjFullId: function (obj_full_id) {
        var obj = storage._obj_arr[obj_full_id];

        var html = '';
        html += '<div id="crud_obj_editor">';
        html += '<h1><a href="#" onclick="return crud.showClassesList();">классы</a> / <a href="#" onclick="return crud.showClassObjectsList(\'' + obj._class_name + '\');">' + obj._class_name + '</a> / EDITOR</h1>';

        var crud_config_for_class = crud.crud_config[obj._class_name];
        for (var i = 0; i < crud_config_for_class.object_editor.length; i++) {
            var field_config = crud_config_for_class.object_editor[i];
            var property_name = field_config.field_name;
            html += crud.renderEditorField(obj_full_id, property_name);
        }

        html += '<div><input type="button" value="Save" onclick="crud.saveEditor(\'' + obj_full_id + '\');"></div>';
        html += '</div>';

        return html;
    },

    saveEditor: function (obj_full_id) {
        var obj = storage._obj_arr[obj_full_id];

        var crud_config_for_class = crud.crud_config[obj._class_name];
        for (var i = 0; i < crud_config_for_class.object_editor.length; i++) {
            var field_config = crud_config_for_class.object_editor[i];
            var property_name = field_config.field_name;

            var field_editor_element = $('#editor_field__' + property_name);
            var field_value = field_editor_element.val();
            console.log(field_value);

            var data = {};
            data.object_class_name = obj._class_name;
            data.object_id = obj.id;
            data.field_name = property_name;
            data.field_value = field_value;

            socket.emit('update_object_field', data);

        }
    },

    renderEditorField: function (obj_full_id, property_name) {
        var html = '';
        var obj = storage._obj_arr[obj_full_id];

        var property_value = obj[property_name];

        html += '<div><div>' + property_name + '</div>';
        html += '<textarea id="editor_field__' + property_name + '">' + property_value + '</textarea>';
        html += '</div>';

        return html;
    }
};