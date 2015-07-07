var crud = {
    crud_config: {
        blocks: {
            objects_list: {
                columns: [
                    {
                        field_name: 'id',
                        widget: {
                            name: 'text',
                            params: {edit_link: true}
                        }
                    },
                    {
                        field_name: 'title',
                        widget: {
                            name: 'text',
                            params: {}
                        }
                    }
                ]
            },
            object_editor: [
                {field_name: 'title'},
                {field_name: 'body'},
                {field_name: 'pages'}
            ]
        },
        operator: {
            title: 'операторы',
            objects_list: {
                columns: [
                    {'field_name': 'id',
                        widget: {
                            name: 'text',
                            params: {edit_link: false}
                        }
                    },
                    {'field_name': 'title',
                        widget: {
                            name: 'text',
                            params: {edit_link: true}
                        }
                    }
                ]
            },
            object_editor: [
                {field_name: 'title', widget: {name: 'input'}},
                {field_name: 'authapi_user_id', widget: {name: 'input'}}
            ]
        },
        tv_city: {
            objects_list: {
                columns: [
                    {
                        'field_name': 'id',
                        widget: {
                            name: 'text',
                            params: {edit_link: false}
                        }
                    },
                    {
                        'field_name': 'name',
                        widget: {
                            name: 'text',
                            params: {edit_link: true}
                        }
                    }
                ]
            },
            'object_editor': [
                {
                    field_name: 'name',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'time_zone_relative_moscow',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'servicetv_id',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'servicetv_country_id',
                    widget: {name: 'input'}
                }



            ]
        },
        tv_channel: {
            title: 'каналы телепрограммы',
            objects_list: {
                columns: [
                    {
                        'field_name': 'name',
                        widget: {
                            name: 'text',
                            params: {edit_link: true}
                        }
                    }
                ]
            },
            'object_editor': [
                {
                    field_name: 'name',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'servicetv_id',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'block_id',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'logo',
                    widget: {name: 'input'}
                }
            ]
        },
        tv_transmission: {
            objects_list: {
                columns: [
                    {
                        'field_name': 'id',
                        widget: {
                            name: 'text',
                            params: {edit_link: false}
                        }
                    },
                    {
                        'field_name': 'title',
                        widget: {
                            name: 'text',
                            params: {edit_link: true}
                        }
                    }
                ]
            },
            'object_editor': [
                {
                    field_name: 'title',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'start_timestamp_moscow',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'finish_timestamp_moscow',
                    widget: {name: 'input'}
                },
                {
                    field_name: 'description',
                    widget: {name: 'input'}
                }
            ]
        }
    },

    getClassTitleByName: function(class_name) {
        var crud_class_config = crud.crud_config[class_name];
        var class_title = crud_class_config.title;
        if (!class_title) {
            class_title = class_name;
        }

        return class_title;
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

        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(list);
    },

    crudObjectInListOnClick: function () {
        var obj_full_id = $(this).data('crud_obj_full_id');

        //var editor_html = crud.renderEditorForObjFullId(obj_full_id);
        var editor_component = new CrudEditor(obj_full_id);

        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(editor_component);

        return false;
    },


    /*
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
    */

    /*
    renderEditorField: function (obj_full_id, property_name) {
        var html = '';
        var obj = storage._obj_arr[obj_full_id];

        var property_value = obj[property_name];

        html += '<div><div>' + property_name + '</div>';
        html += '<textarea id="editor_field__' + property_name + '">' + property_value + '</textarea>';
        html += '</div>';

        return html;
    }
    */
};