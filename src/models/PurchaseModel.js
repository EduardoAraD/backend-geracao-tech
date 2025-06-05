const { Model, DataTypes } = require("sequelize");

const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");
const connection = require("../config/connection");

class PurchaseModel extends Model {
  static associate ({ UserModel, ProductModel }) {
    PurchaseModel.belongsTo(UserModel, { foreignKey: "user_id" });
    PurchaseModel.belongsTo(ProductModel, { foreignKey: 'product_id' })
  }
}

PurchaseModel.init(
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ref: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_payment: {
      type: DataTypes.ENUM(['card', 'billet']),
      allowNull: false,
    }
  },
  {
    tableName: 'purchase',
    sequelize: connection,
    timestamps: true,
  }
)

module.exports = PurchaseModel;
