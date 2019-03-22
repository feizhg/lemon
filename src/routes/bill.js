var express = require('express');
var router = express.Router();
const billApi = require('./billApi');
/* 查找账单接口 */
router.post('/api/getBill', billApi.getBill);

/* 添加账单接口 */
router.post('/api/addBill', billApi.addBill);

/* 删除账单接口 */
router.get('/api/delBill', billApi.delBill);
module.exports = router;