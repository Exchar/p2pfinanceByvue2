<template>
  <div class="Recheck">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content">
                <el-input placeholder="搜索借款方" v-model="input1">
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-input placeholder="搜索借款人手机" v-model="input2">
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-select placeholder="全部进度" v-model="progress">
                  <el-option label="满标" value="man"></el-option>
                  <el-option label="未满标" value="noman"></el-option>
                </el-select></div
            ></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table stripe style="width: 100%" :data="tableData">
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
        <el-table-column prop="repayType" label="募集时长"> </el-table-column>
        <el-table-column prop="term" label="募集资金"> </el-table-column>
        <el-table-column prop="id" label="投资进度" :formatter="invest">
        </el-table-column>
        <el-table-column prop="saletime" label="开售时间">
          <span>{{ tableData.saletime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="putawaytime" label="结束时间">
          <span>{{ tableData.putawaytime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="markState">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <el-link type="primary" :underline="false" @click="recheck"
            >复审</el-link
          >
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-row>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="10"
          ><div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            >
            </el-pagination></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Recheck",
  data() {
    return {
      input1: "",
      input2: "",
      progress: "",
      currentPage: 1,
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    recheck() {
      this.$router.push("/debitManage/RecheckAction");
    },
    handleSizeChange() {
      this.getData();
    },
    handleCurrentChange() {
      this.getData();
    },
    getData: function() {
      this.$axios
        .post("/markApi/finance/loan/findFinishByPage", {
          limit: 1,
          page: 5
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            console.log(response.data);
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
