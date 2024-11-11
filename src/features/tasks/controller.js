/* eslint-disable camelcase */
import { query } from "../../config/db.js";
import { queries } from "../../models/index.js";
import { logger } from "../../utils/logger.js";

export const controller = {
  getAllTasks: async (req, res) => {
    try {
      const result = await query(queries.tasks.getAllTasks());
      res.status(200).json(result.rows);
    } catch (error) {
      logger.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Ошибка сервера при получении задач" });
    }
  },

  getTaskById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query(queries.tasks.getTaskById(id));
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      logger.error("Error fetching task by ID:", error);
      res.status(500).json({ message: "Ошибка сервера при получении задачи" });
    }
  },

  createTask: async (req, res) => {
    const { title, description, input_examples, output_examples, difficulty, tags, additional_materials } = req.body;
    try {
      const result = await query(queries.tasks.createTask(
        title, description, input_examples, output_examples,
        difficulty, tags, additional_materials));
      res.status(201).json(result.rows[0]);
    } catch (error) {
      logger.error("Error creating task:", error);
      res.status(500).json({ message: "Ошибка сервера при создании задачи" });
    }
  },

  /**
   * Обновить задачу по ID
   */
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, input_examples, output_examples, difficulty, tags, additional_materials } = req.body;
    try {
      const result = await query(
        queries.tasks.updateTask(title, description, input_examples,
          output_examples, difficulty, tags, additional_materials, id));
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      logger.error("Error updating task:", error);
      res.status(500).json({ message: "Ошибка сервера при обновлении задачи" });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query(queries.tasks.deleteTask(id));
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Задача не найдена" });
      }
      res.status(200).json({ message: "Задача успешно удалена" });
    } catch (error) {
      logger.error("Error deleting task:", error);
      res.status(500).json({ message: "Ошибка сервера при удалении задачи" });
    }
  }
};
