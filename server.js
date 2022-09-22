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
app.post("/spendDaily", function (req, res) {
  console.log(req.body);
let params = req.body;
// 先获取总条数
const countsql  = 'SELECT COUNT(*) AS total FROM d_spend_table'

// limit  i  n   表示从第几条开始  向后偏移n条数据   从 0 -9    10-19  20-29 
const testsql = `select * from  d_spend_table  order by dateTime asc LIMIT ${params.pageSize*(params.currentPage-1)}, 10`
  connection.query(testsql , function (err, dataList) {
    if (err) {
      console.log(err);
    } else {

      connection.query(countsql,function (err,data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data,'total',data[0].total);
          res.end(JSON.stringify({
            total:data[0].total,  // 总数
            list:dataList , // 列表
          }));
        //  total = data
        }
      })
      // res.end(JSON.stringify(data));

    }
   
  });
});

//  收入支出类型
app.post("/iconType", function (req, res) {
const params = req.body;
console.log(params,'params')
const testsql = `select * from  icon_types where costFlag = ${params.type}`
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

