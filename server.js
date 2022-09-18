var mysql = require('mysql');
var express  = require('express');
var app = express();
const bodyParser = require('body-parser');
// querystring "a=10&b=20"--->{a:10,b:20} 
// 使用中间件，任何请求都会先走它，会处理post请求
// 参数为true使用第三方模块qs, false用的是nodejs中querystring
// post 一直接收不到参数  需要配置这个
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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
// connection.connect();

connection.connect((err) => {
  if (err) {
      console.log("连接失败" + err.stack);
      return;
  } else {
      console.log("连接成功~");
  }
});

// 获取收支流水详情列表
app.get("/spendDaily", function (req, res) {
  console.log(req.query);
const testsql = 'select * from  d_spend_table;'
  connection.query(testsql , function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(data));
      speedD=  {...res}
    }
   
  });
});

//  收入支出类型
app.post("/iconType", function (req, res) {
const testsql = 'select * from  icon_types;'
  connection.query(testsql , function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(data));

    }
   
  });
});

//  插入一笔记录到流水日记账中
app.post("/insertDaily", function (req, res) {
 
  // 向表中新增数据时，如果数据对象的每个属性，和数据表的字段一一对应，则可以通过如下方
  // 式快速插入数据：
  var params = req.body;

  console.log(req.body,'sssssss');
// const sqlStr = 'INSERT INTO d_spend_table (dateTime,spend) VALUES (2022-09-18 09:37:44,9)'
const sqlStr =  'INSERT INTO   d_spend_table SET  ? ;'
  connection.query(sqlStr ,params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if(data.affectedRows === 1){ 
        console.log('插入数据成功')
      }  //成功

    }
   
  });
});



// connection.end();

app.listen(3000, function () { 
  console.log('Example app listening on port ' + 3000 + ' !')
 })

