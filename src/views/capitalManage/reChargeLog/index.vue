<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索充值单号"
          prefix-icon="el-icon-search"
          v-model="input1"
          @change="search1"
        ></el-input
      ></el-col>
      <el-col :span="3">
        <el-select
          v-model="value1"
          placeholder="全部充值方式"
          @change="search1"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="6"
        ><el-select v-model="value" placeholder="全部状态"
          ><el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option></el-select
      ></el-col>
      <el-col :span="10"
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
        ><el-row class="but"><el-button plain>导出</el-button></el-row>
        <div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-table :data="tableData">
      <el-table-column prop="renumber" label="充值单号" width="180">
      </el-table-column>
      <el-table-column prop="remoney" label="充值金额" width="180">
      </el-table-column>
      <el-table-column prop="tamount" label="到账金额" width="150">
      </el-table-column>
      <el-table-column prop="fee" label="手续费" width="180"> </el-table-column>
      <el-table-column
        prop="retpye"
        label="充值方式"
        :formatter="formatRoles"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="serialnumber" label="交易流水号" width="180">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间"
        width="180"
        :formatter="DateForma"
      >
      </el-table-column>
      <el-table-column
        prop="tatime"
        label="到账时间"
        width="150"
        :formatter="DateFormatterState"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :formatter="formatRole"
        width="180"
      >
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
        :total="total"
      >
        <!--//这是显示总共有多少数据，-->
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .post("/markApi/finance/rechargeRecord/selectAll", {
        limit: 5,
        page: 1
      })
      .then(row => {
        console.log(row);
        this.tableData = row.data.data;
        this.total = row.data.count;
        console.log(this.total);
        console.log(this.tableData.renumber);
      })
      .catch(row => {
        console.log(row);
      });
  },
  methods: {
    DateForma: function(row) {
      return new Date(row.ordertime).toLocaleDateString();
    },
    DateFormatterState: function(row) {
      return new Date(row.tatime).toLocaleDateString();
    },
    //模糊查询
    search1() {
      console.log({
        renumber: this.input1
      });
      this.$axios
        .post("/markApi/finance/rechargeRecord/selectDateAndPhoneRenumber", {
          retpye: this.value1,
          renumber: this.input1,
          limit: 5,
          page: 1
        })
        .then(res => {
          this.tableData = res.data.data;
          console.log(res.data.data);
          console.log(res.data);
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.search1();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.search1();
    },
    formatRole: function(row) {
      return row.state == "0"
        ? "未审核"
        : row.state == "1"
        ? "已通过"
        : row.state == "2"
        ? "未通过"
        : "aaa";
    },
    formatRoles: function(row) {
      return row.retpye == "0" ? "微信" : row.retpye == "1" ? "支付宝" : "aaa";
    }
  },
  data() {
    return {
      tableData: [],
      value1: "",
      value: "",
      value2: "",
      currentPage: 1, //初始页
      pagesize: 2,
      input1: "",
      total: 0,
      options: [
        {
          value: 0,
          label: "微信"
        },
        {
          value: 1,
          label: "支付宝"
        }
      ],
      option: [
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "已通过"
        }
      ],
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
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
