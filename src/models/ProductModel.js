const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

class ProductModel extends Model {
  static associate ({ ImageProductModel, OptionsProductModel, CategoryModel, CategorysAndProducts }) {
    ProductModel.hasMany(ImageProductModel, { foreignKey: "product_id" });
    ProductModel.hasMany(OptionsProductModel, { foreignKey: "product_id" });
    ProductModel.belongsToMany(CategoryModel, {
      through: CategorysAndProducts,
      foreignKey: 'product_id',
      otherKey: 'category_id',
    });
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
      type: DataTypes.INTEGER,
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
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    mark: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(['male', 'female', 'unisex']),
      defaultValue: 'unisex'
    },
    state: {
      type: DataTypes.ENUM(['new', 'old']),
      defaultValue: 'new',
    }
  },
  {
    tableName: 'products',
    sequelize: connection,
    timestamps: true,
  }
)

module.exports = ProductModel;
