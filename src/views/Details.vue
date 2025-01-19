<template>
  <div class="details-box">
    <div class="left">
      <img v-if="data.picture" :src="`../order/${data.picture}`" alt="" />
      <img v-else src="../assets/img/wutu.gif" alt="" style="border:1px solid #f2f2f2;"/>
    </div>

    <div class="info">
      <h4 class="title">{{ data.title }}</h4>
      <div class="content" :title="data.content">{{ data.content }}</div>
      <span class="price">￥{{ data.price }}</span>
      <div class="time">
        <span style="margin-right:30px;">发布时间：{{ data.createTime | changeTime }}</span>
        <span>最近修改时间：{{ data.updateTime | changeTime }}</span>
      </div>
      <div class="item-style">
        <div class="operation">

          <div class="operation-item"><img id="aa" src="/img/good.png" class="operation-img" alt="" @click="like"/> 点赞</div>
          <div class="operation-item"><img id="bb" src="/img/no-star.png" class="operation-img" alt="" @click="like2"/> 收藏</div>
          <!-- <div class="operation-item"><img src="../assets/img/fill-in.png" class="operation-img" alt="" />评论</div> -->
          <el-badge :value="commentArray.length" class="item">
            <a href="#1" class="bor">评论</a>
          </el-badge>
        </div>
        <div class="btn-content">
          <el-button type="danger" @click="addShopcartClick" v-if="data.type == 'goods'">加入购物车</el-button>
          <el-popover placement="right" width="320" trigger="hover">
            <div>
              <div class="item-sales">卖家姓名：<span class="sales-text">{{updateUserData.userName}}</span></div>
              <div class="item-sales">卖家地址：<span class="sales-text">{{updateUserData.address}}</span></div>
              <div class="item-sales">卖家手机号码：<span class="sales-text">{{updateUserData.phone}}</span></div>
              <div class="item-sales">更新时间：<span class="sales-text">{{updateUserData.updateTime | formatTimer}}</span></div>
            </div>
            <el-button type="danger" slot="reference" @click.once="changeInfo(item.orderId)" v-show="data.type == 'needs'">联系买家</el-button>
          </el-popover>
        </div>
      </div>

    </div>
    <div class="but">
      <div class="app">
        <!-- 评论更改 -->
        <div style="width: 900px"><el-input type="textarea" v-model="content" :cols="1000"
                                            :rows="8"
                    id="comment"></el-input></div>
        <div style="margin-top:20px;display: flex;flex-direction: row;justify-content: flex-end;
        width: 900px">
          <el-button type="success" @click="handleComment" style="float: right">添加评论</el-button>
        </div>
        <!-- 评论内容 -->
      </div>

      <div class="comment-container" style="width: 900px">
        <div class="comment-num" id="1">评论共{{commentArray.length||0}}条</div>
        <div class="comment-item" v-for="(item,index) in commentArray" :key="index">
          <div>{{item.content}}</div>
          <div class="comment-tips">
            <div style="margin-right:40px;">评论人：<span class="color6">{{item.ownName}}</span></div>
            <div>评论时间：<span class="color6">{{item.createTime|formatTimer2}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { addOrderToCart,addOrderToCollect } from "../api/cart";
import { selectOrderById,selectComment,addComment } from "../api/order";
import ChangeMessage from "../components/ChangeMessage.vue";
import { selectUserByUsername } from "../api/user";

export default {
  data() {
    return {

      content:'',
      commentArray:[],
      imgUrl: '../img/good',
      data: [],
      ownerInfo: {},
      userGoods: [],
      updateGoodInfo: {},
      updateUserData:{},



    };
  },
  filters: {
    changeTime(time) {
      return time.slice(0, 10);
    },
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " ";
    },
    formatTimer2: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " "+h+":"+m;
    }
  },
  components: { ChangeMessage },
  props: {
    ctype: {
      type: String,
    },
    cdesciibe: {
      type: String,
    },
  },
  methods: {
    // 查询评论
    getCommentData(){
      selectComment({
        orderId: this.$route.query.orderId
      }).then(res => {
        this.commentArray = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    handleComment(){
      if(this.content===''){
        this.$message.error('评论内容不能为空！')
        return
      }
      if(localStorage.getItem('token')){
        addComment({
          orderId: this.$route.query.orderId,
          content: this.content
        }).then(res=>{
          this.content=''
          this.$message.success('评论成功！')
          this.getCommentData()
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$message.error('请先登录')
      }
    },



    addShopcartClick() {
      addOrderToCart({
        order_id: this.data.orderId,
      })
          .then((res) => {
            console.log(res);
            if (res.flag == true) {
              alert(res.message);
            } else {
              alert(res.message);
            }
          })
          .catch((err) => {
            alert("添加失败,请先登录");
          });
    },


    like() {
      //   if (this.imageUrl === '../assets/img/good.png') {
      //   this.imageUrl = '../assets/img/like.png';
      // }

      let img = document.getElementById("aa");
      console.log(img.src)
      if(img.src == "http://localhost:8081/img/good.png"){

        img.src = "/img/like.png";

      }
      else if(img.src=="http://localhost:8081/img/like.png"){
        img.src = "/img/good.png";
      }


    },
    like2(){
      let imgb = document.getElementById("bb");
      if(imgb.src == "http://localhost:8081/img/no-star.png"){

        addOrderToCollect({
          order_id: this.data.orderId,
        })
            .then((res) => {
              console.log(res);
              console.log(11111);
              console.log(this.data.orderId)
              if (res.flag == true) {
                alert(res.message);
              } else {
                alert(res.message);
              }
            })
            .catch((err) => {
              alert("添加失败,请先登录");
            });
        imgb.src = "/img/full-star.png";

      }
      else if(imgb.src=="http://localhost:8081/img/full-star.png"){
        imgb.src = "/img/no-star.png";
      }

    },

    changeInfo(item) {
      this.$store.commit("updateChangedOrderId", item);
      selectOrderById({
        order_id: this.$store.state.changedOrderId,
      })
          .then((res) => {
            this.updateGoodInfo = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getSalesInfo(){
      selectUserByUsername({
        user_name: this.data.ownName,
      }).then((res) => {
        this.updateUserData = res.data;
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.getCommentData()

    selectOrderById({
      order_id: this.$route.query.orderId,
    }).then((res) => {
      if (res.flag == true) {
        this.data = res.data;

        this.getSalesInfo()
      }
    });
  },
};
</script>


<style lang="less" scoped>
.bor{
  border: 1px solid rgb(200, 196, 196);
  padding: 10px 12px;
  margin-left: 20px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.app{
  margin-top: 100px;
  width: 500px;
  height: 100%;

}

.details-box {
  width: 1100px;
  height: 1100px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  //display: flex;
  justify-content: space-between;
  img {
    width: 360px;
    height: 300px;
    border-radius: 6px;
    float: left;
  }
  .info {

    width: 680px;
    height: 300px;
    border: 1px solid #f2f2f2;
    // box-shadow: 3px 3px 3px rgba(3, 0, 0, 0.07);
    border-radius: 6px;
    padding: 10px 20px;
    display: inline-block;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      height: 100px;
      border: 1px dashed #f2f2f2;
      line-height: 23px;
      padding: 5px 10px;
      /*超出的部分隐藏*/
      overflow: hidden;
      /*文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
      /*弹性伸缩盒子模型显示*/
      display: -webkit-box;
      /*限制在一个块元素显示文本的行数*/
      -webkit-line-clamp: 4;
      /*设置或检索伸缩盒对象的子元素排列方式*/
      -webkit-box-orient: vertical;
    }
    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }
    .time {
      margin-top: 5px;
      color: #999;
      display: flex;
      justify-content: flex-start;
    }
    .item-style{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 5px;
      align-items: center;
    }
  }
  .operation {
    display: flex;
    margin-top: 10px;
    margin-right: 150px;
    .operation-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .operation-img{
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
        border-radius: 6px;
      }
    }
  }
  .btn-content{
    margin-top: 10px;
  }
  .item-sales{
    color: #333 !important;
    line-height: 30px;
    max-height: 30px;
    .sales-text{
      color: #666;
    }
  }
}
.comment-container{
  clear: both;
  background-color: #fff;

  .comment-num{
    font-weight: bold;
  }
  .comment-item{
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 20px;
    margin: 20px 0;
    word-break: break-all;
    .comment-tips{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .color6{
        color: #666;
      }
    }
  }
}
</style>
