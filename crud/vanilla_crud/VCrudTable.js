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

    setClassName(class_name) {
        this.class_name = class_name;

        var url = 'http://localhost:3001/' + this.class_name;

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
