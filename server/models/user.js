const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: 'User' }
  );

  User.associate = (models) => {
    // Define associations here
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
  };

  return User;
};