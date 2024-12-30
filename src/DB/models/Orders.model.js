import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import restaurantModel from "./Restaurants.model.js";

const orderModel = sequelize.define(
  "Order",
  {
    order_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      field: "order_id",
    },
    order_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "order_name",
    },
    order_rest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_rest",
    },
  },
  {
    createdAt: "order_date",
  }
);

restaurantModel.hasMany(orderModel, {
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "order_rest",
});

orderModel.belongsTo(restaurantModel, {
  as: "restaurant",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "order_rest",
});

export default orderModel;
