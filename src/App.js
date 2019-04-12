import React, { Component, Fragment } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Auth/Login";
import AppComponent from "./components/App";
import NotFound from "./common/NotFound";
import { getUser } from "./utils/customFunction";

const checkAuth = () => {
    let user = getUser();
    if (user) return true;
    else return false;
};

const BeforeLoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                checkAuth() ? (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }

    componentWillMount() {
        // call refresh token api
    }

    AuthProtectedRoute = () => {
        return () =>
            checkAuth() ? (
                <AppComponent />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: this.props.location },
                    }}
                />
            );
    };

    render() {
        return (
            <Fragment>
                <ToastContainer autoClose={4000} />

                <Switch>
                    <BeforeLoginRoute exact path="/login" component={Login} />

                    <Route exact path="/notfound" component={NotFound} />
                    <Route render={this.AuthProtectedRoute()} />
                </Switch>
            </Fragment>
        );
    }
}

export default withRouter(App);
