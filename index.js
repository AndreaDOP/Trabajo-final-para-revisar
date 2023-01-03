const express = require('express');
const app = express();
// Base de datos
const mysql = require('mysql2');
// Motor de plantillas
const hbs = require('hbs');
// Para encontrar archivos
const path = require('path');
// Para enviar correos
const nodemailer = require('nodemailer');
// Variables de entorno
require('dotenv').config();

// configuracion puerto
const PORT = process.env.PORT || 9000;
//console.log(PORT);

// Midelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Confirguracion motor plantilla hbs
app.set('view engine', 'hbs');
//configuracion ubicacion de las plantillas
app.set('views', path.join(__dirname, 'views'));
//configuracion parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//conexion a la base de datos
const conexion = mysql.createConnection({
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,
port: process.env.DBPORT
});

conexion.connect((err) => {
    if (err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`);
});


// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenidos')
})

// Servidor a la escucha de peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el puerto: ${PORT}`);
})

