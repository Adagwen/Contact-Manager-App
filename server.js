const express = require("express");
const errorHandler = require("./middleware/errHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();


connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//middleware for routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
//middleware for errorHandler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});