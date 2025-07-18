const API_URL = 'https://twt1restapi-adrianafr04.onrender.com/api/alunos';
const CURSO_API_URL = 'https://twt1restapi-adrianafr04.onrender.com/api/cursos'; 
const alunoForm = document.getElementById('alunoForm');
const alunosTable = document.getElementById('alunosTable');
const searchInput = document.getElementById('searchInput'); 

// Função para exibir mensagens de erro
function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  document.body.prepend(errorElement);
  setTimeout(() => errorElement.remove(), 3000);
}

// Busca alunos com tratamento de erro
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

// Renderiza a tabela de alunos
function renderAlunos(alunos) {
  alunosTable.innerHTML = '';
  alunos.forEach(aluno => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td class="actions">
        <button class="btn-edit" onclick='editAluno(${JSON.stringify(aluno)})'>✏️</button>
        <button class="btn-delete" onclick="deleteAluno('${aluno.id}')">🗑️</button>
      </td>
    `;
    alunosTable.appendChild(row);
  });
}

// Adiciona ou atualiza aluno
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
    document.getElementById('id').value = ''; // ← CORREÇÃO: limpa o ID oculto
    fetchAlunos();
  } catch (error) {
    showError(error.message);
  }
}

async function createAluno(aluno) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });
  if (!res.ok) throw new Error('Falha ao criar aluno');
}

async function updateAluno(id, aluno) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });
  if (!res.ok) throw new Error('Falha ao atualizar aluno');
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
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao remover aluno');
      fetchAlunos();
    } catch (error) {
      showError(error.message);
    }
  }
}

// Busca cursos (nova funcionalidade)
async function buscarCurso() {
  const cursoId = document.getElementById('curso-id').value;
  if (!cursoId) {
    showError('Por favor insira o número do curso.');
    return;
  }

  try {
    const res = await fetch(`${CURSO_API_URL}/${cursoId}`);
    if (!res.ok) throw new Error('Curso não encontrado');
    const curso = await res.json();
    mostrarCursoNaTabela(curso);
  } catch (error) {
    showError(error.message);
    document.getElementById('curso-detalhes').innerHTML = `
      <tr><td colspan="2">Nenhum curso encontrado</td></tr>
    `;
  }
}

function mostrarCursoNaTabela(curso) {
  const tbody = document.getElementById('curso-detalhes');
  tbody.innerHTML = `
    <tr>
      <td>${curso.nome}</td>
      <td>${curso.descricao || 'Sem descrição'}</td>
      <td>${curso.duracao}</td>
    </tr>
  `;
}

// Filtro de busca (nova funcionalidade)
function setupSearch() {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = alunosTable.querySelectorAll('tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

// Inicialização
alunoForm.addEventListener('submit', addOrUpdateAluno);
document.addEventListener('DOMContentLoaded', () => {
  fetchAlunos();
  setupSearch();
});
