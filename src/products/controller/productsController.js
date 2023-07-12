const express = require("express");
const productsRouter = express();
const productsService = require("../service/productService");
const upload = require("../../middlewares/multer");

productsRouter.get('/', async (req, res, next) => {
    try {
      const productList = await productsService.getProductList();

      res.status(200).json(productList);
    } catch(err) {
      next(err);
    }
});


productsRouter.get('/:name', async (req, res, next) => {
    try {
      const name = req.params.name;

      const product = await productsService.getProduct({ name });

      res.status(200).send(product);
    } catch(err) {
      next(err);
    }
});

productsRouter.post('/', upload.fields([ { name: 'mainImg', maxCount: 1 }, { name: 'subImg', maxCount: 1}]), async (req, res, next) => {
    try {
      const mImg = req.files.mainImg[0].location;
      const sImg = req.files.subImg[0].location;

      const { category, taste, name, price, amount, description, show, origin } = JSON.parse(req.body.data);
      const newProduct = await productsService.addProduct({ category, taste, name, price, amount, mainImg: mImg, subImg: sImg, description, show, origin });

      res.status(200).json(newProduct);
    } catch(err) {
      next(err);
    }
});


productsRouter.put('/:name', async (req, res, next) => {
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
      
    const putProduct = await productsService.putProduct({ name: productName, newProductValue });

      res.status(200).send(putProduct);
  } catch(err) {
    next(err);
  }
});

productsRouter.delete('/:name', async (req, res, next) => {
  try {
    const productName = req.params.name;
    const deleteProduct = await productsService.deleteProduct({ productName });

      res.status(200).send(deleteProduct);
  } catch(err) {
    next(err);
  }
});


// 이미지 테스트
/*
productsRouter.post("/image", uploadMain.single('img'),(req, res, next) => {
  try {
    console.log(req.file);


    res.json({ url: req.file });
  } catch(err) {
    next(err);
  }
});
*/

productsRouter.post("/image", upload.fields([ { name: 'mainImg', maxCount: 1 }, { name: 'subImg', maxCount: 1}]), async (req, res, next) => {
  
    console.log(req.files.subImg[0].location);
    console.log(req.body);
    res.send("good?");
});

module.exports = productsRouter;