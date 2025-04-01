<template>
  <transition>
    <div
      class="indroducePopover"
      v-show="isShow"
      :class="{ dark: getTheme == 'dark' }"
    >
      <div class="title">
        <div class="logo">
          <img :src="coinInfo.iconUrl" alt="" />
        </div>
        <span class="name">{{ coinInfo.coinName }}({{ coinInfo.englishDesc }})</span>
      </div>
      <div class="list">
        <div
          class="cell df aic jb"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="label">{{ item.label | translate }}</div>
          <div class="value" :class="{ link: item.link }">
            <span @click="onLink(item.value)" ref="linkTxt">{{item.value}}</span>
            <i class="iconfont icon-copy" v-if="item.link" @click="onCopy(index)"></i>
          </div>
        </div>
        <div class="tips" v-if="visible">{{ $t("lang_2504") }}</div>
      </div>
      <div class="coinIndr">
        <div class="h">{{ "lang_2345" | translate }}</div>
        <div class="content">
          <p>
            {{ coinInfo.introduction }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "indroducePopover",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    coinInfo: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      list: [],
      visible: false,
    };
  },
  watch: {
    coinInfo: {
      handler(item) {
        // console.log("item", item);
        this.list = [
          { label: "spot.发行时间", value: item.publishTime },
          { label: "spot.发行总量", value: item.totalIssuance },
          { label: "spot.发行价", value: `￥ ${item.issuePrice}` },
          {
            label: "spot.总流通量",
            value: `${item.totalCirculation}`,
          },
          {
            label: "spot.官网",
            value: item.officialWebsite,
            link: true,
          },
          { label: "spot.白皮书", value: item.whitePaper, link: true },
          {
            label: "spot.区块链浏览器",
            value: item.blockchainBrowser,
            link: true,
          },
        ];
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    onLink(value) {
      console.log("prompt", value);
      let url = value.includes("http") ? value : null;
      if (url) {
        window.open(url);
      }
    },
    onCopy(index) {
      let txtDom = this.$refs.linkTxt[index];
      let txt = txtDom.innerText;
      //创建输入框元素
      let input = document.createElement("input");
      //给输入框赋 需要复制的 值
      input.value = txt;
      //页面底部追加输入框
      document.body.appendChild(input);
      //选中输入框
      input.select();
      //制定浏览器复制命令
      document.execCommand("Copy");
      //复制后移除输入框
      input.remove();
      console.log("txtDom", txt);
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 1000);
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.indroducePopover {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 370px;
  height: 544px;
  padding: 15px;
  background-color: var(--pop-bg);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  cursor: default;
  z-index: 999;
  &.dark {
    box-shadow: none;
  }
  .title {
    display: flex;
    align-items: center;
    .logo {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 16px;
      color: var(--main-text-color);
      font-weight: 700;
    }
  }
  .list {
    margin-top: 15px;
    padding-bottom: 10px;
    .cell {
      font-size: 12px;
      height: 27px;
      color: #96a2b2;
    }
    .value {
      color: var(--main-text-color);
      &.link {
        color: var(--theme-color);
        cursor: pointer;
        span {
          border-bottom: 1px solid var(--theme-color);
        }
      }
      i {
        color: #aeb7c4;
        margin-left: 10px;
        font-size: 14px;
        &:hover {
          color: var(--theme-color);
        }
      }
    }
    .tips {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      color: var(--main-text-color);
      border-radius: 3px;
      background-color: rgba($color: #90ff00, $alpha: 0.5);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
    }
  }
  .coinIndr {
    border-top: 1px solid var(--dialog-line-color);
    padding-top: 15px;
    .h {
      font-size: 12px;
      font-weight: bold;
      color: var(--main-text-color);
      margin-bottom: 10px;
    }
    .content {
      height: 238px;
      background-color: var(--pop-bg);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      p {
        line-height: 17px;
      }
    }
  }
}
</style>
