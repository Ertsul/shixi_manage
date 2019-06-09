<template>
  <div class="login">
    <!--  首页布局-->
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
      </el-header>
      <!-- 登录-->
      <div class="login-box">
        <img src="../assets/login_user.png"/>
        <!-- 登录-->
        <el-form style="width: 100%;text-align: center;" v-if="pageType === 1">
          <el-form-item label="">
            <el-radio v-model="loginForm.jobType" label="1">学生</el-radio>
            <el-radio v-model="loginForm.jobType" label="2">辅导员</el-radio>
            <el-radio v-model="loginForm.jobType" label="3">学生处</el-radio>
          </el-form-item>
          <el-form-item label="学号" label-width="16%" v-if="loginForm.jobType == 1">
            <el-input v-model="loginForm.studentId" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="16%">
            <el-input v-model="loginForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="16%">
            <el-input v-model="loginForm.password" type="password" clearable></el-input>
          </el-form-item>
        </el-form>
        <!-- 注册-->
        <el-form style="width: 100%;text-align: center;" v-if="pageType === 0">
          <el-form-item label="学号" label-width="20%" v-if="loginForm.jobType == 1">
            <el-input v-model="registerForm.studentId" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="20%">
            <el-input v-model="registerForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="20%">
            <el-input v-model="registerForm.password" type="password" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="20%">
            <el-input v-model="registerForm.ensurePwd" type="password" clearable></el-input>
          </el-form-item>
          <el-form-item label="院系" label-width="20%" v-if="loginForm.jobType != 3">
            <el-select v-model="registerForm.college" placeholder="请选择院系" clearable>
              <el-option
                  v-for="item in colleges"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" label-width="20%" v-if="loginForm.jobType == 1">
            <el-select v-model="registerForm.class" placeholder="请选择班级" clearable>
              <el-option
                  v-for="item in classes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="login" style="width: 60%;" v-if="pageType === 1">登录</el-button>
        <el-button @click="register" style="width: 60%;" v-if="pageType === 0">注册</el-button>
        <div class="register" v-if="pageType === 1" @click="goRegister">&gt;&gt;&nbsp;注册</div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import {aRegister, aLogin, atRegister, atLogin} from '../config/api.js';

  export default {
    data() {
      return {
        loginForm: { // 登录信息
          name: '',
          studentId: '',
          password: '',
          jobType: '1'
        },
        registerForm: { // 注册信息
          name: '',
          studentId: '',
          password: '',
          ensurePwd: '', // 确认密码
          college: '', // 学院
          class: '' // 班级
        },
        pageType: 1, // 页面类型 0 ： 注册 ； 1 ： 登录
        colleges: [{ // 院系
          value: 'it',
          label: '信息科学与工程学院'
        }, {
          value: 'literature',
          label: '文学院'
        }],
        classes: [{ // 班级
          value: 'communication',
          label: '15通信工程2班'
        }, {
          value: 'softwave',
          label: '15软件工程2班'
        }],
      }
    },
    created() {
      localStorage.clear();
    },
    methods: {
      /**
       * 登录
       */
      login() {
        console.warn('登录', this.loginForm);
        const {
          name,
          password,
          jobType
        } = this.loginForm;
        const ifNull = !(name && password && jobType);
        if (ifNull) {
          this.$message({
            message: '登录信息不能为空',
            type: 'warning'
          });
          return 0;
        }
        if (jobType == 1) { // 学生登录
          aLogin({name, password, type: 1})
            .then(res => {
              console.log(res);
              const {err, msg, token, data} = res.data;
              if (err && msg && token) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                localStorage.setItem('userInfo', JSON.stringify({
                  data,
                  token
                }));
                this.$router.push({path: '/Student'});
              } else {
                this.$message({
                  message: '登录失败',
                  type: 'warn'
                });
              }
            })
            .catch(_ => {
              this.$message({
                message: '登录失败',
                type: 'warn'
              });
            });
        } else {
          atLogin({name, password, type: 1})
            .then(res => {
              console.log(res);
              let {err, msg, token, data} = res.data;
              if (err && msg && token) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                delete data.password;
                localStorage.setItem('userInfo', JSON.stringify({
                  data,
                  token
                }));
                let type = 1;
                if (jobType == 3) { // 辅导员
                  type = 2;
                }
                this.$router.push({path: '/Teacher', query: type});
              } else {
                this.$message({
                  message: '登录失败',
                  type: 'warn'
                });
              }
            })
            .catch(_ => {
              this.$message({
                message: '登录失败',
                type: 'warn'
              });
            });

        }
      },
      /**
       * 注册
       */
      register() {
        console.warn('注册', this.registerForm, this.loginForm.jobType);
        if (this.loginForm.jobType == 1) {
          const {name, studentId, password, college, class: clas, ensurePwd} = this.registerForm;
          if (!(name && studentId && password && college && clas)) {
            this.$message({
              message: '注册信息不能为空',
              type: 'warning'
            });
            return 0;
          }
          if (password !== ensurePwd) {
            this.$message({
              message: '两次输入的密码不一致',
              type: 'warning'
            });
            return 0;
          }
          console.warn('学生注册');
          aRegister({name, studentId, password, college, clas, status: 0, type: 1})
            .then(res => {
              // console.error('res', res);
              const {msg, type} = res.data;
              if (msg === 'register right' && type === 1) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.pageType = 1;
                }, 250)
              } else {
                this.$message({
                  message: '注册失败',
                  type: 'warning'
                });
              }
            })
        } else {
          let params = {};
          console.warn('教师注册', this.registerForm);
          if (this.loginForm.jobType == 2) { // 辅导员注册
            const {name, password, college, ensurePwd} = this.registerForm;
            if (!(name && password && college)) {
              this.$message({
                message: '注册信息不能为空',
                type: 'warning'
              });
              return 0;
            }
            if (password !== ensurePwd) {
              this.$message({
                message: '两次输入的密码不一致',
                type: 'warning'
              });
              return 0;
            }
            params = {name, password, college, type: 2};
          } else if (this.loginForm.jobType == 3) {
            const {name, password, ensurePwd} = this.registerForm;
            if (!(name && password)) {
              this.$message({
                message: '注册信息不能为空',
                type: 'warning'
              });
              return 0;
            }
            if (password !== ensurePwd) {
              this.$message({
                message: '两次输入的密码不一致',
                type: 'warning'
              });
              return 0;
            }
            params = {name, password, type: 3};
          }
          atRegister(params)
            .then(res => {
              // console.error('res', res);
              const {msg, type} = res.data;
              if (msg === 'register right' && type === 1) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.pageType = 1;
                }, 250)
              } else {
                this.$message({
                  message: '注册失败',
                  type: 'warning'
                });
              }
            })
        }
      },
      /**
       * 切换注册页面
       */
      goRegister() {
        console.warn('切换注册页面');
        this.pageType = 0;
      }
    }
  }
</script>

<style lang="scss">
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
  }

  .login-box {
    position: relative;
    width: 360px;
    /*height: 300px;*/
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    margin: 40px auto;
    text-align: center;
    padding: 20px;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 20px;
    }

    .register {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
        border-bottom: 1px solid silver;
      }
    }
  }

</style>
