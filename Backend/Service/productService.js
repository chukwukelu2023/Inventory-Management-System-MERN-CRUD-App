// services/productService.js
const Product = require('../Models/Products');

async function createProduct(data) {
    return await Product.create(data);
}

async function getAllProducts() {
    return await Product.find({});
}

async function getProductById(id) {
    return await Product.findById(id);
}

async function updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}

async function productExists(barcode) {
    return await Product.findOne({ ProductBarcode: barcode });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    productExists
};
