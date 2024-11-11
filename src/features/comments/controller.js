import { logger } from '../../utils/logger.js';
import { query } from '../../config/db.js';
import { queries } from '../../models/index.js';

export const controller = {
  createComment: async (req, res) => {
    const { content, taskId, userId } = req.body;

    try {
      const result = await query(queries.comments.createComment(taskId, userId, content));
      res.status(201).json(result.rows[0]);
    } catch (error) {
      logger.error('Error creating comment:', error);
      res.status(500).json({ error: 'Error creating comment' });
    }
  },

  findByTaskId: async (req, res) => {
    const { taskId } = req.params;

    try {
      const result = await query(queries.comments.findByTaskId(taskId));

      return res.status(200).json(result.rows);
    } catch (error) {
      logger.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Error fetching comments.' });
    }
  },

  updateComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const result = await query(queries.comments.updateComment(id, content));
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      logger.error('Error updating comment:', error);
      res.status(500).json({ error: 'Error updating comment' });
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await query(queries.comments.deleteComment(id));
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Error deleting comment' });
    }
  },
};
