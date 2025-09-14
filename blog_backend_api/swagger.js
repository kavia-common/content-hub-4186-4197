const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Backend API',
      version: '1.0.0',
      description: 'Express.js API for authentication, posts, comments, likes, categories, tags, uploads and SEO feeds.',
    },
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Auth', description: 'Authentication' },
      { name: 'Posts', description: 'Post management' },
      { name: 'Comments', description: 'Comments endpoints' },
      { name: 'Categories', description: 'Categories management' },
      { name: 'Tags', description: 'Tags management' },
      { name: 'Likes', description: 'Likes endpoints' },
      { name: 'Uploads', description: 'Image uploads' },
      { name: 'SEO', description: 'Sitemap & RSS' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
