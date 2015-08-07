"use strict";

class VCrudTableCell {
    constructor(obj, col_config, table_obj){
        this.obj = obj;
        this.col_config = col_config;
        this.table_obj = table_obj;
    }

    click(){
        this.table_obj.openEditor(this.obj);
    }

    mount(container){
        var field_name = this.col_config.field_name;
        var res = el('td', this.obj[field_name]);

        res.onclick = this.click.bind(this);

        container.appendChild(res);
    }
}
