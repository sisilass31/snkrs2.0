const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      pictures: DataTypes.STRING, // You can store picture URLs or file paths
    },
    { sequelize, modelName: 'Post' }
  );

  Post.associate = (models) => {
    // Define associations here
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
  };

  return Post;
};