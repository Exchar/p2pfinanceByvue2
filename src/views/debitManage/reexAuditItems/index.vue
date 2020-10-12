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
                  v-model="tableData.borrower"
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
                  v-model="tableData.phone"
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
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column
          prop="annual"
          label="年利率化"
          :formatter="annualState"
        >
        </el-table-column>
        <el-table-column
          prop="repayment"
          label="还款方式"
          :formatter="repayType"
        >
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="paymoney" label="募集资金"> </el-table-column>
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
            <el-link type="primary" @click="recheck(scope.row)">复审</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
    ...mapMutations(["saveBidInfo"]),
    async recheck(row) {
      await this.saveBidInfo(row);
      this.$router.push("/debitManage/RecheckAction");
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
        ? "待回款"
        : row.state == 2
        ? "已结算"
        : row.state == 3
        ? "撤标"
        : row.state == 4
        ? "流标"
        : row.state == 5
        ? "投资中"
        : row.state == 6
        ? "投资失败"
        : "";
    },
    repayType(row) {
      return row.state == 1
        ? "一次性还款"
        : row.state == 2
        ? "等额本息"
        : row.state == 3
        ? "按月付息到期还本"
        : row.state == 4
        ? "按天还款"
        : "";
    },
    annualState(row) {
      return row.annual * 100 + "%";
    },
    invest(row) {
      return row.speed * 100 + "%";
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
  height: 470px;
}
</style>
