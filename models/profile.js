'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'userId' });

      Profile.hasMany(models.Epic, {
        foreignKey: 'profileId',
      });

      Profile.hasMany(models.Opinion, {
        as: 'opinionsGiven',
        foreignKey: 'opinionId',
      });

      Profile.hasMany(models.Opinion, {
        as: 'opinionsReceived',
        foreignKey: 'profileId',
      });
    }
  }

  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  })
  return Profile
}
