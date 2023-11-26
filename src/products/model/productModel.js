const Product = require("./schema/productSchema");

class ProductModel {

    static async create({ newProduct }) {
        const createdProduct = await Product.create(newProduct);
        return createdProduct;
    } 

    static async findByName({ name }) {
        return await Product.findOne({ name });
    }

    static async findAll() {
        return await Product.find({});
    }

    static async findById(id) {
        const product = await Product.findById(id);
        return product;
    }

    static async findByCategory({ category }) {
        const product = await Product.findOne({ category });
        return product;
    }

    static async update({ productObjectId, newProductValue }) {

        const updateProduct = await Product.findOneAndUpdate( { _id: productObjectId }, { $set: newProductValue }, { new: true });

        console.log(updateProduct);

        return updateProduct;
    }

    static async delete({ productObjectId }) {
        await Product.deleteOne({ _id: productObjectId });

        return '상품 삭제 완료';
    }

    static async getProductNames() {
        const products = await Product.find({});
        const productNames = [];

        products.forEach(element => {
            productNames.push(element.name);
        });
        

        return productNames;
    }

}

module.exports = ProductModel;