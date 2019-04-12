import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isLogout } from "../../../redux/actions/user";
import { clearLocalStorage } from "../../../utils/customFunction";

class Logout extends Component {
    componentWillMount() {
        clearLocalStorage("user");
        this.props.isLogout();
    }
    render() {
        return <Redirect to="/login" />;
    }
}

export default connect(
    null,
    { isLogout }
)(Logout);
