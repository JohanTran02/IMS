import mongoose from "mongoose";
import { Product } from "../../models/models";
import { Request, Response } from "express";


// get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// get product by id
export const getProductById = async (req: Request, res: Response) => {
  const productId : string = req.params.id;
  console.log(productId);
  try {
      const product = await Product.findById(productId);
    console.log(product)
    // if (!product) {
    //   return res.status(404).json({ message: "Product not found" });
    // }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// Create product 
export  async function postProduct (req, res)  {
  const { name, sku, description, price, category, manufacturer,amountInStock } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      sku,
      description,
      price,
      category,
      manufacturer,
      amountInStock,
    });
    if (!newProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// update prodct by id

 export async function updateProduct(req, res) {
   const productId = req.params.id;
   const { name, sku, description, price, category, manufacturer } = req.body;
   try {
     const updatedProduct = await Product.findByIdAndUpdate(productId, {
       name,
       sku,
       description,
       price,
       category,
       manufacturer,
     });
     if (!updatedProduct) {
       return res.status(404).json({ message: "Product not found" });
     }
     res.status(200).json(updatedProduct);
   } catch (err) {
     res.status(500).json({ message: "Server Error", error: err.message });
   }
 }

 //delete product by id
export const deleteProduct = async (req,res) => {
  const productId = req.params.id;
  try {

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

  
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}