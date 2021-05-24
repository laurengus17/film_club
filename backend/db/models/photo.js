'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    description: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
    Photo.belongsTo(models.Album, { foreignKey: 'albumId' });
    Photo.hasMany(models.Comment, { foreignKey: 'imageId' });
  };
  return Photo;
};