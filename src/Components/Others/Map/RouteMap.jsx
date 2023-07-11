import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const RouteMap = ({ coordinates_origin, coordinates_destination, setTripData, tripData }) => {

    console.log("-----", coordinates_origin, coordinates_destination)
    const [center, setCenter] = useState(coordinates_origin);
    const [directions, setDirections] = useState(null);
    const [duration, setDuration] = useState("");
    const [arrivalTime, setArrivalTime] = useState(null);

    const directionsCallback = (response) => {
        if (response !== null && response.status === "OK") {
            const route = response.routes[0];
            const leg = route.legs[0];
            const newDuration = leg.duration.text;
            const departureTime = new Date(tripData.date.replace(/\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}/, tripData.hourDeparture));
            const newArrivalTime = new Date(departureTime.getTime() + leg.duration.value * 1000);

            setDirections(response);
            setDuration(newDuration);
            setArrivalTime(newArrivalTime);

            if (duration !== newDuration || arrivalTime !== newArrivalTime) {
                setTripData({ ...tripData, duration: newDuration, hourArrival: newArrivalTime });
            }
        } else {
            console.log("Error al obtener la ruta:", response);
        }
    };

    useEffect(() => {
        setCenter(coordinates_origin);
    }, [coordinates_origin]);

    return (
        <GoogleMap zoom={7} center={center} mapContainerStyle={{ height: "90vh", width: "100%" }}>
            <Marker position={center} />

            {directions && <DirectionsRenderer directions={directions} />}

            {duration && arrivalTime && (
                <div className="route-info">
                    <p>Duración del trayecto: {duration}</p>
                    <p>Hora de llegada: {arrivalTime.toLocaleTimeString()}</p>
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
    );
};

export default RouteMap;