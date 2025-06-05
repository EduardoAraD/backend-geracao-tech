const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class UserModel extends Model {}

UserModel.init(
  {
    firstname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING(14),
      defaultValue: '',
    }
  },
  {
    tableName: 'users',
    sequelize: connection,
    timestamps: true,
  }
)

module.exports = UserModel;
