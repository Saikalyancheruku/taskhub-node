const { Team, User,UserTeam } = require('../models');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, description,managerId } = req.body;
    const team = await Team.create({ name, description,managerId });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await await Team.findAll({
  include: [
    {
      model: User,
      as: 'manager',
      attributes: ['id', 'username'], // or 'name' if that's your field
    }
  ]
});
const response = teams.map(team => ({
  id: team.id,
  name: team.name,
  managerId: team.managerId,
  managerName: team.manager?.username || null
}));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const { name, description } = req.body;
    team.name = name || team.name;
    team.description = description || team.description;
    await team.save();
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    await team.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.assignUserToTeam = async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    const user = await User.findByPk(userId);
    const team = await Team.findByPk(teamId);

    if (!user || !team) {
      return res.status(404).json({ message: 'User or Team not found' });
    }

    // Check if the user is already assigned
    const existing = await UserTeam.findOne({
      where: { user_id: userId, team_id: teamId }
    });

    if (existing) {
      return res.status(409).json({ message: 'User is already assigned to this team' });
    }

    // Create the relation
    await UserTeam.create({
      user_id: userId,
      team_id: teamId
    });

    res.status(200).json({ message: 'User assigned to team successfully' });

  } catch (err) {
    console.error('Error in assignUserToTeam:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUsersByTeam= async (req, res) => {
  try {
    const { teamId } = req.params;

    // Step 1: Find all UserTeam entries for the given teamId
    const userTeamMappings = await UserTeam.findAll({
      where: { team_id: teamId },
      attributes: ['user_id']
    });

    if (userTeamMappings.length === 0) {
      return res.status(404).json({ message: 'No users found for this team' });
    }

    // Step 2: Extract user IDs
    const userIds = userTeamMappings.map(mapping => mapping.user_id);

    // Step 3: Find users by the IDs
    const users = await User.findAll({
      where: { id: userIds },
      attributes: { exclude: ['password'] } // optional: exclude sensitive info
    });

    res.status(200).json(users);
  } catch (err) {
    console.error('Error in getUsersByTeamId:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
