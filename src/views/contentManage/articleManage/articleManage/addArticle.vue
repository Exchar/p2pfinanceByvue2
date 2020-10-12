<template>
  <div>
    <h1>基本信息</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!--文章标题-->
      <el-form-item class="title" label="文章标题 :" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入文章标题"
        ></el-input>
      </el-form-item>
      <!--来源-->
      <el-form-item class="source" label="来源 :" prop="source">
        <el-input
          v-model="ruleForm.source"
          placeholder="请输入文章来源"
        ></el-input>
      </el-form-item>
      <!--更新时间-->
      <el-form-item class="time" label="更新时间 :" required>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-picker
              placeholder="点击选择时间"
              v-model="ruleForm.time"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!--文章类别-->
      <el-form-item class="classic" label="文章类别 :" prop="type">
        <el-select v-model="ruleForm.type" style="width: 193%">
          <el-option label="请选择" value="2"></el-option>
          <el-option label="新闻公告" value="3"></el-option>
          <el-option label="行业动态" value="4"></el-option>
          <el-option label="帮助中心" value="5"></el-option>
          <el-option label="活动中心" value="6"></el-option>
          <el-option label="关于我们" value="7"></el-option>
        </el-select>
      </el-form-item>
      <!--作者-->
      <el-form-item class="author" label="作者 :" prop="author">
        <el-input
          v-model="ruleForm.author"
          placeholder="请输入文章作者"
        ></el-input>
      </el-form-item>
    </el-form>
    <h2>文章详情</h2>
    <!--上传图片-->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <p class="face">活动封面 :</p>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请上传JPG或PNG格式的新闻图片，且不超过500kb
        </div>
      </el-upload>
      <!--跳转链接-->
      <el-form-item class="jump" label="跳转链接 :" prop="link">
        <el-input
          v-model="ruleForm.link"
          placeholder="请输入文章跳转链接"
        ></el-input>
      </el-form-item>
      <!--介绍-->
      <el-form-item class="introduce" label="一句话介绍 :" prop="introduce">
        <el-input
          v-model="ruleForm.introduce"
          placeholder="请输入一句话介绍"
        ></el-input>
      </el-form-item>
      <!--文章正文-->
      <el-form-item class="text" label="文章正文 :" prop="text">
        <el-input type="textarea" v-model="ruleForm.text"></el-input>
      </el-form-item>
    </el-form>
    <h3>上架操作</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!--排序-->
      <el-form-item class="order" label="排序 :" prop="number">
        <el-input
          v-model="ruleForm.number"
          placeholder="请输入正整数,数字越大越靠前"
        ></el-input>
      </el-form-item>
      <!--状态-->
      <el-form-item class="state" label="状态 :" prop="state">
        <el-select v-model="ruleForm.state" style="width: 193%">
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!--提交或返回操作-->
      <el-form-item class="button">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="reverseForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
    <!--单选框-->
    <p class="top">是否置顶 :</p>
    <template>
      <el-radio class="radio1" v-model="radio" label="1">否</el-radio>
      <el-radio class="radio2" v-model="radio" label="2">是</el-radio>
    </template>
  </div>
</template>
<script>
export default {
  name: "addArticle",
  data: function() {
    return {
      radio: "1",
      ruleForm: {
        id: "",
        title: "",
        source: "",
        time: "",
        type: "",
        author: "",
        link: "",
        introduce: "",
        text: "",
        number: "",
        state: ""
      },
      rules: {
        id: "",
        title: "",
        source: "",
        time: "",
        type: "",
        author: "",
        link: "",
        introduce: "",
        text: "",
        number: "",
        state: ""
      }
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList: function() {
      //向后端服务器去请求数据
      this.$axios
        .post("/markApi/finance/essay/findByPage", {
          page: this.page,
          limit: this.limit,
          count: this.count
        })
        .then(response => {
          console.log(response);
          var result = response.data;
          if (result.code === "200") {
            this.tableData = response.data.data;
            console.log(this.tableData);
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm() {
      //获取数据到服务器，进行添加,接收服务器响应
      this.$axios
        .post("/markApi/finance/essay/add", {
          title: this.ruleForm.title,
          source: this.ruleForm.source,
          time: this.ruleForm.time,
          type: this.ruleForm.type,
          author: this.ruleForm.author,
          link: this.ruleForm.link,
          introduce: this.ruleForm.introduce,
          text: this.ruleForm.text,
          number: this.ruleForm.number,
          state: this.ruleForm.state
        })
        .then(response => {
          console.log(response);
          let result = response.data;
          if (result.code === "200") {
            console.log(result);
            this.$message.success(result.msg);
            this.$router.push("/contentManage/articleManage/articleManage");
            this.getArticleList();
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
      this.$router.push("/contentManage/articleManage/articleManage");
    }
  }
};
</script>
<style scoped>
body {
  position: relative;
}
h1 {
  position: absolute;
  top: 10px;
  left: 20px;
}
.title {
  position: absolute;
  top: 60px;
  width: 40%;
}
.source {
  position: absolute;
  top: 110px;
  width: 40%;
}
.time {
  position: absolute;
  top: 160px;
  width: 78%;
}
.classic {
  position: absolute;
  top: 60px;
  right: 400px;
}
.author {
  position: absolute;
  top: 110px;
  right: 195px;
  width: 40%;
}
h2 {
  position: absolute;
  top: 200px;
  left: 20px;
  font-size: 19px;
}
.face {
  position: absolute;
  top: 240px;
  left: 20px;
}
.upload-demo {
  position: absolute;
  top: 240px;
  left: 100px;
}
.jump {
  position: absolute;
  top: 240px;
  right: 195px;
  width: 40%;
}
.introduce {
  position: absolute;
  top: 300px;
  right: 195px;
  width: 40%;
}
.text {
  position: absolute;
  top: 360px;
  right: 195px;
  width: 40%;
}
h3 {
  position: absolute;
  top: 430px;
  left: 20px;
  font-size: 19px;
}
.order {
  position: absolute;
  top: 480px;
  width: 40%;
}
.state {
  position: absolute;
  top: 530px;
}
.button {
  position: absolute;
  top: 530px;
  right: 290px;
}
.el-button {
  width: 150px;
  margin: 0 10px;
}
.top {
  position: absolute;
  top: 475px;
  right: 635px;
}
.radio1 {
  position: absolute;
  top: 495px;
  right: 550px;
}
.radio2 {
  position: absolute;
  top: 495px;
  right: 500px;
}
</style>
