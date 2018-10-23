class ListItem extends React.Component {
    render() {
        return  <li data-role={this.props.item.header ? "list-divider" : ""}>{this.props.item.title}</li>;
    }
}

class ListviewDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [{
                id: 'header',
                header: true,
                title: 'Top Rated Movies'
            }]
        };
        
        this.getMovies();
    }
    
    getMovies = () => {
        var i, item, movies = [], newState, that = this, state = that.state;
        state.loading = true;
        mobiscroll.util.getJson('https://trial.mobiscroll.com/loadmore/?length=' + (state.data.length + 9), function (data) {
            for (var i = 0; i < data.length; i++) {
                item = data[i];
                movies.push({
                    id: item.id,
                    title: item.title
                });
            }
            state.loading = false;
            newState = React.addons.update(state, {data: {$push: movies }});
            that.setState(newState);
            
        }, 'jsonp');
    }
    
    render() {
        return (
            <div className="md-top-movies">
                <mobiscroll.Listview 
                    itemType={ListItem} 
                    data={this.state.data}
                    theme="ios"
                    animation={false}
                    striped={true}
                    swipe={false}
                    enhance={true}
                />
                <mobiscroll.Form className="mbsc-padding" theme="ios">
                    <div className="mbsc-btn-group-block">
                        <mobiscroll.Button onClick={this.getMovies} style={{ display: this.state.data.length < 101 ? 'block': 'none'}}>
                            <span className="md-btn-icon mbsc-ic mbsc-ic-loop2" style={{ display: this.state.loading ? 'block': 'none'}}></span>
                            <span style={{ display: !this.state.loading ? 'block': 'none'}}>Load more</span>
                        </mobiscroll.Button>
                    </div>
                </mobiscroll.Form>
            </div>
        );
    }
}
