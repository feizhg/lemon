var express = require('express');
var router = express.Router();
const classifyApi = require('./classifyApi');
/* 查找自定分类接口 */
router.get('/api/getCustom', classifyApi.custom);

/* 添加自定分类接口 */
router.post('/api/addCustom', classifyApi.addCustom);

/* 查找分类接口 */
router.get('/api/getClassify', classifyApi.getClassify);
module.exports = router;