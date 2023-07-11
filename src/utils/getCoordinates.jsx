import axios from "axios"

const getCoordinates = async (placeId) => {

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyBtc80oZ9lOnbwQODIRr0lG8MOlhxpXb94`);

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            console.log("No se encontraron resultados para el ID del lugar.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener las coordenadas del lugar:", error);
        return null;
    }

}

export default getCoordinates