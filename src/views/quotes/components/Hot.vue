<!-- 热门区域 -->
<script>
import {GetQuotesApi} from "@/api/quotes";
import BigNumberUtils from "@/utils/format";
import Echarts from "@/components/Echarts/index.vue";
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import {NumberFormat} from "@/utils/format";
import {mapGetters} from "vuex";

const bigNumber = new BigNumberUtils()
export default {
  components: {
    Echarts
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getList()
    this.subscribe()
  },
  computed: {
    ...mapGetters(['getQuotesMarket']),
  },
  watch: {
    'getQuotesMarket'() {
      this.list = this.list.map((item, index) => {
        return {
          ...item,
          market: {
            ...item.market,
            increase24H: this.getQuotesMarket.symbol === item.symbolInfo.coinsName ? bigNumber.multiply(this.getQuotesMarket.increase24H, 100) : item.market.increase24H,
            close: this.getQuotesMarket.symbol === item.symbolInfo.coinsName ? this.getQuotesMarket.close : item.market.close,
            vol: this.getQuotesMarket.symbol === item.symbolInfo.coinsName ? this.getQuotesMarket.volPrice24H : item.market.vol,
          },
        }
      })
    }
  },
  methods: {
    //订阅
    subscribe() {
      this.$socket.subscribe({
        cmd: 'SUBSCRIBE',
        data: {
          topic: 'market.kline'
        }
      })
    },

    //取消订阅
    unsubscribe() {
      this.$socket.unsubscribe({
        cmd: 'SUBSCRIBE',
        data: {
          topic: 'market.kline'
        }
      })
    },

    getList() {
      Promise.try(async () => {
        return await GetQuotesApi({isHot: 1, size: 3, page: 1})
      }).then(res => {
        res.data.records.forEach(item => {
          item.market.vol = NumberFormat({val: item.market.vol})
          item.market.close = NumberFormat({val: item.market.close, minimumFractionDigits: 2})
          item.market.increase24H = bigNumber.multiply(item.market.increase24H, 100)
          item.options = {
            grid: {
              bottom: 0,
              left: 0,
              top: 0,
              right: 0
            },
            xAxis: {
              show: false,
              boundaryGap: false,
              data: item.closeList.map(i => {
                return dayjs(+i.id * 1000).format('YYYY-MM-DD HH:mm:ss')
              })
            },
            yAxis: {
              show: false,
              type: 'value',
              boundaryGap: [0, '30%']
            },
            dataZoom: [],
            series: [
              {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                itemStyle: {
                  color: +item.market.increase24H < 0 ? '#ED3C2F' : '#0CBB57'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: +item.market.increase24H < 0 ? 'rgba(237, 60, 47, 0.5)' : 'rgba(12, 187, 87, .5)'
                    },
                    {
                      offset: 1,
                      color: +item.market.increase24H < 0 ? 'rgba(237, 60, 47, 0)' : 'rgba(12, 187, 87, 0)'
                    }
                  ])
                },
                data: item.closeList.map(item => {
                  return item.close
                })
              }
            ]
          }
        })

        this.list = res.data.records
      }).catch(() => {
      })
    }
  }
}
</script>

<template>
  <div class="box flex">
    <div v-for="(item, index) of list" :key="index" class="card flex">
      <p class="card_subTitle">{{ $t('market_002') }}</p>

      <div class="card_section flex jb">
        <div class="card_left flex">
          <div class="card_currency flex">
            <img :src="item.symbolInfo.icon" alt="">
            <p class="card_name">{{ item.symbolInfo.coinsName }}</p>
          </div>
          <strong class="card_num">{{ item.market.close }}</strong>
        </div>

        <Echarts :option="item.options" width="120px" height="66px"/>
      </div>

      <div class="card_rato flex">
        <p :class="[+item.market.increase24H < 0 ? 'reduce' : 'add', 'card_label_Increase card_label']">
          {{ +item.market.increase24H > 0 ? '+' : '' }}{{ item.market.increase24H }}%</p>
        <p class="card_label">{{ $t('market_003') }}</p>
        <p class="card_label">{{ item.market.vol }} {{ item.symbolInfo.coinsName.replace('-USDT', '') }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  margin-bottom: 71px;

  .card {

    transition: all .18s linear;
    cursor: pointer;

    .card_rato {
      margin-top: 7px;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }

    &:hover {
      transform: translateY(-12px);
    }

    padding: 14px 13px 12px 17px;
    width: calc(100% / 3 - (20px / 3));
    border-radius: 10px;
    border: 1px solid #252525;
    flex-direction: column;
    background: #1B1B1B;

    &_subTitle {
      margin-bottom: 13px;
      @include Font((color: #737373, size: 13px));
    }

    &_section {
      align-items: center;
    }

    &_left {
      margin-right: 10px;
      flex-direction: column;
    }

    &_currency {
      margin-bottom: 15px;
      align-items: center;

      img {
        margin-right: 10px;
        width: 25px;
        border-radius: 50%;
      }

      p {
        @include Font((size: 16px, color: #F0F0F0, weight: bold))
      }
    }

    &_num {
      margin-bottom: 12px;
      @include Font((size: 18px, weight: bold))
    }

    &_rato {
      align-items: baseline;
    }

    &_label {
      &:not(:last-child) {
        margin-right: 10px;
      }

      @include Font((size: 12px, color: #B3B3B3));

      &.reduce {
        color: #ED3C2F;
      }

      &.add {
        color: #0CBB57
      }
    }
  }
}
</style>