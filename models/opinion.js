'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Opinion extends Model {
    static associate(models) {
      Opinion.belongsTo(models.Profile, { foreignKey: 'profileId' });
    }
  }

  Opinion.init(
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profile',
          key: 'id',
        },
      },
      opinionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profiles',
          key: 'id',
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Opinion',
    }
  );

  return Opinion;
};

