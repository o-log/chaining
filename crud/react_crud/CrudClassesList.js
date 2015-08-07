var CrudClassesList = React.createClass({
    propTypes: {
        table_react: React.PropTypes.instanceOf(CrudTable).isRequired
    },

    render: function () {
        var res = [];

        for (var class_name in crud.config){
            res.push(<CrudClass class_name={class_name} table_react={this.props.table_react}/>);
        }

        // div здесь только потому, что без него реакт дает ошибку ((
        return (
            <div>
                {res}
            </div>
        );
    }
});
