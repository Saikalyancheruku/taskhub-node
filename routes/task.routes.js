// routes/task.routes.js
const express = require('express');
const taskController = require('../controllers/task.controller');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth.middleware');
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: "Complete the report"
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *                 example: "Prepare a monthly sales report"
 *               priority:
 *                 type: string
 *                 description: Priority level of the task
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 enum: [to_do, in_progress, done]
 *                 example: "to_do"
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: Deadline of the task
 *                 example: "2025-05-15"
 *               assigned_to:
 *                 type: integer
 *                 description: User ID of the person assigned the task
 *                 example: 2
 *               created_by:
 *                 type: integer
 *                 description: User ID of the task creator
 *                 example: 1
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task
 *                 example: "2025-05-20"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Task created successfully'
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Complete the report"
 *                     description:
 *                       type: string
 *                       example: "Prepare a monthly sales report"
 *                     due_date:
 *                       type: string
 *                       format: date
 *                       example: "2025-05-20"
 *                     assigned_to:
 *                       type: integer
 *                       example: 2
 *                     created_by:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad Request, missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/',authenticateJWT, taskController.createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update task status
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [to_do, in_progress, done]
 *                 example: "in_progress"
 *     responses:
 *       200:
 *         description: Task status updated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:taskId',authenticateJWT, taskController.updateTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Complete the report"
 *                 description:
 *                   type: string
 *                   example: "Prepare a monthly sales report"
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/',authenticateJWT, taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Complete the report"
 *                 description:
 *                   type: string
 *                   example: "Prepare a monthly sales report"
 *                 assigned_to:
 *                   type: integer
 *                   example: 2
 *                 created_by:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Task not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error fetching task'
 */
router.get('/:taskId',authenticateJWT, taskController.getTaskById);



/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:taskId',authenticateJWT, taskController.deleteTask);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Complete the report"
 */
router.get('/',authenticateJWT, taskController.getAllTasks);
module.exports = router;
