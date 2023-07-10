
const Section1 = () => {

    const car = <box-icon name='car' size="2.5em"></box-icon>
    const seguro = <box-icon name='user-check' size="2.5em"></box-icon>
    const stopWatch = <box-icon name='stopwatch' size="2.5em"></box-icon>

    return (
        <section className="section1">
            <div className="tags">
                <span>{car}</span>
                <h6>Encuenta los mejores viajes</h6>
                <p>
                    Nuestra comunidad de usuarios está en todas partes.
                    Vayas donde vayas, encuentra el viaje perfecto con salida y
                    llegada en los puntos más cercanos
                </p>
            </div>
            <div className="tags">
                <span>{seguro}</span>
                <h6>Viaja seguro y tranquilo</h6>
                <p>
                    Para nosotros es muy importante conocer a nuestros usuarios.
                    Por eso, examinamos atentamente las opiniones y los perfiles de nuestros usuarios
                    para que sepas con quién vas a viajar. Puedes reservar tu próximo viaje con
                    total seguridad y tranquilidad.
                </p>
            </div>
            <div className="tags">
                <span>{stopWatch}</span>
                <h6>¡Busca, elige y a viajar!</h6>
                <p>
                    ¡Reservar un viaje es más fácil que nunca! Gracias a nuestra sencilla aplicación y
                    a su potente tecnología, podrás reservar un viaje cerca de ti en minutos.
                </p>
            </div>
        </section>
    )
}

export default Section1