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
              <span>{{}}</span>
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
              <span>{{ getMainten.money }}</span>
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
              <span>{{ getMainten.annual }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="资金用途：">
              <span>{{}}</span>
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
              <span>{{}}</span>
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
              <span>{{}}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款管理费：">
              <span>{{}}</span>
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
              <span>{{}}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <span>{{}}</span>
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
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <span class="title" :data="baseInfo">标的信息:</span>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标名：" prop="entitle" required>
              <span>{{ getMainten.entitle }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标签：" prop="label">
              <el-select v-model="label" placeholder="请选择标签">
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
              <el-select v-model="genre" placeholder="请选择标签">
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
            <el-form-item label="最低起投金额：" required prop="lowmoney">
              <el-input
                placeholder="请输入0-99999999的整数"
                v-model="lowmoney"
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
              <el-select v-model="money" placeholder="请选择">
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
            <el-form-item label="最大可投金额：" prop="largemoney" required>
              <el-input
                placeholder="请输入>=最小可投金额,<=借款金额"
                v-model="largemoney"
              ></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="9"
          ><div>
            <el-form-item label="投资计息方式：" required>
              <el-radio v-model="manner" label="成交日"></el-radio>
              <el-radio v-model="manner" label="T+1"></el-radio>
              <el-radio v-model="manner" label="T+2"></el-radio>
              <el-radio v-model="manner" label="成立计息"></el-radio>
            </el-form-item></div
        ></el-col>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架渠道：" prop="ditch" required>
              <el-checkbox-group v-model="ditch">
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
              <el-radio v-model="sift" label="1">否</el-radio>
              <el-radio v-model="sift" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="设置精选：" required prop="noob">
              <el-radio v-model="noob" label="1">否</el-radio>
              <el-radio v-model="noob" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架时间" required>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="putawaytime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11"> </el-col>
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
                  v-model="saletime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11"></el-col>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
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
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Maintenance",
  computed: {
    ...mapGetters(["getMainten"])
  },
  data() {
    return {
      money: "",
      tagList: "",
      baseInfo: {},
      increaseList: "",
      markTypeList: "",
      num: "",
      label: "",
      genre: "",
      lowmoney: "",
      addmoney: "",
      largemoney: "",
      manner: "",
      ditch: "",
      sift: "",
      noob: "",
      raisedata: "",
      timetype: "",
      timevalue: "",
      putawaytime: "",
      saletime: "",
      introduce: "",
      step: ""
    };
  },
  rules: {
    lowmoney: [
      { required: true, message: "金额不能为空" },
      { type: "number", message: "金额必须为数字值" }
    ],
    entitle: [
      { required: true, message: "标名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
    ],
    putawaytime: [
      { type: "date", required: true, message: "请选择日期", trigger: "change" }
    ],
    saletime: [
      { type: "date", required: true, message: "请选择时间", trigger: "change" }
    ],
    interest: [{ required: true, message: "投资计息方式", trigger: "change" }]
  },
  created() {
    this.getIncrease();
    this.getMarkType();
    this.getTag();
  },
  methods: {
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
        .post("/markApi/finance/category/findAll")
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
    submit() {
      console.log({
        label: "" + this.label
      });
      this.$axios
        .post("/markApi/finance/sign/insert", {
          num: "" + this.num,
          label: "" + this.label,
          genre: "" + this.genre,
          lowmoney: "" + this.lowmoney,
          addmoney: "" + this.addmoney,
          largemoney: "" + this.largemoney,
          manner: "" + this.manner,
          ditch: "" + this.ditch,
          sift: "" + this.sift,
          noob: "" + this.noob,
          raisedata: "" + this.raisedata,
          timetype: null,
          timevalue: null,
          putawaytime: "" + this.putawaytime,
          saletime: "" + this.saletime,
          introduce: "" + this.introduce,
          step: "" + this.step
        })
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
.contain {
  overflow: scroll;
  height: 600px;
}
.el-button{
  height: 40px;
}
</style>
