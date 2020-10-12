<template>
  <div class="contain">
    <span class="title">基本信息:</span>
    <el-form label-width="120px" :data="baseInfo">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款名称：">
              <span>{{ getMainten.entitle }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="风险等级：">
              <span v-if="getMainten.grade == 1">极低</span>
              <span v-if="getMainten.grade == 2">较低</span>
              <span v-if="getMainten.grade == 3">中等</span>
              <span v-if="getMainten.grade == 4">中高</span>
              <span v-if="getMainten.grade == 5">高</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款方：">
              <span>{{ getMainten.borrower }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款总金额：">
              <span>{{ getMainten.money.toFixed(2) }}元</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="年利率：">
              <span>{{ getMainten.annual * 100 + "%" }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="资金用途：">
              <span v-if="getMainten.purpose == 1">短期周转</span>
              <span v-if="getMainten.purpose == 2">生意周转</span>
              <span v-if="getMainten.purpose == 3">购物消费</span>
              <span v-if="getMainten.purpose == 4">长期周转</span>
              <span v-if="getMainten.purpose == 5">其他用途</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款期限：">
              <span>{{ getMainten.deadline }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="起息方式：">
              <span v-if="getMainten.way == 1">成立计息</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="还款方式：">
              <span v-if="getMainten.repayment == 1">一次性还款</span>
              <span v-if="getMainten.repayment == 2">等额本息</span>
              <span v-if="getMainten.repayment == 3">按月付息到期还本</span>
              <span v-if="getMainten.repayment == 4">按天还款</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款管理月费：">
              <span>{{ getMainten.managerfee.toFixed(2) }}元</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="利息管理费：">
              <span>{{ getMainten.monfee.toFixed(2) }}元</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <span>{{ getMainten.penalty * 100 + "%" }}</span>
            </el-form-item>
          </div></el-col
        >
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
              <span v-if="getMainten.assure == 1">是</span>
              <span v-if="getMainten.assure == 0">否</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="担保机构：">
              <span v-if="getMainten.guarantee == 1">上海泽润典当有限公司</span>
              <span v-if="getMainten.guarantee == 2">成都京东金融有限公司</span>
              <span v-if="getMainten.guarantee == 3">杭州阿里金融有限公司</span>
              <span v-if="getMainten.guarantee == 4">北京联想金融有限公司</span>
              <span v-if="getMainten.guarantee == 5"
                >重庆乐花花金融有限公司</span
              >
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="是否抵押：">
              <span v-if="getMainten.pledge == 4">否</span>
              <span v-if="getMainten.pledge != 4">是</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title" :data="baseInfo">标的信息:</span>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标名：" prop="entitle">
              <span>{{ getMainten.entitle }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标签：" prop="label">
              <el-select v-model="ruleForm.label" placeholder="请选择标签">
                <el-option
                  v-for="item in tagList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.laname"
                ></el-option>
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
            <el-form-item label="标签类型：" prop="genre">
              <el-select v-model="ruleForm.genre" placeholder="请选择标签">
                <el-option
                  v-for="item in markTypeList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.cname"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最低起投金额：" prop="lowmoney">
              <el-input
                placeholder="请输入0-99999999的整数"
                v-model="ruleForm.lowmoney"
              ></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="递增金额：" prop="addmoney">
              <el-select v-model="ruleForm.addmoney" placeholder="请选择">
                <el-option
                  v-for="item in increaseList"
                  :label="item.value"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最大可投金额：" prop="largemoney">
              <el-input
                placeholder="请输入>=最小可投金额,<=借款金额"
                v-model="ruleForm.largemoney"
              ></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="9"
          ><div>
            <el-form-item label="投资计息方式：">
              <el-radio v-model="ruleForm.manners" label="成交日"></el-radio>
              <el-radio v-model="ruleForm.manners" label="T+1"></el-radio>
              <el-radio v-model="ruleForm.manners" label="T+2"></el-radio>
              <el-radio v-model="ruleForm.manners" label="成立计息"></el-radio>
            </el-form-item></div
        ></el-col>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架渠道：" prop="ditchs">
              <el-radio label="PC" v-model="ruleForm.ditchs"></el-radio>
              <el-radio label="APP" v-model="ruleForm.ditchs"></el-radio>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="新手专享：" prop="sift">
              <el-radio v-model="ruleForm.sift" label="1">否</el-radio>
              <el-radio v-model="ruleForm.sift" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="设置精选：" prop="noob">
              <el-radio v-model="ruleForm.noob" label="1" value="1"
                >否</el-radio
              >
              <el-radio v-model="ruleForm.noob" label="2" value="0"
                >是</el-radio
              >
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="value2"
                style="width: 100%;"
              ></el-date-picker>
              <el-col class="line" :span="2"></el-col>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="开售日期：">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="value3"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title" prop="introduce">项目介绍:</span>
    <div class="area">
      <el-input type="textarea" v-model="introduce"></el-input>
    </div>
    <span class="title" prop="step">风险控措:</span>
    <div class="area">
      <el-input type="textarea" v-model="step"></el-input>
    </div>
    <div id="btn">
      <el-button type="danger" @click="submit">提交</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Maintenance",
  computed: {
    ...mapGetters(["getMainten", "getBid"])
  },
  data() {
    return {
      ruleForm: {
        label: "",
        genre: "",
        lowmoney: "",
        addmoney: "",
        largemoney: "",
        manners: "",
        ditchs: "",
        sift: "",
        noob: ""
      },
      value2: "",
      value3: "",
      money: "",
      tagList: "",
      baseInfo: {},
      increaseList: "",
      markTypeList: "",
      num: "",
      introduce: "",
      step: "",
      rules: {
        manners: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        ditchs: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        sift: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        noob: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        lowmoney: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        largemoney: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        entitle: [
          { required: true, message: "标名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        putawaytime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        saletime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        interest: [
          { required: true, message: "投资计息方式", trigger: "change" }
        ]
      }
    };
  },

  created() {
    this.getIncrease();
    this.getMarkType();
    this.getTag();
  },
  methods: {
    ...mapMutations(["saveReexInfo"]),
    getIncrease() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllAddMoney")
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.increaseList = response.data.data;
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMarkType() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllCategory")
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.markTypeList = response.data.data;
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTag() {
      this.$axios
        .post("/markApi/finance/pullMean/findAllTbLabel")
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.tagList = response.data.data;
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    back() {
      this.$router.push("/debitManage/secondBidsGroundItems");
    },
    submit() {
      let data = {
        num: "" + this.getBid.num,
        label: "" + this.ruleForm.label,
        genre: "" + this.ruleForm.genre,
        lowmoney: "" + this.ruleForm.lowmoney,
        addmoney: "" + this.ruleForm.addmoney,
        largemoney: "" + this.ruleForm.largemoney,
        manners: "" + this.ruleForm.manners,
        ditchs: "" + this.ruleForm.ditchs,
        sift: "" + this.ruleForm.sift,
        noob: "" + this.ruleForm.noob,
        introduce: "" + this.introduce,
        step: "" + this.step,
        putawaytime:
          this.value2 && this.value2[0] && this.value2[0] != null
            ? `${new Date(this.value2[0]).getFullYear()}-${Number(
                new Date(this.value2[0]).getMonth() + 1
              )}-${new Date(this.value2[0]).getDate()}`
            : "",
        saletime:
          this.value3 && this.value3[0] && this.value3[0] != null
            ? `${new Date(this.value3[0]).getFullYear()}-${Number(
                new Date(this.value3[0]).getMonth() + 1
              )}-${new Date(this.value3[0]).getDate()}`
            : ""
      };
      this.$axios
        .post("/markApi/finance/sign/insert", data)
        .then(response => {
          // console.log(response);
          if (response.data.code == 200) {
            this.saveReexInfo(data);
            this.tagList = response.data.data;
            this.$router.push("/debitManage/secondBidsGroundItems");
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#btn {
  width: 90%;
  height: 100px;
  margin: auto;
  border-top: 1px solid rgba(166, 166, 164, 0.5);
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.el-card {
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
.area {
  width: 75%;
  height: 150px;
  margin: auto;
}
.el-button {
  height: 40px;
}
</style>
