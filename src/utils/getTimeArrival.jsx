const sumTime = (timeString, durationString) => {
    const [timeHours, timeMinutes] = timeString.split(":");
    const durationParts = durationString.split(" ");
    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);

    let hours = parseInt(timeHours, 10) + durationHours;
    let minutes = parseInt(timeMinutes, 10) + durationMinutes;

    hours += Math.floor(minutes / 60);
    minutes %= 60;

    // Si las horas superan las 24, se convierten en 00
    hours %= 24;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
};

export default sumTime