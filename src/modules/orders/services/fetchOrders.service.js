import itemModel from "../../../DB/models/Items.model.js";
import orderItemsModel from "../../../DB/models/OrderItems.model.js";
import orderModel from "../../../DB/models/Orders.model.js";
import restaurantModel from "../../../DB/models/Restaurants.model.js";

export const fetchAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.findAll({
      attributes: {
        exclude: ["updatedAt", "order_date", "order_rest"],
      },
      include: [
        {
          model: restaurantModel,
          as: "restaurant",
          foreignKey: "rest",
          attributes: ["rest_id", "rest_name"],
        },
        {
          model: orderItemsModel,
          as: "orderItems",
          foreignKey: "order",
          attributes: ["item_count"],
          include: {
            model: itemModel,
            as: "itemDetails",
            foreignKey: "item",
            attributes: ["item_id", "item_name"],
          },
        },
      ],
    });
    if (orders.length) {
      return res.status(200).json({
        message: "Orders Fetched Successfully",
        orders,
      });
    } else {
      return res.status(404).json({
        message: "No Orders Are Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const fetchOrderById = async (req, res, next) => {
  try {
    const order = await orderModel.findByPk(req.params.id, {
      attributes: {
        exclude: ["updatedAt", "order_rest"],
      },
      include: [
        {
          model: restaurantModel,
          as: "restaurant",
          foreignKey: "rest",
          attributes: ["rest_id", "rest_name"],
        },
        {
          model: orderItemsModel,
          as: "orderItems",
          foreignKey: "order",
          attributes: ["item_count"],
          include: {
            model: itemModel,
            as: "itemDetails",
            foreignKey: "item",
            attributes: ["item_id", "item_name"],
          },
        },
      ],
    });
    if (order) {
      return res.status(200).json({
        message: "Order Fetched Successfully",
        order,
      });
    } else {
      return res.status(404).json({
        message: "Order Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
