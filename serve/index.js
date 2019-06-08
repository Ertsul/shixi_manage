const Koa = require('koa');
const app = new Koa();
// 路由
const router = require("koa-router")();
// 获取请求参数
const bodyParser = require("koa-bodyparser");
// // 密码加密
// const crypto = require('crypto');  //加载crypto库
const sha256 = require('sha256');
// 登录认证
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
// 工具模块
const util = require('./util.js');
// 数据库
const MyMongo = require('./mongo.js');
const MongoClient = require('mongodb').MongoClient;
const dbHost = "mongodb://134.175.150.88:27018";
const dbName = "sxmanager";
const myMongo = new MyMongo(MongoClient, dbHost, dbName);
// 跨域设置
cors = require('koa-cors');

// 根目录
router.get('/', ctx => {
  ctx.cookies.set(
    'cid',
    'hello world',
    {
      domain: 'localhost',  // 写cookie所在的域名
      path: '/',       // 写cookie所在的路径
      maxAge: 1000, // cookie有效时长
      expires: new Date('2019-6-5'),  // cookie失效时间
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    }
  );
  ctx.body = 'cookie is ok'
  // ctx.body = "/ page";
});

// 学生查询
router.post('/api/studentInfo', async (ctx, next) => {
  // const payLoad = getJWTPayload(ctx.headers.authorization);
  // console.log('headers.authorization ------------- ', payLoad);
  const dbConnectType = await myMongo.connect();
  const {type} = dbConnectType;
  if (type) {
    const params = ctx.params.params;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST,GET');
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with,Authorization,Content-Type');
    const findRes = await myMongo.find('studentInfo', params);
    if (findRes) {
      ctx.body = findRes;
    } else {
      ctx.body = {
        err: 0,
        msg: '未实习'
      }
    }
  }
});

// token 测试：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMTIzIiwiZXhwIjoxNTYwMDA2MDY0LCJpYXQiOjE1NjAwMDI0NjR9.cXWI2H5LZyoVC7-I0inA6bU5wFY8EZ0w8WOi1hB_oZE

// 注册
router.post('/api/register', async (ctx, next) => {
  const dbConnectType = await myMongo.connect();
  const {type} = dbConnectType;
  if (type) {
    const params = ctx.params;
    console.log('register', params.params);
    const {type, name = '', studentId = '', password = '', college = '', clas = ''} = params.params;
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
      console.log('---------------');
      const params1 = {
        name,
        studentId,
        password,
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

// 登录
router.post('/api/login', async (ctx, next) => {
  const params = ctx.params;
  console.log(ctx.params);

  const {name, password, type} = params.params;
  const ifNull = !(name && password && type);
  if (ifNull) {
    ctx.body = {
      err: 0,
      msg: '登录数据不全'
    };
    return 0;
  }
  // 数据库
  const dbConnectType = await myMongo.connect();
  const {type: dbType} = dbConnectType;
  if (dbType) {
    const findRes = await myMongo.find('studentList', {
      name: name
    });
    console.log('typetype', dbType, findRes, password);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST,GET');
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with,Authorization,Content-Type');
    if (findRes) {
      const {password: dbPwd} = findRes[0]; // 查询数据库
      if (String(dbPwd) == String(password)) {
        ctx.body = {
          err: 1,
          msg: '登录成功',
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign({
            data: name,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour， 登录一个小时后token失效
          }, 'secret'),
        }
      } else {
        ctx.body = {
          err: 0,
          msg: '密码错误'
        }
      }
    } else {
      ctx.body = {
        err: 0,
        msg: '查无此人'
      }
    }
  }
});

// 更新
router.post('/api/update', async (ctx, next) => {
  const dbConnectType = await myMongo.connect();
  const {type} = dbConnectType;
  if (type) {
    const params = ctx.params;
    /**
     * params 数组
     * 0: 数据库查找值
     * 1: 数据库更新值
     */
    const updateRes = await myMongo.update('studentInfo', params[0], params[1]);
    console.log('---------', updateRes);
    if (updateRes.err == 1) {
      ctx.body = updateRes
    } else {
      ctx.body = updateRes
    }
  }
});

app
  .use(cors())
  .use(bodyParser())
  .use(async (ctx, next) => {
    ctx.params = {
      ...ctx.request.body,
      ...ctx.query
    };
    await next();
  }) // 添加中间件，将请求参数 params 注册到ctx，该中间件要放在 bodyParser 之后
  // token 认证中间件
  .use(jwt({secret: 'secret'}).unless({
      path: [
        /^\/api\/login/,
        /^\/api\/register/,
        /^((?!\/api).)*$/
      ]
    }
  ))
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8000, (req, res) => {
  console.log('Node serve listen at: 127.0.0.1:8000');
});