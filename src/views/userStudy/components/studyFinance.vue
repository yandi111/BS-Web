<!-- 了解Finance -->
<template>
  <div class="study-finance module-center">
    <div class="finance-content">
      <ul>
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="{ 'item-active': index === activeIndex }"
          @click="handlenNav(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <!-- 秒懂合约交易 -->
      <div class="content-item" >
        <el-row>
          <el-col :span="12">
            <div class="item-wrapper">
              <ul>
                <li
                  v-for="li in contentList[activeIndex]?.contentList"
                  :key="li"
                >
                  {{ li }}
                </li>
              </ul>
              <!-- <div class="item-text">
                <span>查看教学</span>
                <i class="el-icon-right"></i>
              </div> -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="preview-container">
              <img :src="contentList[activeIndex]?.imgUrl" alt="" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/noviceTeaching.js";

export default {
  name: "StudyFinance",
  components: {},
  data() {
    return {
      activeIndex: 0,
      navList: [
        {
          name: "秒懂合约交易",
        },
        {
          name: "1分法币钟买USDT",
        },
        {
          name: "1分了解收益模式",
        },
        {
          name: "如何做好安全加密防范",
        },
      ],
      contentList: [],
    };
  },
  mounted() {
    this.getTearchList();
  },
  methods: {
    // 左边导航点击事件
    handlenNav(index) {
      this.activeIndex = index;
    },

    getTearchList() {
      const params = {
        categoryId: 20,
        type: 1,
      };
      api.$getBanner(params).then((res) => {
        this.navList = res.data.data.map((item) => {
          return {
            name: item.title,
          };
        });
        this.contentList = res.data.data.map((item) => {
          return {
            ...item,
            contentList: item.content.split("\n"),
          };
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.study-finance {
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .finance-content {
    width: 100%;
    height: 380px;
    background: #ffffff;
    box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    > ul {
      width: 220px;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      > li {
        width: 100%;
        // height: 90px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f7fa;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        cursor: pointer;
      }

      .item-active {
        background-color: #ffffff;
      }
    }
    .content-item {
      flex: 1;
      width: 100%;
      height: 100%;
      .el-row {
        width: 100%;
        height: 100%;
        .el-col {
          height: 100%;
          .item-wrapper {
            width: 100%;
            height: 100%;
            padding: 50px 0 50px 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .preview-container {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              display: inline-block;
            }
          }
          ul {
            li {
              line-height: 50px;
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
            }
          }
          .item-text {
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            display: flex;
            align-items: center;
            > span {
              font-size: 18px;
              padding-right: 13px;
            }
            .el-icon-right {
              font-size: 24px;
              color: var(--theme-color);
            }
          }
        }
      }
    }
  }
}
</style>
