const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment for a task
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - userId
 *               - comment
 *             properties:
 *               taskId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 3
 *               comment:
 *                 type: string
 *                 example: "This task needs to be done before Friday."
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       404:
 *         description: Task or user not found
 *       500:
 *         description: Server error
 */
router.post('/',authenticateJWT, commentController.createComment);

// Get all comments for a task
/**
 * @swagger
 * /comments/task/{taskId}:
 *   get:
 *     summary: Get all comments for a task
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Server error
 */
router.get('/task/:taskId',authenticateJWT, commentController.getCommentsByTask);

module.exports = router;
