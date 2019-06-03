const Koa = require('koa');
const app = new Koa();

const router = require("koa-router")();

const bodyParser = require("koa-bodyparser");

// // 密码加密
// const crypto = require('crypto');  //加载crypto库

const sha256 = require('sha256');

// 工具木块
const util = require('./util.js');

// 数据库
const MyMongo = require('./mongo.js');
const MongoClient = require('mongodb').MongoClient;
const dbHost = "mongodb://134.175.150.88:27018";
const dbName = "sxmanager";
const myMongo = new MyMongo(MongoClient, dbHost, dbName);


router.get('/', ctx => {
  ctx.body = "/ page";
});

// 学生查询
router.post('/studentList', async (ctx, next) => {
  const dbConnectType = await myMongo.connect();
  const {type} = dbConnectType;
  if (type) {
    const params = ctx.params;
    const findRes = await myMongo.find('studentInfo', params);
    if (findRes) {
      ctx.body = findRes;
      next();
    }
  }
});

// 注册
router.post('/register', async (ctx, next) => {
  const dbConnectType = await myMongo.connect();
  const {type} = dbConnectType;
  if (type) {
    const params = ctx.params;
    const {type, name = '', studentId = '', password = '', college = '', clas = ''} = params;
    const isFullInfo = Boolean(name && studentId && password && college && clas); // 判断信息填写完整
    if (!isFullInfo) {
      ctx.body = {
        type: 0,
        msg: 'msg exit null'
      };
      return;
    }
    // 判断注册的类型：1 学生 2 辅导员 3 学生处
    if (Number(type) === 1) {
      const params1 = {
        name,
        studentId,
        // password,
        college,
        clas,
        status: 0, // 默认状态为 0 ， 未实习
      };
      console.log('params', params);
      const insertRes = await myMongo.insert('studentList', params1);
      const {errcode} = insertRes;
      if (errcode) {
        ctx.body = {
          type: 1,
          msg: 'register right'
        }
      }
      // 加盐
      const salt = util.genRandomString(16);
      const secret = sha256(
        sha256(name + sha256(password + salt)) + salt + sha256(name + salt)
      );
      console.log('secret', secret);
      const saltRes = await myMongo.insert('studentSalt', {
        name,
        salt
      });
      const {errcode: errcode1} = saltRes;
      if (errcode1) {
        console.log('----------------------- \n 加盐成功！');
      }
    }
  }
});


app
  .use(bodyParser())
  .use(async (ctx, next) => {
    ctx.params = {
      ...ctx.request.body,
      ...ctx.query
    };
    await next();
  }) // 添加中间件，将请求参数 params 注册到ctx，该中间件要放在 bodyParser 之后
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8000, (req, res) => {
  console.log('Node serve listen at: 127.0.0.1:8000');
});