'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Budget }) {
      this.hasMany(Budget,{
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      } )
    }
  }
  User.init({
    user_id:{
      type:  DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    role:{
      type: DataTypes.ENUM('admin','regular'),
      defaultValue: 'regular'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        noEmpty: true
      }
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        noEmpty: true
      }
    },
    last_name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        noEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};