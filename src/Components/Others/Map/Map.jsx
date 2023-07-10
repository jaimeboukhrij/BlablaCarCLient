import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ Coordinates }) => {
    const [center, setCenter] = useState({ lat: 40.416775, lng: -3.703790 });
    const [zoom, setZoom] = useState(6);

    useEffect(() => {
        if (Coordinates) {
            setCenter(Coordinates);
            setZoom(12)
        }
    }, [Coordinates]);

    return (
        <GoogleMap zoom={zoom} center={center} mapContainerClassName="map-container">
            {Coordinates && <Marker position={center} />}
        </GoogleMap>
    );
};

export default Map;
