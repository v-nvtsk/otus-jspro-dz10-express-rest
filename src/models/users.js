export const users = {

  getUserById: (userId) => ({
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId],
  }),

  getUserByName: (username) => ({
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  }),

  createUser: (username, password, roleId) => ({
    text: 'INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3)',
    values: [username, password, roleId],
  }),

  deleteUser: (userId) => ({
    text: "UPDATE users SET state = 'deleted'  WHERE id = $1",
    values: [userId],
  }),

  changeRole: (userId, roleId) => ({
    text: 'UPDATE users SET role_id = $2 WHERE id = $1',
    values: [userId, roleId],
  }),

  changePassword: (userId, hashedPassword) => ({
    text: 'UPDATE users SET password = $2 WHERE id = $1',
    values: [userId, hashedPassword],
  }),

}
