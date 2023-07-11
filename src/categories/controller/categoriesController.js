const express = require("express");
const categoriesRouter = express();
const categoryService = require("../service/categoryService");


categoriesRouter.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await categoryService.addCategory({ name, description });

    res.status(200).json(newCategory);
  } catch(err) {
    next(err);
  }
});


categoriesRouter.get('/', async (req, res, next) => {
    try {
      const categoryList = await categoryService.getCategoryList();

      res.status(200).json(categoryList);
    } catch(err) {
      next(err);
    }
});


categoriesRouter.get('/:name', async (req, res, next) => {
    try {
      
      const categoryName = req.params.name;
      const category = await categoryService.getCategory({ name: categoryName });

      res.status(200).send(category);
    } catch(err) {
      next(err);
    }
});

// soft삭제 vs 완전삭제
// 우선 완전삭제 쪽으로
categoriesRouter.delete('/:name', async (req, res, next) => {
    try {
      const categoryName = req.params.name;
      const deleteCategory = await categoryService.deleteCategory({ name: categoryName });

      res.status(200).send(deleteCategory);
    } catch(err) {
      next(err);
    }
});

categoriesRouter.put('/:name', async (req, res, next) => {
    try {
      const categoryName = req.params.name;
      const name = req.body.name;
      const description = req.body.description;
      const newCategoryValue = { name, description };
      
      const putCategory = await categoryService.putCategory({ categoryName, newCategoryValue });

      res.status(200).send(putCategory);
    } catch(err) {
      next(err);
    }
});


module.exports = categoriesRouter;