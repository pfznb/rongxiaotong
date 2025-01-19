<template>
    <div class="warp">
        <button class="icon" @click="frontBtn">
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
        </button>
        <div class="head">
            意见反馈
        </div>
        <div class="cen">
            <p class="center">Hi~  请输入您对平台使用的问题反馈或建议吧~</p>
            <el-input 
                type="textarea"
                :rows="8"
                placeholder="请描述您的使用问题，某个功能无法使用/不好用、流程受阻、页面卡顿、或其他产品建议（5个字以上）"
                v-model="text"
                minlength="5"
                show-word-limit
                >
                </el-input>
            <p class="image">上传相关截图，优先处理~~</p>
            <el-upload
              class="upload"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload2 icons"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </div>
            </el-upload>
            <p class="image">联系电话<span class="ps">解决过程中，方便我们与您联系</span></p>
        </div>
        <div class="but">
            <el-input v-model="input" placeholder="请输入您的电话号码"></el-input>
            <el-button type="success" round @click="showAlert">提交</el-button>
        </div>
    </div>
</template>

<script>
let Base64 = require("js-base64");
  export default {
    data() {
      return {
        input:'',
        text:'',
      };
    },
    methods: {
        frontBtn() {
      this.$router.push("/home/front").catch((err) => err);
    },
    showAlert() {
      alert('感谢您的反馈！');
    },
    }
  }
</script>

<style>
.logo-content{
      color: #035D1C;
      text-align: center;
      margin-top: 20px;
      margin-left: 60px;
    }
.logo-text{
        margin-left: 10px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
         /* justify-content: flex-start; */
         color: #035D1C;
        text-align: center;
      }
.icon{
    border: none;
    background-color: transparent;
}
.head{
    font-size: 25px;
    line-height: 25px;
    text-align: center;
}
.center{
  font-size: 18px;
}
.cen{
  width: 1200px;
  margin: 25px  80px  5px  80px;
}
.image{
  margin-top: 5px;
  height: 45px;
  font-size: 18px;
  line-height: 45px;
}
.icons{
  margin-top: 35px;
  margin-bottom: 15px;
  font-size: 35px;
  color: #40B8FF;
}
.ps{
  margin-left: 10px;
  font-size: 14px;
  color: gray;
}
.el-button{
  margin-top: 20px;
  margin-bottom: 50px;
}
.but{
  width: 200px;
  margin-left: 80px;
}
</style>