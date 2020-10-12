<template>
  <div class="Recheck">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="搜索借款方"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                  v-model="peopleList.borrower"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="搜索借款人手机"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                  v-model="peopleList.phone"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table
        stripe
        style="width: 100%"
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column prop="num" label="编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="借款名称"> </el-table-column>
        <el-table-column prop="money" label="借款金额">
          <template slot-scope="scope">
            <span>{{ "￥" + scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="annual"
          label="年利率化"
          :formatter="annualState"
        >
        </el-table-column>
        <el-table-column prop="repayment" label="还款方式">
          <template slot-scope="scope">
            <span>{{ repayType(scope.row.repayment) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="paymoney" label="募集资金">
          <template slot-scope="scope">
            <span>{{ "￥" + scope.row.paymoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="speed" label="投资进度" :formatter="invest">
        </el-table-column>
        <el-table-column prop="saletime" label="开售时间">
          <span>{{ tableData.saletime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="putawaytime" label="结束时间">
          <span>{{ tableData.putawaytime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="markState">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="recheck(scope.row)"
              :underline="false"
              >复审</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations } from "vuex";
export default {
  name: "Recheck",
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: "",
        page: ""
      },
      total: 4,
      input1: "",
      input2: "",
      progress: "",
      currentPage: 1,
      pageSize: 4,
      tableData: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["saveBidInfo", "saveReex"]),
    async recheck(row) {
      await this.saveBidInfo(row);
      this.saveReex(row), this.$router.push("/debitManage/RecheckAction");
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getData();
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getData();
    },
    getData: function() {
      this.$axios
        .post("/markApi/finance/loan/findFinishByPage", {
          phone: "" + this.peopleList.phone,
          borrower: "" + this.peopleList.borrower,
          limit: +this.currentPage,
          page: +this.pageSize,
          total: this.count
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            this.saveReex(response.data.data);
            console.log(response.data);
            this.loading = false;
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    markState(row) {
      return row.state == 1
        ? "进行中"
        : row.state == 2
        ? "满标状态"
        : row.state == 3
        ? "初审未通过"
        : row.state == 4
        ? "待上架"
        : row.state == 40
        ? "已上架"
        : row.state == 50
        ? "已下架"
        : row.state == 60
        ? "新标草稿"
        : row.state == 100
        ? "复审下架"
        : "";
    },
    repayType(state) {
      return state == 1
        ? "一次性还款"
        : state == 2
        ? "等额本息"
        : state == 3
        ? "按月付息到期还本"
        : state == 4
        ? "按天还款"
        : "";
    },
    annualState(row) {
      return row.annual * 100 + "%";
    },
    invest(row) {
      return row.speed.toFixed(2) * 100 + "%";
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>
<style scoped>
.el-col-6 {
  margin-top: 20px;
  height: 40px;
}
#nav {
  padding: 10px;
}
#table {
  width: 100%;
}
</style>
