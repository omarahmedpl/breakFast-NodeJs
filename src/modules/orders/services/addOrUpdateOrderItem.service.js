import orderItemsModel from "../../../DB/models/OrderItems.model.js";

export const addOrUpdateOrderItem = async (req, res, next) => {
  try {
    const [orderItem, created] = await orderItemsModel.findOrCreate({
      where: {
        order_id: req.params.id,
        item_id: req.body.item_id,
      },
      defaults: {
        order_id: req.params.id,
        item_id: req.body.item_id,
        item_count: req.body.item_count,
      },
    });
    if (created) {
      return res.status(201).json({
        message: "Item Added Successfully",
        item: orderItem,
      });
    } else {
      const updatedItem = await orderItemsModel.update(
        {
          item_count:
            Number(orderItem.item_count) + Number(req.body.item_count),
        },
        {
          where: {
            order_id: req.params.id,
            item_id: req.body.item_id,
          },
        }
      );
      return res.status(201).json({
        message: "Item Updated Successfully",
        item: {
          ...orderItem.dataValues,
          item_count:
            Number(orderItem.item_count) + Number(req.body.item_count),
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderItemById = async (req, res, next) => {
  try {
    const updatedItem = await orderItemsModel.update(
      {
        item_count: req.body.item_count, // Use req.body for item_count
      },
      {
        where: {
          order_id: Number(req.params.id),
          item_id: req.body.item_id,
        },
      }
    );
    if (updatedItem[0]) {
      return res.status(200).json({
        message: "Item Updated Successfully",
        item: {
          ...req.body,
          order_id: Number(req.params.id),
        },
      });
    } else {
      return res.status(404).json({
        message: "Item or Order Not Found!",
      });
    }
  } catch (error) {
    console.error("Error updating order item:", error); // Log the error for debugging
    return res.status(500).json({
      message: error.message,
    });
  }
};
