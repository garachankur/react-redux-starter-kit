import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserProfile } from "../../../redux/actions/user";

import { toaster, setUser } from "../../../utils/customFunction";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    firstname: Yup.string().required("Firstname is Required"),
    lastname: Yup.string().required("Lastname is Required"),
    profile: Yup.mixed()
        .required("profile is required")
        .test("fileFormat", "Unsupported Format", value => value && SUPPORTED_FORMATS.includes(value.type))
        .test("fileSize", "File too large", value => value && value.size <= FILE_SIZE),
});

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: "",
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    submitHandler = (data, action) => {
        setTimeout(() => {
            action.setSubmitting(false);
            toaster("success", "Profile Save successfully");
            this.props.updateUserProfile({ profile: this.state.profiles });
            action.resetForm();
            this.file.value = "";
            data.profile = this.state.profiles;
            setUser(data);
            this.setState({ profiles: "" });
        }, 2000);
    };

    handleChange = (event, props) => {
        let reader = new FileReader();
        let self = this;

        let file = event.target.files[0];

        if (file) {
            reader.onloadend = () => {
                if (file.size <= 1048576) self.setState({ profiles: reader.result });
            };
            reader.readAsDataURL(file);
            props.setFieldValue("profile", file);
        }
    };

    render() {
        const { profiles } = this.state;

        return (
            <div className="row">
                <div className="col-lg-12 " style={{ background: "#fff", padding: "10px" }}>
                    <h1 className="my-4">Profile</h1>

                    <Formik
                        validateOnBlur={true}
                        validationSchema={validation}
                        initialValues={{
                            email: "",
                            firstname: "",
                            lastname: "",
                            profile: undefined,
                        }}
                        onSubmit={(values, actions) => {
                            this.submitHandler(values, actions);
                        }}
                        render={props => {
                            console.log("formik props", props);

                            return (
                                <Form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">Avatar:</label>
                                        <div className="col-sm-5">
                                            <input
                                                type="file"
                                                className={
                                                    props.errors.profile && props.touched.profile
                                                        ? "form-control error"
                                                        : "form-control"
                                                }
                                                name="profile"
                                                onChange={e => this.handleChange(e, props)}
                                                ref={el => (this.file = el)}
                                            />
                                            <p className="help-block">Image must be less than 1MB</p>
                                            {props.errors.profile && (
                                                <div className="text-danger">{props.errors.profile}</div>
                                            )}
                                        </div>
                                        <div className="col-sm-5">
                                            <img
                                                src={profiles ? profiles : "http://via.placeholder.com/150x150"}
                                                style={{ borderRadius: "50%", width: "80px", height: "80px" }}
                                                alt="imagetest"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">email:</label>
                                        <div className="col-sm-10">
                                            <Field
                                                type="email"
                                                className={
                                                    props.errors.email && props.touched.email
                                                        ? "form-control error"
                                                        : "form-control"
                                                }
                                                name="email"
                                                placeholder="email"
                                            />
                                            <ErrorMessage
                                                className="text-danger"
                                                name="email"
                                                render={msg => <div className="text-danger">{msg}</div>}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">FirstName:</label>
                                        <div className="col-sm-10">
                                            <Field
                                                type="text"
                                                className={
                                                    props.errors.firstname && props.touched.firstname
                                                        ? "form-control error"
                                                        : "form-control"
                                                }
                                                name="firstname"
                                                placeholder="firstname"
                                            />
                                            <ErrorMessage
                                                className="text-danger"
                                                name="firstname"
                                                render={msg => <div className="text-danger">{msg}</div>}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">LastName:</label>
                                        <div className="col-sm-10">
                                            <Field
                                                type="text"
                                                className={
                                                    props.errors.lastname && props.touched.lastname
                                                        ? "form-control error"
                                                        : "form-control"
                                                }
                                                name="lastname"
                                                placeholder="lastname"
                                            />
                                            <ErrorMessage
                                                className="text-danger"
                                                name="lastname"
                                                render={msg => <div className="text-danger">{msg}</div>}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-2">
                                            <input
                                                type="submit"
                                                className="btn btn-primary"
                                                value={props.isSubmitting ? "Processing...." : "Save"}
                                                disabled={props.isSubmitting || !isEmpty(props.errors) || !props.dirty}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateUserProfile }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(User);
