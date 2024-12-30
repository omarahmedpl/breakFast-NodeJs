import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

const restaurantModel = sequelize.define("Restaurant", {
  rest_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    field: "rest_id",
  },
  rest_name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "rest_name",
  },
});

export default restaurantModel;
