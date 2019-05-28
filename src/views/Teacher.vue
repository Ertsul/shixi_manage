<template>
  <div class="teacher-page">
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
        <!--  登录状态-->
        <div class="page-header__name">您好，{{name}}</div>
      </el-header>
      <el-container class="page-main">
        <!--  搜索区域-->
        <div class="search-wrap">
          <el-select v-if="jobType == 2" style="margin-right: 10px;" v-model="searchForm.college" placeholder="请选择院系" clearable>
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
          <el-button type="primary" size="small" style="height: 36px;">搜索</el-button>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Ertsul', // 用户名
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
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
          {
            name: '姓名1', // 姓名
            studentId: '学号1', // 学号
            myPhone: '个人电话1', // 个人电话
            companyName: '公司名称1', // 公司名称
            department: '所在部门1', // 所在部门
            charger: '负责人1', // 负责人
            chargerPhone: '负责人电话1', // 负责人电话
            address: '公司地址1', // 公司地址
          },
        ]
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

    &__name {
      font-size: 20px;
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