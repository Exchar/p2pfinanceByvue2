<template>
<<<<<<< HEAD
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款方"
            suffix-icon="el-icon-search"
            v-model="input4"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款人手机"
            suffix-icon="el-icon-search"
            v-model="input4"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="queryState"
            placeholder="请选择"
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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="num" label="编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column prop="guarantee" label="担保机构"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column prop="annual" label="年化利率"> </el-table-column>
        <el-table-column prop="repayment" label="还款方式"> </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-tale-column prop="created" label="添加时间"> </el-tale-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="operation" label="操作"> </el-table-column>
      </el-table>
    </div>
=======
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
>>>>>>> ssj
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
<<<<<<< HEAD
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      queryState: "",
      stateList: [
        {
          id: 1,
          name: "新增草稿"
        },
        {
          id: 2,
          name: "新标待审核"
        },
        {
          id: 3,
          name: "初审不通过"
        }
      ],
      tableData: [
        {
          num: 1,
          borrower: "新手一号",
          phone: "15222222",
          created: "2016-05-02",
          entitle: "新手一号",
          deadline: "2016-05-02",
          guarantee: "上海典当",
          type: "类型",
          money: "20000",
          annual: "12%",
          repayment: "按月付息",
          state: "待审核",
          name: "王小虎"
        }
      ]
=======
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
>>>>>>> ssj
    };
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
<<<<<<< HEAD
=======
<style>
.main .el-input {
  border: 0;
  outline: 0;
}
</style>
>>>>>>> ssj
