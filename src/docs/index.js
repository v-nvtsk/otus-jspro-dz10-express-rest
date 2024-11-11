import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from "express";

export const docsRouter = new Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contest App API',
      version: '1.0.0',
      description: 'API documentation with cookie-based authentication',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],

  },
  apis: ['./src/features/**/*.js'],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);




docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))