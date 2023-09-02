const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");
const { authenticateUser } = require("../middleware/auth");

router.post("/", authenticateUser, order.newOrder);

router.put("/:id", authenticateUser, order.updateOrder);

router.delete("/:id", authenticateUser, order.deleteOrder);

router.get("/totalSale", authenticateUser, order.totalSales);

router.get("/", authenticateUser, order.allOrders);

router.get("/count", authenticateUser, order.orderCount);

router.get("/:id", authenticateUser, order.singleOrder);

router.get("/orders/:userId", authenticateUser, order.userOrders);

module.exports = router;
