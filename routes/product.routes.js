import express, { query } from 'express';
import Product from '../models/Products/products.js'; // Adjust the path as needed

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post("/create-product", async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
        console.log(newProduct);
    } catch (error) {
        next(error);
    }
});

router.put('/update-product/:id', async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/delete-product/:id', async (req, res) => {
    
    try {
        const id = req.params.id;
        
        const deletedProduct = await Product.findById({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted', deletedProduct });
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
});

export default router;
