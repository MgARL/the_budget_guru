'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Expense_Category, Income }) {
      this.hasMany(Expense_Category,{
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
      })
      this.hasMany(Income ,{
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
      })
      this.belongsTo(User,{
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Budget.init({
    budget_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    budget_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};