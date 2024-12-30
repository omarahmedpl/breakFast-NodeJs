import itemModel from "../../../DB/models/Items.model.js";

export const deleteItemById = async (req, res, next) => {
  try {
    const deletedItem = await itemModel.destroy({
      where: {
        item_id: req.params.id,
      },
    });
    if (deletedItem) {
      return res.status(201).json({
        message: "Item deleted Successfully",
        item: req.params.id,
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
