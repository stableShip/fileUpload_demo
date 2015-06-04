/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var router = express.Router();
var fs = require("fs");
router.route("/file-upload")
    .post(function (req, res, next) {
    console.log(req.files, "req.files~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    var tmp_path = req.files.file.path;
    // 指定文件上传后的目录
    var target_path = '/';
    // 移动文件
    fs.renameSync(tmp_path, target_path + req.files.file.originalname);
    //插入mysql
    var result = {
        Resopnse: {
            'result-code': 0,
            "timeStamp": new Date()
        }
    };
    res.send(JSON.stringify(result));
})
    .get(function (req, res, next) {
    res.render("./fileUpload");
});
module.exports = router;
