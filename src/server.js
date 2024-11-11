import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { docsRouter } from './docs/index.js';
import { logger } from './utils/logger.js';
import { initDB } from './config/db.js';
import { apiRouter } from './features/api-router.js';


const port = process.env.PORT || 3300;

export const initApp = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser("", {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  }));

  initDB();

  app.use('/docs', docsRouter);
  app.use('/api', apiRouter)

  app.use('*', (req, res) => {
    logger.error(`Route "${req.url}" not found`);
    res.status(404).send('Not found');
  })


  app.listen(port, () => {
    logger.info(`Server is listening on port ${port}...`);
  });
}