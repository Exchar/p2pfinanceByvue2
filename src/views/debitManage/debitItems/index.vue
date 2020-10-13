<template>
  <div class="viewMainCHild">
    <div class="viewMain1">
      <el-row :gutter="20" class="searchLine">
        <el-col :span="4"
          ><el-input
            v-model="input1"
            placeholder="搜索借款方"
            suffix-icon="el-icon-search"
            @change="searchLoan"
          ></el-input
        ></el-col>
        <el-col :span="4"
          ><el-input
            v-model="input2"
            placeholder="搜索借款人手机"
            suffix-icon="el-icon-search"
            @change="searchLoan"
          ></el-input
        ></el-col>
        <el-col :span="4">
          <el-select
            v-model="value"
            placeholder="全部状态"
            @change="searchLoan"
          >
            <el-option label="全部状态" value=""> </el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.sname"
              :value="item.id"
            >
            </el-option> </el-select
        ></el-col>
        <el-col :span="3" :offset="6"
          ><el-button plain>自定义列</el-button></el-col
        >
        <el-col :span="3"><el-button plain>导出</el-button></el-col>
      </el-row>
      <el-table
        :data="debitltemsData"
        style="width: 100%"
        height="350px"
        class="debitTable"
        header-row-class-name="dtable"
        v-loading="loading"
      >
        <el-table-column label="借款ID" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款方" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.borrower }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款人手机" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款名称" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.entitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款金额" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ "￥" + scope.row.money.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年化利率" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.annual * 100 + "%" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="还款方式" width="180" align="center">
          <template slot-scope="scope">
            <p v-if="Number(debitltemsData[scope.$index].repayment) === 1">
              一次性还款
            </p>
            <p v-if="Number(debitltemsData[scope.$index].repayment) === 2">
              等额本息
            </p>
            <p v-if="Number(debitltemsData[scope.$index].repayment) === 3">
              按月付息到期还本
            </p>
            <p v-if="debitltemsData[scope.$index].repayment == 4">按天还款</p>
          </template>
        </el-table-column>
        <el-table-column label="期限" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.deadline }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款管理费月率" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.monthly * 100 + "%" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借款管理费" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ "￥" + scope.row.managerfee.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.putawaytime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开售时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.saletime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投资进度" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.speed.toFixed(2) * 100 + "%" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template slot-scope="scope">
            <p v-if="Number(debitltemsData[scope.$index].state) === 1">
              进行中
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 2">
              满标状态
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 3">
              初审未通过
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 4">
              待上架
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 40">
              已上架
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 50">
              已下架
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 60">
              新标草稿
            </p>
            <p v-if="Number(debitltemsData[scope.$index].state) === 100">
              复审下架
            </p>
          </template> </el-table-column
        ><el-table-column
          label="操作"
          width="200"
          style="width:200px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text" @click="checkDetail(scope.row)"
                >详情</el-button
              >
              <el-button type="text" @click="invsetRecord(scope.row)"
                >投资记录</el-button
              >
              <el-button type="text" @click="paybackRecord(scope.row)"
                >还款记录</el-button
              >
            </el-button-group>

            <el-dialog title="借款记录详情" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="借款ID：" :label-width="formLabelWidth">
                  <span>{{ form.num }}</span>
                </el-form-item>
                <el-form-item label="借款方：" :label-width="formLabelWidth">
                  <span>{{ form.borrower }}</span>
                </el-form-item>
                <el-form-item
                  label="借款人手机："
                  :label-width="formLabelWidth"
                >
                  <span>{{ form.phone }}</span>
                </el-form-item>
                <el-form-item label="借款名称：" :label-width="formLabelWidth">
                  <span>{{ form.entitle }}</span>
                </el-form-item>
                <el-form-item label="借款金额：" :label-width="formLabelWidth">
                  <span>{{
                    form.money ? "￥" + parseFloat(form.money).toFixed(2) : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="年化利率：" :label-width="formLabelWidth">
                  <span>{{ form.annual ? form.annual * 100 + "%" : "" }}</span>
                </el-form-item>
                <el-form-item label="还款方式：" :label-width="formLabelWidth">
                  <span v-if="Number(form.repayment) === 1">一次性还款</span>
                  <span v-if="Number(form.repayment) === 2">等额本息</span>
                  <span v-if="Number(form.repayment) === 3">
                    按月付息到期还本
                  </span>
                  <span v-if="Number(form.repayment) === 4">按天还款</span>
                </el-form-item>
                <el-form-item label="期限：" :label-width="formLabelWidth">
                  <span>{{ form.deadline }}</span>
                </el-form-item>
                <el-form-item
                  label="借款管理费月率："
                  :label-width="formLabelWidth"
                >
                  <span>{{ form.monthly * 100 + "%" }}</span>
                </el-form-item>
                <el-form-item
                  label="借款管理费："
                  :label-width="formLabelWidth"
                >
                  <span>{{
                    form.managerfee
                      ? "￥" + parseFloat(form.managerfee).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="上架时间：" :label-width="formLabelWidth">
                  <span>{{ form.putawaytime | formatDate }}</span>
                </el-form-item>
                <el-form-item label="开售时间：" :label-width="formLabelWidth">
                  <span>{{ form.saletime | formatDate }}</span>
                </el-form-item>
                <el-form-item label="投资进度：" :label-width="formLabelWidth">
                  <span>{{
                    parseFloat(form.speed).toFixed(2) * 100 + "%"
                  }}</span>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                  <span v-if="Number(form.state) === 1">进行中</span>
                  <span v-if="Number(form.state) === 2">满标状态</span>
                  <span v-if="Number(form.state) === 3">初审未通过</span>
                  <span v-if="Number(form.state) === 4">待上架</span>
                  <span v-if="Number(form.state) === 40">已上架</span>
                  <span v-if="Number(form.state) === 50">已下架</span>
                  <span v-if="Number(form.state) === 60">新标草稿</span>
                  <span v-if="Number(form.state) === 100">复审下架</span>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false"
                  >关闭</el-button
                >
              </div>
            </el-dialog>

            <el-dialog title="投资记录详情" :visible.sync="dialogForm1Visible">
              <p v-show="form1.id ? false : true">没有该条数据对应的投资记录</p>
              <el-form :model="form1" v-show="form1.id ? true : false">
                <el-form-item label="标的编号" :label-width="formLabelWidth">
                  <span>{{ form1.num }}</span>
                </el-form-item>
                <el-form-item label="投资人" :label-width="formLabelWidth">
                  <span>{{ form1.investor }}</span>
                </el-form-item>
                <el-form-item label="投资人手机" :label-width="formLabelWidth">
                  <span>{{ form1.phone }}</span>
                </el-form-item>
                <el-form-item label="借款名称" :label-width="formLabelWidth">
                  <span>{{ form1.entitle }}</span>
                </el-form-item>
                <el-form-item label="标名" :label-width="formLabelWidth">
                  <span>{{ form1.investor }}</span>
                </el-form-item>
                <el-form-item label="投资金额" :label-width="formLabelWidth">
                  <span>{{
                    form1.money ? "￥" + parseFloat(form1.money).toFixed(2) : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="利息" :label-width="formLabelWidth">
                  <span>{{
                    form1.interest ? "￥" + form1.interest * 100 + "%" : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="收益方式" :label-width="formLabelWidth">
                  <span>{{ form1.income }}</span>
                </el-form-item>
                <el-form-item label="借款管理费" :label-width="formLabelWidth">
                  <span>{{
                    form1.managerfee
                      ? "￥" + parseFloat(form1.managerfee).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="收益方式" :label-width="formLabelWidth">
                  <span>{{ form1.income }}</span>
                </el-form-item>
                <el-form-item label="已收金额" :label-width="formLabelWidth">
                  <span>{{
                    form1.amount
                      ? "￥" + parseFloat(form1.amount).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="待收总额" :label-width="formLabelWidth">
                  <span>{{
                    form1.duein ? "￥" + parseFloat(form1.duein).toFixed(2) : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="投资渠道" :label-width="formLabelWidth">
                  <span>{{ form1.ditch }}</span>
                </el-form-item>
                <el-form-item label="投资时间" :label-width="formLabelWidth">
                  <span>{{ form1.investime | formatDate }}</span>
                </el-form-item>
                <el-form-item label="投资状态" :label-width="formLabelWidth">
                  <span v-if="Number(form1.state) === 1">待回款</span>
                  <span v-if="Number(form1.state) === 2">已结算</span>
                  <span v-if="Number(form1.state) === 3">撤标</span>
                  <span v-if="Number(form1.state) === 4">流标</span>
                  <span v-if="Number(form1.state) === 5">投资中</span>
                  <span v-if="Number(form1.state) === 6">投资失败</span>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeInvest">关闭</el-button>
              </div>
            </el-dialog>

            <el-dialog title="还款记录详情" :visible.sync="dialogForm2Visible">
              <p v-show="form2.debitNum ? false : true">
                没有该条数据对应的还款记录
              </p>
              <el-form :model="form2" v-show="form2.debitNum ? true : false">
                <el-form-item label="借款ID" :label-width="formLabelWidth">
                  <span>{{ form2.debitNum }}</span>
                </el-form-item>
                <el-form-item label="借款方" :label-width="formLabelWidth">
                  <span>{{ form2.borrowname }}</span>
                </el-form-item>
                <el-form-item label="借款人手机" :label-width="formLabelWidth">
                  <span>{{ form2.phone }}</span>
                </el-form-item>
                <el-form-item label="标名" :label-width="formLabelWidth">
                  <span>{{ form2.backname }}</span>
                </el-form-item>
                <el-form-item label="借款金额" :label-width="formLabelWidth">
                  <span>{{
                    form2.money ? "￥" + parseFloat(form2.money).toFixed(2) : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="期限" :label-width="formLabelWidth">
                  <span>{{
                    form2.backdate
                      ? new Date(form2.backdate).toLocaleDateString()
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="还款方式" :label-width="formLabelWidth">
                  <span>{{ form2.type }}</span>
                </el-form-item>
                <el-form-item label="还款状态" :label-width="formLabelWidth">
                  <span>{{ form2.repayStateText }}</span>
                </el-form-item>
                <el-form-item label="期数" :label-width="formLabelWidth">
                  <span>{{ form2.time }}</span>
                </el-form-item>
                <el-form-item label="应还款时间" :label-width="formLabelWidth">
                  <span>{{
                    form2.returntime
                      ? new Date(form2.returntime).toLocaleDateString()
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item
                  label="实际还款时间"
                  :label-width="formLabelWidth"
                >
                  <span>{{
                    form2.realtime
                      ? new Date(form2.realtime).toLocaleDateString()
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="预还金额" :label-width="formLabelWidth">
                  <span>{{
                    form2.returnmoney
                      ? "￥" + parseFloat(form2.returnmoney).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="实还金额" :label-width="formLabelWidth">
                  <span>{{
                    form2.realmoney
                      ? "￥" + parseFloat(form2.realmoney).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="本金" :label-width="formLabelWidth">
                  <span>{{
                    form2.capital
                      ? "￥" + parseFloat(form2.capital).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="利息" :label-width="formLabelWidth">
                  <span>{{
                    form2.interest
                      ? "￥" + parseFloat(form2.interest).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="逾期罚息" :label-width="formLabelWidth">
                  <span>{{
                    form2.punish
                      ? "￥" + parseFloat(form2.punish).toFixed(2)
                      : ""
                  }}</span>
                </el-form-item>
                <el-form-item label="是否逾期" :label-width="formLabelWidth">
                  <span v-if="Number(form2.backtime) === 0">是</span>
                  <span v-if="Number(form2.backtime) === 1">否</span>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closepayback">关闭</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="sizes,total,  jumper ,prev, pager, next"
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
import "@/assets/depitXin.css";
export default {
  name: "debitItems",
  data() {
    return {
      input1: "",
      input2: "",
      options: [
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      debitltemsData: [],
      tableData: {
        num: "",
        borrower: "",
        phone: "",
        entitle: "",
        money: "",
        annual: "",
        repayment: "",
        deadline: "",
        monthly: "",
        managerfee: "",
        putawaytime: "",
        saletime: "",
        speed: "",
        state: ""
      },
      currentPage4: 1,
      pageSize: 5,
      total: 5,
      loading: false,
      dialogFormVisible: false,
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      form: {
        num: "",
        borrower: "",
        phone: "",
        entitle: "",
        money: "",
        annual: "",
        repayment: "",
        deadline: "",
        monthly: "",
        managerfee: "",
        putawaytime: "",
        saletime: "",
        speed: "",
        state: ""
      },
      form1: {},
      form2: {},
      formLabelWidth: "120px"
    };
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  mounted: function() {
    this.getloanList();
    this.getloanStateList();
  },
  methods: {
    //得到数据
    getloanList: function() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/allBorSign/findAllBorSignPage", {
          limit: this.currentPage4,
          page: this.pageSize
        })
        .then(response => {
          console.log(response.data);
          var result = response.data;
          if (Number(result.code) === 200) {
            this.debitltemsData = result.data;
            this.total = response.data.count;
            console.log(result.data);
            this.loading = false;
          } else {
            this.$alert(result.message);
            this.loading = false;
          }
        })
        .catch(() => {});
    },
    //全部状态
    getloanStateList() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/pullMean/findAllTbState")
        .then(response => {
          var result = response.data;
          this.options = result.data;
          this.loading = false;
          console.log(response.data);
        })
        .catch(() => {});
    },
    //详情
    getDetail: function(obj) {
      this.form.num = obj.num;
      this.form.borrower = obj.borrower;
      this.form.phone = obj.phone;
      this.form.entitle = obj.entitle;
      this.form.money = obj.money;
      this.form.annual = obj.annual;
      this.form.repayment = obj.repayment;
      this.form.deadline = obj.deadline;
      this.form.monthly = obj.monthly;
      this.form.managerfee = obj.managerfee;
      this.form.putawaytime = obj.putawaytime;
      this.form.saletime = obj.saletime;
      this.form.speed = obj.speed;
      this.form.state = obj.state;
    },
    //搜索
    searchLoan() {
      console.log({
        limit: this.currentPage4,
        page: this.pageSize,
        phone: this.input1,
        borrower: this.input2,
        state: this.value,
        count: this.total
      });
      this.loading = true;
      this.$axios
        .post("/markApi/finance/allBorSign/findAllBorSignPage", {
          limit: this.currentPage4,
          page: this.pageSize,
          borrower: this.input1,
          phone: this.input2,
          state: this.value,
          count: this.total
        })
        .then(response => {
          if (Number(response.data.code) === 200) {
            this.debitltemsData = response.data.data;
            console.log(response.data.data);
            this.total = response.data.count;
            this.loading = false;
          } else {
            this.$message(response.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    //投资记录
    invsetRecord(obj) {
      console.log(this.form1.num);
      this.dialogForm1Visible = true;
      this.$axios
        .post("/markApi/finance/allBorSign/findByNum", {
          num: "" + obj.num
        })
        .then(response => {
          if (Number(response.data.code) === 200) {
            if (response.data.data.length > 0) {
              this.form1 = response.data.data[0];
            } else {
              this.form1 = {};
            }
            console.log(response.data);
            this.loading = false;
          } else {
            this.$message(response.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    //还款记录
    paybackRecord(obj) {
      console.log(this.form2.num);
      this.dialogForm2Visible = true;
      this.$axios
        .post("/api/repaymentDetailItem", {
          num: "" + obj.num
        })
        .then(response => {
          if (Number(response.data.code) === 200) {
            if (response.data.data.length > 0) {
              this.form2 = response.data.data[0];
            } else {
              this.form2 = {};
            }
            console.log(response.data);
            this.loading = false;
          } else {
            this.$message(response.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchLoan();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.searchLoan();
    },
    checkDetail(row) {
      this.dialogFormVisible = true;
      this.getDetail(row);
    },
    //投资
    closeInvest() {
      this.dialogForm1Visible = false;
      this.form1 = {};
    },
    //还款
    closepayback() {
      this.dialogForm2Visible = false;
      this.form2 = {};
    }
  }
};
</script>
<style scoped>
.el-col {
  border-radius: 4px solid;
}
input.el-input__inner {
  width: 50px !important;
}
.el-pagination__total {
  margin-left: 20px;
}
.el-table__header-wrapper {
  background-color: gray !important;
}
.el-col-12 {
  height: 30px !important;
}
.el-table {
  margin-bottom: 30px;
}
.searchLine {
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
