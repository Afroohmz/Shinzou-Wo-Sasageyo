const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Comment.belongsTo(User); // A comment belongs to a user
Comment.belongsTo(Post); // A comment belongs to a post

module.exports = Comment;
