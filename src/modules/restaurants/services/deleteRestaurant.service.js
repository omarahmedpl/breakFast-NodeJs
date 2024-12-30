import restaurantModel from "../../../DB/models/Restaurants.model.js";

export const deleteRestaurant = async (req, res, next) => {
  try {
    const deletedRestaurant = await restaurantModel.destroy({
      where: {
        rest_id: req.params.id,
      },
    });
    console.log(deletedRestaurant);
    if (deletedRestaurant) {
      return res.status(201).json({
        message: "Restaurant Deleted Successfully",
        restaurant: req.params.id,
      });
    } else {
      return res.status(404).json({
        message: "Restaurant Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
