<template>
  <div class="user">
    <div class="container">
      <div class="title">{{ $t(t + "发布广告") }}</div>
      <div class="ad-box">
        <div class="left">
          <div class="left-t">{{ $t(t + "完成认证") }}</div>
          <div class="left-d">
            {{
              $t(
                t +
                  "为保证您的资金安全，提交申请前，您需要满足BSEX平台的安全设置标准。"
              )
            }}
          </div>
          <div class="left-btn" v-if="chinaPhone">
            <span
              v-if="
                userStatus.canPersonalAuthStatus &&
                userStatus.canEmail &&
                userStatus.tradePwd &&
                userStatus.canPhone &&
                userStatus.canGoogleAuth
              "
              >{{ $t(t + "条件已满足") }}</span
            >
            <span v-else>{{ $t(t + "暂不满足条件") }}</span>
          </div>
          <div class="left-btn" v-else>
            <span
              v-if="
                userStatus.canPersonalAuthStatus &&
                userStatus.canEmail &&
                userStatus.tradePwd &&
                userStatus.canGoogleAuth
              "
              >{{ $t(t + "条件已满足") }}</span
            >
            <span v-else>{{ $t(t + "暂不满足条件") }}</span>
          </div>
        </div>
        <div class="right">
          <div class="right-t">{{ $t(t + "需满足以下申请条件") }}</div>
          <div class="right-status">
            <div class="r-item">
              <div v-if="userStatus.canPersonalAuthStatus">
                <i
                  class="el-icon-success"
                  v-if="userStatus.authKycLevel !== 0"
                ></i>
                <span v-if="userStatus.authKycLevel == 1"
                  >{{ $t(t + "完成身份认证") }}LV.1</span
                >
                <span v-if="userStatus.authKycLevel == 2"
                  >{{ $t(t + "完成身份认证") }}LV.2</span
                >
                <span v-if="userStatus.authKycLevel == 3"
                  >{{ $t(t + "完成身份认证") }}LV.3</span
                >
              </div>
              <div v-else>
                <i
                  class="el-icon-error"
                  v-if="userStatus.personalKycLevel !== 0"
                ></i>
                <span v-if="userStatus.personalKycLevel == 1"
                  >{{ $t(t + "身份认证") }}LV.1</span
                >
                <span v-if="userStatus.personalKycLevel == 2"
                  >{{ $t(t + "身份认证") }}LV.2</span
                >
                <span v-if="userStatus.personalKycLevel == 3"
                  >{{ $t(t + "身份认证") }}LV.3</span
                >
              </div>
              <span
                class="item-r"
                v-if="!userStatus.canPersonalAuthStatus"
                @click="toVerify"
              >
                <span>{{ $t(t + "去认证") }}</span>
                <i class="el-icon-right"></i>
              </span>
            </div>
            <div class="r-item">
              <div>
                <i
                  :class="
                    !userStatus.canEmail ? 'el-icon-error' : 'el-icon-success'
                  "
                ></i>
                <span>{{
                  !userStatus.canEmail
                    ? $t(t + "绑定邮箱")
                    : $t(t + "完成绑定邮箱")
                }}</span>
              </div>
              <div v-if="!userStatus.canEmail">
                <span class="item-r" @click="toSetting">
                  <span>{{ $t(t + "去绑定") }}</span>
                  <i class="el-icon-right"></i>
                </span>
              </div>
            </div>
            <div class="r-item">
              <div>
                <i
                  :class="
                    !userStatus.tradePwd ? 'el-icon-error' : 'el-icon-success'
                  "
                ></i>
                <span>{{
                  !userStatus.tradePwd
                    ? $t(t + "设置资金密码")
                    : $t(t + "完成设置资金密码")
                }}</span>
              </div>
              <div v-if="!userStatus.tradePwd">
                <span class="item-r" @click="toSetting">
                  <span>{{ $t(t + "去设置") }}</span>
                  <i class="el-icon-right"></i>
                </span>
              </div>
            </div>
            <div class="r-item" v-if="chinaPhone">
              <div>
                <i
                  :class="
                    !userStatus.canPhone ? 'el-icon-error' : 'el-icon-success'
                  "
                ></i>
                <span>{{
                  !userStatus.canPhone
                    ? $t(t + "绑定手机")
                    : $t(t + "完成绑定手机")
                }}</span>
              </div>
              <div v-if="!userStatus.canPhone">
                <span class="item-r" @click="toSetting">
                  <span>{{ $t(t + "去绑定") }}</span>
                  <i class="el-icon-right"></i>
                </span>
              </div>
            </div>
            <div class="r-item">
              <div>
                <i
                  :class="
                    !userStatus.canGoogleAuth
                      ? 'el-icon-error'
                      : 'el-icon-success'
                  "
                ></i>
                <span>{{
                  !userStatus.canGoogleAuth
                    ? $t(t + "绑定谷歌")
                    : $t(t + "完成绑定谷歌")
                }}</span>
              </div>
              <div v-if="!userStatus.canGoogleAuth">
                <span class="item-r" @click="toSetting">
                  <span>{{ $t(t + "去绑定") }}</span>
                  <i class="el-icon-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="general-user">
        <div class="g-title" v-if="chinaPhone">
          <div class="g-left">{{ $t(t + "普通用户权益") }}</div>
          <span
            v-if="
              userStatus.canPersonalAuthStatus &&
              userStatus.canEmail &&
              userStatus.tradePwd &&
              userStatus.canPhone &&
              userStatus.canGoogleAuth
            "
            class="g-active"
            @click="toPublish"
            >{{ $t(t + "发布广告") }}</span
          >
          <span v-else class="g-right">{{ $t(t + "发布广告") }}</span>
        </div>
        <div class="g-title" v-else>
          <div class="g-left">{{ $t(t + "普通用户权益") }}</div>
          <span
            v-if="
              userStatus.canPersonalAuthStatus &&
              userStatus.canEmail &&
              userStatus.tradePwd &&
              userStatus.canGoogleAuth
            "
            class="g-active"
            @click="toPublish"
            >{{ $t(t + "发布广告") }}</span
          >
          <span v-else class="g-right">{{ $t(t + "发布广告") }}</span>
        </div>
        <div class="g-box">
          <div class="g-item">
            <div class="g-l">
              <img src="@/assets/buy-coins/release-quota.png" alt="" />
            </div>
            <div class="g-r">
              <div class="gr-t">{{ $t(t + "发布额度") }}</div>
              <div>
                {{ $t(t + "单笔购买广告委托单限额") }}
                <span class="color-origin"
                  >{{ userStatus.maxPersonalBuyAdvertisingCount }}
                </span>
                CNY
              </div>
              <div>
                {{ $t(t + "单笔出售广告委托单限额") }}
                <span class="color-origin"
                  >{{ userStatus.maxPersonalSellAdvertisingCount }}
                </span>
                CNY
              </div>
            </div>
          </div>
          <div class="g-item">
            <div class="g-l">
              <img src="@/assets/buy-coins/quick-release.png" alt="" />
            </div>
            <div class="g-r">
              <div class="gr-t">{{ $t(t + "快速发布") }}</div>
              <div>{{ $t(t + "完成安全认证即可快速发布广告") }}</div>
            </div>
          </div>
          <div class="g-item">
            <div class="g-l">
              <img src="@/assets/buy-coins/low-cost.png" alt="" />
            </div>
            <div class="g-r">
              <div class="gr-t">{{ $t(t + "低成本") }}</div>
              <div>{{ $t(t + "无需提前冻结保证金") }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="merchant">
        <div class="m-title">
          <div class="m-left">{{ $t(t + "商家权益") }}</div>
          <span class="m-right" @click="toSaler">{{ $t(t + "申请商家") }}</span>
        </div>
        <div class="m-box">
          <div class="m-item">
            <div class="m-top">
              <img src="@/assets/buy-coins/exclusive.png" alt="" />
            </div>
            <div class="m-bottom">
              <div>{{ $t(t + "专属标识") }}</div>
              <div>{{ $t(t + "广告商认证专属标识") }}</div>
            </div>
          </div>
          <div class="m-item">
            <div class="m-top">
              <img src="@/assets/buy-coins/serves.png" alt="" />
            </div>
            <div class="m-bottom">
              <div>{{ $t(t + "一对一服务") }}</div>
              <div>{{ $t(t + "针对商家提供一对一客服，提高交易效率") }}</div>
            </div>
          </div>
          <div class="m-item">
            <div class="m-top">
              <img src="@/assets/buy-coins/safty.png" alt="" />
            </div>
            <div class="m-bottom">
              <div>{{ $t(t + "安全可靠") }}</div>
              <div>{{ $t(t + "性能风控体系，专业专注独立风控智能检测") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isChina } from "@/api/otc";
export default {
  name: "AdvUser",
  props: {
    userStatus: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      t: "c2c.",
      chinaPhone: false,
    };
  },
  
  mounted() {
    this.isChinaPhone();
  },
  methods: {
    async isChinaPhone() {
      let res = await isChina({});
      this.chinaPhone = res.data?.data;
    },
    toPublish() {
      this.$emit("pubilsh");
    },
    toSaler() {
      this.$emit("saler");
    },
    toSetting() {
      this.$router.push("/securitySetting");
    },
    toVerify() {
      this.$router.push("/verifyIdentidy");
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  background: linear-gradient(180deg, #e9f9f4 0%, #ffffff 41%, #ffffff 100%);
  color: #333;
  .color-origin {
    color: #ffb928;
  }
  .container {
    padding: 0px 260px;
    .title {
      color: #00082d;
      font-size: 40px;
      padding-top: 80px;
    }
    .ad-box {
      border: 1px solid #f6f6f6;
      margin: 40px 0px 80px 0px;
      display: flex;
      .left {
        margin-right: 280px;
        width: 416px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 40px 0px 0px 60px;
        .left-t {
          font-size: 30px;
        }
        .left-d {
          font-size: 14px;
          color: #96a2b2;
          margin: 10px 0px 40px 0px;
        }
        .left-btn {
          span {
            display: inline-block;
            height: 50px;
            line-height: 50px;
            background: rgba($color: #90ff00, $alpha: 0.6);
            border-radius: 6px;
            padding: 0px 60px;
            text-align: center;
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .right {
        padding-top: 30px;
        padding-bottom: 30px;
        margin-right: 225px;
        flex: 1;
        .right-t {
          color: #96a2b2;
          font-size: 16px;
        }
        .right-status {
          .r-item {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            .el-icon-error {
              color: red;
              padding-right: 10px;
            }
            .el-icon-success {
              color: #90ff00;
              padding-right: 10px;
            }
            .item-r {
              display: inline-block;
              color: #90ff00;
              cursor: pointer;
              span {
                padding-right: 10px;
              }
            }
          }
        }
      }
    }
    .general-user {
      margin-top: 80px;

      .g-title {
        font-size: 40px;
        display: flex;
        justify-content: space-between;
        .g-right {
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: #fbfcfd;
          border-radius: 6px;
          font-size: 16px;
          color: #333;
          display: inline-block;
          padding: 0 48px;
          cursor: not-allowed;
        }
        .g-active {
          background: #90ff00;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 6px;
          font-size: 16px;
          color: #fff;
          display: inline-block;
          padding: 0 48px;
          cursor: pointer;
        }
      }
      .g-box {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .g-item {
          width: 440px;
          height: 160px;
          background: #ffffff;
          box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          border: 2px solid #fafafa;
          display: flex;
          align-items: center;
          padding: 20px;
          .g-l {
            margin-right: 20px;
          }
          .g-r {
            font-size: 16px;
            .gr-t {
              font-size: 20px;
            }
          }
        }
      }
    }
    .merchant {
      margin-top: 80px;
      .m-title {
        font-size: 40px;
        display: flex;
        justify-content: space-between;
        .m-right {
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: #90ff00;
          border-radius: 6px;
          font-size: 16px;
          color: #fff;
          display: inline-block;
          padding: 0 48px;
          cursor: pointer;
        }
      }
      .m-box {
        margin-top: 40px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        .m-item {
          width: 440px;
          box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          display: flex;
          flex-direction: column;

          .m-top {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 40px 0px;
            img {
              width: 176px;
              height: 160px;
            }
          }
          .m-bottom {
            height: 160px;
            background: #fafafa;
            border-radius: 0px 0px 12px 12px;
            text-align: center;
            padding: 40px 20px;
          }
        }
      }
    }
  }
}
</style>