const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API TWT1 - Gestão de Alunos',
      version: '1.0.0',
      description: 'API RESTful para gerir alunos e cursos - TWT1',
    },
    servers: [
      {
        url: 'https://twt1restapi-adrianafr04.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js', './docs/schemas.js'],
};

module.exports = swaggerOptions;
