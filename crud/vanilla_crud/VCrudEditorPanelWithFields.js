"use strict";

class VCrudEditorPanelWithFields extends VComponent {
    constructor(obj, tab_config, table_obj){
        super();

        this.obj = obj;
        this.tab_config = tab_config;
        this.table_obj = table_obj;
    }

    getSwitcherId(){
        return this.localElementId("panel");
    }

    mountTo(panels_container, tabs_container){
        console.assert(panels_container);
        console.assert(tabs_container);

        var panel_element = el('div', {class: "mdl-tabs__panel", id: this.getSwitcherId()});
        panels_container.appendChild(panel_element);
        componentHandler.upgradeElement(panel_element);

        var obj = this.obj;
        console.assert(obj);

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

            panel_element.appendChild(field);
            componentHandler.upgradeElement(field);
        }


        tabs_container.appendChild(
            el('a', {href: "#" + this.getSwitcherId(), class: "mdl-tabs__tab"}, tab_config.tab_title)
        );

    }
}