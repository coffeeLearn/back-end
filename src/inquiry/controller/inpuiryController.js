const express = require("express");
const inquiryRouter = express();
const inquiryService = require("../service/InquiryService");
const adminOnly = require("../../middlewares/admin-only");
const login_required = require("../../middlewares/login-required");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;

// 해당 상품의 문의 전체 조회
inquiryRouter.get('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id;
      const inquiries = await inquiryService.getInquiry({ id: productId });

      res.status(200).send(inquiries);
    } catch(err) {
      next(err);
    }
});


// 상품 문의
inquiryRouter.post('/:id', login_required, async (req, res, next) => {
  try {
    const product_id = req.params.id;

    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const writer_id = jwtDecoded.id;

    const { title, content, password } = req.body;    
    
    const newInquiry = await inquiryService.addInpuiry({ title, content, writer_id, password, product_id });

    res.status(201).send(newInquiry);
  } catch(err) {
    next(err);
  }
});

// 문의 수정
inquiryRouter.patch('/:id', login_required, async (req, res, next) => {
  try {
    const inquiry_id = req.params.id;

    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const writer_id = jwtDecoded.id;

    const { title, content, password } = req.body;    
    
    const inquiry = await inquiryService.edit({ title, content, writer_id, password, inquiry_id });

    res.status(200).send(inquiry);
  } catch(err) {
    next(err);
  }
});

// 문의 답변
inquiryRouter.patch('/admin/:id', adminOnly, async (req, res, next) => {
  try {
    const inquiry_id = req.params.id;

    const { answer } = req.body;    
    
    const newInquiry = await inquiryService.answer({ id: inquiry_id, answer });

    res.status(200).send(newInquiry);
  } catch(err) {
    next(err);
  }
});

// 문의 삭제
inquiryRouter.delete('/:id', login_required, async (req, res, next) => {
  try {
    const inquiry_id = req.params.id;

    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const writer_id = jwtDecoded.id;   
    
    const newInquiry = await inquiryService.remove({ id: inquiry_id, writer_id });

    res.status(200).send(newInquiry);
  } catch(err) {
    next(err);
  }
});


module.exports = inquiryRouter;