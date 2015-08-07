var CrudClass = React.createClass({
    propTypes: {
        class_name: React.PropTypes.string.isRequired,
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    classClick: function(){
        var table_react = this.props.table_react;
        var class_name = this.props.class_name;

        table_react.setState({class_name: class_name});
    },

    render: function() {
        return (
            <div className="mdl-navigation__link" onClick={this.classClick}>
                {this.props.class_name}
            </div>
        );
    }
});
