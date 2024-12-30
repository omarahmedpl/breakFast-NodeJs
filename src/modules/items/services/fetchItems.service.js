import itemModel from "../../../DB/models/Items.model.js";

export const fetchAllItems = async (req, res, next) => {
  try {
    const items = await itemModel.findAll();
    if (items.length) {
      return res.status(200).json({
        message: "Items Fetched Successfully",
        items,
      });
    } else {
      return res.status(404).json({
        message: "No Items Are Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const fetchItemById = async (req, res, next) => {
  try {
    const item = await itemModel.findByPk(req.params.id);
    if (item) {
      return res.status(200).json({
        message: "Item Fetched Successfully",
        item,
      });
    } else {
      return res.status(404).json({
        message: "Item not found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
