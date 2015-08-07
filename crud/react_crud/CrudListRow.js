var CrudListRow = React.createClass({
    propTypes: {
        row_obj: React.PropTypes.object.isRequired, // object to be displayed
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    render: function() {
        var row_obj = this.props.row_obj;

        var class_config = crud.getClassConfig(this.props.table_react.state.class_name); // todo: use getter in table
        console.assert(class_config);
        console.assert(class_config.table);
        console.assert(class_config.table.columns);

        var res = [];

        for (var i in class_config.table.columns){
            var col_config = class_config.table.columns[i];
            var field_name = col_config.field_name;
            res.push(
                <CrudListCell obj={row_obj} field_name={field_name} table_react={this.props.table_react}/>
            );
        }

        return (
            <tr>
                {res}
            </tr>
        );
    }
});
