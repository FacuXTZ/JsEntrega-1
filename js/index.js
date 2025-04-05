const jugadores = [
    { nombre: "Cristiano Ronaldo", edad: 40 },
    { nombre: "Lionel Messi", edad: 37 },
    { nombre: "Kylian Mbappé", edad: 26 },
    { nombre: "Neymar Jr", edad: 33 },
    { nombre: "Erling Haaland", edad: 24 },
];

function mostrarJugadores() {
    return jugadores
        .map((jugador, index) => `${index + 1}. ${jugador.nombre}`)
        .join("\n");
}

function adivinarEdad() {
    const jugadorSeleccionado = parseInt(
        prompt(`Selecciona un jugador:\n${mostrarJugadores()}`)
    ) - 1;

    if (jugadorSeleccionado >= 0 && jugadorSeleccionado < jugadores.length) {
        const jugador = jugadores[jugadorSeleccionado]; 
        const opciones = [
            jugador.edad, 
            jugador.edad - 1,
            jugador.edad + 2,
        ];
        opciones.sort(() => Math.random() - 0.5); 

        const respuestaUsuario = prompt(
            `¿Cuántos años tiene ${jugador.nombre}?\n` +
            `1. ${opciones[0]}\n` +
            `2. ${opciones[1]}\n` +
            `3. ${opciones[2]}`
        );

        const opcionElegida = parseInt(respuestaUsuario) - 1; 
        if (opciones[opcionElegida] === jugador.edad) {
            alert("¡Respuesta correcta!");
            console.log(`Adivinaste correctamente: ${jugador.nombre} tiene ${jugador.edad} años.`);
        } else {
            alert("Respuesta incorrecta.");
            console.log(`Incorrecto: ${jugador.nombre} tiene ${jugador.edad} años.`);
        }
    } else {
        alert("Selección inválida. Intenta de nuevo.");
    }
}

alert("Bienvenido al simulador de edades de jugadores de fútbol.");
adivinarEdad();
alert("Gracias por participar.");