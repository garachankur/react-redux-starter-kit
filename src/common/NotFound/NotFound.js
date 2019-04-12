import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! Nothing was found</h2>
                <p>
                    The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable. <Link to="/home">Return to homepage</Link>
                </p>
                <div className="notfound-social">
                    <a href={null}>
                        <i className="fab fa-facebook" />
                    </a>
                    <a href={null}>
                        <i className="fab fa-twitter" />
                    </a>
                    <a href={null}>
                        <i className="fab fa-pinterest" />
                    </a>
                    <a href={null}>
                        <i className="fab fa-google-plus" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
