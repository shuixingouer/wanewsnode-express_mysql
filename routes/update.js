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

  var del = "delete from mynews WHERE id ='"+uid+"';";
  connection.query(del, function(err, result) {
    if (err) throw err;
    //console.log(str);
    //console.log('The solution is: ', result[0].name);
    if(result.affectedRows){
      res.send({type:1});
      console.log("成功删除数据");
    }else{
      res.send({type:0});
    }
  });


  connection.end();

});
module.exports = router;
