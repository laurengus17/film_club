'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, { foreignKey: 'userId' });
    Album.hasMany(models.Photo, { foreignKey: 'albumId' });
  };
  return Album;
};