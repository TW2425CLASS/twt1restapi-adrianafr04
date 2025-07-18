const Aluno = require('../models/aluno');

exports.getAllAlunos = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.createAluno = async (req, res) => {
  try {
    const { _id, ...dadosAluno } = req.body;

    const novoAluno = new Aluno(dadosAluno);
    await novoAluno.save();
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar aluno', details: error.message });
  }
};


exports.updateAluno = async (req, res) => {
  const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(alunoAtualizado);
};

exports.deleteAluno = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
