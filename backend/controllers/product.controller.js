import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    // Here you would typically save the product to the database
    // For now, we'll just send it back in the response
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false,message: 'Please add all fields' });
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }

};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    // Here you would typically update the product in the database
    // For now, we'll just send it back in the response

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    }catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });

    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted' });
    }catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
        // console.error("Error in deleting product:", error.message);
        // res.status(500).json({ success: false, message: 'Server error' });
    }
};