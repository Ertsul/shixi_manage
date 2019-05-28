const Koa = require('koa');
const app = new Koa();

// 数据库
const MyMongo = require('./mongo.js');
const MongoClient = require('mongodb').MongoClient;
const dbHost = "mongodb://134.175.150.88:27018";
const dbName = "sxmanager";
const myMongo = new MyMongo(MongoClient, dbHost, dbName);
const myMongoConnect = myMongo.connect();
myMongoConnect.then(res => {
  console.log('myMongo - connect', res);
  const {type} = res;
  if (type) { // 数据库连接成功
    // 数据库查找测试
    // const findRes = myMongo.find('student', {name: 'zero'});
    // console.log('findRes', findRes);
    // findRes.then(res => {
    //   console.log('find -- ', res);
    // })
    // 数据库插入测试
    const insertRes = myMongo.insert('student', {
      name: 'Ertsul', // 姓名
      studentId: '002', // 学号
      myPhone: '13645896271', // 个人电话
      companyName: 'DarkRoom', // 公司名称
      department: '开发部', // 所在部门
      charger: '龙猫', // 负责人
      chargerPhone: '9865321475', // 负责人电话
      address: '中国某地', // 公司地址
    });
    insertRes.then(res => {
      if (res.errcode) {
        console.log('数据库插入成功！', res.errcode);
      }
    })
  }
});


app.use(async ctx => {
  ctx.body = 'Node serve page!';
});

app.listen(8000, (req, res) => {
  console.log('Node serve listen at: 127.0.0.1:8000');
});