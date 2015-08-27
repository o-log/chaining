"use strict";

class VCrudTableRow {
    constructor(obj, class_name, table_obj){
        this.obj = obj;
        this.class_name = class_name;
        this.table_obj = table_obj;
    }

    mount(container){
        var a = el('tr');
        container.appendChild(a);

        var class_config = crud_main.getClassConfig(this.class_name);
        console.assert(class_config);
        console.assert(class_config.table);
        console.assert(class_config.table.columns);

        for (var col_index in class_config.table.columns){
            var col_config = class_config.table.columns[col_index];
            var cell_obj = new VCrudTableCell(this.obj, col_config, this.table_obj);
            cell_obj.mount(a);
        }

        componentHandler.upgradeElement(a);
    }
}
