import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import { moviesSearchList } from "../../../utils/services/userService";

class Autocomplete extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
        this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
    }

    autocompleteSearchDebounced = event => {
        this.autocompleteSearch(event);
    };

    autocompleteSearch = search => {
        let self = this;
        if (search.length > 0) {
            moviesSearchList(search).then(function(response) {
                if (response.status === 200) {
                    if (self._isMounted)
                        self.setState({
                            searchList: response.data.results.map(movie => movie.title),
                        });
                }
            });
        } else this.setState({ searchList: [] });
    };

    searchHandler = event => {
        this.autocompleteSearchDebounced(event.target.value);
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { searchList } = this.state;

        return (
            <div className="row">
                <div className="col-md-3" />
                <div className="col-md-9">
                    <div className="form-group" style={{ marginTop: "30px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Text"
                            onChange={this.searchHandler}
                        />
                    </div>
                    {searchList.length > 0 &&
                        searchList.map((search, index) => (
                            <div className="card flex-row flex-wrap movies" key={index} style={{ marginTop: "10px" }}>
                                <div className="card-block px-2">
                                    <h5 className="card-title">{search}</h5>
                                </div>
                            </div>
                        ))}

                    {searchList.length == 0 && (
                        <div className="card flex-row flex-wrap movies" style={{ marginTop: "10px" }}>
                            <div className="card-block px-2" style={{ height: "100px" }}>
                                <h3 className="card-title" style={{ textAlign: "center", marginTop: "10%" }}>
                                    Search Movie Name
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Autocomplete;
