import React, { Component } from "react";

import { connect } from "react-redux";
import { isLoading } from "../../../redux/actions/user";
import "./home.scss";
import { moviesList } from "../../../utils/services/userService";

import LoadingRender from "./LoadingRender";

class Home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            isLoading: true,
            totalPages: 5,
            page: 1,
            scrolling: false,
        };
    }
    componentWillMount() {
        this.props.isLoading(true);
        this.moviesHandler();
        window.addEventListener("scroll", e => {
            if (this._isMounted) this.handleScroll();
        });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { scrolling, totalPages, page } = this.state;
        if (scrolling) return;
        if (totalPages <= page) return;
        let lastMovie = document.getElementsByClassName("movies");

        if (lastMovie.length === 0) return;

        lastMovie = lastMovie[lastMovie.length - 1];
        let lastMovieOffset = lastMovie.offsetTop + lastMovie.clientHeight;
        let pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;

        if (pageOffset > lastMovieOffset - bottomOffset) {
            this.props.isLoading(true);
            this.setState(
                prevState => ({
                    page: prevState.page + 1,
                    scrolling: true,
                }),
                () => {
                    setTimeout(() => {
                        this.moviesHandler();
                    }, 1000);
                }
            );
        }
    };
    moviesHandler = () => {
        let self = this;
        const { page } = this.state;
        moviesList(page).then(function(response) {
            if (response.status === 200) {
                self.props.isLoading(false);
                if (self._isMounted)
                    self.setState({
                        moviesList: self.state.moviesList.concat(response.data.results),
                        scrolling: false,
                    });
            }
        });
    };

    render() {
        const { moviesList } = this.state;
        const { loader } = this.props;

        return (
            <div className="row">
                <div className="col-lg-3">
                    <h1 className="my-4">Movies</h1>
                </div>

                <div className="col-lg-9">
                    {moviesList.length > 0 &&
                        moviesList.map((movie, index) => (
                            <div className="card flex-row flex-wrap movies" key={index} style={{ marginTop: "10px" }}>
                                <div className="card-header border-0">
                                    <img src={"https://image.tmdb.org/t/p/w200/" + movie.poster_path} alt="" />
                                </div>
                                <div className="card-block px-2">
                                    <h4 className="card-title">{movie.title}</h4>
                                    <p className="card-text">Release Date : {movie.release_date}</p>
                                    <p className="card-text">Vote : {movie.vote_average}</p>
                                </div>
                                <div className="w-100" />
                                <div className="card-footer w-100 text-muted">Themoviedb</div>
                            </div>
                        ))}

                    {loader && <LoadingRender />}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loader: state.user.loader,
    };
}
export default connect(
    mapStateToProps,
    { isLoading }
)(Home);
