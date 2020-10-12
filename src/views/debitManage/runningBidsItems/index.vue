<template>
  <div class="maintain">
    <el-dialog
      title="修改标的信息"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="借款编号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="借款方">
          <el-input v-model="form.borrower"></el-input>
        </el-form-item>
        <el-form-item label="借款人手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="标名">
          <el-input v-model="form.entitle"></el-input>
        </el-form-item>
        <el-form-item label="借款金额">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="年利率化">
          <el-input v-model="form.annual"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit">确定</el-button>
        <el-button @click="reBack">返回</el-button>
      </span>
    </el-dialog>

    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款方"
                  suffix-icon="el-icon-search"
                  v-model="peopleList.borrower"
                  @change="searchRunning"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款人手机"
                  suffix-icon="el-icon-search"
                  v-model="peopleList.phone"
                  @change="searchRunning"
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
        <el-table-column prop="num" label="借款编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
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
        <el-table-column prop="putawaytime" label="上架时间">
          <span>{{ tableData.putawaytime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="saletime" label="开售时间">
          <span>{{ tableData.saletime | formatDate }}</span>
        </el-table-column>
        <el-table-column prop="paymoney" label="已投金额"> </el-table-column>
        <el-table-column prop="speed" label="投资进度" :formatter="invest">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          :formatter="markState"
        ></el-table-column>
        <el-table-column prop="action" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
            |<el-button type="text" @click="down(scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
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
    <!--下架弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      注意：<span id="red"
        >标下架后，投资款项全部返还至投资者账户中，只能获得返还的本金，无法获得利息</span
      >
      <el-form>
        <el-form-item label="活动形式:" prop="remarks" required>
          <el-input type="textarea" v-model="remarks"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="markDown">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MarkMange",
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: "",
        page: ""
      },
      remarks: "",
      loading: true,
      input1: "",
      input2: "",
      currentPage: 1,
      pageSize: 3,
      total: 3,
      tableData: [],
      selectVal: "",
      dialogFormVisible: false,
      centerDialogVisible: false,
      form: {
        num: "",
        borrower: "",
        phone: "",
        entitle: "",
        money: "",
        annual: "",
        state: ""
      }
    };
  },
  rules: {
    remarks: [{ required: true, message: "请填写理由", trigger: "blur" }]
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post("/markApi/finance/loan/findingByPage", {
          limit: this.currentPage,
          page: this.pageSize,
          count: this.total
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            this.loading = false;
            console.log(response.data, response.data.count);
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    edit(obj) {
      this.dialogFormVisible = true;
      this.form.num = obj.num;
      this.form.borrower = obj.borrower;
      this.form.phone = obj.phone;
      this.form.entitle = obj.entitle;
      this.form.money = obj.money;
      this.form.annual = obj.annual;
      this.form.state = obj.state;
    },
    submit() {
      this.dialogFormVisible = false;
      this.$axios
        .post("/markApi/finance/loan/update", {
          num: this.form.num,
          borrower: this.form.borrower,
          money: this.form.money,
          phone: this.form.phone,
          entitle: this.form.entitle,
          annual: this.form.annual,
          state: this.form.state
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.getData();
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    down(row) {
      this.centerDialogVisible = true;
      this.state = row.state;
      this.num = row.num;
    },
    markDown() {
      console.log({
        num: this.num,
        remarks: this.remarks,
        state: this.state
      });
      this.$axios
        .post("/markApi/finance/loan/updating", {
          num: "" + this.num,
          remarks: "" + this.remarks,
          state: this.state
        })
        .then(response => {
          this.centerDialogVisible = false;
          console.log(response);
          this.getData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    searchRunning() {
      this.$axios
        .post("/markApi/finance/loan/findingByPage", {
          borrower: this.peopleList.borrower,
          phone: this.peopleList.phone,
          limit: this.currentPage,
          page: this.pageSize,
          count: this.total
        })
        .then(response => {
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            console.log(response.data);
          } else {
            this.$message(response.data.msg);
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    reBack() {
      this.dialogFormVisible = false;
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.searchRunning();
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.searchRunning();
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
.dialog-footer {
  display: flex;
  align-items: center;
}
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
#red {
  color: red;
}
</style>
