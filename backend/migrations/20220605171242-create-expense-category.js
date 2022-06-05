'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Expense_Categories', {
      expenses_category_id: {
        type:  DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      budget_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Budgets',
          key: 'budget_id'
        }
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Expense_Categories');
  }
};