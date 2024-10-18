import React from 'react';
import Loading from "../../assets/StudentPortalAssets/Loading.gif"
import "../../css/StudentPortalStyles/LoadingWidget.css";
const LoadingWidget1 = ({ }) => {
    return (
        <div className="loading-widget">
            <img src={Loading} className="loading-widget-gif" />
            <p className="loading-widget-word">Loading . . .</p>
            <p style={{color:"#BA1718"}} className="loading-widget-word2">Please wait a moment longer</p>
        </div>
    );
};

export default LoadingWidget1;
