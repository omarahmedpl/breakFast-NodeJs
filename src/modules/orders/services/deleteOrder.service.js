import orderModel from "../../../DB/models/Orders.model.js";

export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await orderModel.destroy({
      where: {
        order_id: req.params.id,
      },
    });
    console.log(deletedOrder);
    if (deletedOrder == 1) {
      return res.status(201).json({
        message: "Order Deleted Successfully",
        order: req.params.id,
      });
    } else {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
