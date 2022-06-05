'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Budget, Expense }) {
      this.hasMany(Expense, {
        foreignKey: 'expenses_category_id',
        onDelete: 'CASCADE'
      })
      this.belongsTo(Budget, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Expense_Category.init({
    expenses_category_id: {
      type:  DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    budget_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        noEmpty: true
      }
    },
    set_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Expense_Category',
  });
  return Expense_Category;
};