const alunos = await Aluno.find();

const alunosComId = alunos.map(aluno => ({
  id: aluno._id.toString(),
  nome: aluno.nome,
  apelido: aluno.apelido,
  curso: aluno.curso,
  anoCurricular: aluno.anoCurricular
}));
res.json(alunosComId);
