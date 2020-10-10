<template>
  <div class="details">
    <div>
      <el-row>
        <el-form :model="details" ref="form" label-width="120px">
          <el-col :span="24">
            <p>基本信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标名">
              <el-input
                v-model="details.entitle"
                readonly="readonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="借款方">
              <el-col :span="19">
                <el-input
                  v-model="details.borrower"
                  readonly="readonly"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="年利率">
              <el-input v-model="details.annual" readonly="readonly">
              </el-input>
            </el-form-item>
            <el-form-item label="期限类型">
              <el-input
                v-model="details.deadline"
                readonly="readonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="借款起息方式">
              <el-input v-model="details.way"></el-input>
            </el-form-item>
            <el-form-item label="逾期罚息率">
              <el-input v-model="details.penalty" readonly="readonly">
              </el-input>
            </el-form-item>
            <el-form-item label="资金用途">
              <el-input v-model="details.way" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险等级">
              <el-input v-model="details.grade" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="借款总金额">
              <el-input v-model="details.money" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="还款方式">
              <el-input
                v-model="details.repayment"
                readonly="readonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="借款期限">
              <el-input
                v-model="details.deadline"
                readonly="readonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="借款管理费月率" prop="monthly">
              <el-input
                v-model="details.monthly"
                readonly="readonly"
              ></el-input>
            </el-form-item>
            <el-form-item label="借款类型">
              <el-input v-model="details.type" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="还款来源">
              <el-input v-model="details.source" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <!--      担保信息-->
          <el-col :span="24">
            <p>担保信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否担保">
              <el-input v-model="details.assure" readonly="readonly">
              </el-input>
            </el-form-item>
            <el-form-item label="抵押材料">
              <el-input v-model="details.materials" readonly="readonly">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="担保机构">
              <el-input
                v-model="details.guarantee"
                readonly="readonly"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--      借款资料-->
          <el-col :span="24">
            <p>借款资料</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传借款资料">
              <el-input v-model="details.datum" readonly="readonly"></el-input>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      details: {
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
        datum: ""
      }
    };
  }
};
</script>

<style scoped></style>
<style>
.details .el-input__inner {
  border: none;
  background-color: white;
}
</style>
