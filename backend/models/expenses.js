'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Expense_Category }) {
      this.belongsTo(Expense_Category, {
        foreignKey: 'expenses_category_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Expenses.init({
    expense_id: {
      type:  DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    expenses_category_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};