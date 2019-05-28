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
          // return;
        }
        console.log('============================');
        console.log('数据库连接成功');
        console.log('============================');
        this.db = client.db(this.dbName);
        // console.log('============', this.db);
        resolve({
          type: 1
        });
      })
    });
  }

  // // 插入数据库
  async insert(colName, value) {
    return new Promise(async (resolve, reject) => {
      const col = this.db.collection(colName);
      col.insertOne(value, (err, result) => {
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
      // console.log('------------', this.db);
      const col = this.db.collection(colName);
      col.find(params).toArray((err, res) => {
        if (err) {
          reject({});
        } else {
          resolve(res);
        }
      })
      // if (params.page && params.size) {
      //   const {page, size} = params;
      //   delete params.page;
      //   delete params.size;
      //   col.find(params).skip((page - 1) * size).limit(size).toArray((err, res) => {
      //     if (err) {
      //       reject({});
      //     } else {
      //       resolve(res);
      //     }
      //   })
      // } else {
      //   col.find(params).toArray((err, res) => {
      //     if (err) {
      //       reject({});
      //     } else {
      //       resolve(res);
      //     }
      //   })
      // }
    })
  }
}

module.exports = MyMongo;