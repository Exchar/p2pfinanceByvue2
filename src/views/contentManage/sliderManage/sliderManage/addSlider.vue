<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="title" label="标题 :" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <!--上传-->
      <el-upload
        class="lunbo"
        action="/markApi/finance/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="imgSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <!--跳转链接-->
      <el-form-item class="art" label="跳转链接 :" prop="link">
        <el-input
          v-model="ruleForm.link"
          placeholder="请输入文章跳转链接"
        ></el-input>
      </el-form-item>
      <!--轮播位置-->
      <el-form-item class="position" label="轮播位置 :" prop="position">
        <el-input
          v-model="ruleForm.position"
          placeholder="请输入轮播位置"
        ></el-input>
      </el-form-item>
      <!--区域-->
      <el-form-item class="area" label="省份区域 :" prop="province">
        <el-input
          v-model="ruleForm.province"
          placeholder="请输入省份区域"
        ></el-input>
      </el-form-item>
      <!--轮播位置-->
      <el-form-item class="position" label="轮播位置 :" prop="position">
        <el-input v-model="ruleForm.position" placeholder="请输入轮播位置">
        </el-input>
      </el-form-item>
      <!--区域-->
      <el-form-item class="area" label="省份区域 :" prop="province">
        <el-input v-model="ruleForm.province" placeholder="请输入省份区域">
        </el-input>
      </el-form-item>

      <h1 class="operate">上架操作</h1>
      <!--选择时间-->
      <el-form-item class="time" label="上架时间 :" required>
        <el-col :span="11">
          <el-form-item prop="starttime">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.starttime"
              style="width: 100%;"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="finishtime">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.finishtime"
              style="width: 100%;"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!--排序-->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="order" label="排序 :" prop="number">
          <el-input
            v-model="ruleForm.number"
            placeholder="请输入正整数,数字越大越靠前"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!--选择状态-->
      <el-form-item class="state" label="状态 :" prop="state">
        <el-select v-model="ruleForm.state" style="width: 193%">
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!--提交或返回操作-->
      <el-form-item class="button">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交
        </el-button>
        <el-button @click="reverseForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "addSlider",
  data: function() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        id: "",
        title: "",
        link: "",
        position: "",
        province: "",
        starttime: "",
        finishtime: "",
        number: "",
        state: ""
      },
      rules: {
        id: "",
        title: "",
        link: "",
        position: "",
        province: "",
        starttime: "",
        finishtime: "",
        number: "",
        state: ""
      }
    };
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgSuccess: function(res) {
      this.dialogImageUrl = res.fileNameAddress;
      console.log(res);
    },
    submitForm() {
      //获取数据到服务器，进行添加,接收服务器响应
      this.$axios
        .post("/markApi/finance/ad/add", {
          title: this.ruleForm.title,
          link: this.ruleForm.link,
          position: this.ruleForm.position,
          starttime: this.ruleForm.starttime,
          finishtime: this.ruleForm.finishtime,
          number: this.ruleForm.number,
          state: this.ruleForm.state,
          province: this.ruleForm.province,
          picture: this.dialogImageUrl
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.code === "200") {
            console.log(result);
            this.$message.success(result.msg);
            this.$router.push("/contentManage/sliderManage/sliderManage");
            this.getSliderList();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          console.log(error);
          // this.$message.error('请求出错')
        });
    },
    reverseForm() {
      this.$router.push("/contentManage/sliderManage/sliderManage");
    }
  }
};
</script>
<style scoped>
body {
  position: relative;
}
.title {
  position: absolute;
  top: 20px;
  width: 40%;
}
.lunbo {
  position: absolute;
  top: 20px;
  left: 600px;
  font-size: 14px;
}
.upload-demo {
  position: absolute;
  top: 20px;
  left: 680px;
}
.art {
  position: absolute;
  top: 80px;
  width: 40%;
}
.position {
  position: absolute;
  top: 140px;
  width: 40%;
}
.area {
  position: absolute;
  top: 200px;
  width: 40%;
}
.operate {
  position: absolute;
  top: 260px;
  left: 20px;
}
.time {
  position: absolute;
  top: 320px;
  width: 40%;
}
.order {
  position: absolute;
  top: 380px;
  width: 40%;
}
.state {
  position: absolute;
  top: 440px;
}
.button {
  position: absolute;
  top: 500px;
  left: -10px;
}
.el-button {
  width: 150px;
  margin: 0 10px;
}
</style>
