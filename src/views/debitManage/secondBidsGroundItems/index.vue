<template>
  <div class="maintain">
    <!--    搜索框-->
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div>
                <el-input
                  placeholder="搜索借款方"
                  v-model="peopleList.borrower"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div>
                <el-input
                  placeholder="搜索借款人手机"
                  v-model="peopleList.phone"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                >
                </el-input></div
            ></el-col>
            <el-col :span="16"><div></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <!--    表格-->
    <div id="table">
      <el-table
        stripe
        style="width: 100%"
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column prop="num" label="编号"></el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column
          prop="guarantee"
          label="担保机构"
          :formatter="gType"
        ></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <span>{{ debtType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="借款金额">
          <template slot-scope="scope">
            <span>{{ "￥" + scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="annual"
          :formatter="annualState"
          label="年利率化"
        >
        </el-table-column>
        <el-table-column prop="repayment" label="还款方式">
          <template slot-scope="scope">
            <span>{{ repayType(scope.row.repayment) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="audittime" label="审核时间">
          <span>{{ tableData.audittime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="markState">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="markOn(scope.row)"
              >上架</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div id="page">
      <el-row>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="10"
          ><div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[2, 3, 5, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
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
import { mapMutations } from "vuex";
export default {
  name: "MarkOn",
  computed: {},
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: "",
        page: ""
      },
      currentPage4: 1,
      pageSize: 4,
      total: 4,
      phoneNum: "",
      tableData: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["saveBidInfo"]),
    markOn(row) {
      this.saveBidInfo(row);
      this.$router.push("/debitManage/Maintenance");
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getData();
    },
    handleCurrentChange(value) {
      this.currentPage4 = value;
      this.getData();
    },
    getData() {
      this.$axios
        .post("/markApi/finance/sign/findPage", {
          phone: "" + this.peopleList.phone,
          borrower: "" + this.peopleList.borrower,
          pledge: "1",
          limit: +this.currentPage4,
          page: +this.pageSize,
          count: this.total
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            this.loading = false;
            this.saveBidInfo(response.data.data);
            console.log(response.data);
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    annualState(row) {
      return row.annual * 100 + "%";
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
    debtType(state) {
      return state == 1
        ? "新增"
        : state == 2
        ? "续贷"
        : state == 3
        ? "资产处理"
        : "";
    },
    gType(row) {
      return row.state == 1
        ? "上海泽润典当有限公司"
        : row.state == 2
        ? "成都京东金融有限公司"
        : row.state == 3
        ? "杭州阿里金融有限公司"
        : row.state == 4
        ? "北京联想金融有限公司"
        : row.state == 5
        ? "重庆乐花花金融有限公式"
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
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  submit() {
    console.log(moment(this.tableData.audittime).format("YYYY-MM-DD"));
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
