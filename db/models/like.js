'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(model.User, { foreignKey: 'userId' });
    Like.belongsTo(model.Answer, { foreignKey: 'answerId' });
    Like.belongsTo(model.Comment, { foreignKey: 'commentId' });
    Like.belongsTo(model.Question, { foreignKey: 'questionId' });
  };
  return Like;
};