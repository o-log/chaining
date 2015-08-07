var CrudList = React.createClass({
    propTypes: {
        obj_arr: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    render: function() {
        var res = [];
        var obj_arr = this.props.obj_arr;

        for (var i in obj_arr){
            var obj = obj_arr[i];
            res.push(
                <CrudListRow row_obj={obj} table_react={this.props.table_react}/>
            );
        }

        return (
            <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                <tbody>
                    {res}
                </tbody>
            </table>
        );
    }
});
