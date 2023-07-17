
const SortArrByTimeLater = (trips) => {
    trips.sort((a, b) => new Date(b.date) - new Date(a.date))

    return trips


}


export default SortArrByTimeLater