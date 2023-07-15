function FormatDateProfile(dateString) {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} de ${year}`;
}

export default FormatDateProfile