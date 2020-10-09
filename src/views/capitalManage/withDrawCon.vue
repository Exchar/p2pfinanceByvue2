<template lang="yi">
  <div>
  <el-row :gutter="8">
  <el-col :span="3"><el-input  placeholder="搜索用户手机" prefix-icon="el-icon-search" v-model="input1"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-input  placeholder="搜索账户名" prefix-icon="el-icon-search" v-model="input2"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-select  v-model="value" placeholder="银行名称"><el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="13"><el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="2"><el-row class="but"><el-button plain>导出</el-button></el-row><div class="grid-content bg-purple"></div></el-col>
</el-row>
  <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
    <el-table-column
      prop="bankaccount"
      label="提现单号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="bankuser  "
      label="用户手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="usertype"
      label="用户类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="money"
      label="提现金额"
      width="100">
    </el-table-column>
    <el-table-column
      prop="fee"
      label="提现手续费"
      width="120">
    </el-table-column>
    <el-table-column
      prop="accountmoney"
      label="预计到账金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="accountbank"
      label="银行账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="bankuser"
      label="银行名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subtime"
      label="提交时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sh"
      label="审核"
      width="120">
    </el-table-column>
  </el-table>
  <div class="blocks">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 10, 20, 40]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">    <!--//这是显示总共有多少数据，-->
    </el-pagination>
  </div>
  <div style="height: 100vh; ">
<el-scrollbar style="height: 100%;">
<div style="height: 50opx;width: 100%;background: red;"></div>
<div style="height: 50opx;width: 100%;background: yellowgreen;"></div>
<div style="height: 50opx;width: 100%; background: blueviolet; "></div>
</el-scrollbar>
</div>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .post("/markApi/finance/moneyRecord/selectAll", {
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
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周" /*  */,
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
      value1: "",
      value2: "",
      input1: "",
      input2: "",
      currentPage: 1, //初始页
      pagesize: 2,
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "建设银行"
        },
        {
          value: "选项2",
          label: "招商银行"
        },
        {
          value: "选项4",
          label: "其他银行"
        }
      ],
      value: ""
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
