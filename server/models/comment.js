const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {}
  Comment.init(
    {
      content: DataTypes.TEXT,
    },
    { sequelize, modelName: 'Comment' }
  );

  Comment.associate = (models) => {
    // Define associations here
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  };

  return Comment;
};
