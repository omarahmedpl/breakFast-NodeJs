import { Router } from "express";
import {
  fetchAllOrders,
  fetchOrderById,
} from "./services/fetchOrders.service.js";
import { createOrder } from "./services/createOrder.service.js";
import { updateOrder } from "./services/updateOrder.service.js";
import { deleteOrder } from "./services/deleteOrder.service.js";
import { addOrUpdateOrderItem, updateOrderItemById } from "./services/addOrUpdateOrderItem.service.js";
import { deleteOrderItem } from "./services/deleteOrderItem.service.js";
const router = Router();

router.get("/", fetchAllOrders);
router.get("/:id", fetchOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/", createOrder);
router.post("/:id/add_item", addOrUpdateOrderItem);
router.put("/:id/update_item", updateOrderItemById);
router.delete("/:id/:item_id", deleteOrderItem);
export default router;
