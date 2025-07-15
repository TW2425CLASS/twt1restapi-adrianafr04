const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Endpoints para gerenciamento de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
router.get('/', cursoController.getAllCursos);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post('/', cursoController.createCurso);

module.exports = router;
