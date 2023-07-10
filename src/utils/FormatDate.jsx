const formatDate = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const monthsOfYear = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const formattedDate = `${daysOfWeek[date.getDay()]}, ${date.getDate()} ${monthsOfYear[date.getMonth()]}`;
    return formattedDate;
}

export default formatDate