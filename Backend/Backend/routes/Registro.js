const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión a SQLite desde Registro.js');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    contraseña TEXT NOT NULL
)`);

router.post('/registro', async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).send('Por favor, envía email y contraseña.');
    }

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        db.run(`INSERT INTO usuarios (email, contraseña) VALUES (?, ?)`, [email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).send('Error al registrar el usuario.');
            }
            res.send(`Usuario registrado con ID: ${this.lastID}`);
        });
    } catch (err) {
        res.status(500).send('Error al encriptar la contraseña.');
    }
});

router.post('/login', (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).send('Por favor, envía email y contraseña.');
    }

    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, row) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        if (!row) return res.status(404).send('Usuario no encontrado.');

        const match = await bcrypt.compare(contraseña, row.contraseña);
        if (!match) return res.status(401).send('Contraseña incorrecta.');

        res.send('Inicio de sesión exitoso.');
    });
});

module.exports = router;