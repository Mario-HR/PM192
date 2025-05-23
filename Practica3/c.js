function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos() {
    // Usa await para esperar la promesa de simularPeticion
    const resultadoPeticion = await simularPeticionAPI();
    // Imprime el resultado
    console.log(resultadoPeticion);
}

// Usa la función async
obtenerDatos()