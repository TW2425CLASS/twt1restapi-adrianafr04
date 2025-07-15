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
