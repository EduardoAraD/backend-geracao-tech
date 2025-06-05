const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const UserModel = require("./UserModel");

class AddressModel extends Model {
  static associate ({ UserModel }) {
    AddressModel.belongsTo(UserModel, { foreignKey: "user_id" });
  }
}

AddressModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'address',
    timestamps: false,
  }
)

module.exports = AddressModel;
