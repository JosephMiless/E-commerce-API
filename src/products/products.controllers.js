import { addProducts, updateProducts, deleteProducts, findProducts, getProducts } from "./products.services.js";
import { addProductSchema, updateProductSchema } from "../validators/products.js";


export const addProductsController = async (req, res) => {
    try {
        
        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized; please login"
            })
        };

        const {error, value} = addProductSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        const {productName, description, price, category, stock} = value;

        const products = await findProducts(productName);

        if(products.length > 0) {
            return res.status(409).json({error: "Product already exists"});
        };

        const product = await addProducts(productName, description, price, category, stock);

        return res.status(201).json({
            message: "Product added successfully", product
        });

    } catch (error) {
        console.log("Error adding product", error);

        return res.status(401).json({
            error: "Error adding product"
        })
    }
};

export const getProductsController = async(req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Please login"
            })
        };

        const products = await getProducts();

        return res.status(200).json({
            products
        });
        
    } catch (error) {

        console.log("Error getting products", error);

        return res.status(401).json({
            error: "Error getting products"
        })

    }
};

export const getSingleProductController = async(req, res) => {
    try {

        const curr_user = req.user;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Please login"
            })
        };

        const productName = req.params.id;

        const product = await findProducts(productName);

        if(product.length == 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        };

        return res.status(200).json({
            product
        })


        
    } catch (error) {
        console.log("Error getting product", error);

        return res.status(400).json({
            error: "Error getting product"
        })
    }
};

export const deleteProductsController = async (req, res) => {
    try {

        const curr_user = req.user;

        const productName = req.params.id;

        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login"
            })
        };

        const checkProduct = await findProducts(productName);

        if(checkProduct.length == 0) {
            return res.status(404).json({
                error: "Product not found"
            })
        };

        await deleteProducts(productName);

        return res.status(200).json({
            message: "Product deleted successfuly", checkProduct
        });
        
    } catch (error) {

        console.log("Error deleting product", error);

        return res.status(400).json({
            error: "Error deleting product"
        })
        
    }
};

export const updateProductsController = async (req, res) => {
    try {

        const curr_user = req.user;

        const productID = req.params.id;
        
        if(!curr_user) {
            return res.status(401).json({
                error: "Unauthorized. Kindly login"
            })
        };

        const checkProduct = await findProducts(productID);

        if(checkProduct.length == 0) {
            return res.status(404).json({
                error: "Product not found"
            })
        };

        const {error, value} = updateProductSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error: error.message
            })
        };

        // if (checkProduct.length > 0) {
        //     return res.json({
        //         checkProduct
        //     })
        // }; next();

        

        const {productName, description, price, category, stock} = value;

        const updatedProduct = await updateProducts(productName, description, price, category, stock, productID);

        return res.status(201).json({
            message: "Product updated successfuly", updatedProduct
        });
        
    } catch (error) {

        console.log("Errror updating product", error);

        return res.status(400).json({
            error: "Error updating product"
        })
    }
};