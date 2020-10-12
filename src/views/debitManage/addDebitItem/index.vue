<template>
  <div>
    <el-row :gutter="20">
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-col :span="24">
          <p>基本信息</p>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="11">
          <el-form-item label="标名" prop="entitle">
            <el-input
                v-model="ruleForm.entitle"
                placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="借款方" prop="borrower">
            <el-col :span="19">
              <el-input
                  v-model="ruleForm.borrower"
                  placeholder="请点击按钮选择借款账号"
                  readonly="readonly"
              ></el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="getBorrowersList">选择</el-button>
              <el-dialog title="选择借款人" :visible.sync="dialogTableVisible">
                <el-col :span="8">
                  <el-input
                      size="max"
                      placeholder="搜索借款人姓名"
                      suffix-icon="el-icon-search"
                      v-model="borrowers"
                      @keyup.native="getQueryBorrower"
                  >
                  </el-input>
                </el-col>
                <el-table v-loading="loading" :data="gridData">
                  <el-table-column property="username" label="真实姓名">
                  </el-table-column>
                  <el-table-column
                      property="phone"
                      label="手机号码/用户名"
                      width="200"
                  >
                  </el-table-column>
                  <el-table-column
                      property="sock"
                      label="用户状态"
                      :formatter="sockState"
                  >
                  </el-table-column>
                  <el-table-column
                      property="type"
                      label="身份类型"
                      :formatter="userState"
                  >
                  </el-table-column>
                  <el-table-column
                      property="registration"
                      label="添加时间"
                      width="140"
                      :formatter="timeState"
                  >
                  </el-table-column>
                  <el-table-column property="options" label="操作" width="120px">
                    <template scope="scope">
                      <el-link
                          type="primary"
                          :underline="false"
                          @click="chooseBorrower(scope.row)"
                      >选择借款人</el-link
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </el-col>
          </el-form-item>
          <el-form-item label="年利率" prop="annual">
            <el-input
                v-model="ruleForm.annual"
                placeholder="请输入1-24之间的数，保留两位小数"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="期限类型">
            <el-radio-group v-model="loanTerm">
              <el-radio label="月"></el-radio>
              <el-radio label="天"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="借款起息方式" prop="way">
            <el-radio-group v-model="ruleForm.way">
              <el-radio label="成立计息"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="逾期罚息率" prop="penalty">
            <el-input
                v-model="ruleForm.penalty"
                placeholder="请输入0-24之间的数，保留两位小数"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="资金用途" prop="purpose">
            <el-select
                v-model="ruleForm.purpose"
                placeholder="请选择"
                style="width: 100%"
            >
              <el-option
                  v-for="item in capitalList"
                  :label="item.pname"
                  :key="item.id"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借款人手机">
            <el-input v-model="ruleForm.phone" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="风险等级" prop="grade">
            <el-select
                v-model="ruleForm.grade"
                placeholder="请选择"
                style="width: 100%"
            >
              <el-option
                  v-for="item in riskList"
                  :label="item.gradename"
                  :key="item.id"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借款总金额" prop="money">
            <el-input
                v-model="ruleForm.money"
                placeholder="请输入500-500000的整数"
            ></el-input>
          </el-form-item>
          <el-form-item label="还款方式" prop="repayment">
            <el-select
                v-model="ruleForm.repayment"
                placeholder="请选择"
                style="width: 100%"
            >
              <el-option
                  v-for="item in repaymentList"
                  :label="item.rname"
                  :key="item.id"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借款期限">
            <el-input
                v-model="termType"
                placeholder="请输入0-999的整数"
            ></el-input>
          </el-form-item>
          <el-form-item label="借款管理费月率" prop="monthly">
            <el-input
                v-model="ruleForm.monthly"
                placeholder="请输入0-24之间的数"
            ></el-input>
          </el-form-item>
          <el-form-item label="借款类型" prop="type">
            <el-select
                v-model="ruleForm.type"
                placeholder="请选择"
                style="width: 100%"
            >
              <el-option
                  v-for="item in loanTypeList"
                  :label="item.tname"
                  :key="item.id"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款来源" prop="source">
            <el-input
                v-model="ruleForm.source"
                placeholder="请输入借款人还款来源"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"><div class="grid-content bg-purple-dark"></div></el-col>
        <!--      担保信息-->
        <el-col :span="24">
          <p>担保信息</p>
        </el-col>
        <el-col :span="1"><div class="grid-content bg-purple-dark"></div></el-col>
        <el-col :span="11">
          <el-form-item label="是否担保">
            <el-radio-group v-model="ruleForm.assure">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="抵押类型">
            <el-radio-group v-model="ruleForm.pledge">
              <el-radio label="无"></el-radio>
              <el-radio label="房抵品"></el-radio>
              <el-radio label="车抵品"></el-radio>
              <el-radio label="民品抵"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="担保机构">
            <el-select
                v-model="ruleForm.guarantee"
                placeholder="请选择"
                style="width: 100%"
            >
              <el-option
                  v-for="item in guaranteeList"
                  :label="item.gname"
                  :key="item.id"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抵押材料">
            <el-upload
                action="/markApi/finance/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview1"
                :on-remove="handleRemove1"
                :on-success="imgSuccess1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="1"><div class="grid-content bg-purple-dark"></div></el-col>
        <!--      借款资料-->
        <el-col :span="24">
          <p>借款资料</p>
        </el-col>
        <el-col :span="1"><div class="grid-content bg-purple-dark"></div></el-col>
        <el-col :span="11">
          <el-form-item label="上传借款资料">
            <el-upload
                action="/markApi/finance/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="imgSuccess"
                accept="image/png,image/gif,image/jpg,image/jpeg"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-divider></el-divider>
      </el-form>

    </el-row>
    <div class="subBTn">
      <el-button type="primary" @click="submitForm('ruleForm')"
      >提交审核</el-button
      >
      <el-button>保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  mounted: function() {
    this.getRiskList();
    this.getCapitalList();
    this.getRepaymentList();
    this.getLoanTypeList();
    this.getGuaranteeList();
  },
  data() {
    return {
      riskList: [],
      capitalList: [],
      repaymentList: [],
      loanTypeList: [],
      guaranteeList: [],
      ruleForm: {
        borrower: "",
        entitle: "",
        grade: "",
        phone: "",
        guarantee: "",
        type: "",
        money: "",
        annual: "",
        repayment: "",
        deadline: "",
        way: "1",
        monthly: "",
        purpose: "",
        source: "",
        assure: "",
        penalty: "",
        materials: "",
        pledge: ""
      },
      currentPage: 1,
      pageSize: 5,
      loading: true,
      // 借款人
      borrowers: "",
      gridData: [],
      loanTerm: "",
      termType: "",
      dialogTableVisible: false,
      // 图片上传
      dialogImageUrl: "",
      dialogImageUrl1: "",
      dialogVisible: false,
      // 校验规则
      rules: {
        borrower: [
          { required: true, message: "借款方不能为空", trigger: "change" }
        ],
        entitle: [{ required: true, message: "标名不能为空", trigger: "blur" }],
        grade: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        annual: [
          { required: true, message: "年利率不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择借款类型", trigger: "change" }
        ],
        way: [
          { required: true, message: "请选择借款起息方式", trigger: "change" }
        ],
        penalty: [
          { required: true, message: "逾期罚息利率不能为空", trigger: "blur" }
        ],
        purpose: [
          { required: true, message: "请选择资金用途", trigger: "change" }
        ],
        money: [
          { required: true, message: "借款总金额不能为空", trigger: "blur" }
        ],
        repayment: [
          { required: true, message: "请选择还款方式", trigger: "change" }
        ],
        monthly: [
          { required: true, message: "借款月费率不能为空", trigger: "blur" }
        ],
        source: [
          { required: true, message: "还款来源不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 返回首页
    toHome: function() {
      this.$router.push("/#/home");
    },
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
      return this.timestampToTime(row.registration);
    },
    // 用户状态转换
    sockState: function(row) {
      return row.sock === 1 ? "正常" : row.sock === 0 ? "锁定" : row.sock;
    },
    // 用户身份转换
    userState: function(row) {
      return row.type === 0
        ? "企业用户"
        : row.type === 1
        ? "个人用户"
        : row.type;
    },
    // 风险等级列表获取
    getRiskList: function() {
      console.log(111);
      this.$axios
        .post("/markApi/finance/pullMean/findAllGgrade")
        .then(res => {
          //请求返回的数据
          //赋值
          this.riskList = res.data.data;
          console.log(this.riskList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 资金用途列表获取
    getCapitalList: function() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllPurpose")
        .then(res => {
          // 请求返回的数据
          // 赋值
          this.capitalList = res.data.data;
          console.log(this.capitalList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取还款方式列表
    getRepaymentList: function() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllRepayment")
        .then(res => {
          // 请求返回的数据
          // 赋值
          this.repaymentList = res.data.data;
          console.log(this.repaymentList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取借款列表
    getLoanTypeList: function() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllType")
        .then(res => {
          // 请求返回的数据
          // 赋值
          this.loanTypeList = res.data.data;
          console.log(this.loanTypeList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取担保机构列表
    getGuaranteeList: function() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllGuarantee")
        .then(res => {
          // 请求返回的数据
          // 赋值
          this.guaranteeList = res.data.data;
          console.log(this.guaranteeList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.way = 1;
          this.ruleForm.deadline = this.termType + this.loanTerm;
          this.ruleForm.annual = this.ruleForm.annual / 100;
          this.ruleForm.monthly = this.ruleForm.monthly / 100;
          this.ruleForm.penalty = this.ruleForm.penalty / 100;
          let assure = 1;
          if (this.ruleForm.assure === "是") {
            assure = 1;
          } else {
            assure = 0;
          }
          let pledge = 1;
          if (this.ruleForm.pledge == "无") {
            pledge = 4;
          } else if (this.ruleForm.pledge == "房抵品") {
            pledge = 1;
          } else if (this.ruleForm.pledge === "车抵品") {
            pledge = 2;
          } else {
            pledge = 3;
          }
          console.log(assure);
          console.log(pledge);
          this.$axios
            .post(
              "/markApi/finance/loan/insert",
              JSON.stringify({
                datum: "" + this.dialogImageUrl,
                purpose: "" + this.ruleForm.purpose,
                penalty: "" + this.ruleForm.penalty,
                borrower: "" + this.ruleForm.borrower,
                guarantee: "" + this.ruleForm.guarantee,
                source: "" + this.ruleForm.source,
                type: "" + this.ruleForm.type,
                way: "" + this.ruleForm.way,
                entitle: "" + this.ruleForm.entitle,
                money: "" + this.ruleForm.money,
                materials: "" + this.dialogImageUrl1,
                grade: "" + this.ruleForm.grade,
                assure: "" + assure,
                annual: "" + this.ruleForm.annual,
                monthly: "" + this.ruleForm.monthly,
                pledge: "" + pledge,
                deadline: "" + this.ruleForm.deadline,
                repayment: "" + this.ruleForm.repayment,
                state: "1",
                phone: "" + this.ruleForm.phone
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.code === "200") {
                this.$message.success(res.data.msg);
                this.$router.push("/debitManage/upholdNewBidItems");
              }
            })
            .catch(error => {
              console.log(error);
            });
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取查询后借款人
    getQueryBorrower: function() {
      this.$axios
        .post("/markApi/finance/loanUser/selectLikeName", {
          username: "" + this.borrowers,
          page: 1,
          limit: 5
        })
        .then(res => {
          // 请求返回的数据
          // 赋值
          this.gridData = res.data.data;
          console.log(this.gridData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取借款人列表
    getBorrowersList: function() {
      this.dialogTableVisible = true;
      this.$axios
        .post("/markApi/finance/loanUser/select", {
          page: this.currentPage,
          limit: this.pageSize
        })
        .then(res => {
          console.log(res);
          if (res.data.code === "200") {
            this.gridData = res.data.data;
            console.log(this.gridData);
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 选择借款人
    chooseBorrower: function(row) {
      this.ruleForm.borrower = row.username;
      this.ruleForm.phone = row.phone;
      this.dialogTableVisible = false;
    },
    // 借款资料图片上传
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgSuccess(res, file) {
      console.log(res, file);
      this.dialogImageUrl = res.fileNameAddress;
    },
    // 抵押物图片上传
    handleRemove1: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview1: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgSuccess1(res, file) {
      console.log(res, file);
      this.dialogImageUrl1 = res.fileNameAddress;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
.marginTop {
  margin-top: 20px;
}
.subBTn {
  text-align: center;
}
.subBTn > div {
  margin-left: 0 !important;
}
.el-form-item__content {
  margin-left: 0 !important;
}
</style>
