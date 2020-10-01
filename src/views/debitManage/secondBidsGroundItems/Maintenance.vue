<template>
  <div class="contain">
    <span class="title">基本信息:</span>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款名称：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="风险等级：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款方：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款总金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="年利率：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="资金用途：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款期限：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="起息方式：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="还款方式：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="借款管理费：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="利息管理费：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="逾期罚息利率：">
              <el-input></el-input>
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
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="担保机构：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="是否抵押：">
              <el-input></el-input>
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
            <el-form-item label="标名：">
              <el-input></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><el-form-item label="标签：">
            <el-input></el-input>
          </el-form-item>
          <div></div>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="标的类型：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最低起投金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="递增金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="最大可投金额：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="9"
          ><div>
            <el-form-item label="投资计息方式：" prop="interest" required>
              <el-radio-group>
                <el-radio label="成交日"></el-radio>
                <el-radio label="T+1"></el-radio>
                <el-radio label="T+2"></el-radio>
                <el-radio label="成立计息"></el-radio>
              </el-radio-group>
            </el-form-item></div
        ></el-col>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="上架渠道：">
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
            <el-form-item label="新手专享：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="募集时间：">
              <el-input></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="设置精选：">
              <el-radio v-model="selected" label="1">否</el-radio>
              <el-radio v-model="selected" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="4"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="新手专享：">
              <el-radio v-model="Novice" label="1">否</el-radio>
              <el-radio v-model="Novice" label="2">是</el-radio>
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="8"
          ><div>
            <el-form-item label="募集时间：">
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
    <el-form label-width="120px">
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Maintenance",
  components: {},
  data() {
    return {
      radio: 1,
      interest: "",
      type: [],
      selected: 1,
      Novice: 1,
      raisingTime: "",
      day: "",
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      desc: ""
    };
  },
  rules: {
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
</style>
