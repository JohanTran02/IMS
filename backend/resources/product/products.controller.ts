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
  const productId: string = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// Create product 
export async function postProduct(req, res) {
  const { name, sku, description, price, category, manufacturer, amountInStock } = req.body;

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
export const deleteProduct = async (req, res) => {
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

//get total stock value
export async function getStockValue(req, res) {
  const products = await Product.find();

  try {
    const TotalProductValue = products.reduce((total, product) => {
      return total + product.price * product.amountInStock;

    }, 0)
    res.status(200).json({ totalValue: TotalProductValue });
  }
  catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

//get stock value by manifacturer
export async function getStockValueByManufacturer(req, res) {



  try {
    const result = await Product.aggregate([

      {
        $group: {
          _id: "$manufacturer.name",
          Manufacturer: { "$first": "$manufacturer.name" },
          StockValue: { $sum: { $multiply: ["$price", "$amountInStock"] } }
        }
      },

      {
        $sort: { StockValue: -1 }
      }
    ]);

    const FilteredStockValue = result.map(Result => ({
      manufacturer: Result.Manufacturer,
      totalAmount: Result.StockValue
    }));

    res.status(200).json(FilteredStockValue);


  }
  catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//get low stock (show products with less than 10 in stock)
export async function showLowStock(req, res) {
  const products = await Product.find()
  try {
    const lowStockProducts = products.filter(product => product.amountInStock <= 10);
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });

  }
}


//show critical stock (less than 5 in stock)

export async function showCriticalStock(req, res) {

  const products = await Product.find();

  try {
    const filteredProducts = products.filter(product => product.amountInStock <= 5);
    const critialStockProducts = filteredProducts.map(product => ({
      AmountInStock: product.amountInStock,
      Manifacturer: product.manufacturer.name,
      ContactName: product.manufacturer.contact.name,
      ContactEmail: product.manufacturer.contact.email,
      ContactPhone: product.manufacturer.contact.phone

    }))

    res.status(200).json(critialStockProducts);
  }
  catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }

}


//get manifacturers
export async function getManufacturers(req, res) {

  try {

    const products = await Product.find();
    const manufacturers = products.map(product => product.manufacturer);

    res.status(200).json({ manufacturers: manufacturers });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
