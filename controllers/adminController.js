import { Order, User } from "../models/admin.js";
import Product from "../models/product.js";

export const saveProduct = async (req, res) => {
  try {
    const data = req.body;

    // Convert sizes/colors from string → array
    data.sizes  = typeof data.sizes === "string"  ? data.sizes.split(",").map(s => s.trim()) : data.sizes;
    data.colors = typeof data.colors === "string" ? data.colors.split(",").map(c => c.trim()) : data.colors;

    data.images = [data.image];

    if (data._id) {
      const updated = await Product.findByIdAndUpdate(data._id, data, { new: true });
      return res.json(updated);
    }

    const product = await Product.create(data);
    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 GET PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};


export const createOrder = async (req, res) => {
  const data = req.body;

  const order = await Order.create({
    ...data,
    orderId: "LYR" + Math.random().toString(36).substring(2, 8).toUpperCase()
  });

  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrder = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
};


export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};


export const getDashboard = async (req, res) => {
  const orders = await Order.find();
  const products = await Product.countDocuments();
  const users = await User.countDocuments();

  const revenue = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);

  const pending = orders.filter(o => o.status === "Pending" || o.status === "Processing").length;

  res.json({
    totalRevenue: revenue,
    totalOrders: orders.length,
    pendingOrders: pending,
    totalProducts: products,
    totalUsers: users
  });
};


export const getCustomers = async (req, res) => {
  try {
    const users = await User.find();

    const formatted = users.map((u) => ({
      id: u._id,
      name: u.fullName,
      email: u.email,
      phone: u.mobileNumber,
      city: u.city || "—",
      orders: 0,
      spent: 0,
      joined: u.createdAt,
      status: "Active",
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};