/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-21 15:26:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-21 17:01:56
 * @function [分类的业务逻辑]
 */
const Mongo = require('mongodb-curd');
const dName = 'lemon';

module.exports = {
    custom: function(req, res, next) {
        // 查找
        Mongo.find(dName, 'custom', function(result) {
            if (result) {
                res.send({
                    code: 1,
                    data: result
                });
            } else {
                res.send({
                    code: 0,
                    msg: 'error'
                });
            }
        })
    },
    addCustom: function(req, res, next) {
        // 获取前台数据
        let { icon, title, type, common } = req.body;
        if (!icon || !title || !type || !common) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        Mongo.insert(dName, 'classify', req.body, function(result) {
            if (result) {
                res.send({
                    code: 1,
                    data: result
                });
            } else {
                res.send({
                    code: 0,
                    msg: 'error'
                });
            }
        })
    },
    getClassify: function(req, res, next) {
        let { common, type } = req.query;
        // 查找
        Mongo.find(dName, 'classify', {
            "common": { $in: ['y', common] },
            "type": type
        }, function(result) {
            if (result) {
                res.send({
                    code: 1,
                    data: result
                });
            } else {
                res.send({
                    code: 0,
                    msg: 'error'
                });
            }
        })
    }
}