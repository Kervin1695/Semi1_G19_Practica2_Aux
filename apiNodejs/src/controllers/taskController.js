import { Tarea } from "../models/tarea.js";

class TaskController {
  async getTasks(req, res) {
    const userId = req.params.userId;
    try {
      const tasks = await Tarea.findAll({ where: { id_usuario: userId } });
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Failed to fetch tasks." });
    }
  }

  async createTask(req, res) {
    const newTask = req.body;
    try {
      const task = await Tarea.create({
        id_usuario: newTask.id_usuario,
        titulo: newTask.nombre,
        descripcion: newTask.descripcion,
        fecha_creacion: newTask.fecha,
      });
      return res.status(201).json({ message: "Task created successfully.", task });
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({ message: "Failed to create task." });
    }
  }

  async editTask(req, res) {
    const taskId = req.params.task_id;
    const taskData = req.body;
    try {
      await Tarea.update({ titulo: taskData.nombre, descripcion: taskData.descripcion }, { where: { id: taskId } });
      return res.status(200).json({ message: `Task ${taskId} updated successfully.` });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Failed to update task." });
    }
  }

  async completeTask(req, res) {
    const taskId = req.params.task_id;
    try {
      await Tarea.update({ estado: "Terminada" }, { where: { id: taskId } });
      return res.status(200).json({ message: `Task ${taskId} marked as complete.` });
    } catch (error) {
      console.error("Error completing task:", error);
      return res.status(500).json({ message: "Failed to complete task." });
    }
  }

  async deleteTask(req, res) {
    const taskId = req.params.task_id;
    try {
      await Tarea.destroy({ where: { id: taskId } });
      return res.status(200).json({ message: `Task ${taskId} deleted successfully.` });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ message: "Failed to delete task." });
    }
  }
}

export default new TaskController();
