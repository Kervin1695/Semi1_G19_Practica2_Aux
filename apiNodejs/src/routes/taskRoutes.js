import { Router } from 'express';
import TaskController from '../controllers/taskController.js';

const router = Router();

// Get tasks for a specific user
router.get('/:userId', TaskController.getTasks);

// Create a new task
router.post('/create', TaskController.createTask);

// Edit an existing task
router.put('/edit/:task_id', TaskController.editTask);

// Mark a task as complete
router.put('/:task_id/complete', TaskController.completeTask);

// Delete a task
router.delete('/delete/:task_id', TaskController.deleteTask);

export default router;