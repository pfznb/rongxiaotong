<template>
  <div class="navigation-bar">
    <span class="initiator">
      <div class="logo-content">
        <div style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;">
          <img src="../assets/img/logo.png" style="height:50px;" alt="" />
          <div class="logo-text">
            <div>融销通</div>
            <div style="font-size:12px;margin-top:5px;color: #666;">
              农产品融销一体平台
            </div>
          </div>
          
        </div>
        
      </div>
      <div class="userin" v-if="$store.state.loginUserNickname == ''">
        <span @click="Login" class="login">登录</span> |
        <span @click="Register" class="register">注册</span>
      </div>
      <div class="userlogin" v-else >
        <button @click="userPage" class="nick">
          <img src="person.png" alt="" class="image">
          {{ userNickname }}</button>
      </div>
    </span>
    <div class="menu-content" v-cloak>
      <el-menu
        :default-active="$store.state.activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#668d2f"
        text-color="#fff"
        active-text-color="#fff"
        id="menu">
        <el-menu-item index="1" class="item" @click="frontBtn">首页</el-menu-item>
        <el-menu-item index="2" class="item" @click="goodsBtn">商品货源</el-menu-item>
        <el-menu-item index="3" class="item" @click="purchaseBtn">求购需求</el-menu-item>
        <el-menu-item index="4" class="item" @click="knowledgesBtn">农业知识</el-menu-item>
        <el-menu-item index="5" class="item" @click="guideBtn">专家指导</el-menu-item>
        <el-menu-item index="6" class="item" @click="shopCartBtn">购物车</el-menu-item>
        <el-submenu index="7">
          <template slot="title">融资申请</template>
          <el-menu-item index="7-1" @click.native="smartMatchBtn">智能匹配</el-menu-item>
          <el-menu-item index="7-2" @click.native="financingBtn">融资申请</el-menu-item>
        </el-submenu>
        <div class="userin" v-if="$store.state.loginUserNickname == ''"></div>
        <el-submenu index="8" v-else>
          <template slot="title">设置</template>
          <!--   -->
          <el-menu-item index="8-1" @click.native="userPage">个人中心</el-menu-item>
          <el-menu-item index="8-3" @click="userManage" v-if="$store.getters.isAdmin">用户管理</el-menu-item>
          <el-menu-item index="8-4" @click.native="goodsManage" v-if="$store.getters.isAdmin">商品管理</el-menu-item>
          <el-menu-item index="8-5" @click.native="handleAbout">关于我们</el-menu-item>
          <el-menu-item index="8-6" @click.native="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="sticky">
      <button class="el-icon-star-off size"  @click="collectBtn" >
        <p class="icon">收藏</p>
      </button>
        <button class="el-icon-service size">
          <p class="icon">客服</p>
        </button>
        <button class="el-icon-edit-outline size"  @click="openMessage">
          <p class="icon">反馈</p>
        </button>
          <a href="https://www.12377.cn/?spm=a21bo.jianhua.20220530.3.5af92a89YOtpzp" class="link">
            <button class="el-icon-warning-outline size"></button>
            <p class="icones">举报</p></a>
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64");
export default {
  data() {
    return {
      avatar: "",
    };
  },
  computed: {
    userNickname() {
      return this.$store.state.loginUserNickname;
    }
  },
  methods: {
    handleSelect(key, keyPath) {},
    Login() {
      this.$router.push("/login");
    },
    Register() {
      this.$router.push("/register");
    },
    logout() {
      this.$store.commit("updateLoginUserNickname", "");
      this.$store.commit("removeStorage");
      this.$router.push("/home").catch((err) => err);
      if (sessionStorage.getItem("/order/needs/pageCode")) {
        sessionStorage.removeItem("/order/needs/pageCode");
      }
      if (sessionStorage.getItem("/order/goods/pageCode")) {
        sessionStorage.removeItem("/order/goods/pageCode");
      }
      if (sessionStorage.getItem("/user/search/pageCode")) {
        sessionStorage.removeItem("/user/search/pageCode");
      }
    },
    frontBtn() {
      this.$router.push("/home/front").catch((err) => err);
    },
    purchaseBtn() {
      this.$router.push("/home/purchase").catch((err) => err);
    },
    goodsBtn() {
      this.$router.push("/home/goods").catch((err) => err);
    },
    knowledgesBtn() {
      this.$router.push("/home/knowledge").catch((err) => err);
    },
    collectBtn(){
      this.$router.push("/home/collect").catch((err) => err);
    },
    guideBtn() {
      this.$router.push("/home/guide").catch((err) => err);
    },
    shopCartBtn() {
      this.$router.push("/home/shopcart").catch((err) => err);
    },
    userPage() {
      this.$router.push("/home/user").catch((err) => err);
      // console.log(JSON.parse(res).nickname);
    },
    addMessagePage() {
      this.$router.push("/home/addmessage").catch((err) => err);
    },
    handleAbout() {
      this.$router.push("/home/aboutUs").catch((err) => err);
    },
    goodsManage(){
      this.$router.push("/home/userGood/publishedgoodsAdmin").catch((err) => err)
    },
    userManage(){
      this.$router.push("/home/usermanage").catch((err) => err);
    },
    financingBtn() {
      this.$router.push("/home/financing").catch((err) => err);
    },
    smartMatchBtn() {
      this.$router.push("/home/smartMatch").catch((err) => err);
    },
    openMessage(){
      this.$router.push("/message").catch((err) => err);
    }
  },
  created() {
    this.$store.commit("updateActiveIndex", "1");
    if (window.localStorage.token) {
      let token = window.localStorage.token;
      let arr = token.split(".");
      let res = Base64.decode(arr[1]);
      this.$store.commit("updateLoginUserNickname",  JSON.parse(res).sub);
      this.$store.commit("updateLoginUserAvatar", JSON.parse(res).avatar);
      this.$store.commit("updateRole", JSON.parse(res).role);
    }
  },
};
</script>

<style lang="less" scoped>
.navigation-bar {
  width: 100%;
  .initiator{
    width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #035D1C;
    padding: 5px 20px;
    .logo-content{
      color: #035D1C;
      text-align: center;
      .logo-text{
        margin-left: 10px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        // justify-content: flex-start;
      }
    }
  }
  .menu-content{
    height: 42px;
    background-color: #668d2f !important;
  }
  .el-menu {
    width: 1100px;
    margin: 0 auto;
    height: 40px;
    .el-menu-item {
      background-color: #668d2f !important;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      margin-right: 34px;
    }
    .el-submenu {
      .template {
        background-color: #668d2f !important;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
      .el-submenu__title {
        line-height: 40px;
        height: 40px;
        background-color: #668d2f;
      }
      .el-menu-item {
        background-color: #668d2f !important;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
      background-color: #668d2f !important;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
  .login{
    cursor: pointer;
  }
  .register{
    cursor: pointer;
  }
}
.el-menu.el-menu--horizontal{
  border-bottom: none;
}
.menu-content /deep/ .el-submenu__title i{
  color: #fff;
}
[v-cloak] {
  display: none;
}
.image{
  height: 32px;
  width: 32px;
  margin-right: 7px;
}
.nick{
  border: none;
  background: transparent;
  // padding-top: 20px;
  font-size: 18px;
  line-height: 18px;
}
.sticky{
  position: fixed;
  width: 70px;
  height: 300px;
  left: 50%;
  margin-left: 593px;
  top: 200px; /* 指定div距离顶部的位置 */
  border-radius: 20px 0 0 20px;
  padding: 10px; /* 内边距,根据需要进行修改 */
  background-color: #fff;
  box-shadow: -3px 2px 7px rgba(0, 0, 0, 0.2);
}
.size{
  font-size: 35px;
  background-color: #fff;
  border: none;
  margin: 5px 0 5px 5px;
}
.icon{
  font-size: 10px;
}
.icones{
  font-size: 10px;
  text-align: center;
}
.link{
  color: black;
}
</style>