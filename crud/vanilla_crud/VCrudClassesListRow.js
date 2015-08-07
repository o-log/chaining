"use strict";

class VCrudClassesListRow {
    constructor(class_name, table_obj) {
        this.class_name = class_name;
        this.table_obj = table_obj;
    }

    click() {
        this.table_obj.setClassName(this.class_name);
    }

    mountTo(container) {
        var elem = el('div', {class: "mdl-navigation__link"}, this.class_name);
        elem.onclick = this.click.bind(this);

        container.appendChild(elem);
    }
}
