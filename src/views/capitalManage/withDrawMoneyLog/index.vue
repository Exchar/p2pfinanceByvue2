<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索用户手机"
          prefix-icon="el-icon-search"
          v-model="input1"
          @change="search1"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-input
          placeholder="搜索账户名"
          prefix-icon="el-icon-search"
          v-model="input2"
          @change="search1"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-select v-model="value3" placeholder="全部状态" @change="search1"
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
    <el-table :data="tableData">
      <el-table-column prop="bankaccount" label="银行账号" width="150">
      </el-table-column>
      <el-table-column
        prop="bankuser"
        label="银行名称"
        width="100"
        :formatter="formatRole"
      >
      </el-table-column>
      <el-table-column prop="id" label="id" width="100"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="phone" label="电话号" width="180">
      </el-table-column>
      <el-table-column prop="record" label="提现单号" width="180">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120"
        :formatter="formatRoles"
      >
      </el-table-column>
      <el-table-column
        prop="subtime"
        label="提交时间"
        width="180"
        :formatter="DateFormatterState"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="120"
        :formatter="formatRoless"
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
        :total="total"
        prev-text="上一页"
        next-text="下一页"
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
      total: 0,
      currentPage: 1, //初始页
      pagesize: 5,
      tableData: [],
      value3: "",
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
  created() {
    this.$axios
      .post("/markApi/finance/moneyRecord/selectAll", {
        limit: 5,
        page: 1
      })
      .then(req => {
        console.log(req);
        this.tableData = req.data.data;
        this.total = req.data.count;
        console.log(this.tableData);
      })
      .catch(req => {
        console.log(req);
      });
  },
  methods: {
    formatRole: function(row) {
      return row.bankuser == "0"
        ? "招商银行"
        : row.bankuser == "1"
        ? "建设银行"
        : row.bankuser == "2"
        ? "农业银行"
        : "aa";
    },
    formatRoles: function(row) {
      return row.state == "0" ? "未审核" : row.state == "1" ? "已通过" : "aa";
    },
    formatRoless: function(row) {
      return row.state == "0" ? "到账" : row.state == "1" ? "未到账" : "aa";
    },
    // 时间状态
    DateFormatterState: function(row) {
      return new Date(row.subtime).toLocaleDateString();
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
      console.log(this.input1);
      this.$axios
        .post("/markApi//finance/moneyRecord/selectKey", {
          name: this.input2,
          phone: this.input1,
          type: this.value3,
          limit: 5,
          page: 1
        })
        .then(res => {
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
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
