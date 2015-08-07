var CrudEditor = React.createClass({
    propTypes: {
        obj: React.PropTypes.object.isRequired,
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    componentDidUpdate: function(){
        var sdfg = document.getElementById('tabs_container');
        if (sdfg) {
            componentHandler.upgradeElement(sdfg); // needed for MDL
        }
    },

    render: function() {
        var obj = this.props.obj;
        if (!obj){
            return (
                <div />
            );
        }

        var class_config = crud.getClassConfig(this.props.table_react.state.class_name); // todo: use getter in table
        console.assert(class_config);
        console.assert(class_config.editor);
        //console.assert(class_config.editor.tabs);

        var tabs = [];
        var panels = [];

        for (var tab_index in class_config.editor){
            var tab_config = class_config.editor[tab_index];
            tabs.push(<a href={"#editor_tab" + tab_index} className="mdl-tabs__tab">{tab_config.tab_title}</a>);
            panels.push(<CrudEditorTab obj={obj} tab_index={tab_index} tab_config={tab_config} table_react={this.props.table_react} />);
        }

        return (
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect" id='tabs_container'>
                <div className="mdl-tabs__tab-bar">
                    {tabs}
                </div>

                {panels}
            </div>
        );
    }
});
