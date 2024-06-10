import React, { useState } from "react";
import { Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import styles from "../../css/map.module.css"

function CustomMarker(props) {
    const [markerHovered, setMarkerHovered] = useState(false);

    const coords = {
        lat: props.pinLat,
        lng: props.pinLng
    };

    function showBox() {
        setMarkerHovered(true);
    }

    function hideBox() {
        setMarkerHovered(false);
    }

    const navigate = useNavigate()
    function goToComposer() {
        navigate(`/viewComposer?id=${props.pinID}`)
    }

    // let iconMarker = new window.google.maps.MarkerImage(
    //     t,//"https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
    //     null, /* size is determined at runtime */
    //     null, /* origin is 0,0 */
    //     null, /* anchor is bottom center of the scaled image */
    //     new window.google.maps.Size(32, 32)
    // ); icon={iconMarker}

    // inject global css (not locally scoped) to get rid of X close on google infowindow
    const style = document.createElement('style');
    style.textContent = `
      .gm-style-iw button {
        display: none !important;
      }
      .gm-style-iw-d {
        top: 0 !important;
        left: 0 !important;
        margin: 0 !important;
      }
    `;
    document.head.append(style);


    return (
        <Marker onClick={goToComposer} onMouseOver={showBox} onMouseOut={hideBox} position={coords}>
            {markerHovered && <InfoWindow>
                <span className={styles.nameBox}>
                    {props.pinName}
                </span>
            </InfoWindow>}
        </Marker>
    )
}

export default CustomMarker;