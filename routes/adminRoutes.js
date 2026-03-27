import express from "express";
import {
  saveProduct,
  getProducts,
  deleteProduct,
  createOrder,
  getOrders,
  updateOrder,
  getUsers,
  getDashboard,
  getCustomers
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", saveProduct);
router.put("/products/:id", saveProduct);
router.delete("/products/:id", deleteProduct);
router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.put("/orders/:id", updateOrder);


router.get("/users", getUsers);
router.get("/customers", getCustomers);
router.get("/dashboard", getDashboard);

export default router;