<template>
  <div>
    <div class="navBg">
      <div class="navBox">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              size="max"
              placeholder="搜索借款名称"
              suffix-icon="el-icon-search"
              v-model="entitle"
              @keyup.native="getQueryLoanList"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              size="max"
              placeholder="搜索借款方"
              suffix-icon="el-icon-search"
              v-model="borrower"
              @keyup.native="getQueryLoanList"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              size="max"
              placeholder="搜索借款人手机"
              suffix-icon="el-icon-search"
              v-model="phone"
              @keyup.native="getQueryLoanList"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="queryState"
              placeholder="请选择"
              style="width: 100%"
              @change="getQueryLoanList"
            >
              <el-option
                v-for="item in stateList"
                :label="item.sname"
                :key="item.id"
                :value="item.id"
                style="width: 100%"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="num" label="编号" width="240px">
        </el-table-column>
        <el-table-column prop="borrower" label="借款方" width="120px">
        </el-table-column>
        <el-table-column prop="phone" label="借款人手机" width="180px">
        </el-table-column>
        <el-table-column prop="entitle" label="标名" width="120px">
        </el-table-column>
        <el-table-column
          prop="guarantee"
          label="担保机构"
          width="200px"
          :formatter="guaranteeState"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :formatter="typeState"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="借款金额"
          :formatter="moneyState"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="annual"
          :formatter="annualState"
          label="年化利率"
        >
        </el-table-column>
        <el-table-column
          prop="repayment"
          :formatter="repaymentState"
          label="还款方式"
          width="100px"
        >
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column
          prop="created"
          label="添加时间"
          width="140px"
          :formatter="timeState"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          :formatter="loanState"
          label="状态"
          width="100px"
        >
        </el-table-column>
        <el-table-column prop="id" label="操作" width="100px">
          <template scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="modify(scope.row)"
              >编辑</el-link
            >
            |
            <el-link
              type="primary"
              :underline="false"
              @click="toVoid(scope.row.num)"
              >作废</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!--         编辑-->
      <el-dialog title="信息查看" :visible.sync="dialogFormVisible">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-form
              :model="formData"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-col :span="24">
                <p>基本信息</p>
              </el-col>
              <el-col :span="1"
                ><div class="grid-content bg-purple-dark"></div
              ></el-col>
              <el-col :span="11">
                <el-form-item label="标名">
                  <el-input v-model="formData.entitle"></el-input>
                </el-form-item>
                <el-form-item label="借款方">
                  <el-input
                    v-model="formData.borrower"
                    readonly="readonly"
                  ></el-input>
                </el-form-item>
                <el-form-item label="年利率">
                  <el-input v-model="formData.annual"> </el-input>
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
                  <el-input v-model="formData.penalty"> </el-input>
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
                  <el-input v-model="formData.money"></el-input>
                </el-form-item>
                <el-form-item label="还款方式">
                  <el-input v-model="formData.repayment" readonly="readonly">
                  </el-input>
                </el-form-item>
                <el-form-item label="借款管理费月率">
                  <el-input v-model="formData.monthly"></el-input>
                </el-form-item>
                <el-form-item label="借款类型">
                  <el-input v-model="formData.type" readonly="readonly">
                  </el-input>
                </el-form-item>
                <el-form-item label="还款来源">
                  <el-input v-model="formData.source"></el-input>
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
                <el-form-item label="抵押材料">
                  <el-image
                    :src="'/markApi/' + formData.materials"
                    :lazy="true"
                  ></el-image>
                </el-form-item>
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
                <el-form-item label="借款资料">
                  <el-image
                    :src="'/markApi/' + formData.datum"
                    :lazy="true"
                  ></el-image>
                </el-form-item>
              </el-col>
              <el-col :span="1"
                ><div class="grid-content bg-purple-dark"></div
              ></el-col>
              <el-col :span="24">
                <el-divider></el-divider>
                <el-form-item>
                  <el-button type="primary" @click="modifySubmit"
                    >修改</el-button
                  >
                  <el-button @click="dialogFormVisible = false"
                    >取 消</el-button
                  >
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
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
</template>

<script>
export default {
  name: "Index",
  created: function() {
    this.getLoanList();
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 5,
      loading: false,
      borrower: "",
      entitle: "",
      phone: "",
      queryState: "",
      stateList: [
        {
          id: 0,
          sname: "全部状态"
        },
        {
          id: 1,
          sname: "新标待审核"
        },
        {
          id: 60,
          sname: "新标草稿"
        }
      ],
      tableData: [],
      dialogFormVisible: false,
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
        num: "",
        datum: "",
        materials: ""
      }
    };
  },
  methods: {
    // 时间戳转换函数
    timestampToTime: function(timestamp) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      // let h = date.getHours() + ":";
      // let m = date.getMinutes() + ":";
      // let s = date.getSeconds();
      return (timestamp = Y + M + D);
    },
    // 添加时间转换
    timeState: function(row) {
      return this.timestampToTime(row.created);
    },
    // 是否担保转换
    assureState: function(row) {
      if (row.assure == 0) {
        row.assure = "否";
      } else {
        row.assure = "是";
      }
      return row.assure;
    },
    // 借款管理费月率转换
    monthlyState: function(row) {
      return row.monthly * 100 + "%";
    },
    // 资金用途转换
    purposeState: function(row) {
      return row.purpose == "1"
        ? "短期周转"
        : row.purpose == "2"
        ? "生意周转"
        : row.purpose == "3"
        ? "购物消费"
        : row.purpose == "4"
        ? "长期周转"
        : row.purpose == "5"
        ? "其他用途"
        : row.purpose;
    },
    // 风险等级转换
    gradeState: function(row) {
      return row.grade == "1"
        ? "极低"
        : row.grade == "2"
        ? "较低"
        : row.grade == "3"
        ? "中等"
        : row.grade == "4"
        ? "中高"
        : row.grade == "5"
        ? "高"
        : row.grade;
    },
    //借款金额转换
    moneyState: function(row) {
      return "￥" + row.money;
    },
    // 担保机构转换
    guaranteeState: function(row) {
      return row.guarantee == "1"
        ? "上海泽润典当有限公司"
        : row.guarantee == "2"
        ? "成都京东金融有限公司"
        : row.guarantee == "3"
        ? "杭州阿里金融有限公司"
        : row.guarantee == "4"
        ? "北京联想金融有限公司"
        : row.guarantee == "5"
        ? "重庆勒花花金融有限公司"
        : row.guarantee;
    },
    // 借款类型转换
    typeState: function(row) {
      return row.type == "1"
        ? "新增"
        : row.type == "2"
        ? "续贷"
        : row.type == "3"
        ? "资产处理"
        : row.type;
    },
    // 借款标状态转换
    loanState: function(row) {
      return row.state == "1"
        ? "新标待审核"
        : row.state == "60"
        ? "新标草稿"
        : "";
    },
    // 还款方式转换
    repaymentState: function(row) {
      return row.repayment == "1"
        ? "一次性还款"
        : row.repayment == "2"
        ? "等额本息"
        : row.repayment == "3"
        ? "按月付息到期还本"
        : row.repayment == "4"
        ? "按天还款"
        : row.repayment;
    },
    // 逾期罚息率转换
    penaltyState: function(row) {
      return row.penalty * 100 + "%";
    },
    // 抵押类型转换
    pledgeState: function(row) {
      return row.pledge == "4"
        ? "无"
        : row.pledge == "1"
        ? "房抵品"
        : row.pledge == "2"
        ? "车抵品"
        : row.pledge == "3"
        ? "民品抵押"
        : row.pledge;
    },
    // 年化利率转换
    annualState: function(row) {
      return row.annual * 100 + "%";
    },
    // 列表渲染
    getLoanList: function() {
      this.loading = true;
      this.$axios
        .post(
          "/markApi/finance/loan/findLikeLoanDefend",
          JSON.stringify({
            limit: this.currentPage,
            page: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
            console.log(this.tableData);
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 多条件查询
    getQueryLoanList: function() {
      let indexState = this.queryState;
      if (indexState == 0) {
        indexState = "";
      }
      console.log(indexState);
      this.$axios
        .post(
          "/markApi/finance/loan/findLikeLoanDefend",
          JSON.stringify({
            entitle: "" + this.entitle,
            borrower: "" + this.borrower,
            phone: "" + this.phone,
            state: indexState,
            limit: this.currentPage,
            page: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
          } else {
            console.log(res.data);
          }
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 作废
    toVoid: function(row) {
      this.$confirm("是否将此条借款信息作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/markApi/finance/loan/delete", {
              num: row
            })
            .then(res => {
              console.log(res);
              if (res.data.code == "200") {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.getLoanList();
              } else {
                this.$message.error(res.data.msg());
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log(row);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    modify: function(row) {
      this.dialogFormVisible = true;
      this.formData = { ...row };
      console.log(this.formData);
      this.formData.guarantee = this.guaranteeState(this.formData);
      this.formData.annual = this.annualState(this.formData);
      this.formData.type = this.typeState(this.formData);
      this.formData.repayment = this.repaymentState(this.formData);
      this.formData.monthly = this.monthlyState(this.formData);
      this.formData.penalty = this.penaltyState(this.formData);
      this.formData.grade = this.gradeState(this.formData);
      this.formData.purpose = this.purposeState(this.formData);
      this.formData.way = "成立计息";
      this.formData.assure = this.assureState(this.formData);
      this.formData.pledge = this.pledgeState(this.formData);
    },
    // 编辑提交
    modifySubmit: function() {
      let annual = parseFloat(this.formData.annual) / 100;
      let monthly = parseFloat(this.formData.monthly) / 100;
      let penalty = parseFloat(this.formData.penalty) / 100;
      this.$axios
        .post("/markApi/finance/loan/updateByNum", {
          num: "" + this.formData.num,
          entitle: "" + this.formData.entitle,
          money: "" + this.formData.money,
          annual: "" + annual,
          deadline: "" + this.formData.deadline,
          monthly: "" + monthly,
          penalty: "" + penalty,
          source: "" + this.formData.source
        })
        .then(res => {
          if (res.data.code == "200") {
            console.log(res);
            this.$message.success(res.data.msg);
            this.dialogFormVisible = false;
            this.getLoanList();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLoanList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLoanList();
    }
  }
};
</script>

<style scoped>
.navBg {
  margin: 20px auto;
  height: 80px;
}
.navBg .el-input,
.navBg .el-select {
  margin-top: 20px;
}
.navBox {
  margin-left: 5px;
}
.footer {
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>
