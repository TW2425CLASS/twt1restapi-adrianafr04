const Aluno = require('../models/aluno');

exports.getAllAlunos = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.createAluno = async (req, res) => {
  const novoAluno = new Aluno(req.body);
  await novoAluno.save();
  res.status(201).json(novoAluno);
};

exports.updateAluno = async (req, res) => {
  const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(alunoAtualizado);
};

exports.deleteAluno = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
