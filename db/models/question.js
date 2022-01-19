'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    name: DataTypes.STRING,
    postTypeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.PostType, { foreignKey: 'postTypeId' });
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    Question.hasMany(models.Like, { foreignKey: 'questionId' });
  };
  return Question;
};
