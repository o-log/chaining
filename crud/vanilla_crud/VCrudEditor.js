"use strict";

class VCrudEditor {
    constructor(obj, class_name, table_obj) {
        this.obj = obj;
        this.class_name = class_name;
        this.table_obj = table_obj;
    }

    mount(container_element) {
        var class_config = crud.getClassConfig(this.class_name);
        console.assert(class_config);
        console.assert(class_config.editor);

        var tabs_container = el('div', {class: "mdl-tabs__tab-bar"});

        var sdfg = el('div', {class: "mdl-tabs mdl-js-tabs mdl-js-ripple-effect"},
            [
                tabs_container
            ]
        );

        var tab_index = 0;

        for (var i in class_config.editor) {
            var tab_config = class_config.editor[tab_index];

            var tab = el('a', {href: "#editor_tab" + tab_index, class: "mdl-tabs__tab"}, tab_config.tab_title);

            tabs_container.appendChild(tab);

            var tab = new VCrudEditorTab(this.obj, tab_index, tab_config, this.table_obj);
            tab.mountTo(sdfg);

            tab_index++;
        }


        if (class_config.linked_models) {
            for (var i in class_config.linked_models) {
                var linked_model_config = class_config.linked_models[i];
                var linked_class_name = linked_model_config.class_name;
                var link_field = linked_model_config.reference_field;
                var filters_arr = [];

                //filters_arr.push({'field_name': link_field, 'value': Model.getIdForObj(obj_instance)});

                var panel_element = el('div', {class: "mdl-tabs__panel", id: "editor_tab" + tab_index}, 'PANEL');
                //componentHandler.upgradeElement(panel_element);

                var list = new VCrudTable();
                list.mountTo(panel_element);

                list.setClassName(linked_class_name);

                sdfg.appendChild(panel_element);

                var tab = el('a', {href: "#editor_tab" + tab_index, class: "mdl-tabs__tab"}, linked_class_name);
                tabs_container.appendChild(tab);

                tab_index++;
            }
        }

        componentHandler.upgradeElement(sdfg);

        container_element.appendChild(sdfg);

    }
}

