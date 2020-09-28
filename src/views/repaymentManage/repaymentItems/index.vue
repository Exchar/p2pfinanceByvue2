<template>
  <div class="repayMain">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="searchItems" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="searchItems.repayerName"
              placeholder="搜索借款方"
              @change="search"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchItems.repayerPhone"
              placeholder="搜索借款人手机"
              @change="search"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchItems.states"
              placeholder="全部状态"
              @change="search"
            >
              <el-option label="全部状态" :value="''"></el-option>
              <el-option label="还款中" :value="2"></el-option>
              <el-option label="催缴中" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button>自定义列</el-button>
        <el-button>导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :border="false"
      :data="tableData"
      height="480px"
      style="width: 100%;height: 100%"
      stripe
      v-loading="loading"
    >
      <el-table-column prop="number" label="编号" width="130" align="center">
      </el-table-column>
      <el-table-column
        prop="backname"
        label="借款人"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="借款人手机号"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="borrowname"
        label="标名"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="money" label="借款金额" width="130" align="center">
      </el-table-column>
      <el-table-column prop="backdate" label="期限" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.backdate).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="还款方式" width="130" align="center">
      </el-table-column>
      <el-table-column prop="time" label="期数" width="130" align="center">
      </el-table-column>
      <el-table-column
        prop="returntime"
        label="应还款时间"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.returntime).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="realtime"
        label="实际还款时间"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.realtime).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="returnmoney"
        label="预还款金额"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="capital" label="本金" width="130" align="center">
      </el-table-column>
      <el-table-column prop="interest" label="利息" width="130" align="center">
      </el-table-column>
      <el-table-column
        prop="punish"
        label="逾期罚息"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="repayStateText"
        label="状态"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="backtime"
        label="是否逾期"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="tableData[scope.$index].backtime === 1">是</p>
          <p v-if="tableData[scope.$index].backtime === 0">否</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center">
        <el-button
          type="primary"
          style="border-radius: 2px"
          :disabled="!hasChangeKey"
          >平台垫付</el-button
        >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nowPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      searchItems: {
        repayerName: "",
        repayerPhone: "",
        states: ""
      },
      tableData: [],
      nowPage: 1,
      perPage: 10,
      totalItems: 0,
      hasChangeKey: false,
      loading: false
    };
  },
  created() {
    this.getRepaymentItems();
    this.getPageCount();
    console.log(this.totalItems, this.nowPage);
  },
  methods: {
    getPageCount() {
      this.$axios
        .get("/api/getrepaymentItemsCount")
        .then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.totalItems = res.data.data[0].count;
            console.log(res.data.data[0].count);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRepaymentItems() {
      this.loading = true;
      this.$axios
        .post("/api/getRepaymentItems", {
          backName: this.searchItems.repayerName,
          backPhone: this.searchItems.repayerPhone,
          backStates: this.searchItems.states,
          pageIndex: this.nowPage,
          perPage: this.perPage
        })
        .then(res => {
          console.log(res.data);
          if (res.data.data.code === 200) {
            this.tableData = res.data.data.data;
            this.totalItems = res.data.count;
            this.loading = false;
            this.$message({
              type: "success",
              duration: 800,
              message: "数据拉取成功"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      this.getRepaymentItems();
      this.nowPage = 1;
    },
    handleSizeChange(val) {
      console.log(val);
      this.perPage = val;
      this.getRepaymentItems();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.nowPage = val;
      this.getRepaymentItems();
    }
  }
};
</script>

<style scoped>
.repayMain .el-form {
  margin: 4px 2px;
}
.el-pagination {
  text-align: center;
}
</style>
