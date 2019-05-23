<template>
  <div class="home">
    <!--  首页布局-->
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
        <!--  登录状态-->
        <div class="page-header__name">您好，{{name}}</div>
      </el-header>
      <el-container class="page-main">
        <div class="page-main__status">
          <div class="page-main__status-title">
            当前状态
            <div class="page-main__status-content">{{statusTxt}}</div>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Ertsul',
        status: 0,
      }
    },
    computed: {
      statusTxt() {
        return this.status ? '实习中' : '未实习';
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
      font-size: 20px;
    }
  }

  .page-main {
    &__status {
      width: 200px;
      height: 200px;
      margin: 10px auto;
      border-radius: 8px;
      border: 1px solid #295260;
      text-align: center;
      font-size: 24px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;

      &-content {
        font-size: 26px;
        font-weight: bold;
      }
    }
  }
</style>
