var express = require('express');
var router = express.Router();



//var pg = require('pg');
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";



//function sqlParameter(){
//
//}
/* GET login page. */
router.route("/").get(function(req,res){// 到达此路径则渲染login文件，并传出title值供 login.html使用
  res.render("forget",{title:'User forget'});
}).post(function(req,res){// 从此路径检测到post方式则进行post数据的处理操作
  //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
  //var User = global.dbHandel.getModel('user');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  //sqlParameter(req.body);
  var type;
  console.log(uname);
  console.log(upwd);



  var mysql      = require('mysql');
  var db = require("../conf/db.js");
  var connection = mysql.createConnection(db.mysql);

  connection.connect();

  var str = "update myclass set password='"+upwd+"' where name='"+uname+"';";
  console.log(str);
  //var str = "select * from myclass";
  connection.query(str, function(err, result) {
    if (err) throw err;



    //成功修改数据： affectedRows：1, changedRows:1
    //要修改的数据与原数据相同： affectedRows：1, changedRows:0
    //未找到需要修改的数据： affectedRows：0, changedRows:0
    //console.log('The solution is: ', result.affectedRows);
    if(result.affectedRows){
      console.log("成功找回密码");
      res.send({type:1});
    }else{
      res.send({type:0});
      console.log("未找到对应的昵称");
    }
  });

  connection.end();




  //var pg = require('pg');
  //var conString = "postgres://postgres:qwer1234@127.0.0.1:5432/postgres";
  ////console.log(1);
  //var client = new pg.Client(conString);
  //client.connect(function(err) {
  //  if(err) {
  //    return console.error('could not connect to postgres', err);
  //  }
  //  //var str = "select name from user_detile where name='"+uname+"' AND password= '"+upwd+"';";
  //  var str = "select * from user_detile WHERE name ='"+uname+"' and password='"+upwd+"';";
  //  //console.log(str);
  //  client.query(str, function(err, result) {
  //    if(err) {
  //      return console.error('error running query', err);
  //    }
  //    //for (var i=0;i <result.rows.length;i++){
  //    //  //console.log("name:"+result.rows[i].name);
  //    //  //console.log("password:"+result.rows[i].password);
  //    //  //console.log("password:"+result[i].password);
  //    //  if(uname==result.rows[i].name&&upwd==result.rows[i].password){
  //    //    type="1";
  //    //    res.send({type:type});
  //    //    break;
  //    //  }
  //    //}
  //    if(result.rows.length){
  //      res.send({type:1});
  //    }else{
  //      res.send({type:0});
  //    }
  //    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
  //    client.end();
  //
  //    //pg.connect(conString, function(err, client, done) {
  //    //
  //    //  if (err) {
  //    //    return console.error('error fetching client from pool', err);
  //    //  }
  //    //  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
  //    //    done();
  //    //    if (err) {
  //    //      return console.error('error running query', err);
  //    //    }
  //    //    console.log(result.rows[0].number);
  //    //  });
  //    //
  //    //});
  //
  //
  //  });
  //});
});
//
//router.get('/', function (req, res, next) {
//
//});
module.exports = router;
