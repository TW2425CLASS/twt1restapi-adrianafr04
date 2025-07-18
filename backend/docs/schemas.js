/**
 * @swagger
 * tags:
 *   - name: Alunos
 *     description: Gestão de alunos
 *   - name: Cursos
 *     description: Gestão de cursos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 60f7c9a1a2b4a12d88cfa123
 *         nome:
 *           type: string
 *           example: João da Silva
 *         apelido:
 *           type: string
 *           example: João
 *         anoCurricular:
 *           type: integer
 *           example: 2
 *         curso:
 *           $ref: '#/components/schemas/Curso'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-15T10:00:00Z
 *
 *     AlunoInput:
 *       type: object
 *       required:
 *         - nome
 *         - apelido
 *         - anoCurricular
 *         - cursoId
 *       properties:
 *         nome:
 *           type: string
 *           example: Maria Oliveira
 *         apelido:
 *           type: string
 *           example: Maria
 *         anoCurricular:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 3
 *         cursoId:
 *           type: integer
 *           example: 1
 *
 *     Curso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Engenharia de Software
 *         descricao:
 *           type: string
 *           example: Curso focado em desenvolvimento de software
 *         duracao:
 *           type: string
 *           example: 4 anos
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-10T09:30:00Z
 *
 *     CursoInput:
 *       type: object
 *       required:
 *         - nome
 *         - duracao
 *       properties:
 *         nome:
 *           type: string
 *           example: Ciência de Dados
 *         descricao:
 *           type: string
 *           example: Análise e interpretação de dados
 *         duracao:
 *           type: string
 *           example: 3 anos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     tags: [Alunos]
 *     summary: Lista todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *
 *   post:
 *     tags: [Alunos]
 *     summary: Cria um novo aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoInput'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 */

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     tags: [Alunos]
 *     summary: Obtém um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do aluno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 *
 *   put:
 *     tags: [Alunos]
 *     summary: Atualiza um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoInput'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *
 *   delete:
 *     tags: [Alunos]
 *     summary: Remove um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Aluno removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     tags: [Cursos]
 *     summary: Lista todos os cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *
 *   post:
 *     tags: [Cursos]
 *     summary: Cria um novo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     tags: [Cursos]
 *     summary: Obtém um curso pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 *
 *   get:
 *     tags: [Cursos]
 *     summary: Lista alunos de um curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de alunos matriculados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */