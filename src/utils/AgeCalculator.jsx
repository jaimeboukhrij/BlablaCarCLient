function AgeCalculator(fechaNacimiento) {

    const fechaNacimientoUTC = new Date(fechaNacimiento);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNacimientoUTC.getFullYear();

    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNacimientoUTC.getMonth();
    const diaNacimiento = fechaNacimientoUTC.getDate();

    // Restar un año si aún no se ha cumplido el cumpleaños en el año actual
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }

    return edad;
}

export default AgeCalculator
