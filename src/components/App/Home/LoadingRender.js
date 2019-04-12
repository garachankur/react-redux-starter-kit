import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingRender = () => {
    return (
        <div className="card flex-row flex-wrap" style={{ marginTop: "10px" }}>
            <div className="card-header border-0">
                <Skeleton height={150} width={150} />
            </div>
            <div className="card-block px-2">
                <h4 className="card-title">
                    <Skeleton height={30} width={200} />
                </h4>
                <p className="card-text">
                    <Skeleton height={30} width={200} />
                </p>
                <p className="card-text">
                    <Skeleton height={30} width={200} />
                </p>
            </div>
            <div className="w-100" />
            <div className="card-footer w-100 text-muted">
                <Skeleton height={30} />
            </div>
        </div>
    );
};

export default LoadingRender;
