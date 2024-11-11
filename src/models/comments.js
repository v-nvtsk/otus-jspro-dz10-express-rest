export const comments = {
  findByTaskId: (taskId) => ({
    text: `SELECT * FROM comments WHERE task_id = $1`,
    values: [taskId]
  }),

  createComment: (taskId, userId, content) => ({
    text: `INSERT INTO comments (task_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
    values: [taskId, userId, content]
  }),

  delete: (id) => ({
    text: `DELETE FROM comments WHERE id = $1 RETURNING *`,
    values: [id]
  }),

  update: (id, content) => ({
    text: `UPDATE comments SET content = $1 WHERE id = $2 RETURNING *`,
    values: [content, id]
  })
}