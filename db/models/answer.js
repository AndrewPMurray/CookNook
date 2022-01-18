'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(model.User, { foreignKey: 'userId' });
    Answer.belongsTo(model.Question, { foreignKey: 'questionId' });
    Answer.hasMany(model.Comment, { foreignKey: 'answerId' });
    Answer.hasMany(model.Like, { foreignKey: 'answerId' });
  };
  return Answer;
};