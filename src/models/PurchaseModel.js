const { Model, DataTypes } = require("sequelize");

const UserModel = require("./UserModel");
const connection = require("../config/connection");

class PurchaseModel extends Model {
  static associate ({ UserModel, ProductModel, PurchaseProductModel }) {
    PurchaseModel.belongsTo(UserModel, { foreignKey: "user_id", as: 'user' });
    PurchaseModel.belongsToMany(ProductModel, {
      through: PurchaseProductModel,
      foreignKey: 'purchase_id',
      otherKey: 'product_id',
      as: 'products'
    });
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
    ref: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    name_completed: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(14),
      allowNull: false,
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
    type_payment: {
      type: DataTypes.ENUM(['card', 'billet']),
      allowNull: false,
    },
    name_card: {
      type: DataTypes.STRING(25),
      defaultValue: '',
    },
    number_card: {
      type: DataTypes.STRING(20),
      defaultValue: '',
    },
    validate_card: {
      type: DataTypes.STRING(10),
      defaultValue: '',
    },
    cvv: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'purchase',
    sequelize: connection,
    timestamps: true,
  }
)

module.exports = PurchaseModel;
