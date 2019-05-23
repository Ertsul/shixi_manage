<template>
  <div class="login">
    <!--  首页布局-->
    <el-container class="page-container">
      <!-- 顶部-->
      <el-header class="page-header">
        <!--  标题-->
        <div class="page-header__title">学生实习就业情况统计系统</div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
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

</style>
