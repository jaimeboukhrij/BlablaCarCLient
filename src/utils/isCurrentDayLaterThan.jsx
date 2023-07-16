function isCurrentDayLaterThan(targetTime) {
    const currentTime = new Date();
    const targetDateTime = new Date(targetTime);

    const currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    const targetDate = new Date(targetDateTime.getFullYear(), targetDateTime.getMonth(), targetDateTime.getDate());

    return currentDate > targetDate;
}

export default isCurrentDayLaterThan
