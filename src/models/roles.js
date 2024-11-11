export const roles = {
  getAll: () => ({ text: 'SELECT * FROM roles' }),
  getRoleByName: (name) => ({
    text: 'SELECT * FROM roles WHERE name = $1', values: [name]
  }),
  getRoleById: (id) => ({
    text: 'SELECT  FROM roles WHERE id = $1', values: [id]
  }),
  getRoleNameByUserId: (userId) => ({
    text: `
      SELECT r.name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1`,
    values: [userId]
  }),

};