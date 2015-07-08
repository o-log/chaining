
var crud = {
    lists: {},

    config: {
        blocks: {
            table: {
                search_fields: [
                    {
                        field_name: 'id'
                    },
                    {
                        field_name: 'info'
                    }
                ],
                //group_by: 'region',
                page_size: 100,
                columns: [
                    {
                        field_name: 'id',
                        widget: {name: 'text', params: {edit_link: false}}
                    },
                    {
                        field_name: 'info',
                        widget: {name: 'text', params: {edit_link: true}}
                    },
                    {
                        field_name: 'region',
                        widget: {name: 'text', params: {}}
                    }
                ]
            },
            editor: [
                {field_name: 'region', widget: {name: 'input'}},
                {field_name: 'weight', widget: {name: 'input'}},
                {field_name: 'title', widget: {name: 'input'}},
                {field_name: 'info', widget: {name: 'input'}},
                {field_name: 'body', widget: {name: 'textarea'}},
                {field_name: 'pages', widget: {name: 'textarea'}},
                {field_name: 'format', widget: {name: 'textarea'}},
                {field_name: 'php_is_safe', widget: {name: 'textarea'}},
                {field_name: 'cache', widget: {name: 'textarea'}},
                {field_name: 'visible_only_for_administrators', widget: {name: 'textarea'}}
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
        var crud_class_config = crud.config[class_name];
        var class_title = crud_class_config.title;
        if (!class_title) {
            class_title = class_name;
        }

        return class_title;
    },

    crudClassOnClick: function () {
        var class_name = $(this).data('crud_class_name');

        crud.showClassObjectsList(class_name);

        return false;
    },

    showClassObjectsList: function (class_name) {
        var list = new CrudTable(class_name);
        crud.lists[class_name] = list;

        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(list);
    },

    crudObjectInListOnClick: function () {
        var obj_full_id = $(this).data('crud_obj_full_id');

        //var editor_html = crud.renderEditorForObjFullId(obj_full_id);
        var editor_component = new crudEditor.component(obj_full_id);

        document.querySelector('#page-content').innerHTML = '';
        document.querySelector('#page-content').appendChild(editor_component);

        return false;
    }
};