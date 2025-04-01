<template>
  <div class="content_right">
    <div class="right_header">
      <el-select v-model="value" :placeholder="$t('lang_1184')">
        <el-option
          v-for="item in arrList"
          :key="item.value"
          :label="$t(item.label)"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
      <div class="right_lever">{{$t('lang_1266')}} 10X</div>
    </div>
    <div class="storehouse-type">
      <div
        v-for="(item, index) in typeList"
        :key="index"
        :class="
          index === curIndex && item.type == '开仓'
            ? 'type-open'
            : index === curIndex && item.type == '平仓'
            ? 'type-close'
            : ''
        "
        @click="checkStorehouseType(item, index)"
      >
        {{ item.type }}
      </div>
    </div>
    <div class="price_tab">
      <div class="price_type">
        <div
          v-for="(item, index) in priceTabList"
          :key="index"
          @click="checkPriceType(item, index)"
        >
          <div :class="index === priceIndex ? 'price-active' : ''">
            {{ $t(item.type) }}
          </div>
        </div>
      </div>
      <div class="price_border"></div>
    </div>
    <div v-show="priceIndex === 0">
      <div class="price_content">
        <span>{{$t('lang_1919')}}:5000.00USDT</span>
        <span><i class="el-icon-picture-outline-round"></i></span>
      </div>
      <div class="right_container">
        <inputComp
          label="USDT"
          v-model="priceVal"
          :placeholder="$t('lang_2398')"
          @input="input"
        ></inputComp>
        <!-- 下拉框 -->
        <div class="right_select">
          <el-input :placeholder="$t('lang_2400')">
            <div slot="suffix" class="select_item">
              <el-select v-model="value" placeholder="USDT">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-input>
        </div>
        <!-- 步骤条 -->
        <div class="steps">
          <Steps></Steps>
        </div>
        <!-- 买卖按钮 -->
        <div class="buying_btn">
          <div class="buying_left">{{$t('spot_19')}}</div>
          <div class="buying_empt"></div>
          <div class="buying_right">{{$t('spot_20')}}</div>
        </div>
        <div class="buying_data">
          <div>{{$t('lang_232')}}:0.00USDT</div>
          <div>{{$t('lang_235')}}:0.00USDT</div>
        </div>
        <!-- 选择框 -->
        <div class="right_select">
          <el-input v-model="timeVal" :placeholder="$t('lang_1169')">
            <div slot="suffix" class="select_item">
              <el-select v-model="value" placeholder="GTC">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-input>
        </div>
        <!-- 输入框 -->
        <inputComp
          label="0.00%"
          v-model="bondVal"
          :placeholder="$t('lang_820')"
          @input="input"
        ></inputComp>
        <!-- 资产表 -->
        <div class="property">
          <div
            style="font-size: 14px; color: #fdfdfd; margin: 22px 16px 6px 16px"
          >
            USDT+{{$t('lang_1093')}}
          </div>
          <ul class="property_data">
            <li v-for="(item, index) in 7" :key="index">
              <span>{{$t('lang_2141')}}</span>
              <span>5000.00 USDT</span>
            </li>
          </ul>
        </div>
        <inputComp
          :icon="false"
          v-model="contractVal"
          :placeholder="$t('lang_906')"
          @input="input"
        ></inputComp>
      </div>
    </div>
    <div style="width: 428px" v-show="priceIndex === 1">
      <div class="price_content">{{$t('lang_1006')}}</div>
    </div>
    <div style="width: 428px" v-show="priceIndex === 2">
      <div class="price_content">{{$t('lang_1188')}}</div>
    </div>
  </div>
</template>

<script>
import inputComp from "../components/inputComp.vue";
import Steps from "@/components/step.vue";
export default {
  name: "TradeView",
  components: {
    inputComp,
    Steps,
  },
  data() {
    return {
      value: "", //全仓
      // 右边表
      arrList: [
        {
          // value: 'Beijing',
          label: "lang_2156",
        },
        {
          // value: 'Shanghai',
          label: "lang_791",
        },
      ],
      typeList: [
        {
          type: "开仓",
        },
        {
          type: "平仓",
        },
      ],
      curIndex: 0,
      priceTabList: [
        {
          type: "lang_1037",
        },
        {
          type: "lang_1186",
        },
        {
          type: "lang_1188",
        },
      ],
      priceIndex: 0,
      priceVal: "", //价格输入框
      timeVal: "", // 失效时间
      bondVal: "", // 保证金比率
      contractVal: "", //右边底部合约信息
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    // input 的封装
    input(value) {
      // console.log(value);
    },
    // 右边价格切换栏
    checkPriceType(item, index) {
      this.priceIndex = index;
    },
    // 切换类型
    checkStorehouseType(item, index) {
      this.curIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/style/list.scss";
.content_right {
  background: #000622;
  width: 429px;
  height: 1010px;
  margin-left: 5px;
  margin-top: 5px;
  .right_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 66px 0 15px;
    ::v-deep   .el-select .el-input__inner {
      height: 35px;
      width: 90px;
      background: #39445f;
      border: none;
    }
    ::v-deep   .el-select .el-input .el-select__caret {
      height: 38px;
    }
    .right_lever {
      width: 90px;
      height: 35px;
      line-height: 35px;
      background-color: #39445f;
      border-radius: 8px;
      color: #96a2b2;
      cursor: pointer;
      text-align: center;
      font-size: 16px;
    }
  }
  .storehouse-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 auto;
    list-style: none;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    margin: 20px 66px 0 15px;
    div {
      width: 50%;
      height: 35px;
      text-align: center;
      line-height: 35px;
      background-color: #39445f;
      color: #96a2b2;
    }
    .type-close {
      background: #f75f52;
      color: #ffffff;
    }
    .type-open {
      background: #37bc85;
      color: #ffffff;
    }
  }
  .price_tab {
    margin: 15px 66px 0 15px;
    position: relative;
    .price_type {
      display: flex;
      justify-content: space-between;

      cursor: pointer;
      div {
        padding-bottom: 20px;
      }
      .price-active {
        color: #ffffff;
        border-bottom: 2px solid #5375fb;
      }
    }
    .price_border {
      position: absolute;
      top: 42px;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #2e3442;
    }
  }
  .price_content {
    margin: 0 66px 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline-block;
      font-size: 14px;
      color: #96a2b2;
      i {
        color: #5375fb;
      }
    }
  }
  .right_container {
    margin: 0 66px 0 15px;
    .steps {
      padding: 20px 0;
    }
    .buying_btn {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      font-size: 16px;
      .buying_left {
        @include marketBuying();
        background: #37bc85;
      }
      .buying_empt {
        width: 16px;
      }
      .buying_right {
        @include marketBuying();
        background: #f75f52;
      }
    }
    .buying_data {
      margin-top: 15px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #96a2b2;
    }
    .property {
      width: 347px;
      height: 301px;
      border: 1px solid #2e3442;
      border-radius: 8px;
      .property_data {
        width: 100%;
        li {
          padding: 8px 16px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #96a2b2;
          span {
            display: inline-block;
          }
        }
      }
    }
    .right_select {
      ::v-deep   .el-input__inner {
        height: 36px;
        background: #000622;
        border: 1px solid #2e3442;
      }
      ::v-deep   .el-input__inner::placeholder {
        color: #96a2b2;
      }
      .select_item {
        ::v-deep   .el-select .el-input__inner {
          width: 80px;
          height: 30px;
          border: none;
          padding: 0;
          margin: 2.5px 2px 2.5px 0;
        }
      }
      ::v-deep   .el-input__suffix {
        position: absolute;
        height: 100%;
        right: 0px;
        top: 0;
        text-align: center;
        transition: all 0.3s;
        pointer-events: none;
      }
      ::v-deep   .el-select .el-input .el-select__caret {
        height: 38px;
      }
    }
  }
}
</style>
