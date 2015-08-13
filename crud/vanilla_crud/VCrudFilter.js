"use strict";

class VCrudFilter extends VComponent {
    constructor(filter_config, table_obj) {
        super();

        console.assert(filter_config);
        console.assert(table_obj);

        this.filter_config = filter_config;
        this.table_obj = table_obj;
    }

    mountTo(element){
        console.assert(element);
        this.container_element = element;

        this.container_element.appendChild(
            el('div',
                [
                    el('span', this.filter_config.field_name),
                    el('input')
                ]
            )
        );

    }
}
