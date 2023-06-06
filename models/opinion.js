'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Opinion extends Model {
    static associate(models) {
      Opinion.belongsTo(models.Epic, { foreignKey: 'epicId' });
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
      epicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Epic',
          key: 'id',
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
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Opinion',
    }
  );

  return Opinion;
};


