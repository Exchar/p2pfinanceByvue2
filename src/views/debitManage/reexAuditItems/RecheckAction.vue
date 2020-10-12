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
              <span></span>
            </el-form-item></div
        ></el-col>
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
              <span></span>
            </el-form-item></div
        ></el-col>
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
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="还款方式：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款管理费：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="利息管理费：">
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <span></span>
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
    <span class="title">标的信息:</span>
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
            <el-form-item label="标签：" prop="tag" required>
              <span>{{ getMainten.label }}</span>
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
              <span>{{ getMainten.genre }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最低起投金额：" required prop="money">
              <span>{{ getMainten.lowmoney }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="递增金额：" prop="addmoney" required>
              <span>{{ getMainten.addmoney }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最大可投金额：" prop="largemoney" required>
              <span>{{ getMainten.largemoney }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="投资计息方式：" required prop="manners">
              <span>{{ getMainten.manners }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架渠道：" prop="ditchs" required>
              <span>{{ getMainten.ditchs }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="新手专享：" prop="sift" required>
              <span>{{ getMainten.sift }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="设置精选：" required prop="noob">
              <span>{{ getMainten.noob }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="募集时间：" prop="raisingTime" required>
              <span></span>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架时间" required prop="putawaytime">
              <span>{{ getMainten.putawaytime }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="开售时间：" required prop="saletime">
              <span>{{ getMainten.saletime }}</span>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"><div></div></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </el-form>
    <span class="title">审核</span>
    <div>
      <el-form>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="是否通过：" required prop="passs">
              <el-radio v-model="passs" label="1">否</el-radio>
              <el-radio v-model="passs" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="14"><div></div></el-col>
      </el-form>
    </div>
    <div class="remark">
      <el-form>
        <el-col :span="24">
          <el-form-item label="备注:" prop="remarks" required>
            <el-input type="textarea" v-model="remarks"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>

    <div id="btn">
      <el-button type="danger" @click="submit">提交</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Maintenance",
  computed: {
    ...mapGetters(["getMainten", "getReex"])
  },
  data() {
    return {
      remarks: "",
      passs: "",
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
    remarks: [{ required: true, message: "请填写理由", trigger: "blur" }],
    money: [
      { required: true, message: "金额不能为空" },
      { type: "number", message: "金额必须为数字值" }
    ],
    markType: [
      { required: true, message: "请选择标签类型", trigger: "change" }
    ],
    tag: [{ required: true, message: "请选择标签", trigger: "change" }],
    entitle: [
      { required: true, message: "标名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
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
    interest: [{ required: true, message: "投资计息方式", trigger: "change" }]
  },
  created() {
    console.log(this.getMainten);
  },
  methods: {
    back() {
      this.$router.push("/debitManage/reexAuditItems");
    },
    submit() {
      this.$axios
        .post("/markApi/finance/loan/fullupdate", {
          num: this.getReex.num,
          passs: this.passs,
          remarks: this.remarks
        })
        .then(response => {
          if (response.data.code == 200) {
            this.$router.push("/debitManage/reexAuditItems");
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
.remark {
  margin: auto;
  width: 80%;
  height: 100px;
}
.el-button {
  height: 40px;
}
</style>
