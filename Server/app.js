require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

async function dbconnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log(error);
    }
};
dbconnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
 });
