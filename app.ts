import dotenv from 'dotenv';
import express from 'express';
const {connectDB, closeConnection} = require('./src/config/db');
const bookRoutes = require('./src/routes/bookRoute');

dotenv.config();

const app = express();
// const port = process.env.PORT || 2024;

// Middleware
app.use(express.json());
app.use('/tobams-store/api', bookRoutes);

//MongoDB Connection
connectDB();

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


module.exports = app;
