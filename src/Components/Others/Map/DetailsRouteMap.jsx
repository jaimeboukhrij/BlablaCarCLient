import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer, LoadScript } from "@react-google-maps/api";

const DetailsRouteMap = ({ coordinates_origin, coordinates_destination }) => {
    const [center, setCenter] = useState(coordinates_origin);
    const [directions, setDirections] = useState(null);
    const [duration, setDuration] = useState("");

    const directionsCallback = (response) => {
        if (response !== null && response.status === "OK") {
            setDirections(response);
            const route = response.routes[0];
            const leg = route.legs[0];
            setDuration(leg.duration.text);
        } else {
            console.log("Error al obtener la ruta:", response);
        }
    };


    return (
        <LoadScript googleMapsApiKey="AIzaSyBtc80oZ9lOnbwQODIRr0lG8MOlhxpXb94">
            <GoogleMap zoom={7} center={center} mapContainerStyle={{ height: "30vh", width: "100%" }}>
                <Marker position={center} />

                {directions && <DirectionsRenderer directions={directions} />}

                {duration && (
                    <div className="route-info">
                        <p>Duración del trayecto: {duration}</p>
                    </div>
                )}

                <DirectionsService
                    options={{
                        destination: coordinates_destination,
                        origin: center,
                        travelMode: "DRIVING",
                    }}
                    callback={directionsCallback}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default DetailsRouteMap;
