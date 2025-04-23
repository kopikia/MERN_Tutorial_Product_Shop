import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import {connectDB} from './config/db.js';

import productRoutes from './routes/product.route.js'; // Import the product routes

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
app.use(express.json()); //to parse JSON data from the request body

app.use("/api/products",productRoutes); // Use the product routes

//Configure the static folder
if(process.env.NODE_ENV=== 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}
    


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
});

