import express from 'express';
import express from 'cors';
import express from 'axios';
import express from './routes/Registro';

const app = express();
const PORT = 5501;

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRoutes);

app.use(cors({
        origin: "http://localhost:5173", // el puerto donde corre tu frontend con Vite
        credentials: true
      }));