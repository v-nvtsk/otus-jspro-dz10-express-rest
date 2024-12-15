export const tokens = {
  addAccessTokenToDatabase: (userId, AccessToken, expiresIn) => ({
    text: 'INSERT INTO user_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *',
    values: [userId, AccessToken, expiresIn],
  }),

  getAccessTokenByUserId: (userId) => ({
    text: 'SELECT 1 FROM user_tokens WHERE user_id = $1',
    values: [userId],
  }),

  deleteAccessTokenByUserId: (userId) => ({
    text: 'DELETE FROM user_tokens WHERE user_id = $1',
    values: [userId],
  }),

  deleteAccessTokenByToken: (token) => ({
    text: 'DELETE FROM user_tokens WHERE token = $1',
    values: [token],
  }),

  getAccessTokenByToken: (token) => ({
    text: 'SELECT * FROM user_tokens WHERE token = $1',
    values: [token],
  }),

  getAccessTokenByUserIdAndToken: (userId, token) => ({
    text: 'SELECT * FROM user_tokens WHERE user_id = $1 AND token = $2',
    values: [userId, token],
  }),

  removeObsoleteTokens: () => ({
    text: 'DELETE FROM user_tokens WHERE expires_at < NOW()',
  }),
}