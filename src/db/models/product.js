'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'product',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    productImage: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    shortDescription: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    productUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdBy: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'product',
  },
);
