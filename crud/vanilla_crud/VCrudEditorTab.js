"use strict";

class VCrudEditorTab {
    constructor(obj, tab_index, tab_config, table_obj){
        this.obj = obj;
        this.tab_index = tab_index;
        this.tab_config = tab_config;
        this.table_obj = table_obj;
    }

    mountTo(container_element){
        var panel_element = el('div', {class: "mdl-tabs__panel", id: "editor_tab" + this.tab_index});
        componentHandler.upgradeElement(panel_element);


        var obj = this.obj;
        console.assert(obj);

        //var res = [];

        var tab_config = this.tab_config;
        console.assert(tab_config);

        console.assert(tab_config.fields);
        for (var field_index in tab_config.fields) {
            var field_config = tab_config.fields[field_index];
            var field_name = field_config.field_name;

            //res.push(<div>{field_name}: {obj[field_name]}</div>);
            //panel_element.appendChild(el('div', 'field_name: ' + obj[field_name]));

            var field = el('div', {class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"},
                [
                    el('input', {class: "mdl-textfield__input", type: "text", id: "sample3", value: obj[field_name]}),
                    el('label', {class: "mdl-textfield__label", for: "sample3"}, field_name)
                ]
            );
            componentHandler.upgradeElement(field);

            panel_element.appendChild(field);

        }

        container_element.appendChild(panel_element);
    }
}