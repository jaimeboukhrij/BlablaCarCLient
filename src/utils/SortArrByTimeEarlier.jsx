
const SortArrByTimeEarlier = (trips) => {
    trips.sort((a, b) => {
        const timeA = a.hourDeparture.split(":");
        const timeB = b.hourDeparture.split(":");

        const hoursA = parseInt(timeA[0], 10);
        const minutesA = parseInt(timeA[1], 10);

        const hoursB = parseInt(timeB[0], 10);
        const minutesB = parseInt(timeB[1], 10);

        if (hoursA === hoursB) {
            return minutesA - minutesB;
        }

        return hoursA - hoursB;
    });

    return trips


}


export default SortArrByTimeEarlier