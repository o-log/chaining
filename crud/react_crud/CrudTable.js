/**
 * управляется через state.class_name - при изменении перерисовывается
 * props не используются
 */
var CrudTable = React.createClass({
    // типа дока по параматрам
    getInitialState: function () {
        return {
            class_name: '',
            data: [],
            editor_obj: null
        };
    },

    showEditor: function(obj){
        this.setState({editor_obj: obj});
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.class_name != this.state.class_name) {
            var url = 'http://localhost:3001/' + this.state.class_name;

            $.ajax({
                url: url,
                data: 'filter[limit]=10',
                dataType: 'json',
                cache: true,
                success: function (data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },

    render: function () {
        return (
            <div>
                <h1>{this.props.class_name}</h1>
                <table>
                    <tr>
                        <td style={{verticalAlign: 'top'}}>
                            <CrudList obj_arr={this.state.data} table_react={this} />
                        </td>
                        <td style={{verticalAlign: 'top'}}>
                            <CrudEditor obj={this.state.editor_obj} table_react={this} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
});
