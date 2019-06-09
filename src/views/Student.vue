<template>
  <div class="home">
    <!--  布局-->
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
        <!--  登录状态-->
        <div class="page-header__name">您好，{{name}}</div>
        <div class="page-header__exit" @click="exitLogin">退出登录</div>
      </el-header>
      <el-container class="page-main">
        <!-- 当前状态-->
        <div class="page-main__status">
          <div class="page-main__status-title">
            当前状态
            <div class="page-main__status-content">{{statusTxt}}</div>
          </div>
        </div>
      </el-container>
      <!-- 实习信息-->
      <h3 v-if="formInfo.name">我的信息</h3>
      <div class="information" v-if="formInfo.name" v-for="(item, index) in formInfo" :key="index">
        <div class="information-label" style="font-weight: bold;">
          {{formInfoMap[index]}}
        </div>
        <div class="information-value">
          {{item}}
        </div>
      </div>
      <!-- 更改状态按钮-->
      <el-button type="primary" class="page-main__button" @click="changeStatus" v-if="!status">更改状态</el-button>
      <el-button type="primary" class="page-main__button" @click="changeInfo" v-else>更改信息</el-button>
    </el-container>
    <el-dialog
        title="填写实习信息"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="dialogClose">
      <el-form :model="formInfo">
        <el-form-item label="姓名" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.name" autocomplete="off" maxlength="8"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="学号" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.studentId" autocomplete="off" maxlength="20"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="个人联系方式" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.myPhone" autocomplete="off" maxlength="20"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.companyName" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="所在部门" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.department" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.charger" autocomplete="off" maxlength="8"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" label-width="16%" required>
          <el-input class="width-8-p" style="width: 80%;" v-model="formInfo.chargerPhone" autocomplete="off"
                    maxlength="20"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="公司地址" label-width="16%" required>
          <el-input class="width-8-p" type="textarea" style="width: 80%;" v-model="formInfo.address" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-button plain class="dialog-btn" @click="cancleChangeStatus">取消</el-button>
        <el-button type="primary" class="dialog-btn" @click="ensureChangeStatus">确定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {aStudentInfo, aUpdateStudentInfo, aInsertStudentInfo} from '../config/api.js';

  export default {
    data() {
      return {
        name: 'Ertsul', // 用户名
        status: 0, // 实习状态 ==> 0 ： 未实习 ； 1 : 实习中
        dialogVisible: false, // 填写实习信息对话框
        // formInfo: { // 实习信息
        //   name: '1', // 姓名
        //   studentId: '2', // 学号
        //   myPhone: '3', // 个人电话
        //   companyName: '4', // 公司名称
        //   address: '5', // 公司地址
        //   department: '6', // 所在部门
        //   charger: '7', // 负责人
        //   chargerPhone: '8' // 负责人电话
        // },
        formInfo: { // 实习信息
          name: '', // 姓名
          studentId: '', // 学号
          myPhone: '', // 个人电话
          companyName: '', // 公司名称
          department: '', // 所在部门
          charger: '', // 负责人
          chargerPhone: '', // 负责人电话
          address: '', // 公司地址
        },
        formInfo1: { // 实习信息
          name: '', // 姓名
          studentId: '', // 学号
          myPhone: '', // 个人电话
          companyName: '', // 公司名称
          department: '', // 所在部门
          charger: '', // 负责人
          chargerPhone: '', // 负责人电话
          address: '', // 公司地址
        },
        formInfoMap: { // 实习信息
          name: '姓名', // 姓名
          studentId: '学号', // 学号
          myPhone: '个人电话', // 个人电话
          companyName: '公司名称', // 公司名称
          department: '所在部门', // 所在部门
          charger: '负责人', // 负责人
          chargerPhone: '负责人电话', // 负责人电话
          address: '公司地址', // 公司地址
        },
      }
    },
    created() {
      if (localStorage.getItem('userInfo')) {
        const {data, token} = JSON.parse(localStorage.getItem('userInfo'));
        this.token = token;
        this.name = data.name;
        this.college = data.college;
        this.clas = data.clas;
        aStudentInfo({
          params: {
            name:this.name
          }
        }).then(res => {
          console.error('res', res);
          if (!res.data.length) {
            this.status = 0;
          } else {
            this.status = 1;
            console.log(res.data);
            const {name, studentId, myPhone, companyName, department, charger, chargerPhone, address} = res.data[0];
            // console.log(res.data[0], name, studentId, myPhone, companyName, department, charger, chargerPhone, address);
            this.formInfo = {
              name, studentId, myPhone, companyName, department, charger, chargerPhone, address
            };
            this.formInfo1 = JSON.parse(JSON.stringify(this.formInfo))
          }
        })
      } else {
        this.$router.push({path: '/Login'});
      }
    },
    computed: {
      statusTxt() {
        return this.status ? '实习中' : '未实习';
      }
    },
    methods: {
      /**
       * 更改状态
       */
      changeStatus() {
        console.log('更改状态 - changeStatus');
        this.dialogVisible = true;
      },
      /**
       * 更改信息
       */
      changeInfo() {
        console.log('更改信息 - changeInfo');
        // this.status = 1;
        this.dialogVisible = true;
      },
      /**
       * 关闭弹框
       */
      dialogClose() {
        this.dialogVisible = false;
      },
      /**
       * 取消更改状态
       */
      cancleChangeStatus() {
        if (!this.status) {
          this.resetForm();
        } else {
          this.formInfo = JSON.parse(JSON.stringify(this.formInfo1));
        }
        this.dialogClose();
      },
      /**
       * 确定弹框输入框内容，更改当前状态
       */
      ensureChangeStatus() {
        const {name, studentId, myPhone, companyName,  address, department, charger, chargerPhone} = this.formInfo;
        const notAllWrite = !(name && studentId && myPhone && companyName && address && department && charger && chargerPhone); // 信息没有全部填写
        if (notAllWrite) {
          this.$message({
            showClose: true,
            message: '请填写所有带 * 的信息',
            type: 'error'
          });
          return;
        }
        // this.formInfo.college =this.formInfo1.college;
        // this.formInfo.clas =this.formInfo1.clas;
        if (this.status) {
          aUpdateStudentInfo([
            this.formInfo1, // 源数据
            {name, studentId, college: this.college, clas:this.clas, myPhone, companyName, address, department, charger, chargerPhone} // 更新数据
          ]).then(res => {
            console.error(res);
            const {err, msg} = res.data;
            const updateType = err == 1 && msg == '更新数据成功';
            if (updateType) {
              this.$message({
                message: '更新数据成功',
                type: 'success'
              });
              this.dialogClose();
            } else {
              this.$message({
                message: '更新数据失败',
                type: 'warn'
              });
            }
          })
        } else {
          aInsertStudentInfo({name, studentId, myPhone, clas: this.clas, college: this.college, companyName, address, department, charger, chargerPhone})
            .then(res => {
              console.error('res', res);
              this.dialogClose();
            })
        }
        // this.dialogVisible = false;
        // this.status = true;
        // console.log('确定更改 - ensureChangeStatus');
      },
      /**
       * 取消弹框输入框内容
       */
      resetForm() {
        this.formInfo = { // 实习信息
          name: '', // 姓名
          studentId: '', // 学号
          myPhone: '', // 个人电话
          companyName: '', // 公司名称
          address: '', // 公司地址
          department: '', // 所在部门
          charger: '', // 负责人
          chargerPhone: '' // 负责人电话
        }
      },
      /**
       * 退出登录
       */
      exitLogin() {
        localStorage.setItem('userInfo', '');
        this.$router.push({path: '/Login'});
      }
    }
  }
</script>

<style lang="scss">

  .home {
    width: 96%;
    margin: 0 auto;

  }

  .page-container {
    width: 100%;
  }

  .page-header {
    height: 100px;
    background-color: #303133;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 26px;
    border-radius: 4px;
    cursor: pointer;

    &__title {
      transition: 0.6s;

      &:hover {
        color: silver;
      }
    }

    &__name {
      margin-right: -54%;
      font-size: 20px;
    }

    &__exit {
      font-size: 16px;
    }
  }

  .page-main {
    &__status {
      width: 200px;
      height: 200px;
      margin: 10px auto;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      box-shadow: 0 0 4px rgba(0, 0, 0, .4);

      &-content {
        font-size: 26px;
        font-weight: bold;
      }
    }

    &__button {
      margin: 10px auto;
      width: 200px;
    }
  }

  .width-8-p {
    width: 80%;
  }

  .dialog-btn {
    width: 160px;
    font-size: 18px;
  }

  .information {
    width: 40%;
    margin: 1px auto;
    text-align: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dedede;
    background-color: rgba(0, 0, 0, .1);
    transition: 0.4s;
    cursor: pointer;
    border-radius: 4px;

    &-label {
      height: 40px;
      width: 25%;
      text-align: center;
      line-height: 50px;
    }

    &-value {
      min-height: 40px;
      width: 75%;
      text-align: center;
      line-height: 40px;
      word-wrap: break-word;
      word-break: normal;
      padding: 6px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, .2);
    }
  }

</style>
