/*
const Category = require("../model/categoryModel");
const User = require("../../users/model/userModel");
const Product = require("../../products/model/productModel");
const dayjs = require("dayjs");

class adminService {

    // 카테고리 기능
    static async addCategory({ name, description }) {
        const category = await Category.findByName({ name });

        if(category) {
            throw new Error("이 카테고리는 이미 존재합니다. 다른 카테고리 이름을 입력해주세요.");
        }

        const newCategory = { name, description };
        const createCategory = await Category.create({ newCategory });

        return createCategory;
    }

    static async getCategoryList() {
        const categoryList = await Category.findAll();

        return categoryList;
    }

    static async getCategory({ categoryName }) {
        const category = await Category.findByName({ categoryName });

        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }

        return category;
    }


    static async deleteCategory({ categoryId }) {
        const category = await Category.findById({ categoryId });

        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }

        const categoryObjectid = category._id;
        const result = await Category.delete({ categoryObjectid });

        return result;
    }

    static async putCategory({ categoryName, newCategoryValue }) {
        console.log( categoryName );
        let category = await Category.findByName({ categoryName });
    
        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }
        category = await Category.update({ categoryName, newCategoryValue });

        return category;
    }


    // 사용자 기능
    static async getUserList() {
        const userList = await User.findAll();

        return userList;
    }


    // 상품 관리
    static async getProductList() {
        const productList = await Product.findAll();

        return productList;
    }

    static async getProduct({ name }) {
        const product = await Product.findByName({ name });

        if(!product) {
            return "해당하는 상품이 없습니다.";
        }

        return product;
    }

    static async addProduct({ category, taste, name, price, amount, mainImage, subImage, description, show, origin}) {
        const product = await Product.findByName({ name });

        if(product) {
            throw new Error("이 상품은 이미 존재합니다. 다른 상품 이름을 입력해주세요.");
        }

        const days = dayjs().format("YYYY-MM-DD HH:mm:ss");

        const newProduct = { category, taste, name, price, amount, mainImage, subImage, description, show, reg_date: days, origin};
        const createProduct = await Product.create({ newProduct });

        return createProduct;
    }

    static async putProduct({ name, newProductValue }) {
        let product = await Product.findByName({ name });

        if(!product) {
           throw new Error("해당하는 상품이 없습니다. 상품 아이디를 다시 확인해주세요.");
        }

        const productObjectId = product._id;
        
        product = await Product.update({ productObjectId, newProductValue });

        return product;
    }

    static async deleteProduct({ productName }) {
        const product = await Product.findByproName({ productName });

        if(!product) {
            throw new Error("해당하는 상품이 없습니다. 상품 아이디를 다시 확인해주세요.");
        }

        const productObjectId = product._id;
        const result = await Product.delete({ productObjectId });

        return result;
    }

}




module.exports = adminService;
*/