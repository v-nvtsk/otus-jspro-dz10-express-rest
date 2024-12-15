import pg from 'pg'
import { config as initConfig } from 'dotenv'
import { logger } from '../utils/logger.js';
import { hashPassword } from '../utils/password.js';
import { queries } from '../models/index.js';

initConfig();

const { Client } = pg
const client = new Client()

export const query = (text, params) => client.query(text, params);

async function addInitialAdmin() {
  try {
    const superuser = await query(queries.users.getUserByName('superuser'));
    if (superuser.rows.length > 0) {
      return;
    }

    const username = 'superuser';
    const password = 'superuser';
    const hashedPassword = await hashPassword(password);

    await query(queries.database.addSuperuser(username, hashedPassword));

    logger.info("Пользователь 'superuser' создан успешно.");
  } catch (error) {
    logger.error("Ошибка при добавлении пользователя 'superuser':", error);
  }
}

export const initDB = async () => {

  try {
    client.connect();
    logger.info('Database connected successfully');

    await query('BEGIN');
    await query(queries.database.init());

    addInitialAdmin()

    await query('COMMIT');
    logger.info('Database tables initialized successfully');

  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  }
};
