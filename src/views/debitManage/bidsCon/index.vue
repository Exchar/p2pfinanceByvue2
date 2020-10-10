<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款方"
            suffix-icon="el-icon-search"
            @keyup.native="getQueryLoanList"
            v-model="borrower"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款人手机"
            suffix-icon="el-icon-search"
            @keyup.native="getQueryLoanList"
            v-model="phone"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="pledge"
            placeholder="请选择"
            @change="getQueryLoanList"
            style="width: 100%"
          >
            <el-option
              v-for="item in stateList"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="num" label="编号"> </el-table-column>
        <el-table-column v-if="false" prop="id" label="ID"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column
          prop="guarantee"
          label="担保机构"
          :formatter="guaranteeState"
        >
        </el-table-column>
        <el-table-column prop="type" label="类型" :formatter="typeState">
        </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column prop="annual" label="年化利率"> </el-table-column>
        <el-table-column
          prop="repayment"
          :formatter="repaymentState"
          label="还款方式"
        >
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="created" label="添加时间"> </el-table-column>
        <el-table-column prop="state" :formatter="loanState" label="状态">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="examine(scope.row.id)"
              >审核</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    审核详情-->
    <el-dialog
      title="审核详情"
      :visible.sync="dialogFormVisible"
      v-loading="loadings"
    >
      <el-form :model="formData">
        <el-row :gutter="20">
          <el-form :model="formData" label-width="120px" class="demo-ruleForm">
            <el-col :span="24">
              <p>基本信息</p>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <el-col :span="11">
              <el-form-item label="标名">
                <el-input
                  v-model="formData.entitle"
                  readonly="readonly"
                ></el-input>
              </el-form-item>
              <el-form-item label="借款方">
                <el-input
                  v-model="formData.borrower"
                  readonly="readonly"
                ></el-input>
              </el-form-item>
              <el-form-item label="年利率">
                <el-input v-model="formData.annual" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="借款期限">
                <el-input v-model="formData.deadline" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="借款起息方式">
                <el-input v-model="formData.way" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="逾期罚息率">
                <el-input v-model="formData.penalty" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="资金用途">
                <el-input v-model="formData.purpose" readonly="readonly">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="风险等级">
                <el-input v-model="formData.grade" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="借款总金额">
                <el-input
                  v-model="formData.money"
                  readonly="readonly"
                ></el-input>
              </el-form-item>
              <el-form-item label="还款方式">
                <el-input v-model="formData.repayment" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="借款管理费月率">
                <el-input
                  v-model="formData.monthly"
                  readonly="readonly"
                ></el-input>
              </el-form-item>
              <el-form-item label="借款类型">
                <el-input v-model="formData.type" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="还款来源">
                <el-input
                  v-model="formData.source"
                  readonly="readonly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <!--      担保信息-->
            <el-col :span="24">
              <p>担保信息</p>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <el-col :span="11">
              <el-form-item label="是否担保">
                <el-input v-model="formData.assure" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="抵押类型">
                <el-input v-model="formData.pledge" readonly="readonly">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="担保机构">
                <el-input v-model="formData.guarantee" readonly="readonly">
                </el-input>
              </el-form-item>
              <el-form-item label="抵押材料"> </el-form-item>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <!--      借款资料-->
            <el-col :span="24">
              <p>借款资料</p>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <el-col :span="11">
              <el-form-item label="借款资料"> </el-form-item>
            </el-col>
            <!--        审核-->
            <el-col :span="24">
              <p>审核</p>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple-dark"></div
            ></el-col>
            <el-col :span="11">
              <el-form-item label="审核">
                <el-radio-group v-model="formData.pass">
                  <el-radio label="通过"></el-radio>
                  <el-radio label="不通过"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
              <el-form-item>
                <el-button type="primary" @click="examineSubmit"
                  >提交</el-button
                >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-form>
    </el-dialog>
    <div class="marginTop">
      <el-row :gutter="20">
        <el-col :offset="6" style="text-align:center">
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="pageSize"
              :total="total"
              layout="sizes, total, jumper ,prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  created() {
    this.getLoanList();
  },
  data() {
    return {
      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 加载中
      loading: false,
      borrower: "",
      phone: "",
      pledge: "",
      queryState: "",
      stateList: [
        {
          id: 0,
          name: "全部类型"
        },
        {
          id: 1,
          name: "车抵品"
        },
        {
          id: 2,
          name: "房抵品"
        },
        {
          id: 3,
          name: "民品抵押"
        }
      ],
      tableData: [],
      // 审核详情
      formData: {
        entitle: "",
        borrower: "",
        annual: "",
        way: "",
        penalty: "",
        purpose: "",
        grade: "",
        money: "",
        repayment: "",
        monthly: "",
        type: "",
        source: "",
        pledge: "",
        assure: "",
        guarantee: "",
        pass: "0",
        deadline: "",
        desc: "",
        num: ""
      },
      dialogFormVisible: false,
      loadings: false
    };
  },
  methods: {
    // 担保机构转换
    guaranteeState: function(row) {
      return row.guarantee == 1
        ? "上海泽润典当有限公司"
        : row.guarantee == 2
        ? "成都京东金融有限公司"
        : row.guarantee == 3
        ? "杭州阿里金融有限公司"
        : row.guarantee == 4
        ? "北京联想金融有限公司"
        : row.guarantee == 5
        ? "重庆勒花花金融有限公司"
        : row.guarantee;
    },
    // 借款类型转换
    typeState: function(row) {
      return row.type == 1
        ? "新增"
        : row.type == 2
        ? "续贷"
        : row.type == 3
        ? "资产处理"
        : row.type;
    },
    // 借款标状态转换
    loanState: function(row) {
      return row.state == 1 ? "待审核" : "未知状态";
    },
    // 还款方式转换
    repaymentState: function(row) {
      return row.repayment == 1
        ? "一次性还款"
        : row.repayment == 2
        ? "等额本息"
        : row.repayment == 3
        ? "按月付息到期还本"
        : row.repayment == 4
        ? "按天还款"
        : "未知状态";
    },
    //获取列表数据
    getLoanList: function() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/loan/findLikeLoanCheck", {
          limit: this.currentPage,
          page: this.pageSize
        })
        .then(res => {
          if (res.data.code === "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
            this.loading = false;
          }
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 多条件查询
    getQueryLoanList: function() {
      this.loading = true;
      let indexPledge = this.pledge;
      if (indexPledge == 0) {
        indexPledge = "";
      }
      this.$axios
        .post("/markApi/finance/loan/findLikeLoanCheck", {
          borrower: "" + this.borrower,
          phone: "" + this.phone,
          pledge: indexPledge,
          limit: this.currentPage,
          page: this.pageSize
        })
        .then(res => {
          if (res.data.code === "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
            this.loading = false;
          }
          console.log(this.formData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLoanList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLoanList();
    },
    // 审核
    examine: function(row) {
      // this.loadings=true;
      console.log(row);
      this.$axios
        .post("/markApi/finance/loan/find", {
          id: row
        })
        .then(res => {
          if (res.data.code === "200") {
            this.formData = res.data.data[0];
            this.loadings = false;
          }
          console.log(this.formData);
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogFormVisible = true;
    },
    // 审核提交
    examineSubmit: function() {
      let passState;
      if (this.formData.pass == "不通过") {
        passState = 0;
      } else {
        passState = 1;
      }
      this.$axios
        .post("/markApi/finance/tbCheck/insert", {
          pass: passState,
          remarks: this.formData.desc,
          num: this.formData.num
        })
        .then(res => {
          if (res.data.code === "200") {
            this.tableData = res.data.data;
            this.loading = false;
            this.$message.success(res.data.msg);
            this.dialogFormVisible = false;
            this.getLoanList();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.marginTop {
  margin-top: 20px;
}
</style>
