'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Budget }) {
      this.belongsTo(Budget, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Income.init({
    income_id: {
      type:  DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    budget_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    income_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
    type: DataTypes.INTEGER,
    allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};