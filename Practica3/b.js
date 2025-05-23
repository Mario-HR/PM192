function verificarUsuario(usuario) {
    //Retorna una promesa aquí
    return new Promise((resolve,reject) => {
        if (usuario=="admin"){
            resolve("Acceso concedido");
        }else{
            reject("Acceso denegado");
        }
    });
}

// Usa .then() y catch() para mejorar el resultado
verificarUsuario("admin")
    .then(res => console.log(res))
    .catch(err => console.log(err));

verificarUsuario("Ivan")
    .then(res => console.log(res))
    .catch(err => console.log(err));
