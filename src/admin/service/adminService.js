const Category = require("../model/categoryModel");


class adminService {

    // 카테고리
    static async addCategory({ name, description }) {
        const category = await Category.findByName({ name });

        if(category) {
            return "이 카테고리는 이미 존재합니다. 다른 카테고리 이름을 입력해주세요.";
        }

        const newCategory = { name, description };
        const createCategory = await Category.create({ newCategory });

        return createCategory;
    }

    static async getCategoryList() {
        const categoryList = await Category.findAll();

        return categoryList;
    }

    static async deleteCategory({ categoryId }) {
        const category = await Category.findById({ categoryId });

        if(!category) {
            return "해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.";
        }

        const categoryObjectid = category._id;
        const result = await Category.delete({ categoryObjectid });

        return result;
    }

}




module.exports = adminService;