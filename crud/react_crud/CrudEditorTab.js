var CrudEditorTab = React.createClass({
    propTypes: {
        obj: React.PropTypes.object.isRequired,
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired,
        tab_config: React.PropTypes.object.isRequired,
        tab_index: React.PropTypes.string.isRequired
    },

    render: function () {
        var obj = this.props.obj;
        console.assert(obj);

        var res = [];

        var tab_config = this.props.tab_config;
        console.assert(tab_config);

        console.assert(tab_config.fields);
        for (var field_index in tab_config.fields) {
            var field_config = tab_config.fields[field_index];
            var field_name = field_config.field_name;
            res.push(<div>{field_name}: {obj[field_name]}</div>);
        }

        return (
            <div className="mdl-tabs__panel" id={"editor_tab" + this.props.tab_index}>
                {res}
            </div>
        );
    }
});
