const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 35 },
    { nombre: "María", edad: 28 }
];

// Tu código aquí

const luis = personas.find(p => p.nombre == "Luis");
console.log(luis);

personas.forEach(p => console.log(`Nombre: ${p.nombre}\nEdad: ${p.edad}\n`));

const sumaEdades = personas.reduce((acum,p) => {
    return acum+p.edad
}, 0);
console.log(`Suma de las edades: ${sumaEdades}`);