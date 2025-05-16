const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateJWT = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: This API creates a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal Server Error
 * 
 */
router.post('/', authenticateJWT, userController.createUser); // JWT Auth added here

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: This API retrieves a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authenticateJWT, userController.getAllUsers); // JWT Auth added here

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: This API retrieves a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The user found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 *       security:
 *       - bearerAuth: []  # JWT Authentication required
 */
router.get('/:id', authenticateJWT, userController.getUserById); // JWT Auth added here

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: This API updates a user's information.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authenticateJWT, userController.updateUser); // JWT Auth added here

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: This API deletes a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticateJWT, userController.deleteUser); // JWT Auth added here

module.exports = router;
