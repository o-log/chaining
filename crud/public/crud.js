
var crud = {
    //lists: {},

    config: {
        game_media: {
            title: 'game media',
            table: {
                search_fields: [
                    {field_name: 'id'},
                    {field_name: 'nid'},
                    {field_name: 'game_id'}
                ],
                columns: [
                    {
                        field_name: 'title',
                        widget: {name: 'text', params: {edit_link: true}}
                    }
                ]
            },
            editor: [
                {field_name: 'nid', widget: {name: 'input'}},
                {field_name: 'game_id', widget: {name: 'input'}},
                {field_name: 'title', widget: {name: 'textarea'}},
                {field_name: 'role', widget: {name: 'input'}}
            ]
        },

        poll: {
            title: 'голосования',
            title_field_name: 'question',
            table: {
                search_fields: [
                    {field_name: 'id'},
                    {field_name: 'node_id'}
                ],
                columns: [
                    {
                        field_name: 'question',
                        widget: {name: 'text', params: {edit_link: true}}
                    }
                ]
            },
            editor: [
                {field_name: 'node_id', widget: {name: 'input'}},
                {field_name: 'question', widget: {name: 'textarea'}},
                {field_name: 'published', widget: {name: 'input'}},
                {field_name: 'created_at', widget: {name: 'input'}}
            ],
            linked_models: [
                {class_name: 'poll_answer', reference_field: 'poll_id'}
            ]
        },

        node: {
            title: 'материалы',
            id_field_name: 'nid',
            title_field_name: 'title',
            table: {
                search_fields: [
                    {field_name: 'nid'}
                ],
                columns: [
                    {
                        field_name: 'title',
                        widget: {name: 'text', params: {edit_link: true}}
                    }
                ]
            },
            editor: [
                {field_name: 'nid', widget: {name: 'input'}},
                {field_name: 'title', widget: {name: 'textarea'}},
                {field_name: 'type', widget: {name: 'input'}},
                {field_name: 'url_alias', widget: {name: 'textarea'}}
            ],
            linked_models: [
                {class_name: 'poll', reference_field: 'node_id'},
                {class_name: 'game_media', reference_field: 'nid'}
            ]
        },

        poll_answer: {
            title: 'ответы',
            table: {
                search_fields: [
                    {
                        field_name: 'poll_id'
                    }
                ],
                columns: [
                    {
                        field_name: 'answer_text',
                        widget: {name: 'text', params: {edit_link: true}}
                    }
                ]
            },
            editor: [
                {field_name: 'poll_id', widget: {name: 'input'}},
                {field_name: 'answer_text', widget: {name: 'textarea'}},
                {field_name: 'likes_count', widget: {name: 'input'}}
            ]
        },

        blocks: {
            title: 'блоки',
            table: {
                search_fields: [
                    {
                        field_name: 'id'
                    },
                    {
                        field_name: 'info'
                    },
                    {
                        field_name: 'region'
                    }
                ],
                columns: [
                    {
                        field_name: 'info',
                        widget: {name: 'text', params: {edit_link: true}}
                    },
                    {
                        field_name: 'region',
                        widget: {name: 'text'}
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
            title: 'ТВ каналы',
            table: {
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
            'editor': [
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

    crudObjectInListOnClick: function () {
        var obj_full_id = $(this).data('crud_obj_full_id');

        var editor_component = new crudEditor.component(obj_full_id);
        //editor_component.style.width = '600px';

        var table_element = $(this).parents('crud-table')[0];
        CrudTable.updateChildren(table_element, editor_component);

        return false;
    }
};