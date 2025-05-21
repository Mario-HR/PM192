const productos = [
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250 },
    { nombre: "Teclado", precio: 750 },
    { nombre: "Monitor", precio: 3000 }
];

// Tu código aquí
const productosMayorA1000 = productos.filter(p => p.nombre && p.precio > 1000);
const nombres = productosMayorA1000.map(p => p.nombre);

console.log(nombres); // ["Laptop", "Monitor"]