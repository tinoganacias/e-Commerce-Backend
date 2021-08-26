const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
      id: {
            type: dataTypes.integer,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
      
      product_name: {
            type: dataTypes.string,
            allowNull: false,
          },
      
      price: {
            type: dataTypes.decimal,
            allowNull: false,
            validate: {
            isDecimal: true,
          },
        },
      
      stock: {
            type: dataTypes.integer,
            allowNull: false,
            defaultValue: 10,
            validate: {
            isNumeric: true,
          },
        },
    
      category_id: {
            type: dataTypes.integer,
            references: {
            model: "category",
            key: "id",
          },
        },
      },  
  {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product',
  }
);

module.exports = Product;
