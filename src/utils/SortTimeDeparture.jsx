
const SortTimeDeparture = (arr, data) => {
    let newData = []

    console.log("-----", arr)

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
        console.log("nose")
        let result = data.filter((elem) => {
            return (!(12 > parseInt(elem.hourDeparture)) && (parseInt(elem.hourDeparture) < 18))
        })
        newData = [...newData, ...result]
    }
    if (arr.includes("+18:00")) {
        let result = data.filter((elem) => {
            return ((parseInt(elem.hourDeparture) >= 18))
        })
        if (result) newData = [...newData, ...result]
    }

    if (arr.includes("smoke")) {
        let result = data.filter((elem) => {
            return (elem.smoke)
        })
        if (result) newData = [...newData, ...result]
    }


    return newData
}



export default SortTimeDeparture