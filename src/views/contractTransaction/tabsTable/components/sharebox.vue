<template>
  <div class="sharebox" v-if="isShow">
    <div class="container">
      <div id="content" ref="ExportDiv">
        <div class="logo">
          <img src="../../assets/home-imgs/logo.png" alt="" />
        </div>
        <div class="info">
          <div class="leverBox" v-show="check1">
            <span
              class="direction"
              :class="data.positionDirection == 1 ? 'up' : 'down'"
              >{{
                data.positionDirection == 1
                  ? "contract.做多"
                  : "contract.做空" | translate
              }}</span
            >
            <span class="levers">{{ data.leverTimes }}X</span>
            <span class="ml20"
              >{{ data.coinsName.toUpperCase()
              }}{{ "lang_795" | translate }}</span
            >
          </div>
          <div
            v-show="check2"
            class="changeBox df aic"
            :class="parseFloat(data.rateReturn) > 0 ? 'up' : 'down'"
          >
            <div class="change">
              <span class="symbol">{{
                parseFloat(data.rateReturn) > 0 ? "+" : ""
              }}</span>
              <span class="value">{{ data.rateReturn }}</span>
            </div>
            <div class="usdt ml20">
              (<span>{{ data.$unrealizedProfitLoss }} USDT</span>)
            </div>
          </div>
          <div class="priceBox" v-show="check3">
            <div class="openPrice df aic mr20">
              <div class="label mr5">
                {{ "contract.开仓价格" | translate }}
              </div>
              <div class="value">{{ data.positionAveragePrice }}</div>
            </div>
            <div class="markPrice df aic">
              <div class="label mr5">
                {{ "contract.标记价格" | translate }}
              </div>
              <div class="value">{{ data.markedPrice }}</div>
            </div>
          </div>
        </div>
        <div class="other">
          <div class="codeBox">
            <div class="qrcodeBox df aic jc">
              <span class="qrcode" ref="qrcode"></span>
            </div>
            <div class="text">
              <div class="label">
                {{ "contract.我的邀请码" | translate }}
              </div>
              <span>{{ inviteCode }}</span>
            </div>
          </div>
          <!-- <div class="shareTime">
            <div class="label">
              {{ "contract.dialog_share_shareTime" | translate }}:
            </div>
            <div>{{ date }}</div>
          </div> -->
        </div>
      </div>
      <div id="footer">
        <div class="choose">
          <div class="title">{{ "contract.您可选择是否分享以下信息" | translate }}</div>
          <div class="box df aic">
            <div class="item" @click="toChoose(1)">
              <i
                class="iconfont"
                :class="check1 ? 'icon-checked checked' : 'icon-xuanze check'"
              ></i>
              <span class="label">{{
                "contract.杠杆倍数" | translate
              }}</span>
            </div>
            <div class="item" @click="toChoose(2)">
              <i
                class="iconfont"
                :class="check2 ? 'icon-checked checked' : 'icon-xuanze check'"
              ></i>
              <span class="label">{{
                "contract.盈亏金额" | translate
              }}</span>
            </div>
            <div class="item" @click="toChoose(3)">
              <i
                class="iconfont"
                :class="check3 ? 'icon-checked checked' : 'icon-xuanze check'"
              ></i>
              <span class="label">{{
                "contract.价格" | translate
              }}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div class="btn cancel" @click="handleCancel">
            {{ "contract.取消" | translate }}
          </div>
          <div class="btn confirm" @click="toSubmit">
            {{ "contract.下载" | translate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from "@/libs/utils";
import { myInviteApi } from "@/api/user";
import QRCode from "qrcodejs2";
import { ExportImg } from "../js/exportImg";

export default {
  name:'share-box',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      width: "600px",
      date: undefined,
      check1: true,
      check2: true,
      check3: true,
      inviteCode: undefined,
      inviteUrl: undefined,
      qrwidth: undefined,
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:isShow", false);
    },
    getTime(flag) {
      let times = undefined;
      let timer = null;
      if (flag) {
        times = new Date().getTime();
        this.date = getDate(times / 1000, "year");

        timer = setInterval(() => {
          times = new Date().getTime();
          this.date = getDate(times / 1000, "year");
        }, 1000);
      } else {
        clearInterval(timer);
        this.date = undefined;
      }
    },
    getInviteCode() {
      myInviteApi({ type: 2 }).then((res) => {
        // console.log("res", res.data.data);
        this.inviteCode = res.data.data.inviteCode;
        this.inviteUrl = res.data?.data?.inviteUrl;
        this.createQrCode(this.inviteUrl);
      });
    },
    createQrCode(url) {
      new QRCode(this.$refs.qrcode, {
        text: url,
        width: this.qrwidth,
        height: this.qrwidth,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: 3,
      });
    },
    setCodeSize() {
      let box = document.querySelector(".qrcodeBox");
      let width = box.clientWidth;
      let p =70 / 80;
      this.qrwidth = width * p;
    },
    toChoose(num) {
      let o = {
        1: () => (this.check1 = !this.check1),
        2: () => (this.check2 = !this.check2),
        3: () => (this.check3 = !this.check3),
        run: (fn) => fn && fn(),
      };
      o.run(o[num]);
    },
    toSubmit() {
      ExportImg(
        this.$refs.ExportDiv,
        this.$t("contract.dialog_share_info"),
        "png"
      );
    },
  },
  mounted() {},
  watch: {
    isShow: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.setCodeSize();
            this.getInviteCode();
          });
        } else {
          this.check1 = true;
          this.check2 = true;
          this.check3 = true;
        }
        this.getTime(value);
      },
    },
    data: {
      handler(val) {
        console.log("val", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.sharebox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 9999;
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    border-radius: 15px;
    background-color: #fff;
    #content {
      position: relative;
      width: 100%;
      height: 330px;
      background-image: url("@/assets/contract-imgs/share_bg.png");
      background-repeat: no-repeat;
      background-size: contain;
      padding-top: 100px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .logo {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 180px;
        img {
          width: 100%;
        }
      }
      .info {
        padding: 0 20px;
        .leverBox {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333333;
          font-weight: 700;
          .direction {
            padding-right: 20px;
            &.up {
              color: #90ff00;
            }
            &.down {
              color: #f75f52;
            }
          }
          .levers {
            position: relative;
            padding: 0 20px;
            &::before {
              content: "";
              width: 1px;
              height: 80%;
              position: absolute;
              top: 50%;
              left: 0px;
              transform: translateY(-50%);
              background-color: #96a2b2;
            }
            &::after {
              content: "";
              width: 1px;
              height: 80%;
              position: absolute;
              top: 50%;
              right: 0px;
              transform: translateY(-50%);
              background-color: #96a2b2;
            }
          }
        }
        .changeBox {
          margin-top: 20px;
          &.up {
            color: #90ff00;
          }
          &.down {
            color: #f75f52;
          }
          .change {
            .symbol {
              font-size: 14px;
            }
            .value {
              font-size: 20px;
            }
          }
        }
        .priceBox {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #96a2b2;
          margin-top: 20px;
          .value {
            color: #333333;
          }
        }
      }
      .other {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        .codeBox {
          display: flex;
          align-items: flex-start;
          height: 80px;
          .qrcodeBox {
            width:80px;
            height: 80px;
            background-color: #fff;
            border-radius: 3px;
            padding: 5px;
            .qrcode {
              width: 100%;
              height: 100%;
              display: inline-block;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: #96a2b2;
            margin-left: 20px;
            height: 100%;
            .label {
              font-size: 12px;
              line-height: 24px;
            }
            span {
              font-size: 14px;
              color: #333333;
            }
          }
        }
        .shareTime {
          height: 100%;
          display: flex;
          align-items: flex-end;
          color: #96a2b2;
          .label {
            margin-right: 10px;
          }
        }
      }
    }
    #footer {
      padding: 20px;
      .choose {
        margin-bottom: 20px;
        .title {
          font-size: 16px;
          color: #333333;
          margin-bottom: 15px;
        }
        .box {
          font-size: 14px;
          color: #333333;
          .item {
            margin-right: 20px;
            cursor: pointer;
            .checked {
              color: #90ff00;
              font-size: 14px;
              margin-right: 10px;
            }
            .check {
              color: #96a2b2;
              font-size: 14px;
              margin-right: 10px;
            }
          }
        }
      }

      .btn-group {
        display: flex;
        align-items: center;
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 50px;
          font-size: 18px;
          background-color: var(--theme-color);
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
          }
        }
        .confirm .cancel {
          flex: 1;
        }
        .cancel {
          background-color: #f4f5f7;
          margin-right: 20px;
          color: #333;
        }
      }
    }
  }
}
</style>
