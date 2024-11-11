import { query } from '../config/db.js';
import { queries } from '../models/index.js';
import { logger } from './logger.js';

export async function storeAccessTokenInDatabase(user, accessToken, expiresIn) {
  const { userId } = user;
  try {
    await query('BEGIN');

    const { rowCount } = await query(queries.tokens.getAccessTokenByUserId(userId));

    if (rowCount > 0) {
      await query(queries.tokens.deleteAccessTokenByUserId(userId));
    }

    await query(queries.tokens.addAccessTokenToDatabase(userId, accessToken, expiresIn));

    await query('COMMIT');
  } catch (error) {
    await query('ROLLBACK');
    logger.error('Error storing access token in database:', error);
    throw error;
  }
}


export const deleteAccessTokenFromDatabase = async (userId) => {
  try {
    await query(queries.tokens.deleteAccessTokenByUserId(userId));

    logger.info(`Access token deleted for user ID: ${userId}`);
  } catch (error) {
    logger.error('Error deleting access token from database:', error);
    throw new Error('Could not delete access token');
  }
};
