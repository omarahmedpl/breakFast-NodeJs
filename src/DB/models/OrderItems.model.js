import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import orderModel from "./Orders.model.js";
import itemModel from "./Items.model.js";

const orderItemsModel = sequelize.define("OrderItem", {
  orderItem_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    field: "orderItem_id",
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "order_id",
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "item_id",
  },
  item_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "item_count",
  },
});

orderModel.hasMany(orderItemsModel, {
  as: "orderItems",
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

orderItemsModel.belongsTo(orderModel, {
  as: "orderItems",
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

orderItemsModel.belongsTo(itemModel, {
  as: "itemDetails",
  foreignKey: "item_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
itemModel.hasMany(orderItemsModel, {
  as: "addedItems",
  foreignKey: "item_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export default orderItemsModel;
