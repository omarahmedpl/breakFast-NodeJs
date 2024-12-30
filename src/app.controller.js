import { dbAuth, dbSync } from "./DB/dbConnection.js";
import ordersController from "./modules/orders/orders.controller.js";
import itemsController from "./modules/items/items.controller.js";
import restaurantsController from "./modules/restaurants/restaurants.controller.js";
import orderItemsModel from "./DB/models/OrderItems.model.js";
import itemModel from "./DB/models/Items.model.js";
import cors from "cors";
export const bootstrap = (app, express) => {
  app.use(express.json());
  app.use(cors());
  dbAuth();
  dbSync();
  app.use("/orders", ordersController);
  app.use("/items", itemsController);
  app.use("/restaurants", restaurantsController);
  app.all("*", (req, res, next) => {
    return res.status(404).json({
      message: "Endpoint isn't found!",
    });
  });
};
