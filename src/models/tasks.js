export const tasks = {
  getAllTasks: () => ({
    text: 'SELECT * FROM tasks',
  }),

  getTaskById: (taskId) => ({
    text: 'SELECT * FROM tasks WHERE id = $1',
    values: [taskId],
  }),

  createTask: (title, description, inputExamples, outputExamples, difficulty, tags, additionalMaterials) => ({
    text: `INSERT INTO tasks (title, description, input_examples, output_examples, difficulty, tags, additional_materials)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [title, description, inputExamples, outputExamples, difficulty, tags, additionalMaterials],
  }),

  updateTask: (title, description, inputExamples, outputExamples, difficulty, tags, additionalMaterials, id) => ({
    text: `UPDATE tasks
             SET title = $1, description = $2, input_examples = $3, output_examples = $4,
                 difficulty = $5, tags = $6, additional_materials = $7
             WHERE id = $8 RETURNING *`,
    values: [title, description, inputExamples, outputExamples, difficulty, tags, additionalMaterials, id],
  }),

  deleteTask: (taskId) => ({
    text: 'DELETE FROM tasks WHERE id = $1 RETURNING *',
    values: [taskId],
  }),
}
