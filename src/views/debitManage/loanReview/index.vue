<template>
  <div class="main">
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
            <el-input v-model="formData.entitle" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="借款方">
            <el-input
              v-model="formData.borrower"
              readonly="readonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="年利率">
            <el-input v-model="formData.annual" readonly="readonly"> </el-input>
          </el-form-item>
          <el-form-item label="期限类型">
            <el-input v-model="loanTerm" readonly="readonly"> </el-input>
          </el-form-item>
          <el-form-item label="借款起息方式">
            <el-input v-model="formData.way" readonly="readonly"> </el-input>
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
            <el-input v-model="formData.grade" readonly="readonly"> </el-input>
          </el-form-item>
          <el-form-item label="借款总金额">
            <el-input v-model="formData.money" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="还款方式">
            <el-input v-model="formData.repayment" readonly="readonly">
            </el-input>
          </el-form-item>
          <el-form-item label="借款期限">
            <el-input v-model="termType" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="借款管理费月率">
            <el-input v-model="formData.monthly" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="借款类型">
            <el-input v-model="formData.type" readonly="readonly"> </el-input>
          </el-form-item>
          <el-form-item label="还款来源">
            <el-input v-model="formData.source" readonly="readonly"></el-input>
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
            <el-input v-model="formData.assure" readonly="readonly"> </el-input>
          </el-form-item>
          <el-form-item label="抵押类型">
            <el-input v-model="formData.pledge" readonly="readonly"> </el-input>
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
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
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
        pass: "0"
      },
      loanTerm: "",
      termType: ""
    };
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
<style>
.main .el-input {
  border: 0;
  outline: 0;
}
</style>
