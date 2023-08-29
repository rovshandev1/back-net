const express = require("express");
const router = express.Router();
const order = require("../controller/orderController");

router.get("/", order.allOrders);
router.get("/:id", order.singleOrder);
router.post("/", order.newOrder);
router.put("/:id", order.updateOrder);
router.delete("/:id", order.deleteOrder);
router.get("/totalsales", order.totalSales);
router.get("/count", order.orderCount);
router.get("/userorders/:userid", order.userOrders);

module.exports = router;
