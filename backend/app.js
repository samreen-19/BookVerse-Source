const express = require("express");
const app = express();
const cors=require("cors");

require("dotenv").config();
require("./conn/conn");

app.use(cors());
app.use(express.json());

const user = require("./routes/user");
const Book = require("./routes/book");
const favourite=require ("./routes/favourite");
const cart=require("./routes/cart");
const order=require("./routes/order");

app.use("/api/v1", user);
app.use("/api/v1",Book);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
