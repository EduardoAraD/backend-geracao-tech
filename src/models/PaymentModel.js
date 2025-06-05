const { Model, DataTypes } = require("sequelize");

const UserModel = require("./UserModel");
const connection = require("../config/connection");

class PaymentModel extends Model {
  static associate ({ UserModel }) {
    PaymentModel.belongsTo(UserModel, { foreignKey: "user_id" });
  }
}

PaymentModel.init(
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
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    validate_card: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'payment',
    sequelize: connection,
    timestamps: false,
  }
)

module.exports = PaymentModel;
