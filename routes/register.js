var express = require('express');
var router = express.Router();
/* GET register page. */
router.route("/").get(function(req,res){// 到达此路径则渲染register文件，并传出title值供 register.html使用
  res.render("register",{title:'User Register'});
}).post(function(req,res){
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  console.log(uname);
  console.log(upwd);

  var mysql      = require('mysql');
  var db = require("../conf/db.js");
  var connection = mysql.createConnection(db.mysql);

  connection.connect();

  var str = "insert into myclass values('"+ uname +"','"+ upwd +"');";
  //var str = "select * from myclass";
  connection.query(str, function(err, result) {
    if (err) throw err;
    //console.log(str);
    //console.log('The solution is: ', result[0].name);
    if(result){
      console.log("成功注册");
      res.send({type:1});
    }else{
      res.send({type:0});
    }
  });

  connection.end();


  //res.send(JSON.stringify({ type:type }));
  //res.end();
});
module.exports = router;
