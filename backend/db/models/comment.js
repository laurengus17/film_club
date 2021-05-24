'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Photo, { foreignKey: 'imageId' });
  };
  return Comment;
};