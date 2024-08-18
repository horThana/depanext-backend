import express from 'express';
import mongoose from 'mongoose';
import dbConfig from './database/db.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(dbConfig.db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log('Cannot connect to the database', error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/products", productRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Global Error Handler
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
