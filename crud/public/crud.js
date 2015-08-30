var crud = {
        config: {
            api_url: 'http://localhost:3001',
            models: {
                auth: {
                    title: 'пользователи',
                    id_field_name: 'auth_id',
                    title_field_name: 'auth_name',
                    table: {
                        search_fields: [
                            {
                                field_name: 'auth_id'
                            }
                        ],
                        order_fields: [
                            {
                                field_name: 'auth_id'
                            }
                        ],
                        columns: [
                            {field_name: 'auth_name', widget: {name: 'text', params: {edit_link: true}}},
                            {field_name: 'auth_email', widget: {name: 'text', params: {edit_link: false}}}
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'auth_id', widget: {name: 'input'}},
                                {field_name: 'auth_name', widget: {name: 'input'}},
                                {field_name: 'auth_email', widget: {name: 'input'}}
                            ]
                        }
                    ]
                },
                site_menu: {
                    title: 'Меню сайта',
                    title_field_name: 'text',
                    table: {
                        search_fields: [
                            {field_name: 'id'},
                            {field_name: 'parent_id', value: '0'}
                        ],
                        order_fields: [
                            {field_name: 'weight', direction: 'asc'}
                        ],
                        columns: [
                            {field_name: 'text', widget: {name: 'text', params: {edit_link: true}}}
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'подменю',
                            type: 'linked_model',
                            class_name: 'site_menu',
                            reference_field: 'parent_id'
                        },
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'text', widget: {name: 'input'}},
                                {field_name: 'url', widget: {name: 'input'}},
                                {field_name: 'term_id', widget: {name: 'model_id', params: {title: 'Рубрика', class_name: 'term'}}},
                                {field_name: 'weight', widget: {name: 'input'}},
                                {field_name: 'extra_html', widget: {name: 'input'}},
                                {field_name: 'parent_id', widget: {name: 'model_id', params: {title: 'Контейнер', class_name: 'site_menu'}}},
                                {field_name: 'is_published', widget: {name: 'input'}},
                                {field_name: 'alternative_html', widget: {name: 'input'}}
                            ]
                        }
                    ]
                },
                term: {
                    title: 'Рубрики',
                    id_field_name: 'tid',
                    title_field_name: 'name',
                    table: {
                        limit: 1000,
                        search_fields: [
                            {field_name: 'tid'},
                            {field_name: 'vid', widget: {name: 'model_select', class_name: 'vocabulary', order_field_name: 'weight', id_field_name: 'vid', name_field_name: 'name'}, value: 2},
                            {field_name: 'parent_id', value: "0"}
                        ],
                        order_fields: [
                            {field_name: 'weight', direction: 'asc'}
                        ],
                        columns: [
                            {field_name: 'name', widget: {name: 'text', params: {edit_link: true}}}
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'термы',
                            type: 'linked_model',
                            class_name: 'term',
                            reference_field: 'parent_id'
                        },
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'vid', widget: {name: 'model_id', params: {title: 'Словарь', class_name: 'vocabulary'}}},
                                {field_name: 'name', widget: {name: 'input'}},
                                {field_name: 'description', widget: {name: 'input'}},
                                {field_name: 'weight', widget: {name: 'input'}},
                                {field_name: 'parent_id', widget: {name: 'model_id', params: {title: 'Контейнер', class_name: 'term'}}}
                            ]
                        }
                    ]
                },
                vocabulary: {
                    title: 'Словари',
                    id_field_name: 'vid',
                    title_field_name: 'name',
                    table: {
                        search_fields: [
                            {field_name: 'vid'}
                        ],
                        order_fields: [
                            {field_name: 'weight', direction: 'asc'}
                        ],
                        columns: [
                            {field_name: 'name', widget: {name: 'text', params: {edit_link: true}}}
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'name', widget: {name: 'input'}},
                                {field_name: 'description', widget: {name: 'input'}},
                                {field_name: 'weight', widget: {name: 'input'}}
                            ]
                        }
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
                        order_fields: [
                            {field_name: 'nid', direction: 'asc'}
                        ],
                        columns: [
                            {
                                field_name: 'title', widget: {name: 'text', params: {edit_link: true}}
                            }
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'контент',
                            fields: [
                                {field_name: 'nid', widget: {name: 'input'}},
                                {field_name: 'title', widget: {name: 'input'}},
                                {field_name: 'type', widget: {name: 'input'}},
                                {field_name: 'url_alias', widget: {name: 'input'}}
                            ]
                        },
                        {
                            tab_title: 'видео',
                            fields: [
                            ]
                        },
                        {
                            tab_title: 'рубрики',
                            fields: [
                            ]
                        },
                        {
                            tab_title: 'конкурс',
                            fields: [
                            ]
                        },
                        {
                            tab_title: 'галерея',
                            fields: [
                            ]
                        },
                        {tab_title: 'опросы', type: 'linked_model', class_name: 'poll', reference_field: 'node_id'},
                        {
                            tab_title: 'html',
                            fields: []
                        },
                        {
                            tab_title: 'сервис',
                            fields: []
                        },
                        {tab_title: 'матчи', type: 'linked_model', class_name: 'game_media', reference_field: 'nid'}
                    ]
                },
                keyvalue2_items: {
                    title: 'keyvalue2',
                    title_field_name: 'name',
                    table: {
                        search_fields: [
                            {field_name: 'id'},
                            {field_name: 'parent_id', value: '0'},
                            {field_name: 'fullname'}
                        ],
                        order_fields: [
                            {
                                field_name: 'weight', direction: 'asc'
                            }
                        ],
                        columns: [
                            {
                                field_name: 'fullname',
                                widget: {name: 'text', params: {edit_link: true}}
                            }
                        ]
                    },
                    editor: [
                        {
                            tab_title: 'items',
                            type: 'linked_model',
                            class_name: 'keyvalue2_items',
                            reference_field: 'parent_id'
                        },
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'name', widget: {name: 'input'}},
                                {field_name: 'fullname', widget: {name: 'input'}},
                                {field_name: 'weight', widget: {name: 'input'}},
                                {field_name: 'value', widget: {name: 'textarea'}},
                                {field_name: 'description', widget: {name: 'textarea'}}
                            ]
                        }
                    ]
                },
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
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'nid', widget: {name: 'model_id', params: {title: 'Новость', class_name: 'node'}}},
                                {field_name: 'game_id', widget: {name: 'input', params: {title: 'Матч'}}},
                                {field_name: 'title', widget: {name: 'input', params: {title: 'Заголовок'}}},
                                {field_name: 'role', widget: {name: 'input', params: {title: 'Роль'}}}
                            ]
                        }
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
                        {
                            tab_title: 'ответы',
                            type: 'linked_model',
                            class_name: 'poll_answer',
                            reference_field: 'poll_id'
                        },
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'node_id', widget: {name: 'input'}},
                                {field_name: 'question', widget: {name: 'input'}},
                                {field_name: 'published', widget: {name: 'input'}},
                                {field_name: 'created_at', widget: {name: 'input'}}
                            ]
                        }
                    ]
                },
                poll_answer: {
                    title: 'ответы',
                    title_field_name: 'answer_text',
                    table: {
                        search_fields: [
                            {field_name: 'poll_id'}
                        ],
                        columns: [
                            {
                                field_name: 'answer_text',
                                widget: {name: 'text', params: {edit_link: true}}
                            }
                        ]
                    }
                    ,
                    editor: [
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'poll_id', widget: {name: 'input'}},
                                {field_name: 'answer_text', widget: {name: 'input'}},
                                {field_name: 'likes_count', widget: {name: 'input'}}
                            ]
                        }
                    ]
                },
                blocks: {
                    title: 'блоки',
                    table: {
                        limit: 1000,
                        search_fields: [
                            {field_name: 'id'},
                            {field_name: 'info'},
                            {field_name: 'region'},
                            {field_name: 'theme'}
                        ],
                        columns: [
                            {field_name: 'info', widget: {name: 'text', params: {edit_link: true}}}
                        ]
                    }
                    ,
                    editor: [
                        {
                            tab_title: 'поля',
                            fields: [
                                {field_name: 'region', widget: {name: 'input'}},
                                {field_name: 'weight', widget: {name: 'input'}},
                                {field_name: 'title', widget: {name: 'input'}},
                                {field_name: 'info', widget: {name: 'input'}},
                                {field_name: 'format', widget: {name: 'input'}},
                                {field_name: 'php_is_safe', widget: {name: 'input'}},
                                {field_name: 'cache', widget: {name: 'input'}},
                                {field_name: 'visible_only_for_administrators', widget: {name: 'input'}}
                            ]
                        },
                        {
                            tab_title: 'текст',
                            fields: [
                                {field_name: 'body', widget: {name: 'textarea'}}
                            ]
                        },
                        {
                            tab_title: 'видимость',
                            fields: [
                                {field_name: 'pages', widget: {name: 'textarea'}}
                            ]
                        }
                    ]
                }
                ,
                operator: {
                    title: 'операторы',
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
                    }
                    ,
                    object_editor: [
                        {field_name: 'title', widget: {name: 'input'}},
                        {field_name: 'authapi_user_id', widget: {name: 'input'}}
                    ]
                }
                ,
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
                    }
                    ,
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
                }
                ,
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
                    }
                    ,
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
                }
                ,
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
                    }
                    ,
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
                },
            }
        },

        getClassConfig: function (class_name) {
            return crud.config.models[class_name];
        },

        getClassTitleByName: function (class_name) {
            var crud_class_config = crud.getClassConfig(class_name);
            if (!crud_class_config){
                return '';
            }

            var class_title = crud_class_config.title;
            if (!class_title) {
                class_title = class_name;
            }

            return class_title;
        }
};