/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-21 15:26:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-22 11:56:57
 * @function [分类的业务逻辑]
 */
const Mongo = require('mongodb-curd');
const dName = 'lemon';

module.exports = {
    addBill: function(req, res, next) {
        let { money, title, icon, type, common } = req.body;
        let now = new Date();
        let Time = {
            y: now.getFullYear(),
            m: now.getMonth() + 1,
            d: now.getDate()
        };
        if (!money || !title || !icon || !type || !common) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        req.body.Time = Time.y + '-' + Time.m + '-' + Time.d;
        Mongo.insert(dName, 'bill', req.body, function(result) {
            if (result) {
                res.send({ code: 1, msg: 'success' });
            } else {
                res.send({ code: 0, msg: 'error' });
            }
        });
    },
    getBill: function(req, res, next) {
        let { Time, common, title } = req.body; // {Time:"2018"|"2018-10",   common:'dsfdsfds45454',[type]}

        if (!Time || !common) {
            return res.send({ code: 2, msg: '参数不完整' })
        };
        let reg = new RegExp('^' + Time);
        let data = { Time: reg, uID: common };
        if (title) {
            console.log(typeof title)
            data = { Time: reg, uID: common, title: { $in: JSON.parse(title) } }
        }
        Mongo.find(dName, 'bill', data, function(result) {
            if (result) {
                res.send({ code: 1, msg: 'success', data: result });
            } else {
                res.send({ code: 0, msg: 'error' });
            }
        });
    },
    delBill: function(req, res, next) {
        let _id = req.query._id; // {_id:"dfsdfdsfiweuri"}
        if (!_id) {
            return res.send({ code: 2, msg: '参数不完整' })
        };
        //删除
        Mongo.remove(dName, 'bill', req.query, function(result) {
            if (result) {
                res.send({ code: 1, msg: 'success' });
            } else {
                res.send({ code: 0, msg: 'error' });
            }
        });
    }
}