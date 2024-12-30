import orderItemsModel from "../../../DB/models/OrderItems.model.js";

export const deleteOrderItem = async (req, res, next) => {
  try {
    const deletedItem = await orderItemsModel.destroy({
      where: {
        order_id: req.params.id,
        item_id: req.params.item_id,
      },
    });
    if (deletedItem) {
      return res.status(201).json({
        message: "Item Deleted Successfully",
        item: {
          item_id: Number(req.params.item_id),
          order_id: Number(req.params.id),
        },
      });
    } else {
      return res.status(404).json({
        message: "Item Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
