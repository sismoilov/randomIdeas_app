const mongoose = require('mongoose');

const connectDB = async () => {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.info(`MongoDB successfully connected at ${db.connection.host}`);
    console.info(`Server is running on port:  http://localhost:${process.env.PORT}`)
}
 mongoose.set('strictQuery', true); // This is to avoid deprecation warning
module.exports = connectDB;