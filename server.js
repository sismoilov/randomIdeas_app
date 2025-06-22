const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

const app = express();
connectDB();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//cors middleware
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
}))

app.get('/', (req,res) => {
    res.json({message:'Welcoem to Random Ideas API'});
})

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

//static files




app.listen(port, () => console.log(`Server is running on port: ${port}`));