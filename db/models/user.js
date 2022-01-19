'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, { foreignKey: 'userId' });
    User.hasMany(models.Answer, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.hasMany(models.Like, { foreignKey: 'userId' });
  };
  return User;
};
