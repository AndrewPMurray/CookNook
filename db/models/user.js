'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    User.hasMany(model.Question, { foreignKey: 'userId' });
    User.hasMany(model.Answer, { foreignKey: 'userId' });
    User.hasMany(model.Comment, { foreignKey: 'userId' });
    User.hasMany(model.Like, { foreignKey: 'userId' });
  };
  return User;
};