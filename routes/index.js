var express = require('express');
var router = express.Router();

/* GET home page. */
router.route("/").get(function(req,res){
  res.render('index', { title: 'Express' });
}).post(function(req,res){
  var uid = req.body.uid;
  //sqlParameter(req.body);
  var type;
  console.log(uid);

  var mysql      = require('mysql');
  var db = require("../conf/db.js");
  var connection = mysql.createConnection(db.mysql);

  connection.connect();

  var str = "select * from mynews WHERE id ='"+uid+"';";
  //var str = "select * from myclass";
  connection.query(str, function(err, result) {
    if (err) throw err;
    //console.log(str);
    //console.log('The solution is: ', result[0].name);
    if(result.length){
      var utitle=result[0].title;
      var udes=result[0].des;
      res.send({type:1,title:utitle,des:udes});
      console.log("成功提取数据");
    }else{
      res.send({type:0});
    }
  });

  connection.end();

});

module.exports = router;
