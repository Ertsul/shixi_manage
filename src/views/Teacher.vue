<template>
  <div class="teacher-page">
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
        <!--  登录状态-->
        <div class="page-header__name">您好，{{userInfo.name}}</div>
        <div class="page-header__exit" @click="exitLogin">退出登录</div>
      </el-header>
      <el-container class="page-main">
        <!--  搜索区域-->
        <div class="search-wrap">
          <el-select v-if="jobType == 2" style="margin-right: 10px;" v-model="searchForm.college" placeholder="请选择院系"
                     clearable>
            <el-option
                v-for="item in colleges"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select style="margin-right: 10px;" v-model="searchForm.class" placeholder="请选择班级" clearable>
            <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input style="margin-right: 10px;" class="search-wrap__input" placeholder="输入姓名..."
                    v-model="searchForm.name" clearable></el-input>
          <el-button type="primary" size="small" style="height: 36px;" @click="search">搜索</el-button>
        </div>
      </el-container>
      <el-table
          :data="searchResult"
          style="width: 90%; margin: 20px auto;">
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="studentId"
            label="学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="myPhone"
            label="个人电话"
            width="180">
        </el-table-column>
        <el-table-column
            prop="companyName"
            label="公司名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="department"
            label="部门"
            width="180">
        </el-table-column>
        <el-table-column
            prop="charger"
            label="负责人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="chargerPhone"
            label="负责人电话"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>

  import {aStudentInfo} from '../config/api.js';

  export default {
    data() {
      return {
        name: '', // 用户名
        jobType: '2', // 职位类型： 0： 学生； 1： 辅导员； 2： 学生处
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
        searchForm: { // 搜索内容
          name: '',
          college: '',
          class: ''
        },
        userInfo: {
          name: '',
          college: ''
        },
        searchResult: [ // 搜索结果
          // {
          //   name: '姓名', // 姓名
          //   studentId: '学号', // 学号
          //   myPhone: '个人电话', // 个人电话
          //   companyName: '公司名称', // 公司名称
          //   department: '所在部门', // 所在部门
          //   charger: '负责人', // 负责人
          //   chargerPhone: '负责人电话', // 负责人电话
          //   address: '公司地址', // 公司地址 }
        ]
      }
    },
    created() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')).data;
      console.error('teacher page', userInfo);
      this.userInfo = userInfo;
      if (userInfo.college) {
        this.jobType = 1;
        this.searchForm.college = userInfo.college;
      } else {
        this.jobType = 2;
      }
      this.search();
    },
    methods: {
      search() {
        const {name, class: clas, college} = this.searchForm;
        console.warn('search', name, this.searchForm);
        let params = {};
        if (name) {
          params.name = name;
        }
        if (clas) {
          params.clas = clas;
        }
        if (college) {
          params.college = college;
        }
        aStudentInfo({
          params
        }).then(res => {
          this.searchResult = res.data;
          console.error('res', res, this.searchResult);
        })
      },
      exitLogin() {
        localStorage.setItem('userInfo', '');
        this.$router.push({path: '/Login'});
      }
    },
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

    &__name {
      margin-right: -54%;
      font-size: 20px;
    }

    &__exit {
      font-size: 16px;
    }
  }

  .search-wrap {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
    line-height: 60px;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &__input {
      width: 200px;
    }
  }
</style>