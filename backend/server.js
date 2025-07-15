require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

app.use(cors()); // permite todos os domínios (ajuda no desenvolvimento)
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.send('API TWT1 está ativa 🎓');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express ativo em http://localhost:${PORT}`);
});
