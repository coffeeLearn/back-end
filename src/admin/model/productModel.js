const Product = require("./schema/productSchema");

class ProductModel {

    static async create({ newProduct }) {
        const createdProduct = await Product.create(newProduct);
        return createdProduct;
    }

    static async findByName({ name }) {
        const product = await Product.findOne({ name: name });
        return product;
    }

    static async findByproName({ productName }) {
        const product = await Product.findOne({ name: productName });
        return product;
    }

    static async findAll() {
        const productList = await Product.find({});
        return productList;
    }

    static async findById({ productId }) {
        const product = await Product.findById(productId);
        return product;
    }

    static async findByCategory({ category }) {
        const product = await Product.findOne({ category });
        return product;
    }

    static async update({ productObjectId, newProductValue }) {
        
        const updateProduct = await Product.findOneAndUpdate( { _id: productObjectId }, { $set: newProductValue }, { returnNewDocument: true });

        return updateProduct;
    }

    static async delete({ productObjectId }) {
        await Product.deleteOne({ _id: productObjectId });

        return '상품 삭제 완료';
    }

}

module.exports = ProductModel;