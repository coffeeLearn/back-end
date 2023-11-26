const express = require("express");
const inquiryRouter = express();
const inquiryService = require("../service/InquiryService");
const adminOnly = require("../../middlewares/admin-only");
const login_required = require("../../middlewares/login-required");
const jwt = require("jsonwebtoken");

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

// 비회원 상품 문의
inquiryRouter.post('nonmember/:id', async (req, res, next) => {
  try {
    const product_id = req.params.id;

    const { title, content, writer_id ,password } = req.body;    
    
    const newInquiry = await inquiryService.addInpuiry({ title, content, writer_id, password, product_id });

    res.status(201).send(newInquiry);
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

// 내 문의사항 가져오기
inquiryRouter.get('/mypage', login_required, async (req, res, next) => {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const writer_id = jwtDecoded.id;  

    const myInquiry = await inquiryService.getMyInquiry(writer_id);

    res.status(200).send(myInquiry);
  } catch(err) {
    next(err);
  }
});

// 마이페이지에서 문의하기
inquiryRouter.post('/mypage/add', login_required, async(req, res, next) => {
  try {
    
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const writer_id = jwtDecoded.id;  

    const { title, content, name } = req.body;
    const newInquiry = await inquiryService.addInpuiryMypage({ title, content, writer_id, name });
    
    res.status(201).send(newInquiry);
  } catch(err) {
    next(err);
  }
});


module.exports = inquiryRouter;