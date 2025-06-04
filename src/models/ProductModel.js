const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

class ProductModel extends Model {
  static associate ({ ImageProductModel, OptionsProductModel }) {
    ProductModel.hasMany(ImageProductModel, { foreignKey: "product_id" });
    ProductModel.hasMany(OptionsProductModel, { foreignKey: "product_id" });
  }
}

ProductModel.init(
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stock: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    tableName: 'products',
    sequelize: connection,
    timestamps: true,
  }
)

module.exports = ProductModel;
