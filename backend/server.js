require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express a correr em http://localhost:${PORT}`);
});
