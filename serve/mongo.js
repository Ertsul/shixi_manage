const assert = require("assert");

class MyMongo {
  constructor(MongoClient, dbHost, dbName) {
    this.MongoClient = MongoClient;
    this.dbHost = dbHost;
    this.dbName = dbName;
    this.db = null;
  }

  // 数据库连接
  connect() {
    return new Promise((resolve, reject) => {
      this.MongoClient.connect(this.dbHost, (err, client) => {
        if (err) {
          console.log('数据库连接出错', err);
          reject({
            type: 0
          });
        }
        console.log('============================\t数据库连接成功');
        this.db = client.db(this.dbName);
        resolve({
          type: 1
        });
      })
    });
  }

  // 关闭数据库连接
  close() {
    console.log('============================\t数据库连接关闭');
    this.db.close();
  }

  // // 插入数据库
  async insert(colName, value) {
    return new Promise(async (resolve, reject) => {
      const col = this.db.collection(colName);
      col.insertOne(value, (err, result) => {
        // this.db.close();
        // this.close();
        if (err) {
          reject({
            errcode: 0
          })
        } else {
          resolve({
            errcode: 1
          })
        }
      })
    })
  }

  // 查找数据库
  async find(colName, params) {
    return new Promise(async (resolve, reject) => {
      const col = this.db.collection(colName);
      if (params.page && params.size) { // 分页查询
        const {page, size} = params;
        delete params.page;
        delete params.size;
        col.find(params).skip((page - 1) * size).limit(size).toArray((err, res) => {
          // this.close();
          if (err) {
            reject({
              err: 0,
              msg: '未实习'
            });
          } else {
            resolve({
              err: 1,
              data: res
            });
          }
        })
      } else {
        col.find(params).toArray((err, res) => {
          // this.close();
          if (err) {
            reject({});
          } else {
            resolve(res);
          }
        })
      }
    })
  }

  // 更新数据库
  async update(colName, params, updateParams) {
    return new Promise((resolve, reject) => {
      const col = this.db.collection(colName);
      // console.log('col', col);
      col.updateOne(params, {$set: updateParams}, (err, result) => {
        if (err) {
          reject({
            err: 0,
            msg: '更新数据失败'
          });
        } else {
          resolve({
            err: 1,
            msg: '更新数据成功'
          });
        }
      })
    })
  }
}

module.exports = MyMongo;