import { Router } from "express";
import { fetchAllItems, fetchItemById } from "./services/fetchItems.service.js";
import { deleteItemById } from "./services/deleteItem.service.js";
import { updateById } from "./services/updateItem.service.js";
import { addNewItem } from "./services/addNewItem.service.js";
const router = Router();

router.get("/", fetchAllItems);
router.post("/", addNewItem);
router.get("/:id", fetchItemById);
router.put("/:id", updateById);
router.delete("/:id", deleteItemById);
export default router;
