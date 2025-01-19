<!-- 关于我们页面 -->
<template>
  <div class="about-container">
    <img src="../assets/img/logo.png" class="logo"/>
    <div class="about-content">
      <div class="item-style">关于融销通：</div>
      <div class="item-style marginL25">融销通是一款基于数字经济的农产品融销一体平台。</div>
      <div class="item-style marginL25">
        从用户的角度出发，能够很好的支持农户进行产销购入等活动：针对性性强，使用简便，农户进行买卖商品，联系客户时，操作简单易于理解。将农产品求购与货源同
      </div>
      <div class="item-style">
        时展出，提高了成功率。长此以往将形成一个良性循环。支持农业专家进行知识分享，解惑答疑等工作，农户不仅在网站平台上进行商品的买卖，如果遇到有关问题，可以
      </div>
      <div class="item-style">
        线上与专家讨论，搜索相关知识，也可以与专家线下预约，解决农业问题。同时，平台也提供了一个良好的银行与用户进行融资的环境，农户用户作为贷款很大的群体，实
      </div>
      <div class="item-style">际中却不尽人意，银行方面，难以获取实际需求用户，难以了解用户需求，农民方面，文化水平有限或单方面排斥，不能很好的相关获取信息，利用银行资源。平台瞄准需</div>
      <div class="item-style">求，给银行推智能匹配客户，给农户开通融资申请接口，方便双方沟通，达到双赢。</div>
      <div class="contact-us marginR105" style="margin-top:150px;">联系我们：</div>
      <div class="item-style contact-us">全国服务热线：400-828-123456</div>
      <div class="item-style contact-us marginR50">QQ: 1234567890</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about-container{
  width: 1100px;
  background: #fff;
  margin: 10px auto;
  padding: 50px 20px;
  height: 100%;
  display: flex;
  flex-flow: column;
  // justify-content: center;
  align-items: center;
  .logo{
    width: 292px;
    height: 261px;
  }
  .item-style{
    height: 25px;
    line-height: 25px;
  }
  .marginL25{
    margin-left: 25px;
  }
   .marginL25{
    margin-left: 25px;
  }
  .contact-us{
    display: flex;
    justify-content: flex-end;
  }
  .marginR105{
    margin-right: 105px;
  }
  .marginR50{
    margin-right: 30px;
  }
  .about-content{
    margin-top: 50px;
  }
}
</style>
