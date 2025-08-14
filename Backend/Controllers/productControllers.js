const logger = require('../logger');
const productService = require('../Service/productService');

// Create
async function insertProduct(req, res) {
    logger.info('Insert product request received');
    try {
        const { ProductName, ProductPrice, ProductBarcode } = req.body;
        logger.info(`Product data: Name=${ProductName}, Price=${ProductPrice}, Barcode=${ProductBarcode}`);

        if (await productService.productExists(ProductBarcode)) {
            logger.warn(`Product already exists with barcode: ${ProductBarcode}`);
            return res.status(409).json({ message: "Product already exists" });
        }

        const product = await productService.createProduct({
            ProductName,
            ProductPrice,
            ProductBarcode
        });

        logger.info(`Product created successfully: ID=${product.id || 'N/A'}`);
        res.status(201).json(product);
    } catch (err) {
        logger.error(`Error inserting product: ${err.message}`);
        res.status(500).json({ error: "Server error" });
    }
}

// Read all
async function getProducts(req, res) {
    logger.info('Fetching all products');
    try {
        const products = await productService.getAllProducts();
        logger.info(`Fetched ${products.length} products`);
        return res.status(200).json(products);
    } catch (err) {
        logger.error(`Error fetching products: ${err.message}`);
        return res.status(500).json({ error: "Server error" });
    }
}

// Read one
async function getProduct(req, res) {
    logger.info(`Fetching product with ID: ${req.params.id}`);
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            logger.warn(`Product not found with ID: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        logger.info(`Product fetched successfully: ID=${req.params.id}`);
        return res.status(200).json(product);
    } catch (err) {
        logger.error(`Error fetching product ID=${req.params.id}: ${err.message}`);
        return res.status(500).json({ error: "Server error" });
    }
}

// Update
async function updateProduct(req, res) {
    logger.info(`Updating product with ID: ${req.params.id}`);
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if (!updated) {
            logger.warn(`Product not found for update: ID=${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        logger.info(`Product updated successfully: ID=${req.params.id}`);
        res.status(200).json(updated);
    } catch (err) {
        logger.error(`Error updating product ID=${req.params.id}: ${err.message}`);
        res.status(500).json({ error: "Server error" });
    }
}

// Delete
async function deleteProduct(req, res) {
    logger.info(`Deleting product with ID: ${req.params.id}`);
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) {
            logger.warn(`Product not found for deletion: ID=${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        logger.info(`Product deleted successfully: ID=${req.params.id}`);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        logger.error(`Error deleting product ID=${req.params.id}: ${err.message}`, { stack: err.stack });
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
