const API_URL = 'https://twt1restapi-adrianafr04.onrender.com/api/alunos';
const alunoForm = document.getElementById('alunoForm');
const alunosTable = document.getElementById('alunosTable');
const searchInput = document.getElementById('searchInput');

// Cria o botão "Novo Aluno" dentro do form
function createNovoAlunoButton() {
  const btnNovo = document.createElement('button');
  btnNovo.type = 'button'; // para não submeter o form
  btnNovo.textContent = 'Novo Aluno';
  btnNovo.className = 'btn-novo'; // para estilizar se quiser
  btnNovo.style.marginLeft = '10px';
  btnNovo.addEventListener('click', () => {
    alunoForm.reset();
    document.getElementById('id').value = ''; // limpa o id oculto para não ficar editando
  });
  alunoForm.appendChild(btnNovo);
}

// Mostrar erro simples na tela
function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  document.body.prepend(errorElement);
  setTimeout(() => errorElement.remove(), 3000);
}

// Buscar alunos da API
async function fetchAlunos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Falha ao carregar alunos');
    const alunos = await res.json();
    renderAlunos(alunos);
  } catch (error) {
    showError(error.message);
  }
}

// Renderiza tabela de alunos
function renderAlunos(alunos) {
  const tbody = alunosTable.querySelector('tbody');
  tbody.innerHTML = '';
  alunos.forEach(aluno => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td class="actions">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </td>
    `;
    // Ações dos botões
    row.querySelector('.btn-edit').addEventListener('click', () => editAluno(aluno));
    row.querySelector('.btn-delete').addEventListener('click', () => deleteAluno(aluno._id));
    tbody.appendChild(row);
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

  try {
    if (id) {
      await updateAluno(id, aluno);
    } else {
      await createAluno(aluno);
    }
    alunoForm.reset();
    document.getElementById('id').value = ''; // limpa o id para novo cadastro
    fetchAlunos();
  } catch (error) {
    showError(error.message);
  }
}

async function createAluno(aluno) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) throw new Error('Falha ao criar aluno');
}

async function updateAluno(id, aluno) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) throw new Error('Falha ao atualizar aluno');
}

function editAluno(aluno) {
  document.getElementById('id').value = aluno._id || aluno.id;
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
}

async function deleteAluno(id) {
  if (confirm('Tem certeza que deseja remover este aluno?')) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao remover aluno');
      fetchAlunos();
    } catch (error) {
      showError(error.message);
    }
  }
}

function setupSearch() {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = alunosTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  createNovoAlunoButton();
  fetchAlunos();
  setupSearch();
});

alunoForm.addEventListener('submit', addOrUpdateAluno);
