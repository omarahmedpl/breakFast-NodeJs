import orderModel from "../../../DB/models/Orders.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const createdOrder = await orderModel.create(req.body);
    return res.status(201).json({
      message: "Order Created Successfully",
      order: createdOrder,
    });
  } catch (error) {
    if (error.parent.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(500).json({ message: "Restaurant isn't exist" });
    } else {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
};
