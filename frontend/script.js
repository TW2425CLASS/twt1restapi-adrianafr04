const API_URL = 'https://twt1restapi-adrianafr04.onrender.com/api/alunos';
const alunoForm = document.getElementById('alunoForm');
const alunosTable = document.getElementById('alunosTable');

async function fetchAlunos() {
  const res = await fetch(API_URL);
  const alunos = await res.json();
  alunosTable.innerHTML = '';
  alunos.forEach(aluno => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td class="actions">
        <button onclick='editAluno(${JSON.stringify(aluno)})'>✏️</button>
        <button onclick='deleteAluno(${aluno.id})'>🗑️</button>
      </td>
    `;
    alunosTable.appendChild(row);
  });
}

async function addOrUpdateAluno(e) {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const aluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: Number(document.getElementById('anoCurricular').value),
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  }

  alunoForm.reset();
  fetchAlunos();
}

function editAluno(aluno) {
  document.getElementById('id').value = aluno.id;
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
}

async function deleteAluno(id) {
  if (confirm('Tem certeza que deseja remover este aluno?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchAlunos();
  }
}

alunoForm.addEventListener('submit', addOrUpdateAluno);

fetchAlunos();
