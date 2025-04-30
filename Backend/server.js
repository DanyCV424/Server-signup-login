const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const usuariosRoutes = require('./routes/usuarios');
const sqlite3 = require('sqlite3').verbose();
//------------------------------------
app.use(express.json());
app.use('/usuarios', usuariosRoutes);

const PORT = 5173;


const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a SQLite.');
    }
});
//------------------------------------
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    contraseña TEXT NOT NULL
)`);


app.use(express.json());
//---------------------------------------------------
app.post('/registro', async (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).send('Por favor, envía nombre y contraseña.');
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        db.run(`INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)`, [usuario, hashedPassword], function(err) {
            if (err) {
                return res.status(500).send('Error al registrar el usuario.');
            }
            res.send(`Usuario registrado con ID: ${this.lastID}`);
        });
    } catch (err) {
        res.status(500).send('Error al encriptar la contraseña.');
    }
});
//---------------------------------------------------
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).send('Por favor, envía nombre y contraseña.');
    }

    db.get(`SELECT * FROM usuarios WHERE nombre = ?`, [usuario], async (err, row) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        if (!row) return res.status(404).send('Usuario no encontrado.');

        const match = await bcrypt.compare(contraseña, row.contraseña);
        if (!match) return res.status(401).send('Contraseña incorrecta.');

        res.send('Inicio de sesión exitoso.');
    });
});
//---------------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${5173}}`);
});