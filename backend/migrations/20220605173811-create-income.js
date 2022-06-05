'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Incomes', {
      income_id: {
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
      amount: {
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
    await queryInterface.dropTable('Incomes');
  }
};