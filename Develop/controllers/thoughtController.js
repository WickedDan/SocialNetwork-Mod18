const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    const thoughts = await Thought.find();
    res.json(thoughts);
  },

  async getSingleThought(req, res) {
    const thought = await Thought.findById(req.params.thoughtId).populate("reactions");
    res.json(thought);
  },

  async createThought(req, res) {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.json({ message: 'Thought created', thought });
  },


  async updateThought(req, res) {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      { runValidators: true, new: true }
    );
    res.json({ message: 'Thought updated', thought });
  },

  async deleteThought(req, res) {
    console.log(req.params.thoughtId);
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { new: true }
    );
    console.log(thought);
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    res.json({ message: 'Thought deleted' });

  },

  async addReaction(req, res) {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.json({ message: 'Reaction added', thought });
  },


  async deleteReaction(req, res) {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.json({ message: 'Reaction removed', thought });
  },
};