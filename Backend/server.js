const express = require('express');
const cors = require('cors');
const axios = require('axios');
const usuariosRoutes = require('./routes/Registro');

const app = express();
const PORT = 5501;

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
});