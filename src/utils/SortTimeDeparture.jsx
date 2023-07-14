
const SortTimeDeparture = (arr, data) => {
    let newData = []

    if (arr.includes("-06:00")) {
        let result = data.filter((elem) => {
            return parseInt(elem.hourDeparture) < 6
        })
        newData = [...newData, ...result]
    }

    if (arr.includes("-12:00")) {
        let result = data.filter((elem) => {
            return (!(6 > parseInt(elem.hourDeparture)) && (parseInt(elem.hourDeparture) < 12))
        })
        newData = [...newData, ...result]
    }
    if (arr.includes("-18:00")) {
        let result = data.filter((elem) => {
            return (!(12 > parseInt(elem.hourDeparture)) && (parseInt(elem.hourDeparture) < 18))
        })
        newData = [...newData, ...result]
    }
    if (arr.includes("+18:00")) {
        let result = data.filter((elem) => {
            return ((parseInt(elem.hourDeparture) >= 18))
        })
        newData = [...newData, ...result]
    }



    if (arr.includes("maxPassengers")) {
        let result
        if (newData.length > 0) { result = newData.filter((elem) => { return elem.passengers >= 3 }) }
        else { result = data.filter((elem) => { return elem.passengers >= 3 }) }
        newData = [...result]
    }

    if (arr.includes("smoke")) {
        let result
        if (newData.length > 0) { result = newData.filter((elem) => { return (elem.smoke) }) }
        else { result = data.filter((elem) => { return (elem.smoke) }) }
        newData = [...result]
    }



    if (arr.includes("pets")) {
        let result
        if (newData.length > 0) { result = newData.filter((elem) => { return (elem.pets) }) }
        else { result = data.filter((elem) => { return (elem.pets) }) }
        newData = [...result]
    }



    return newData
}



export default SortTimeDeparture