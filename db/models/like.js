'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'userId' });
    Like.belongsTo(models.Answer, { foreignKey: 'answerId' });
    Like.belongsTo(models.Comment, { foreignKey: 'commentId' });
    Like.belongsTo(models.Question, { foreignKey: 'questionId' });
  };
  return Like;
};
