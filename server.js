var mysql = require('mysql');
var express  = require('express');
var app = express();
var  speedD={};
// 配置数据库信息
var connection = mysql.createConnection({
  host: 'localhost', // 主机地址
  port: '3306', // 端口
  user: 'root', // 用户名
  password: '123456', // 密码
  database: 'wode_cashbook' // 数据库名
});

// 连接
connection.connect();

const testsql = 'select * from  d_spend_table;'
connection.query(testsql, (err, res) => {
 
  if(err) {
    console.log(err)
    return
  }
  console.log(res)
})
 

app.get("/getType", function (req, res) {
  console.log(11111,'33333');
  console.log(req.query);
const testsql = 'select * from  d_spend_table;'
  connection.query(testsql , function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var result = {
        "status": "200",
        "message": "success",
      }
      result.data = data;
      console.log(result);
      res.end(JSON.stringify(result));
      speedD=  {...result}
    }
  });
});

connection.end();

