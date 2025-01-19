<template>
  <div class="favorites">

    <el-table
      ref="favoritesTable"
      :data="dataArray"
      stripe:true
      tooltip-effect="dark"
      style="width: 100%; margin-top: 20px;"
      :row-key="(row) => { return row.id }"
      :row-class-name="rowClassName"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
      <el-table-column label="商品">
        <template slot-scope="scope">
          <div class="goods">
            <img :src="$store.state.imgShowRoad + '/file/' + scope.row.picture" alt=""/>
            <div class="info">
              <h4 class="title">{{ scope.row.title }}</h4>
              <p class="content">{{ scope.row.description }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="120">
        <template slot-scope="scope">
          <p class="price">{{ scope.row.price }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width="100">
        <template slot-scope="scope">
          <el-button type="info" class="delete-btn" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="cancel">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="addShopcartClick" type="danger"  class="place-order" >加入购物车</el-button>
    </div>
    
    
  </div>
</template>

<script>
import { showcollect, collectdelete, addOrderToCart } from "../api/cart";

export default {
  data() {
    return {
      dataArray: [],
      favoritesSelection: [],
      multipleSelection: [],
      selectedRows: [] // 保存选中的行数据
    };
  },

  
  methods: {
    handleSelectionChange(rows) {
      // 处理行点击事件，将选中的行数据保存到 selectedRows 数组中
      rows.forEach(row => {
        const isSelected = this.selectedRows.some(item => item === row);
        if (isSelected) {
          this.selectedRows = this.selectedRows.filter(item => item !== row);
        } else {
          this.selectedRows.push(row);
        }
      });
    },
    toggleSelection(rows) {
      const favoritesTable = this.$refs.favoritesTable;
      if (rows) {
        rows.forEach(row => {
          favoritesTable.toggleRowSelection(row);
        });
      } else {
        favoritesTable.clearSelection();
      }
    },
    // 加入购物车
    addShopcartClick() {
      const selectedRows = this.selectedRows;

      if (selectedRows && selectedRows.length > 0) {
        selectedRows.forEach(selectedProduct => {
          addOrderToCart({
            order_id: selectedProduct.orderId
          })
            .then(res => {
              console.log(res);
              if (res.flag === true) {
                alert(res.message);
              } else {
                alert(res.message);
              }
            })
            .catch(err => {
              alert("添加失败，请先登录");
            });
            this.deleteClick(selectedProduct);
        });

        console.log("选中的商品已添加到购物车");
        this.toggleSelection(); // 清除选中状态
      } 
      else {
        console.log("请选择商品");
      }
    },



    //展示收藏夹信息
    getOrderList(){
      showcollect({}).then((res) => {
        if (res.flag == true) {
          this.dataArray = res.data;
          this.totalprice = 0;
        } else {
          this.$message.error('您未登录，请先登录')
          this.$router.push("/login")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },

    rowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
   
    deleteClick(row) {
      this.$confirm('确认删除该商品?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          collectdelete({
            order_id: row.shoppingId,
          }).then((res) => {
            this.$message.success("删除成功");
            this.getOrderList()
          }).catch((err) => {
            this.$message.error("删除失败");
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    
  },
  created() {
    this.getOrderList()
  }
};
</script>
  
  <style lang="less" scoped>


  .place-order{
    float: right;

  }



  .favorites {
    width: 1100px;
    margin: 10px auto;
    background: #fff;
    padding: 10px 20px;
    .goods {
      width: 500px;
      img {
        float: left;
        width: 150px;
        height: 100px;
        margin-right: 10px;
        border-radius: 6px;
      }
      .info {
        // float: left;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .title {
          margin: 0;
        }
        .content {
          height: 65px;
          // width: 200px;
          /*超出的部分隐藏*/
          overflow: hidden;
          /*文字用省略号替代超出的部分*/
          text-overflow: ellipsis;
          /*弹性伸缩盒子模型显示*/
          display: -webkit-box;
          /*限制在一个块元素显示文本的行数*/
          -webkit-line-clamp: 3;
          /*设置或检索伸缩盒对象的子元素排列方式*/
          -webkit-box-orient: vertical;
        }
      }
    }
    
  }
  </style>