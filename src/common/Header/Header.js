import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Header = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/home">
                    Start Bootstrap
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/home">
                                Home
                                <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/autocomplete">
                                Autocomplete
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/select2">
                                Select2
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/datatable">
                                Datatable
                            </Link>
						</li> */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src={props.profile ? props.profile : "http://via.placeholder.com/150x150"}
                                    style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                                />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/profile">
                                    Profile
                                </Link>
                                <Link className="dropdown-item" to="/logout">
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

function mapStateToProps(state) {
    return {
        profile: state.user.profile,
    };
}
export default withRouter(
    connect(
        mapStateToProps,
        null
    )(Header)
);
