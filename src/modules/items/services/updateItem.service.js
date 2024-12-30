import itemModel from "../../../DB/models/Items.model.js";

export const updateById = async (req, res, next) => {
  try {
    const deletedItem = await itemModel.update(req.body, {
      where: {
        item_id: req.params.id,
      },
    });
    if (deletedItem[0]) {
      return res.status(201).json({
        message: "Item updated Successfully",
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
