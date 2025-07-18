const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Retorna um curso específico pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 duracao:
 *                   type: number
 *       404:
 *         description: Curso não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ mensagem: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

module.exports = router;
