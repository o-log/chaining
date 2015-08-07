var CrudListCell = React.createClass({
    propTypes: {
        obj: React.PropTypes.object.isRequired, // object to be displayed
        field_name: React.PropTypes.string.isRequired,
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    cellClick: function() {
        this.props.table_react.showEditor(this.props.obj);
    },

    render: function() {
        var obj = this.props.obj;
        var field_name = this.props.field_name;

        return (
                <td onClick={this.cellClick}>{obj[field_name]}</td>
        );
    }
});
