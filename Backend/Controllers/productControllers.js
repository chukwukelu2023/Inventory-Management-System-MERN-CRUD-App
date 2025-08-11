const productService = require('../Service/productService');
const logger = require('../logger');
// Create
async function insertProduct(req, res) {
    try {
        const { ProductName, ProductPrice, ProductBarcode } = req.body;

        if (await productService.productExists(ProductBarcode)) {
            return res.status(409).json({ message: "Product already exists" });
        }

        const product = await productService.createProduct({
            ProductName,
            ProductPrice,
            ProductBarcode
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Read all
async function getProducts(req, res) {
    try {
        console.log('fetching all products in database')
        logger.info('Fetching all products');
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Read one
async function getProduct(req, res) {
    try {
        console.log(`fetching product with ID: ${req.params.id}`);
        logger.info('Fetching product with ID: ' + req.params.id);
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Update
async function updateProduct(req, res) {
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Delete
async function deleteProduct(req, res) {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    insertProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
