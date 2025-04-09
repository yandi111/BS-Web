<template>
  <div class="about-us">
    <div class="top-box flex jb">
      <div class="top-box-left">
        <div class="title">{{ $t('about_us_001') }}</div>
        <div class="t-b-box flex aic">
          <div class="item flex aic">
            <img src="@/assets/images/aboutUs/user-b.png" alt="">
            <div class="item-r">
              <div class="i-t">80+</div>
              <div class="t-d">{{ $t('about_us_002') }}</div>
            </div>
          </div>
          <div class="item flex aic">
            <img src="@/assets/images/aboutUs/service-b.png" alt="">
            <div class="item-r">
              <div class="i-t">7x24</div>
              <div class="t-d">{{ $t('about_us_003') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-box">
        <img src="@/assets/images/aboutUs/top-right-b.png" alt="">
      </div>

    </div>

    <div class="desc-box">
      <div class="desc-center">
        <div class="desc-title">{{ $t('about_us_004') }}</div>
        <div class="desc-p">
          {{ $t('about_us_005') }}
        </div>
      </div>
    </div>

    <div class="operation">
      <div class="operation-box flex jb">
        <div class="left-box">
          <div class="top-box-warp flex aic">
            <img src="@/assets/images/aboutUs/letterTitle.png" alt="">
            <div class="title">Financial Crimes Enforcement Network Department of the Treasury</div>
          </div>

          <p>MSB Activities: Check casher (Including traveler's and money orders), Dealer in foreign exchange, Issuer of
            money orders, Money transmitter, Seller of money orders, Seller of prepaid access, Seller of traveler's
            checks States of MSB Activities: Alabama, Alaska, American Samoa, Arizona, Arkansas, California, Colorado,
            Connecticut, Delaware, District Of Columbia, Federated States Of Micronesia, Florida, Georgia, Guam, Hawaii,
            Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Marshall Islands, Maryland,
            Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New
            Jersey, New Mexico, New York, North Carolina, North Dakota, Northern Mariana Islands, Ohio, Oklahoma,
            Oregon, Palau, Pennsylvania, Puerto Rico, Rhode Island, South Carolina, South Dakota, Tennessee, Texas,
            Utah, Vermont, Virginia, Virgin Islands, US, Washington, West Virginia, Wisconsin, Wyoming All States &
            Territories & Foreign Flag: All States/Territories, Foreign Number of Branches: 0 Authorized Signature Date:
            03/06/2025 Received Date: 03/05/2025</p>

        </div>
        <div class="right-box">
          <div class="r-b-title">{{ $t('about_us_006') }}</div>
          <div class="desc-p" v-html="$t('about_us_007').replace('$[UBEX]', `<span>UBEX</span>`)"></div>
          <img src="@/assets/images/aboutUs/op-right-img-b.png" alt="">
          <div class="b-p" v-html="$t('about_us_008').replace('$[UBEX]', `<span>UBEX</span>`)">{{
              $t('about_us_008')
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="global">
      <div class="global-title">{{ $t('about_us_009') }}</div>
      <div class="global-desc">{{ $t('about_us_010') }}</div>
      <div class="img-box">
        <img src="@/assets/images/aboutUs/global-b.png" alt="">
        <div class="local uk">
          <div class="local-title">{{ $t('about_us_011') }}</div>
          <div class="local-desc">{{ $t('about_us_012') }}</div>
          <div class="point" v-if="local !== 'uk'" @click="setLocal('uk')"></div>

          <lottie
              v-if="local === 'uk'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
        </div>

        <div class="local db">
          <div class="local-title">{{ $t('about_us_013') }}</div>
          <div class="local-desc">{{ $t('about_us_014') }}</div>
          <div class="point" v-if="local !== 'db'" @click="setLocal('db')"></div>

          <lottie
              v-if="local === 'db'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
        </div>

        <div class="local hk">
          <div class="local-title">{{ $t('about_us_015') }}</div>
          <div class="local-desc">{{ $t('about_us_016') }}</div>
          <div class="point" v-if="local !== 'hk'" @click="setLocal('hk')"></div>

          <lottie
              v-if="local === 'hk'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
        </div>

        <div class="local sf">
          <div class="local-title">{{ $t('about_us_017') }}</div>
          <div class="local-desc">{{ $t('about_us_018') }}</div>
          <div class="point" v-if="local !== 'sf'" @click="setLocal('sf')"></div>

          <lottie
              v-if="local === 'sf'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
        </div>

        <div class="local sg flex aic">
          <div class="left">
            <div class="local-title">{{ $t('about_us_019') }}</div>
            <div class="local-desc">{{ $t('about_us_020') }}</div>
          </div>
          <div class="point" v-if="local !== 'sg'" @click="setLocal('sg')"></div>

          <lottie
              v-if="local === 'sg'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
        </div>

        <div class="local ms flex aic">
          <div class="point" v-if="local !== 'ms'" @click="setLocal('ms')"></div>

          <lottie
              v-if="local === 'ms'"
              style="width: 12px;height: 12px;overflow: unset"
              class="live-lottie"
              :options="lottieOptions"
          ></lottie>
          <div class="right">
            <div class="local-title">{{ $t('about_us_021') }}</div>
            <div class="local-desc">{{ $t('about_us_022') }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import MapPointJson from '@/assets/Json/mapPoint.json'

export default {
  name: "AboutUs",
  data() {
    return {
      lottieOptions: {
        _key: Date.now(),
        animationData: MapPointJson,
        loop: true,
        autoplay: true,
        renderer: 'svg',
      },
      local: ''
    }
  },
  methods: {
    setLocal(local) {
      this.local = local
    }
  }
}
</script>

<style scoped lang="scss">
.about-us {
  .top-box {
    width: 1192px;
    margin: 87px auto 0 auto;

    .top-box-left {
      .title {
        font-size: 42px;
        font-weight: 600;
        width: 624px;
      }

      .t-b-box {
        margin-top: 39px;

        .item {
          padding: 29px 35px 29px 35px;
          background: #1B1B1B;
          border-radius: 8px;
          border: 1px solid #363636;
          width: 350px;

          &:first-child {
            margin-right: 20px;
          }

          > img {
            width: 52px;
            height: 52px;
            margin-right: 24px;
          }

          .i-t {
            font-size: 32px;
            font-weight: 600;
          }

          .t-d {
            color: #737373;
            font-size: 16px;
          }
        }
      }
    }

    .right-box {
      > img {
        width: 334px;
        height: 300px;
      }
    }
  }

  .desc-box {
    background: #1B1B1B;
    padding: 70px 0;
    margin: 70px auto;

    .desc-center {
      width: 1192px;
      margin: 0 auto;

      .desc-title {
        font-size: 32px;
        font-weight: 600;
      }

      .desc-p {
        color: #B3B3B3;
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }

  .operation {
    margin-bottom: 129px;
    .operation-box {
      width: 1012px;
      margin: 0 auto;

      .left-box {
        padding: 29px 23px;
        border-radius: 10px;
        background: #252525;

        .top-box-warp {
          margin-bottom: 17px;

          > img {
            width: 43px;
            height: 43px;
            margin-right: 4px;
          }

          .title {
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
          }
        }

        p {
          color: #B3B3B3;
          font-size: 10px !important;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }

    .left-box {
      width: 367px;
      height: 478px;
    }

    .right-box {
      width: 433px;

      .r-b-title {
        font-size: 36px;
        font-weight: 600;
        color: #F4F4F4;
      }

      .desc-p {
        color: #F4F4F4;
        margin: 19px 0 45px 0;
        font-size: 28px;
        font-weight: 700;

        ::v-deep span {
          color: #90FF00 !important;
          font-size: 28px;
          font-weight: 700;
        }
      }

      > img {
        width: 310px;
        height: 179px;
        margin-bottom: 45px;
      }

      .b-p {
        font-size: 20px;
        font-weight: 700;

        ::v-deep span {
          color: #90FF00 !important;
          font-size: 28px;
          font-weight: 700;
        }
      }
    }
  }

  .global {
    width: 1200px;
    margin: 0 auto;

    .global-title {
      font-size: 32px;
      font-weight: 600;
      color: #F4F4F4;
    }

    .global-desc {
      font-size: 16px;
      font-weight: 500;
      color: #b3b3b3;
      margin: 20px 0 70px 0;
    }

    .img-box {
      width: 1000px;
      position: relative;
      margin: 0 auto;

      .local {
        position: absolute;
        text-align: center;

        .local-title {
          font-size: 20px;
          font-weight: bold;
          color: #F4F4F4;
        }

        .local-desc {
          font-size: 16px;
          color: #B3B3B3;
          margin: 4px 0 5px 0;
        }

        .point {
          width: 12px;
          height: 12px;
          background: #90FF00;
          border-radius: 12px;
          margin: 0 auto;
        }

        &.uk {
          top: 19px;
          left: 48px;
        }

        &.db {
          top: 169px;
          left: 130px;
        }

        &.hk {
          top: 181px;
          left: 296px;
        }

        &.sf {
          top: 82px;
          right: 190px;
        }

        &.sg {
          left: 181px;
          bottom: 210px;

          ::v-deep .live-lottie {
            margin-left: 7px !important;
          }

          .left {
            text-align: right;
          }

          .point {
            margin-left: 7px;
          }
        }

        &.ms {
          left: 367px;
          bottom: 223px;

          ::v-deep .live-lottie {
            margin-right: 7px !important;
          }

          .right {
            text-align: left;
          }

          .point {
            margin-right: 7px;
          }
        }
      }
    }

    img {
      height: 568px;
      width: 1000px;
      margin: 0 auto;
    }
  }
}
</style>