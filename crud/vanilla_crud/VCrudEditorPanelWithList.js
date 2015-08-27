"use strict";

class VCrudEditorPanelWithList extends VComponent {
    constructor(linked_model_config) {
        super();

        this.linked_model_config = linked_model_config;
    }

    getSwitcherId(){
        return this.localElementId("panel");
    }

    renderTo(panels_container, tabs_container) {
        var linked_class_name = this.linked_model_config.class_name;
        var link_field = this.linked_model_config.reference_field;
        var filters_arr = [];

        //filters_arr.push({'field_name': link_field, 'value': Model.getIdForObj(obj_instance)});

        var panel_element = el('div', {class: "mdl-tabs__panel", id: this.getSwitcherId()}, 'PANEL');
        panels_container.appendChild(panel_element);

        //componentHandler.upgradeElement(panel_element);

        var list = new VCrudTable();
        list.mountTo(panel_element);

        list.setClassName(linked_class_name);

        tabs_container.appendChild(
            el('a', {href: "#" + this.getSwitcherId(), class: "mdl-tabs__tab"}, linked_class_name)
        );

    }
}