'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(model.User, { foreignKey: 'userId' });
    Comment.belongsTo(model.Answer, { foreignKey: 'answerId' });
    Comment.hasMany(model.Like, { foreignKey: 'commentId' });
  };
  return Comment;
};