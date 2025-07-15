/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f7c9a1a2b4a12d88cfa123
 *         nome:
 *           type: string
 *           example: João da Silva
 *         idade:
 *           type: integer
 *           example: 21
 *         curso:
 *           type: string
 *           example: Engenharia de Software
 *     AlunoInput:
 *       type: object
 *       required:
 *         - nome
 *         - idade
 *         - curso
 *       properties:
 *         nome:
 *           type: string
 *           example: Maria Oliveira
 *         idade:
 *           type: integer
 *           example: 22
 *         curso:
 *           type: string
 *           example: Ciência da Computação
 *     Curso:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64af4d82f58b2a123d21ec01
 *         nome:
 *           type: string
 *           example: Sistemas de Informação
 *         duracao:
 *           type: string
 *           example: 4 anos
 *     CursoInput:
 *       type: object
 *       required:
 *         - nome
 *         - duracao
 *       properties:
 *         nome:
 *           type: string
 *         duracao:
 *           type: string
 */
