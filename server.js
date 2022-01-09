const cors = require("cors");
const express = require("express");
const connectDB = require("./config/dbConfig");
const app = express();

const PORT = process.env.PORT || 4321; // Check For Port

if(process.env.NODE_ENV === 'development') { // Checking is Node Environment is in Development then only require dotend Package
    require("dotenv").config();
}

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes")); // Responsible For Login a User
app.use("/api/user", require("./routes/user.routes")); // Responsible For Register a User
app.use("/api/notes", require("./routes/notes.routes")); // Responsible For CRUD Operation on Notes

app.listen(PORT, (error) => {
    if(error) {
        console.log(error.message);
    }
    console.log(`Server is Running on ${PORT} Port`);
});