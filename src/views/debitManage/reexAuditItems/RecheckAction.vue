<template>
  <div class="contain">
    <span class="title">基本信息:</span>
    <el-form label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="借款名称：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="风险等级：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="借款方：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="借款总金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="年利率：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="资金用途：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="借款期限：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="起息方式：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="还款方式：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="借款管理费：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="利息管理费：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
    </el-form>
    <span class="title">担保信息:</span>
    <el-form label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="是否担保：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="担保机构：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="是否抵押：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title">借款资料:</span>
    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <span class="title">标的信息:</span>
    <el-form label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="项目名称：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="标签：">
            <el-input></el-input>
          </el-form-item>
          <div></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="项目类型：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="最低起投金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="递增金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="最大可投金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="上架渠道：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="设置精选：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="新手专享：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="募集时间：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <el-form-item label="上架时间：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="12"
          ><div>
            <el-form-item label="开售时间：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
      </el-row>
    </el-form>
    <span class="title">审核:</span>
    <div>
      <span>是否通过：</span>
      <el-radio v-model="radio" label="1">通过</el-radio>
      <el-radio v-model="radio" label="2">不通过</el-radio>
      <span>备注：</span>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </div>
    <el-form>
      <el-form-item>
        <SubmitButton type="primary" @click="submitForm('numberValidateForm')"
          >提交</SubmitButton
        >
        <BackButton @click="resetForm('numberValidateForm')">返回</BackButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RecheckAction",
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 600;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
