<template>
  <div class="contain" >
    <span class="title">基本信息:</span>
    <el-form label-width="120px" :data="baseInfo">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款名称：">
             <span>{{ getMainten.entitle }}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="风险等级：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款方：">
              <span>{{getMainten.borrower}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款总金额：">
              <span>{{getMainten.money}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="年利率：">
              <span>{{getMainten.annual}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="资金用途：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款期限：">
              <span>{{getMainten.deadline}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="起息方式：">
             <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="还款方式：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款管理费：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="利息管理费：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <span>{{}}</span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title">担保信息:</span>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="是否担保：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="担保机构：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="是否抵押：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title">借款资料:</span>
    <el-row>
      <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <span class="title">标的信息:</span>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标名：" prop="entitle" required>
              <el-input v-model="entitle"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标签：" prop="tag" required>
              <el-select v-model="tag" placeholder="请选择标签">
                <el-option label="高收益" value="highProfit"></el-option>
                <el-option label="低风险" value="lowProfit"></el-option>
                <el-option label="官方标" value="official"></el-option>
                <el-option label="红包可用" value="red"></el-option>
                <el-option label="新用户仅限一次" value="newUser"></el-option>
                <el-option label="限时抢投" value="timeLimit"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
          <el-form-item label="标签类型：" prop="markType" required>
            <el-select v-model="markType" placeholder="请选择标签">
              <el-option v-for="item in markTypeList" :key="item.id" :value="item.id" :label="item.cname"></el-option>
            </el-select>
          </el-form-item>
          </div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最低起投金额：" required prop="money">
              <el-input placeholder="请输入0-99999999的整数" v-model="money"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
          <el-form-item label="递增金额：" prop="increase" required>
            <el-select v-model="increase" placeholder="请选择">
              <el-option v-for="item in increaseList" :label="item.value" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最大可投金额：" prop="maxMoney"  required>
              <el-input placeholder="请输入>=最小可投金额,<=借款金额" v-model="maxMoney"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="9"
          ><div>
            <el-form-item label="投资计息方式：" required>
                <el-radio v-model="interest" label="成交日"></el-radio>
                <el-radio v-model="interest" label="T+1"></el-radio>
                <el-radio v-model="interest" label="T+2"></el-radio>
                <el-radio v-model="interest" label="成立计息"></el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="3"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架渠道：" prop="type" required>
              <el-checkbox-group v-model="type">
                <el-checkbox label="PC" name="type"></el-checkbox>
                <el-checkbox label="APP" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
          <el-form-item label="新手专享：" required>
            <el-radio v-model="Novice" label="1">否</el-radio>
            <el-radio v-model="Novice" label="2">是</el-radio>
          </el-form-item>
            </div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
          <el-form-item label="设置精选：" required prop="selected">
            <el-radio v-model="selected" label="1">否</el-radio>
            <el-radio v-model="selected" label="2">是</el-radio>
          </el-form-item>
           </div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="募集时间：" prop="raisingTime" required>
              <div id="raising">
                <el-select
                  v-model="raisingTime"
                  placeholder="设置时间"
                  size="mini"
                >
                  <el-option label="设置时间" value="setting"></el-option>
                  <el-option label="满标为止" value="fullMark"></el-option>
                </el-select>
                <el-input placeholder="请输入整数" size="mini"></el-input>
                <el-select v-model="day" placeholder="天" size="mini">
                  <el-option label="天" value="dayTime"></el-option>
                  <el-option label="小时" value="hour"></el-option>
                </el-select>
              </div>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架时间" required>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="开售时间：" required>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="date3"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="date4"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title">项目介绍:</span>
    <div class="area">
      <el-input type="textarea" v-model="desc"></el-input>
    </div>
    <span class="title">风险控措:</span>
    <div class="area">
      <el-input type="textarea" v-model="risk"></el-input>
    </div>
    <div id="btn">
      <SubmitButton msg="提交"></SubmitButton>
      <BackButton msg="返回"></BackButton>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../../../components/common/SubmitButton";
import BackButton from "../../../components/common/BackButton";
import { mapGetters} from "vuex";
export default {
  name: "Maintenance",
  computed:{
    ...mapGetters(["getMainten"])
  },
  components: {
    SubmitButton,
    BackButton
  },
  data() {
    return {
      baseInfo: {},
      interest: "",
      radio: 1,
      type: [],
      selected: 1,
      Novice: 1,
      raisingTime: "",
      day: "",
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      desc: "",
      entitle: "",
      tag: "",
      markType: "",
      money: "",
      increase: "",
      maxMoney: "",
      risk: "",
      increaseList: "",
      markTypeList: ""
    };
  },
  rules: {
    money: [
        { required: true, message: '金额不能为空'},
        { type: 'number', message: '金额必须为数字值'}
    ],
    markType: [
      {required: true, message: "请选择标签类型", trigger: 'change'}
    ],
    tag: [
      { required: true, message: '请选择标签', trigger: 'change' }
    ],
    entitle: [
      { required: true, message: '标名', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    date1: [
      { type: "date", required: true, message: "请选择日期", trigger: "change" }
    ],
    date2: [
      { type: "date", required: true, message: "请选择时间", trigger: "change" }
    ],
    date3: [
      { type: "date", required: true, message: "请选择日期", trigger: "change" }
    ],
    date4: [
      { type: "date", required: true, message: "请选择时间", trigger: "change" }
    ],
    interest: [
      { required: true, message: '投资计息方式', trigger: 'change' }
    ],
  },
  created() {
    this.getIncrease();
    this.getMarkType();
    console.log(this.getMainten)
  },
  methods: {
    getIncrease() {
      this.$axios
      .post("/markApi/finance/pullMean/findAllAddMoney")
      .then(response => {
        console.log(response);
        if (response.data.code == 200) {
          this.increaseList = response.data.data;
        }else {
          this.$message(response.data.msg)
        }
       })
      .catch(error => {
        console.log(error);
      })
    },
    getMarkType() {
      this.$axios
      .post("/markApi/finance/category/findAll")
      .then(response => {
        console.log(response)
        if(response.data.code == 200){
          this.markTypeList = response.data.data;
        }else{
          this.$message(response.data.msg)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
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
#btn{
  width: 90%;
  height: 100px;
  margin: auto;
  border-top:1px solid rgba(166,166,164,0.5);
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.el-card{
  width: 350px;
  height: 350px;
  margin-left: 200px;
}
#raising {
  display: flex;
  align-items: center;
}
.title {
  display: block;
  font-size: 16px;
  font-weight: 500;
  height: 60px;
  line-height: 60px;
}
.time {
  font-size: 10px;
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
.el-col-2 {
  height: 50px;
}
.el-col-4 {
  height: 50px;
}
.el-col-3 {
  height: 50px;
}
.el-col-16 {
  height: 150px;
}
.area{
  width: 75%;
  height: 150px;
  margin: auto;
}
.contain{
  overflow: scroll;
  height: 600px;
}
</style>
