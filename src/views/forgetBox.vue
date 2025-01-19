<template>
    <div class="user-password">
      <el-form
         
        label-width="100px"
        class="demo-ruleForm"
      >
      <h2>忘记密码</h2>
        <el-form-item label="用户名：" prop="name">
          <el-input
            v-model="userName"
            style="width: 300px" 
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="name">
          <el-input
            v-model="newPassword"
            style="width: 300px" show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="name">
          <el-input
            v-model="confirmNewPassword"
            style="width: 300px" show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        style="margin-left: 300px"
        type="primary"
        @click="forgetChangePassword"
        >修改密码</el-button>
    </div>
  </template>
  
  <script>
  import { forgetPassword } from "../api/user";
  export default {
    data() {
      return {
          userName: "",
          newPassword: "",
          confirmNewPassword: "",
      };
    },
    methods: {
      forgetChangePassword() {
        if (this.newPassword === this.confirmNewPassword) {
          if (this.newPassword === "") {
            alert("新密码不能为空");
          }else{
            console.log("密码验证通过");
            forgetPassword({ 
            userName: this.userName,
            password: this.newPassword,
          }).then((res) => {

            console.log(res);
            if (res.flag == true) {
              alert(res.message);
              
              this.$router.push("/login").catch((err) => err);
              
            } else {
              alert(res.data);
            }
          });
          }
          
        } else {
          alert("新密码与确认密码不一致");
        }
      },
    },
    created() {
      this.$store.commit("updateUserActiveIndex", "1-3");
    },
  };
  </script>
  
  <style lang="less" scoped>
  .user-password {
    max-width: 475px;
  margin: 0 auto;
  margin-top: 175px;
 margin-left: 475px;
  border: 1px solid #ccc;
  border-radius: 5px;
    width: 920px;
    float: left;
    padding: 20px;
    background: #fff;
    //height: 100%;
  }
  </style>







