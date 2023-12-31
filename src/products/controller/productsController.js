const express = require("express");
const productsRouter = express();
const productsService = require("../service/productService");
const upload = require("../../middlewares/multer");
const adminOnly = require("../../middlewares/admin-only");
const login_required = require("../../middlewares/login-required");
const ObjectId = require('mongodb').ObjectId;

productsRouter.get('/', async (req, res, next) => {
    try {
      const productList = await productsService.getProductList();

      res.status(200).json(productList);
    } catch(err) {
      next(err);
    }
});


productsRouter.get('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await productsService.getProduct({ id: productId });

      res.status(200).send(product);
    } catch(err) {
      next(err);
    }
});


// admin이 상품 추가
productsRouter.post('/admin', adminOnly, upload.fields([ { name: 'main', maxCount: 1 }, { name: 'sub', maxCount: 1}]), async (req, res, next) => {
    try {
      const mImg = req.files.main[0].location;
      const sImg = req.files.sub[0].location;

      const { category, taste, name, price, amount, description, show, origin, salePercent } = JSON.parse(req.body.data);
      const newProduct = await productsService.addProduct({ category, taste, name, price, amount, mainImg: mImg, subImg: sImg, description, show, origin, salePercent });

      res.status(200).json(newProduct);
    } catch(err) {
      next(err);
    }
});


// admin이 상품 수정
productsRouter.patch('/admin/:id', adminOnly, upload?.fields([ { name: 'main', maxCount: 1 }, { name: 'sub', maxCount: 1}]),async (req, res, next) => {
  try {
    const productId = req.params.id;

    let mainImg = "";
    let subImg = "";

    const image= JSON.stringify(req.files);
    const data = JSON.parse(req.body.data);

    if(image === '{}') {
      mainImg = data.mainImg;
      subImg = data.subImg;
    } else if(image.includes("main") && !image.includes("sub")){
      mainImg = req.files.main[0].location;
      subImg = data.subImg;
      console.log(mainImg + " \n " +subImg);
    } else if(image.includes("sub") && !image.includes("main")){
      mainImg = data.mainImg;
      subImg = req.files.sub[0].location;
      console.log(mainImg + " \n " +subImg);
    } else {
      mainImg = req.files.main[0].location;
      subImg = req.files.sub[0].location;
    }

    
    const { category, taste, name, price, amount, description, show, origin, salePercent } = JSON.parse(req.body.data);
    const newProductValue = { category, taste, name, price, amount, mainImg, subImg, description, show, origin, salePercent };
      
    const putProduct = await productsService.putProduct({ id: productId, newProductValue });

    res.status(200).send(putProduct);
  } catch(err) {
    next(err);
  }
});


// admin이 삭제
productsRouter.delete('/admin/:id', adminOnly, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await productsService.deleteProduct({ id: productId });

      res.status(200).send(deleteProduct);
  } catch(err) {
    next(err);
  }
});

// 문의할 때 상품명 가져오기
productsRouter.get('/inquiry/list', async (req, res, next) => {
  try {
    const prodcuts = await productsService.getNames();

    res.status(200).send(prodcuts);
  } catch(err) {
    next(err);
  }

});


module.exports = productsRouter;