"use strict";

class VCrudClassesList {
    constructor(table_obj){
        this.table_obj = table_obj;
    }

    mountTo(container) {
        for (var class_name in crud_main.config){
            //res.push(<CrudClass class_name={class_name} table_react={this.props.table_react}/>);
            var list_row = new VCrudClassesListRow(class_name, this.table_obj);
            list_row.mountTo(container);
        }
    }
}
