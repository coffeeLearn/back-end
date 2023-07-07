const express = require("express");
const adminRouter = express();
const adminService = require("../service/adminService");
const adminOnly = require("../../middlewares/admin-only");
const e = require("express");

adminRouter.get('/', adminOnly, function(req, res, next) {
    res.send('관리자용 페이지 확인');
  });


// 카테고리

adminRouter.post('/addCategory', adminOnly, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await adminService.addCategory({ name, description });

    res.status(200).json(newCategory);
  } catch(err) {
    next(err);
  }
});


adminRouter.get('/category', adminOnly, async (req, res, next) => {
    try {
      const categoryList = await adminService.getCategoryList();

      res.status(200).json(categoryList);
    } catch(err) {
      next(err);
    }
});

// soft삭제 vs 완전삭제
// 우선 완전삭제 쪽으로
adminRouter.delete('/:id', adminOnly, async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const deleteCategory = await adminService.deleteCategory({ categoryId });

      res.status(200).send(deleteCategory);
    } catch(err) {
      next(err);
    }
});





module.exports = adminRouter;