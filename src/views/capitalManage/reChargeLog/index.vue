<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索充值单号"
          prefix-icon="el-icon-search"
          v-model="input1"
          @keyup.native="search1"
        ></el-input
      ></el-col>
      <el-col :span="3">
        <el-select v-model="value1" placeholder="全部充值方式">
          <el-option
            v-for="item in options"
            :key="item.value1"
            :label="item.label"
            :value="item.value1"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="6"
        ><el-select v-model="value" placeholder="全部状态"
          ><el-option
            v-for="item in options"
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
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
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
        :formatter="forma"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="serialnumber" label="交易流水号" width="180">
      </el-table-column>
      <el-table-column prop="ordertime" label="订单时间" width="180">
      </el-table-column>
      <el-table-column prop="tatime" label="到账时间" width="150">
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
        :total="tableData.length"
      >
        <!--//这是显示总共有多少数据，-->
      </el-pagination>
    </div>
    <div style="height: 100vh; ">
      <el-scrollbar style="height: 100%;">
        <div style="height: 50px;width: 100%;background: red;"></div>
        <div style="height: 50px;width: 100%;background: yellowgreen;"></div>
        <div style="height: 50px;width: 100%; background: blueviolet; "></div>
      </el-scrollbar>
    </div>
    <div>
      <el-row :gutter="8">
        <el-col :span="3"
          ><el-input
            placeholder="搜索充值单号"
            prefix-icon="el-icon-search"
            v-model="input1"
          ></el-input>
          <div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :span="3"
          ><el-select v-model="value1" placeholder="全部充值方式"
            ><el-option
              v-for="item in option"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            ></el-option
          ></el-select>
          <div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :span="6"
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
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column prop="renumber" label="充值单号" width="180">
        </el-table-column>
        <el-table-column prop="remoney" label="充值金额" width="180">
        </el-table-column>
        <el-table-column prop="tamount" label="到账金额" width="150">
        </el-table-column>
        <el-table-column prop="fee" label="手续费" width="180">
        </el-table-column>
        <el-table-column prop="retpye" label="充值方式" width="180">
        </el-table-column>
        <el-table-column prop="serialnumber" label="交易流水号" width="180">
        </el-table-column>
        <el-table-column prop="ordertime" label="订单时间" width="180">
        </el-table-column>
        <el-table-column prop="tatime" label="到账时间" width="150">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
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
          :total="tableData.length"
        >
          <!--//这是显示总共有多少数据，-->
        </el-pagination>
      </div>
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
    },
    formatRole: function(row) {
      return row.state === "0"
        ? "未审核"
        : row.state === "1"
        ? "已通过"
        : row.state === "2"
        ? "未通过"
        : "aaa";
    },
    forma: function(row) {
      return row.state === "0" ? "微信" : row.state === "1" ? "支付宝" : "aaa";
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
          label: "微信"
        },
        {
          value: "1",
          label: "支付宝"
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
  },
  //状态码
  // qb(){
  //   console.log(this.value1);
  //   this.$axios
  //   .post("/markApi/finance/rechargeRecord/selectDateAndPhoneRenumber",{
  //     startDate:"2020-09-23",
  //     endDate:"2020-09-27",
  //     retpye: this.value1,
  //     page:1,
  //     limit:5
  //   })
  //   .then(req=>{
  //     this.tableData = req.data.data;
  //     console.log(this.tableData);
  //   })
  //   .catch(req => {
  //     console.log("sssssss"+req);
  //   });
  // },
  //模糊查询
  // search1() {
  //   console.log(this.value1)
  //   this.$axios
  //     .post("/markApi/finance/rechargeRecord/selectDateAndPhoneRenumber", {
  //       phone: "" + this.value1,
  //       limit: 5,
  //       page: 1
  //     })
  //     .then(req => {
  //       console.log("返回"+req);
  //       this.tableData = req.data.data.date;
  //       console.log("表格"+this.tableData);
  //     })
  //     .catch(req => {
  //       console.log("11111"+req);
  //     });
  // },
  // 全部类型
  search() {
    this.$axios
      .post("/markApi//finance/rechargeRecord/selectDateAndPhoneRenumber", {
        phone: "" + this.input1
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
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
