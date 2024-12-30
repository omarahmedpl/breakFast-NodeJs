import restaurantModel from "../../../DB/models/Restaurants.model.js";

export const addNewRestaurants = async (req, res, next) => {
  try {
    const addedRestaurant = await restaurantModel.create(req.body);
    res.status(201).json({
      message: "Restaurant Added Successfully",
      restaurant: addedRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
