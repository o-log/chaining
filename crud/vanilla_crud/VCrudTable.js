"use strict";

class VCrudTable extends VComponent {
    constructor() {
        super();
    }

    openEditor(obj) {
        var editor_container_element = this.getElementByLocalId('editor_container');
        editor_container_element.innerHTML = '';

        if (obj) {
            var editor = new VCrudEditor(obj, this.class_name, this);
            editor.mount(editor_container_element);
        }
    }

    mountTo(element) {
        console.assert(element);
        this.container_element = element;

        this.container_element.appendChild(
            el('div',
                [
                    el('div', {style: 'display: table-cell'},
                        [
                            el('div', {id: this.localElementId('filters_container'), style: 'padding: 20px; background-color: silver;'}),
                            el('table', {class: "mdl-data-table mdl-js-data-table mdl-data-table--selectable"},
                                [
                                    el('thead',
                                        [
                                            el('tr',
                                                [
                                                    el('th', 'DUD')
                                                ]
                                            )
                                        ]
                                    ),
                                    el('tbody', {id: this.localElementId('list_container')})
                                ]
                            )
                        ]
                    ),
                    el('div', {id: this.localElementId('editor_container'), style: 'display: table-cell; padding: 20px;'})
                ]
            )
        );
    }

    setObjArr(obj_arr) {
        this.openEditor(null); // reset editor

        var list_container_element = this.getElementByLocalId('list_container');
        list_container_element.innerHTML = '';

        for (var i in obj_arr) {
            var obj = obj_arr[i];

            var row = new VCrudTableRow(obj, this.class_name, this);
            row.mount(list_container_element);
        }
    }

    renderFilters() {
        var filters_container_element = this.getElementByLocalId('filters_container');
        filters_container_element.innerHTML = '';

        var class_name = this.class_name;
        var class_config = crud.getClassConfig(class_name);
        console.assert(class_config);
        var table_config = class_config.table;
        console.assert(table_config);
        var filters_config = table_config.search_fields;
        if (!filters_config){
            return;
        }

        for (var filter_index in filters_config) {
            var filter_config = filters_config[filter_index];
            var filter_obj = new VCrudFilter(filter_config, this);
            filter_obj.mountTo(filters_container_element);
        }
    }

    /**
     * таблица выводит список объектов указанного класса
     * фильтры и сортировки заполняются параметрами по умолчанию из конфига круда для класса
     * @param class_name
     */
    setClassName(class_name) {
        this.class_name = class_name;

        this.renderFilters();

        this.makeApiRequest();
    }

    makeApiRequest() {
        var url = crud.config.api_url + this.class_name;

        $.ajax({
            url: url,
            data: 'filter[limit]=10',
            dataType: 'json',
            cache: true,
            success: function (data) {
                this.setObjArr(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });

    }
}
