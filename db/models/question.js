'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    name: DataTypes.STRING,
    postTypeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(model.PostType, { foreignKey: 'postTypeId' });
    Question.belongsTo(model.User, { foreignKey: 'userId' });
    Question.hasMany(model.Answer, { foreignKey: 'questionId' });
    Question.hasMany(model.Like, { foreignKey: 'questionId' });
  };
  return Question;
};