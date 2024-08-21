const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  },

  async getSingleUser(req, res) {
    const user = await User.findOne({ _id: req.params.userId })
    res.json(user);
  },

  async createUser(req, res) {
    const user = await User.create(req.body);
    res.json(user);
  },


  async deleteUser(req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    await User.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User Deleted!' })
  },

  async updateUser(req, res) {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { new: true }
    );
    res.json({ message: 'User Updated', user })
  },

  async addFriend(req, res) {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    res.json({ message: 'Added Friend', user })
  },

  async deleteFriend(req, res) {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    res.json({ message: 'Deleted Friend' })
  },
};