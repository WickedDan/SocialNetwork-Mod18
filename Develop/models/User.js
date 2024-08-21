const mongoose = require('mongoose');
const {Schema, Types} = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }

    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
    ,
  },
);

userSchema
  .virtual('friendCount').get(function () {
    return this.friends.length;
  })

const User = mongoose.model('user', userSchema);

module.exports = User;
