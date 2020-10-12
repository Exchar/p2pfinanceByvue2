<template lang="yi">
  <div>
  <el-row :gutter="8">
  <el-col :span="3"><el-input  placeholder="搜索用户手机" prefix-icon="el-icon-search" v-model="input1"  @change="search1"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-input  placeholder="搜索姓名" prefix-icon="el-icon-search" v-model="input2"  @change="search1"></el-input><div class="grid-content bg-purple"></div></el-col>
   <el-col :span="3"><el-select  v-model="value" placeholder="全部类型" @change="search1"><el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="2"><el-row class="but"><el-button plain>导出</el-button></el-row><div class="grid-content bg-purple"></div></el-col>
</el-row>
  <el-table
    :data="tableData">
    <el-table-column
      prop="name"
      label="真实姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="用户手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="usertype"
      label="用户类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="usersource"
      label="用户来源"
      width="120">
    </el-table-column>
    <el-table-column
      prop="appsource"
      label="应用来源"
      width="100">
    </el-table-column>
    <el-table-column
      prop="property"
      label="总资产"
      width="120">
    </el-table-column>
    <el-table-column
      prop="creditavailable"
      label="可用余额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="frozencapital"
      label="冻结资产"
      width="120">
    </el-table-column>
    <el-table-column
      prop="camount"
      label="代收金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cinvestment"
      label="累计投资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aincome"
      label="累计投资收益"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aloan"
      label="累计借款"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tpayment"
      label="累计还款"
      width="120">
    </el-table-column>
    <el-table-column
      prop="balance"
      label="借还款差额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aloan"
      label="密码"
      width="120">
    </el-table-column>
  </el-table>
  <div class="blocks">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">   <!--//这是显示总共有多少数据，-->
    </el-pagination>
  </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .post("/markApi/finance/userMoney/selectAll", {
        limit: 5,
        page: 1
      })
      .then(req => {
        console.log(req);
        this.tableData = req.data.data;
        this.total = req.data.count;
        console.log(req.data.data);
      })
      .catch(req => {
        console.log(req);
      });
  },

  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.search1();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.search1();
      console.log(this.currentPage); //点击第几页
    },
    search1() {
      console.log({
        renumber: this.input1
      });
      this.$axios
        .post("/markApi/finance/userMoney/selectKey", {
          name: this.input2,
          renumber: this.input1,
          limit: 5,
          page: 1
        })
        .then(req => {
          console.log(req);
          this.tableData = req.data.data;

          console.log(this.tableData);
        })
        .catch(req => {
          console.log(req);
        });
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "投资用户"
        }
      ],
      count: 0,
      value: "",
      input1: "",
      input2: "",
      currentPage: 1, //初始页
      pagesize: 5,
      tableData: []
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
