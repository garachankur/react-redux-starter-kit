import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import isEmpty from "lodash/isEmpty";

import "./login.css";

const validation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

class Login extends Component {
    submitHandler = (data, action) => {
        localStorage.setItem("user", JSON.stringify(data));
        let history = this.props.history;

        setTimeout(() => {
            let location = this.props.location.state ? this.props.location.state.from.pathname : "/home";
            action.setSubmitting(false);
            history.push(location);
        }, 1000);
    };

    render() {
        return (
            <div className="wrapper fadeInDown zero-raduis">
                <div id="formContent">
                    <div className="fadeIn first">
                        <h2 className="my-5">Log In</h2>
                    </div>

                    <Formik
                        validationSchema={validation}
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={(values, actions) => {
                            this.submitHandler(values, actions);
                        }}
                        render={props => (
                            <Form>
                                <Field
                                    type="email"
                                    className={
                                        props.errors.email && props.touched.email
                                            ? "error email"
                                            : "fadeIn second zero-raduis email"
                                    }
                                    name="email"
                                    placeholder="email"
                                />
                                <ErrorMessage
                                    className="text-danger"
                                    name="email"
                                    render={msg => <div className="text-danger">{msg}</div>}
                                />
                                <Field
                                    type="password"
                                    className={
                                        props.errors.password && props.touched.password
                                            ? "error password"
                                            : "fadeIn third zero-raduis password"
                                    }
                                    name="password"
                                    placeholder="password"
                                />
                                <ErrorMessage
                                    className="text-danger"
                                    name="password"
                                    render={msg => <div className="text-danger">{msg}</div>}
                                />

                                <input
                                    type="submit"
                                    className="fadeIn fourth zero-raduis submit"
                                    value={props.isSubmitting ? "Processing...." : "Login"}
                                    disabled={props.isSubmitting || !isEmpty(props.errors) || !props.dirty}
                                />
                            </Form>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default Login;
