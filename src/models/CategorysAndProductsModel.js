const { Model, DataTypes } = require("sequelize");

const ProductModel = require("./ProductModel");
const CategoryModel = require("./CategoryModel");
const connection = require("../config/connection");

class CategorysAndProducts extends Model {}

CategorysAndProducts.init(
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  },
  {
    tableName: 'categ_prod',
    timestamps: false,
    sequelize: connection,
  }
)

module.exports = CategorysAndProducts;