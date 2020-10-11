<template>
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
        <el-col :span="12">
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
              <el-button type="primary" @click="getBorrowersList"
                >选择</el-button
              >
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
                <el-table :data="gridData">
                  <el-table-column property="username" label="真实姓名">
                  </el-table-column>
                  <el-table-column
                    property="phone"
                    label="手机号码/用户名"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column property="sock" label="用户状态">
                  </el-table-column>
                  <el-table-column property="type" label="身份类型">
                  </el-table-column>
                  <el-table-column
                    property="registration"
                    label="添加时间"
                    width="140"
                  >
                  </el-table-column>
                  <el-table-column property="options" label="操作">
                    <el-link type="primary" :underline="false"
                      >选择借款人</el-link
                    >
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
        </el-col>
        <el-col :span="12">
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
          <el-form-item label="借款期限" prop="deadline">
            <el-input
              v-model="ruleForm.deadline"
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
        <!--      担保信息-->
        <el-col :span="24">
          <p>担保信息</p>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否担保">
            <el-radio-group v-model="ruleForm.assure">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="抵押类型">
            <el-radio-group v-model="ruleForm.pledge">
              <el-radio label="无"></el-radio>
              <el-radio label="房抵"></el-radio>
              <el-radio label="车抵"></el-radio>
              <el-radio label="民品抵"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
              action="/markApi/finance/pullMean/findAllGgrade"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <!--      借款资料-->
        <el-col :span="24">
          <p>借款资料</p>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上传借款资料" prop="datum">
            <el-input
              v-model="ruleForm.monthlyFee"
              placeholder="请输入0-24之间的数"
            ></el-input>
            <el-upload
              action="/markApi/finance/pullMean/findAllGgrade"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交审核</el-button
            >
            <el-button>保存</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
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
        guarantee: "",
        type: "",
        money: "",
        annual: "",
        repayment: "",
        deadline: "",
        way: "",
        monthly: "",
        purpose: "",
        source: "",
        assure: "",
        penalty: "",
        materials: "",
        pledge: ""
      },
      // 借款人
      borrowers: "",
      gridData: [
        {
          username: "企业1号",
          phone: "1566224",
          sock: "正常",
          type: "企业用户",
          registration: "2017-01-01 12:00",
          options: ""
        }
      ],
      loanTerm: "",
      termType: "",
      dialogTableVisible: false,
      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 校验规则
      rules: {
        borrower: [
          { required: true, message: "借款方不能为空", trigger: "change" }
        ],

        // borrower: [
        //   { required: true, message: '借款方不能为空', trigger: 'change' },
        // ],
        entitle: [{ required: true, message: "标名不能为空", trigger: "blur" }],
        grade: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        annual: [
          { required: true, message: "年利率不能为空", trigger: "blur" },
          { type: "number", message: "年利率必须为数字值", trigger: "blur" },
          { required: true, message: "年利率不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择借款类型", trigger: "change" }
        ],
        way: [
          { required: true, message: "请选择借款起息方式", trigger: "change" }
        ],
        penalty: [
          { required: true, message: "逾期罚息利率不能为空", trigger: "blur" },
          {
            type: "number",
            message: "逾期罚息利率必须为数字值",
            trigger: "blur"
          },
          { required: true, message: "逾期罚息利率不能为空", trigger: "blur" }
        ],
        purpose: [
          { required: true, message: "请选择资金用途", trigger: "change" }
        ],
        money: [
          { required: true, message: "借款总金额不能为空", trigger: "blur" },

          {
            type: "number",
            message: "借款总金额必须为数字值",
            trigger: "blur"
          },
          { required: true, message: "借款总金额不能为空", trigger: "blur" }
        ],
        repayment: [
          { required: true, message: "请选择还款方式", trigger: "change" }
        ],
        deadline: [
          { required: true, message: "请选择期限类型", trigger: "change" }
        ],
        datum: [
          { required: true, message: "借款资料不能为空", trigger: "blur" }
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
          alert("submit!");
          this.ruleForm.deadline = this.termType + this.loanTerm;
          this.$axios
            .post("/markApi/finance/loan/insert", {
              datum: "新增借款资料",
              purpose: "1",
              penalty: "0.9",
              num: "20171045100",
              borrower: "测试借款方100",
              guarantee: "测试担保机构100",
              source: "微信",
              type: "借款类型100",
              way: "1",
              entitle: "测试标名100",
              money: "12000.52",
              phone: "17778444308",
              materials: "抵押物材料100",
              grade: "5",
              assure: "5",
              annual: "0.05",
              monthly: "0.02",
              pledge: "1",
              state: "1",
              deadline: "期限一年",
              repayment: "1",
              managerfee: "200"
            })
            .then(res => {
              if (res.data.code == "200") {
                console.log(res.data.msg);
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
        .post("/api/finance/loanUser/selectLikeName", {
          username: "pp",
          page: 1,
          limit: 5
        })
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
        .post("/markApi/finance/loanUser/select", { page: 1, limit: 5 })
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
    // 图片上传
    handleRemove: function(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
