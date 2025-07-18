const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nome: String
});

module.exports = mongoose.model('Curso', CursoSchema);