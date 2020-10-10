<template>
  <el-row>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
    >
      <div>
        <p>基本信息</p>
      </div>
      <el-col :span="6">
        <el-form-item label="手机号:">
          <el-input v-model="formLabelAlign.tel"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="formLabelAlign.Idcard"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24"><p>银行卡信息</p></el-col>
      <el-col :span="6">
        <el-form-item label="银行卡名称:">
          <el-input v-model="formLabelAlign.Yname"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号:">
          <el-input v-model="formLabelAlign.Yregion"></el-input>
        </el-form-item>
        <el-form-item label="支行名称:">
          <el-input v-model="formLabelAlign.Ytype"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24"
        ><p>操作</p>
        <el-form-item label="状态:">
          <el-radio v-model="formLabelAlign.radio" label="1">正常</el-radio>
          <el-radio v-model="formLabelAlign.radio" label="2">锁定</el-radio>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="formLabelAlign.textarea"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-col>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Modify",
  computed: {
    ...mapGetters(["getUserItem"])
  },
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        tel: "",
        Idcard: "",
        name: "",
        Yname: "",
        Yregion: "",
        Ytype: "",
        radio: "1",
        textarea: ""
      }
    };
  },
  created() {
    console.log(this.getUserItem);
  },
  methods: {
    onSubmit() {
      let str = this.$srore.getters.getModify;
      console.log(str);
      this.$axios.post(
        "/finance/invest/updatesock",
        JSON.stringify({
          tel: this.formLabelAlign.tel,
          Idcard: this.formLabelAlign.Idcard,
          name: this.formLabelAlign.name,
          Yname: this.formLabelAlign.Yname,
          Yregion: this.formLabelAlign.Yregion,
          Ytype: this.formLabelAlign.Ytype
        })
          .then(response => {
            this.tableData = response.data.data;
            console.log("修改" + this.tableData);
          })
          .catch(err => {
            console.log(err);
          })
      );
    }
  }
};
</script>

<style scoped></style>
