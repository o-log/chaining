"use strict";

class VCrudEditor extends VComponent {
    constructor(obj, class_name, table_obj) {
        super();
        this.obj = obj;
        this.class_name = class_name;
        this.table_obj = table_obj;
    }

    renderTo(container_element) {
        var class_config = crud_main.getClassConfig(this.class_name);
        console.assert(class_config);
        console.assert(class_config.editor);

        container_element.appendChild(
            el('div', {id: this.localElementId('panels_container'), class: "mdl-tabs mdl-js-tabs mdl-js-ripple-effect"},
                [
                    el('div', {id: this.localElementId('tabs_container'), class: "mdl-tabs__tab-bar"})
                ]
            )
        );

        var panels_container = this.getElementByLocalId('panels_container');
        var tabs_container = this.getElementByLocalId('tabs_container');

        for (var fields_tab_index in class_config.editor) {
            var tab_config = class_config.editor[fields_tab_index];
            var panel = new VCrudEditorPanelWithFields(this.obj, tab_config, this.table_obj);
            panel.mountTo(panels_container, tabs_container);
        }

        if (class_config.linked_models) {
            for (var linked_model_index in class_config.linked_models) {
                var linked_model_config = class_config.linked_models[linked_model_index];
                var linked_models_list = new VCrudEditorPanelWithList(linked_model_config);
                linked_models_list.renderTo(panels_container, tabs_container);
            }
        }

        componentHandler.upgradeElement(panels_container);
    }
}

