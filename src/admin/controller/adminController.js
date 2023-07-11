/*
const express = require("express");
const adminRouter = express();
const adminService = require("../service/adminService");
const url = require('url');

// 관리자 전용 페이지니깐 여기 경로들은 다 미들웨어 적용

adminRouter.get('/', function(req, res, next) {
    res.send('관리자용 페이지 확인');
  });


// 카테고리

adminRouter.post('/category/add', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await adminService.addCategory({ name, description });

    res.status(200).json(newCategory);
  } catch(err) {
    next(err);
  }
});


adminRouter.get('/category', async (req, res, next) => {
    try {
      const categoryList = await adminService.getCategoryList();

      res.status(200).json(categoryList);
    } catch(err) {
      next(err);
    }
});


adminRouter.get('/category/:name', async (req, res, next) => {
    try {
      //const inputCategoryName = url.parse(req.url, true).query;
      //const categoryName = inputCategoryName.name;
      const categoryName = req.params.name;
      const category = await adminService.getCategory({ categoryName });

      res.status(200).send(category);
    } catch(err) {
      next(err);
    }
});

// soft삭제 vs 완전삭제
// 우선 완전삭제 쪽으로
adminRouter.delete('/category/:id', async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const deleteCategory = await adminService.deleteCategory({ categoryId });

      res.status(200).send(deleteCategory);
    } catch(err) {
      next(err);
    }
});

adminRouter.put('/category/:name', async (req, res, next) => {
    try {
      const categoryName = req.params.name;
      const name = req.body.name;
      const description = req.body.description;
      const newCategoryValue = { name, description };
      
      const putCategory = await adminService.putCategory({ categoryName, newCategoryValue });

      res.status(200).send(putCategory);
    } catch(err) {
      next(err);
    }
});

// 회원 관리
adminRouter.get('/user', async (req, res, next) => {
    try {
      const userList = await adminService.getUserList();

      res.status(200).json(userList);
    } catch(err) {
      next(err);
    }
});

// 상품 관리
adminRouter.get('/product', async (req, res, next) => {
    try {
      const productList = await adminService.getProductList();

      res.status(200).json(productList);
    } catch(err) {
      next(err);
    }
});


adminRouter.get('/product/:name', async (req, res, next) => {
    try {
      const name = req.params.name;

      const product = await adminService.getProduct({ name });

      res.status(200).send(product);
    } catch(err) {
      next(err);
    }
});

adminRouter.post('/product/add', async (req, res, next) => {
    try {
      const { category, taste, name, price, amount, mainImage, subImage, description, show, origin} = req.body;
      const newProduct = await adminService.addProduct({ category, taste, name, price, amount, mainImage, subImage, description, show, origin });

      res.status(200).json(newProduct);
    } catch(err) {
      next(err);
    }
});


adminRouter.put('/product/:name', async (req, res, next) => {
  try {
    const productName = req.params.name;

    const category = req.body.category;
    const taste = req.body.taste;
    const name = req.body.name;
    const price = req.body.price;
    const amount = req.body.amount;
    const mainImage = req.body.mainImage;
    const subImage = req.body.subImage;
    const description = req.body.description;
    const show = req.body.show;
    const reg_date = req.body.reg_date;
    const origin = req.body.origin;

    const newProductValue = { category, taste, name, price, amount, mainImage, subImage, description, show, reg_date, origin };
      
    const putProduct = await adminService.putProduct({ name: productName, newProductValue });

      res.status(200).send(putProduct);
  } catch(err) {
    next(err);
  }
});

adminRouter.delete('/product/:name', async (req, res, next) => {
  try {
    const productName = req.params.name;
    const deleteProduct = await adminService.deleteProduct({ productName });

      res.status(200).send(deleteProduct);
  } catch(err) {
    next(err);
  }
})




module.exports = adminRouter;
*/