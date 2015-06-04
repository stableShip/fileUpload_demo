/// <reference path="Scripts/typings/express/express.d.ts" />
import express = require("express");
import path = require("path");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var multer = require('multer');
var domainMiddleware = require('domain-middleware');
var app = express();
var server = require('http').createServer(app);
var mount = require('mount-routes');


app.use(cookieParser());
app.use(session({
    secret: 'mEiriQAdmin_qianYun2015',
    resave: true, // 强制session保存默认为true
    saveUninitialized: true
}));
app.use(multer());//对multipart/form-data 类型数据进行处理

app.use(domainMiddleware({
    server: server,
    killTimeout: 10000
}));

app.set('port', process.env.PORT || 3006);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({
    extended: false
})); //extended为true，使用node内置qs解析数据，false时使用querystring


app.use(bodyParser.json({
    type: 'json'
})); //解析json类型数据

app.use(methodOverride());

app.use(errorHandler());
//app.use(function(req, res, next) {
//    console.log(req.body);
//    next();
//})

mount(app,"../../routes");
app.use(express.static(path.join(__dirname, 'public')));

//app.get("/",function(req:express.Request,res:express.Response) {
//    res.send("Hello");
//});



server.listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});