import restaurantModel from "../../../DB/models/Restaurants.model.js";

export const fetchAllRestaurants = async (req, res, next) => {
  try {
    const allRestaurants = await restaurantModel.findAll();
    return res.status(200).json({
      message: "Restaurants Fetched Successfully",
      restaurants: allRestaurants,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantModel.findByPk(req.params.id);
    if (restaurant) {
      return res.status(200).json({
        message: "Restaurant Fetched Successfully",
        restaurant,
      });
    } else {
      return res.status(404).json({
        message: "Restaurant Not Found!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
