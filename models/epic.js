'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Epic extends Model {
    static associate(models) {
      Epic.hasMany(models.Vote, { foreignKey: 'epicId' })
    }
  }

  Epic.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateCaptured: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Epic',
    }
  )

  return Epic
}
