import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import colors from 'colors'
import cors from 'cors'

dotenv.config();

// database config

connectDB();

// app is instance of the express function
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('hello')
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} port ${PORT}`.green)
})
