const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const ProductModel = require("./ProductModel");

class OptionsProductModel extends Model {}

OptionsProductModel.init(
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
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM(['square', 'circle']),
      defaultValue: 'square',
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('text', 'color'),
      defaultValue: 'text',
    },
    values: {
      type: DataTypes.STRING(45),
      allowNull: false,
    }
  },
  {
    tableName: 'options',
    timestamps: false,
    sequelize: connection,
  }
)

module.exports = OptionsProductModel;
