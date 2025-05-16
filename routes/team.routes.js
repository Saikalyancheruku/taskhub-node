const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const authenticateJWT = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     description: This API creates a new team.
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticateJWT,teamController.createTeam);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: This API retrieves a list of all teams.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of all teams
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
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authenticateJWT,teamController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     description: This API retrieves a team by its ID.
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the team to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The team found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id',authenticateJWT, teamController.getTeamById);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team
 *     description: This API updates a team's information.
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the team to update
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authenticateJWT,teamController.updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     description: This API deletes a team by its ID.
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the team to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticateJWT,teamController.deleteTeam);

/**
 * @swagger
 * /teams/assign:
 *   post:
 *     summary: Assign a user to a team
 *     description: This API assigns a user to a team.
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               teamId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User assigned to team successfully
 *       404:
 *         description: User or Team not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/assign', authenticateJWT,teamController.assignUserToTeam);
/**
 * @swagger
 * /teams/{teamId}/users:
 *   get:
 *     summary: Get users by team ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: ID of the team
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users in the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teamId:
 *                   type: integer
 *                   example: 1
 *                 teamName:
 *                   type: string
 *                   example: Dev Team
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       name:
 *                         type: string
 *                         example: Sai
 *                       email:
 *                         type: string
 *                         example: sai@example.com
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.get('/:teamId/users',authenticateJWT, teamController.getUsersByTeam);


module.exports = router;
