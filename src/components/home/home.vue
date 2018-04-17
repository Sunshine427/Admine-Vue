<template>
  <el-container class='total'>
    <el-header class='header'>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="./logo.png" alt="">
        </div></el-col>
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple-light"><a href="#" @click.prevent="logout">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container class="big">
      <el-aside  class='aside' width="200px">
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo side-bar"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
             <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
             <el-menu-item index="/roles">角色列表</el-menu-item>
             <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
             <el-menu-item index="3-1">商品列表</el-menu-item>
             <el-menu-item index="3-2">商品分类</el-menu-item>
             <el-menu-item index="3-3">商品参数</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
             <el-menu-item index="4-1">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
             <el-menu-item index="4-1">数据列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main  class='main'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
import {removeUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 从本地存储中将token令牌删除
        removeUserInfo()
        // 跳转到登陆页
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .header{
    background-color: lightblue;
    line-height: 60px;
  }
  .total,.side-bar{
    height: 100%;
  }
  .big{
    height: 100%;
  }
  .aside{
    background-color: pink;
  }
  .main{
    background-color: #fff;
  }
</style>
