const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

class CategoryModel extends Model {}

CategoryModel.init(
  {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
    },
  },
  {
    tableName: 'categorys',
    timestamps: true,
    sequelize: connection,
  }
)

module.exports = CategoryModel;
