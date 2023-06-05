'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.Epic, { foreignKey: 'epicId' });
      Vote.belongsTo(models.Profile, { foreignKey: 'voterId' });
      Vote.belongsTo(models.Profile, { foreignKey: 'profileId' });
    }
  }

  Vote.init(
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5
        }
      },
      epicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Epic',
          key: 'id',
        }
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profile',
          key: 'id',
        }
      },
      voterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profile',
          key: 'id',
        }
      },
    },
    {
      sequelize,
      modelName: 'Vote',
    }
  );

  return Vote;
};
