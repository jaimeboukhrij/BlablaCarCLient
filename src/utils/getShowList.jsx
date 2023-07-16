
function getShowList(tripData, user) {
    const passengers = tripData?.passengersIds
    const review = tripData?.reviews


    console.log(user._id)

    console.log(passengers)
    console.log(review)



    const data = passengers?.filter(elem => (!review.some((obj) => obj.to == elem._id)))
    console.log(data)

    const finalData = data?.filter(elem => elem._id != user._id)

    const checkOwner = review?.filter(elem => (elem.to == tripData.owner._id) && (elem.owner == user._id))

    console.log(checkOwner)

    checkOwner?.length == 0 && finalData?.push(tripData.owner)

    console.log(finalData)
    return finalData?.filter(elem => elem._id != user._id)
}


export default getShowList