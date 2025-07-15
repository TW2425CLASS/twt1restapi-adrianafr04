const express = require('express');
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gestão dos alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 * 
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 */

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo id
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 * 
 *   delete:
 *     summary: Remove um aluno pelo id
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       204:
 *         description: Aluno removido
 */

router.get('/', alunoController.getAllAlunos);
router.post('/', alunoController.createAluno);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - apelido
 *         - curso
 *         - anoCurricular
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         nome:
 *           type: string
 *         apelido:
 *           type: string
 *         curso:
 *           type: string
 *         anoCurricular:
 *           type: integer
 *       example:
 *         nome: "João"
 *         apelido: "Silva"
 *         curso: "Engenharia Informática"
 *         anoCurricular: 2
 */
