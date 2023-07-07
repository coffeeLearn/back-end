const Category = require("./schema/categorySchema");

class CategoryModel {

    static async create({ newCategory }) {
        const createdCategory = await Category.create(newCategory);
        return createdCategory;
    }

    static async findByName({ name }) {
        const category = await Category.findOne({ name });
        return category;
    }

    static async findAll() {
        const categoryList = await Category.find({});
        return categoryList;
    }

    static async findById({ categoryId }) {
        const category = await Category.findById(categoryId);
        return category;
    }


    static async delete({ categoryObjectid }) {
        await Category.deleteOne({ _id: categoryObjectid });

        return '카테고리 삭제 완료';
    }

    static async update({ categoryObjectid, newCategoryValue }) {
        // findOneAndUpdate vs updateOne
        // 수정이 되었는지 확인하기 위해 반환시켜주는 findOneAndUpdate 사용
        const filter = { _id: categoryObjectid };
        const update = { $set: newCategoryValue };
        const updateCategory = await Category.findOneAndUpdate( filter, update, { returnNewDocument:true });
        
        return updateCategory;
    }
}

module.exports = CategoryModel;