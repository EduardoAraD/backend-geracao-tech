const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const PurchaseModel = require("./PurchaseModel");
const ProductModel = require("./ProductModel");

class PurchaseProductModel extends Model {}

PurchaseProductModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PurchaseModel,
        key: 'id',
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: 'purc_prod',
    timestamps: false,
    sequelize: connection,
  }
)

module.exports = PurchaseProductModel;
