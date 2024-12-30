import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

const itemModel = sequelize.define("Item", {
  item_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    field: "item_id",
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "item_name",
  },
});

export default itemModel;
