const Curso = require('../models/curso');

exports.getAllCursos = async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
};

exports.createCurso = async (req, res) => {
  const novoCurso = new Curso(req.body);
  await novoCurso.save();
  res.status(201).json(novoCurso);
};

exports.updateCurso = async (req, res) => {
  const cursoAtualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cursoAtualizado);
};

exports.deleteCurso = async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
