const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) =>{
    res.send(`
        <h1> Lista de usuarios </h1> 
        <ul>
            ${usuarios.map((usuario) => `<li> Id: ${usuario.id} | Nombre: ${usuario.nombre} </li>`).join('')}
        </ul>
        <form action="/usuarios" method="post">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required>
    `)
} )

app.post('/usuarios', (req, res) => {
    const usuarionuevo = {
        id: usuarios.length +1,
        nombre: req.body.nombre
    }
    usuarios.push(usuarionuevo)
    res.redirect('/')
})

app.get('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());

    if (usuario) {`
        <h1>Detalles del Usuario</h1>
            <p>Id: ${usuario.id}</p>
            <p>Nombre: ${usuario.nombre}</p>
            <p>Edad: ${usuario.edad}</p>
            <p>Lugar de Procedencia: ${usuario.lugarProcedencia}</p>
            <a href="/">Volver a la lista</a>
    `} else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.post('/usuarios:nombre')

app.listen(3000, () => {
    console.log("http://localhost:3000")
})