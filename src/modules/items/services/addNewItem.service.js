import itemModel from "../../../DB/models/Items.model.js";

export const addNewItem = async (req, res, next) => {
  try {
    const addedItem = await itemModel.create(req.body);
    if (addedItem) {
      return res.status(201).json({
        message: "Item added Successfully",
        item : addedItem,
      });
    } else {
      return res.status(500).json({
        message: "Opps, An error happened please try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
