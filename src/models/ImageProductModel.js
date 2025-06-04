const { Model, DataTypes } = require("sequelize");

const ProductModel = require("./ProductModel");
const connection = require("../config/connection");

class ImageProductModel extends Model {}

ImageProductModel.init(
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
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    tableName: 'images',
    sequelize: connection,
  }
)

module.exports = ImageProductModel;
