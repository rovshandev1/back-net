const Order = require("../models/Order");
const orderItem = require("../models/Order-item");
const OrderItem = require("../models/Order-item");

// Get all orders
exports.allOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get a single order by ID
exports.singleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product" },
      });

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Create a order
exports.newOrder = async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );

    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
    console.log(totalPrices);
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      res
        .status(400)
        .json({ success: false, message: "Order creation failed" });
    } else {
      res.status(201).json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update an order's status by ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);

    if (order) {
      await Promise.all(
        order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        })
      );
      res.status(200).json({ success: true, message: "Order deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get total sales
exports.totalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);

    if (totalSales.length === 0 || totalSales[0].totalsales === null) {
      res.status(400).json({ success: false, message: "Sales data not found" });
    } else {
      res.status(200).json({ totalsales: totalSales[0].totalsales });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get order count
exports.orderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    res.status(200).json({ orderCount: orderCount });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get orders for a specific user
exports.userOrders = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userId })
      .populate({
        path: "orderItems",
        populate: { path: "product" },
      })
      .sort({ dateOrdered: -1 });

    if (userOrderList.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "User orders not found" });
    } else {
      res.status(200).json(userOrderList);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
