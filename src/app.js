require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const categories = require("./routes/category.route");
const subcategories = require("./routes/subcategoryRoute");
const profile = require("./routes/profileRoutes");
const product = require("./routes/productsRoutes");
const order = require("./routes/order.route");
const payment = require("./routes/paymentRoute");
const connectDB = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src/uploads"));
app.use(express.static("public"));

// Yo'nalishlarni ulash
app.use("/sello", authRoute);
app.use("/sello/category", categories);
app.use("/sello/product", product);
app.use("/sello/profile", profile);
app.use("/sello/order", order);
app.use("/sello", payment);
app.use("/sello/subcategory/", subcategories);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/sello/brand/", brand);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
