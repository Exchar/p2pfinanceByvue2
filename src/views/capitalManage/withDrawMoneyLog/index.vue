<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索用户手机"
          prefix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-input
          placeholder="搜索账户名"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-select v-model="value" placeholder="全部状态"
          ><el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option
        ></el-select>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="11"
        ><el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="2"
        ><el-button class="lie" plain>自定义列</el-button>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="2"
        ><el-row class="but"><el-button plain>导出</el-button></el-row>
        <div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
      <el-table-column prop="bankaccount" label="银行账号" width="150">
      </el-table-column>
      <el-table-column prop="bankuser" label="银行名称" width="100">
      </el-table-column>
      <el-table-column prop="id" label="id" width="100"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="phone" label="电话号" width="180">
      </el-table-column>
      <el-table-column prop="record" label="提现单号" width="180">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120"> </el-table-column>
      <el-table-column
        prop="subtime"
        label="提交时间"
        width="180"
        :formatter="DateFormatterState"
      >
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120"> </el-table-column>
    </el-table>
    <div class="blocks">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
        <!--//这是显示总共有多少数据，-->
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      input1: "",
      input2: "",
      options: [],
      currentPage: 1, //初始页
      pagesize: 2,
      tableData: [],
      value: "",
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
      }
    };
  },
  methods: {
    DateFormatterState: function(row) {
      return new Date(row.subtime).toLocaleDateString();
    },
    forma: function(row) {
      return row.state == "0" ? "微信" : row.state == "1" ? "支付宝" : "aaa";
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    search1() {
      this.$axios.post("/markApi/finance/moneyRecord/selectAll", {
        name: "" + this.input2,
        phone: "" + this.input1,
        limit: 5,
        page: 1
      });
    }
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
