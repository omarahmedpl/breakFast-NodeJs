import orderModel from "../../../DB/models/Orders.model.js";

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderModel.update(req.body, {
      where: {
        order_id: req.params.id,
      },
    });
    console.log(updatedOrder);
    if (updatedOrder[0] == 1) {
      return res.status(201).json({
        message: "Order Updated Successfully",
        order: req.params.id,
      });
    } else {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }
  } catch (error) {
    if (error.parent.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(500).json({ message: "Restaurant isn't exist" });
    } else {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
};
