const axios = require('axios');

async function getCountryDetails(countryName) {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${countryName}&inputtype=textquery&fields=place_id,formatted_address,name,geometry&key=AIzaSyBtc80oZ9lOnbwQODIRr0lG8MOlhxpXb94`);
        if (response.data.status === 'OK' && response.data.candidates.length > 0) {
            const country = response.data.candidates[0];
            return country;
        } else {
            throw new Error('No se pudieron obtener los detalles del país');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del país:', error.message);
        throw error;
    }
}

module.exports = {
    getCountryDetails
};
