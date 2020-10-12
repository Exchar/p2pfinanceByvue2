<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索流水号"
          prefix-icon="el-icon-search"
          v-model="input1"
          @change="search1"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-select v-model="value" placeholder="全部类型" @change="search1"
          ><el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option
        ></el-select>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="16"
        ><el-select v-model="value1" placeholder="出入账" @change="search1"
          ><el-option
            v-for="item in times"
            :key="item.value1"
            :label="item.label"
            :value="item.value1"
          ></el-option
        ></el-select>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="2"
        ><el-row class="but"><el-button plain>导出</el-button></el-row>
        <div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-table :data="tableData">
      <el-table-column prop="serial" label="流水号" width="250">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120" :formatter="forma">
      </el-table-column>
      <el-table-column
        prop="ioaccount"
        label="出入账"
        width="120"
        :formatter="formatRole"
      >
      </el-table-column>
      <el-table-column prop="operationamount" label="操作资金" width="120">
      </el-table-column>
      <el-table-column prop="sc" label="手续费" width="100"> </el-table-column>
      <el-table-column prop="pre" label="操作前金额" width="120">
      </el-table-column>
      <el-table-column prop="post" label="操作后金额" width="120">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" :formatter="state">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120">
      </el-table-column>
      <el-table-column
        prop="dateline"
        label="操作时间"
        width="500"
        :formatter="DateFormatterState"
      >
      </el-table-column>
    </el-table>
    <div class="blocks">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="todol"
      >
        <!--//这是显示总共有多少数据，-->
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
      .post("/markApi/finance/platformFunds/selectAll", {
        limit: 5,
        page: 1
      })
      .then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.todol = res.data.count;
        console.log(this.tableData);
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    search1() {
      console.log({
        renumber: this.input1
      });
      this.$axios
        .post(
          "/markApi/finance/platformFunds/selectSerialAndTypeAndIoaccount",
          {
            serial: this.input1,
            type: this.value,
            ioaccount: this.value1,
            limit: 5,
            page: 1
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          console.log(res.data.data);
        })
        .catch(res => {
          console.log(res);
        });
    },
    formatRole: function(res) {
      return res.ioaccount == "2"
        ? "出账"
        : res.ioaccount == "1"
        ? "入账"
        : "aaa";
    },
    state: function(res) {
      return res.state == "0" ? "成功" : res.state == "1" ? "失败" : "aaa";
    },
    forma: function(res) {
      return res.type == "0"
        ? "平台充值"
        : res.type == "1"
        ? "平台提现"
        : res.type == "2"
        ? "借款管理费"
        : res.type == "3"
        ? "利率管理费"
        : res.type == "4"
        ? "还款垫付"
        : "res.type";
    },
    DateFormatterState: function(res) {
      return new Date(res.dateline).toLocaleDateString();
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.search1();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.search1();
      console.log(this.currentPage); //点击第几页
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
      todol: 0,
      value: "",
      value1: "",
      input1: "",
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "平台充值"
        },
        {
          value: "选项2",
          label: "平台提现"
        },
        {
          value: "选项3",
          label: "借款管理费"
        },
        {
          value: "选项4",
          label: "利息管理费"
        },
        {
          value: "选项5",
          label: "还款垫付"
        }
      ],
      pagesize: 5,
      currentPage: 1,
      times: [
        {
          value1: "选项1",
          label: "出账"
        },
        {
          value1: "选项2",
          label: "入账"
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
