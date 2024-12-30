import restaurantModel from "../../../DB/models/Restaurants.model.js";

export const updateRestaurants = async (req, res, next) => {
  try {
    const updatedRestaurant = await restaurantModel.update(req.body, {
      where: {
        rest_id: req.params.id,
      },
    });
    res.status(201).json({
      message: "Restaurant Updates Successfully",
      restaurant: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
