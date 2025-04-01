<template>
    <div style="margin-top: 97px; padding-right: 44px;">

        <div class="flex">
            <div 
            @click="coinListFn(0)"
            :style="{ color: !tableState ? '#737373' : '#F0F0F0' }" class="flex ic"
                style=" cursor: pointer; flex-direction: column; font-size: 18px;font-weight: 500; margin-right: 43px;">
                <div>资金划转记录</div>
                <div v-if="tableState" style="width: 18px; height: 2px;margin-top: 7px;">
                    <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png" alt="">
                </div>
            </div>
            <div
                 @click="coinListFn(1)"
            :style="{ color: tableState ? '#737373' : '#F0F0F0' }" class="flex ic"
                style="flex-direction: column; font-size: 18px;font-weight: 500;cursor: pointer; ">
                <div>{{ coinNameInfo }}划转记录</div>
                <div v-if="!tableState" style="width: 18px; height: 2px;margin-top: 7px;"><img
                        style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png" alt=""></div>
            </div>
        </div>
        <!--   内部转账 -->
        <div>
            <div class="flex"
                style="margin-top: 15px; width: 100%; height: 48px; line-height: 48px;  color: #737373; font-size: 12px; font-weight: 500; border-bottom: 1px solid #252525;">
                <div class="flex js" style="flex: 1;">时间</div>
                <div class="flex js" style="flex: 1;">币种</div>
                <div class="flex js" style="flex: 1;">数量</div>
                <div class="flex js" style="flex: 1;">从</div>
                <div class="flex jb" style="flex: 1; ">
                    <div>到</div>
                    <div>状态</div>
                </div>

            </div>
            <div class="scroll-container" style="height: 300px; overflow-y:auto;">
            <div v-for="(item, index) in records" :key="index" class="flex"
                style=" width: 100%; height: 48px; line-height: 48px;  color: #F0F0F0; font-size: 12px; font-weight: 500; border-bottom: 1px solid #252525;">
                <div class="flex js" style="flex: 1;">{{ $formatTimeInit(item.createTime) }}</div>
                <div class="flex js" style="flex: 1;">{{ item.coinName }}</div>
                <div class="flex js" style="flex: 1;">{{ item.amount }}</div>
                <div class="flex js" style="flex: 1;">{{ item.type == "TO_U_CONTRACT" ? '资金账户' : 'U本位合约账户' }}</div>
                <div class="flex jb" style="flex: 1;">
                    <div>{{ item.type == "TO_U_CONTRACT" ? 'U本位合约账户' : '资金账户' }}</div>
                    <div>成功</div>
                </div>

            </div>
        </div>

        </div>

    </div>

</template>

<script>

// import SelectListRR from './SelectListRR.vue';
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数


export default {
    props: {
        coinNameInfo: {
            type: String,
            required: false
        },
      
        coinId: {
            type: Number,
            required: false
        },
        records: {
            type: Array,
            required: false
        }
       

    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tips",
    components: {
        // SelectListRR

    },
    data() {
        return {
            threeMonthsAgoTimestamp:'',
             currentTimestamp:'',
            treeState: -1,
            imgState: false,
            btnState: false,
            tableState: true,
            chainListTitle: '全部',
            // records: [],
            transferList: [],

            chainList: [
                {
                    id: 2,
                    tokenProtocol: "全部",
                    code: 53,
                },
                {
                    id: 1,
                    tokenProtocol: "确认中",
                    code: '52',
                },
                {
                    id: 1,
                    tokenProtocol: "充值成功",
                    code: 54,
                },
            ]
        };
    },
    computed: {
        token() {
            return getToken() ? getToken() : ''
        }

    },
    mounted() {
       


        // this.currentTimestamp = Date.now();

        // const threeMonthsAgo = new Date();
        // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // 设置为当前月份减去 3
        // this.threeMonthsAgoTimestamp = threeMonthsAgo.getTime(); // 获取毫秒时间戳

        // this.transferListFn(1, 100, null, null, 'TO_U_CONTRACT', this.threeMonthsAgoTimestamp, this.currentTimestamp,'TRANSFER')
    },
    methods: {


        // transferSuccess(){
        //     this.transferListFn(1, 100, null, null, 'TO_U_CONTRACT', this.threeMonthsAgoTimestamp, this.currentTimestamp,'TRANSFER')
        // },



        coinListFn(type){ 
            if (type == 0) {
                this.tableState = true
                this.$emit("fundListFn","TO_U_CONTRACT")
                // this.transferListFn(1, 100, null, null, 'TO_U_CONTRACT', this.threeMonthsAgoTimestamp, this.currentTimestamp,'TRANSFER')
            }else {
                this.tableState = false
                this.$emit("fundListFn","FROM_U_CONTRACT")
                // this.transferListFn(1, 100, this.coinId, this.coinName, 'FROM_U_CONTRACT', this.threeMonthsAgoTimestamp, this.currentTimestamp,'TRANSFER')
            }
        },

    }
};
</script>
<style lang="scss" scoped>
.rotate {
    transform: rotate(90deg);
    /* 旋转 90 度 */
}

.tiem {
    width: 180px;
}

.w100 {
    width: 100px;
}

.fccc {
    color: #737373;
    font-family: PingFang SC
}

.fff {
    color: #F0F0F0;
}

.f500 {
    font-weight: 500;
}

.jc {
    justify-content: center;
}

.ic {

    align-items: center
}

.jb {
    justify-content: space-between
}

.js {
    justify-self: start;
}
/* Webkit 浏览器（Chrome, Safari） */
.scroll-container::-webkit-scrollbar {
  width: 1px;
  /* 滚动条宽度 */
}

.scroll-container::-webkit-scrollbar-track {
  background: #141414;
  /* 滚动条轨道颜色 */
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #141414;
  /* 滚动条颜色 */
  border-radius: 6px;
  /* 滚动条圆角 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #141414;
  /* 滚动条悬停时的颜色 */
}

/* Firefox */
.scroll-container {
  scrollbar-width: thin;
  /* 滚动条宽度 */
  scrollbar-color: #252525 #141414;
  /* 滚动条颜色和轨道颜色 */
}
</style>