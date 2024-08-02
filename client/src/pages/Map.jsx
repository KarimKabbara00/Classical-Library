import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from "../components/map/CustomMarker";
import Info from "../components/map/Info";
import Loading from "../components/shared/Loading";
import Error from "../components/shared/Error";
import sharedStyles from "../css/shared.module.css";
import loadingStyles from "../css/loading.module.css";
import styles from "../css/map.module.css"
const baseURL = process.env.REACT_APP_BASE_URL;

function Map(props) {
    const mapStyles = {
        height: "100%",
        width: "100%",
    };

    const defaultCenter = {
        lat: 20,
        lng: 0
    };

    const [pinData, setPinData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        axios.get(`${baseURL}/api/map`)
            .then(res => {
                setPinData(res.data);
                setShowLoading(false);
            })
            .catch(err => {
                console.log(err);
                setShowLoading(false);
                setShowError(true);
            });
    }, [])

    // slide up or down loading
    const loadingStyling = classNames({
        [loadingStyles.loadingParent]: true,
        [loadingStyles.applySlideDown]: showLoading,
        [loadingStyles.applySlideUp]: !showLoading,
    });

    const contentStyling = classNames({
        [styles.mapPage]: true,
        [styles.applyFadeIn]: !showLoading,
    });

    // -------------------- Dark Mode -------------------- //
    const DarkMode = {
        backgroundColor: props.darkModeEnabled ? "#242728" : "",
        height: "94.5vh"
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={DarkMode}>
            <div className={loadingStyling}>
                <Loading loadingText={"Grabbing all birth locations..."} darkModeEnabled={props.darkModeEnabled} />
            </div>

            <div className={sharedStyles.errorParent}>
                <Error showError={showError} darkModeEnabled={props.darkModeEnabled} />
            </div>

            {!showLoading && !showError && < div className={contentStyling}>
                <div className={styles.mapBody}>
                    <LoadScript googleMapsApiKey="AIzaSyBMejuj6SyQbxx90HYBXAVCkeKj7YRoY2U">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={2.75} center={defaultCenter}>
                            {pinData.map((pin, index) => {
                                return <CustomMarker key={index} pinID={pin.composerID} pinName={pin.composerName} pinLat={pin.latitude} pinLng={pin.longitude} />
                            })}
                            <div><Info /></div>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>}
        </div >
    )
}

export default Map;