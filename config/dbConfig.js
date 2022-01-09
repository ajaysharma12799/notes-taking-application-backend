const mongoose = require("mongoose");

const connectDB = async () => { // DB Config File
    try {
        const DBURL = process.env.DBURL;
        await mongoose.connect(DBURL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log(`DB Failed to Connect`);
        process.exit(1);
    }
}

module.exports = connectDB;