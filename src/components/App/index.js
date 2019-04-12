import React, { Component, Fragment } from "react";

import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import Home from "../App/Home";
import User from "./User/User";
import Logout from "./Logout/Logout";
import Autocomplete from "./Autocomplete";

class AppComponent extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/profile" component={User} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/autocomplete" component={Autocomplete} />
                        <Redirect from="*" to="/notfound" />
                    </Switch>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export default withRouter(AppComponent);
