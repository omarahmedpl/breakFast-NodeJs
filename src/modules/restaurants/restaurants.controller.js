import { Router } from "express";
import {
  fetchAllRestaurants,
  fetchRestaurantById,
} from "./services/fetchRestaurants.service.js";
import { addNewRestaurants } from "./services/addRestaurants.service.js";
import { updateRestaurants } from "./services/updateRestaurants.service.js";
import { deleteRestaurant } from "./services/deleteRestaurant.service.js";
const router = Router();

router.get("/", fetchAllRestaurants);
router.get("/:id", fetchRestaurantById);
router.put("/:id", updateRestaurants);
router.delete("/:id", deleteRestaurant);
router.post("/", addNewRestaurants);
export default router;
