'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostType = sequelize.define('PostType', {
    name: DataTypes.STRING
  }, {});
  PostType.associate = function(models) {
    PostType.hasMany(models.Question, { foreignKey: 'postTypeId' });
  };
  return PostType;
};
