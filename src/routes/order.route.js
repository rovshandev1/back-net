const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");
const { authenticateUser } = require("../middleware/auth");

router.get("/", authenticateUser, order.allOrders);

router.get("/:id", authenticateUser, order.singleOrder);

router.post("/", authenticateUser, order.newOrder);

router.put("/:id", authenticateUser, order.updateOrder);

router.delete("/:id", authenticateUser, order.deleteOrder);

router.get("/totalSale", authenticateUser, order.totalSales);

router.get("/count", authenticateUser, order.orderCount);

router.get("/userorders/:userid", authenticateUser, order.userOrders);

module.exports = router;
