<template>
    <div style="margin-top: 67px; padding-right: 44px;">

        <div class="flex">
            <div :style="{ color: !tableState ? '#737373' : '#F0F0F0' }" class="flex ic"
                style=" cursor: pointer; flex-direction: column; font-size: 18px;font-weight: 500; margin-right: 43px;">
                <div v-if="tableState" style="width: 18px; height: 2px;margin-top: -10px;">
                </div>
            </div>

        </div>
        <div>
            <div class="flex"
                style="margin-top: 15px; width: 100%; height: 48px; line-height: 48px;  color: #737373; font-size: 12px; font-weight: 500; border-bottom: 1px solid #252525;">
                <div class="flex js" style="flex: 1;">时间</div>
                <div class="flex js" style="flex: 1;">类型</div>
                <div class="flex jb" style="flex: 1; margin-right: 8px;">
                    <div>数量</div>
                    <div>状态</div>
                </div>

            </div>

            <div v-if="records.length > 0" class="scroll-container" style=" overflow-y:auto;">
                <div v-for="(item, index) in records" :key="index" class="flex"
                    style=" width: 100%; height: 48px; line-height: 48px;  color: #F0F0F0; font-size: 12px; font-weight: 500; border-bottom: 1px solid #252525;">
                    <div class="flex js" style="flex: 1;">{{ $formatInit(item.createTime) }}</div>
                    <!-- <div class="flex js" style="flex: 1;">{{ item.createTime }}</div> -->
                    <div class="flex js" style="flex: 1;">{{ item.type }}</div>
                    <div class="flex jb" style="flex: 1;">
                        <div>{{ item.amount }}</div>
                        <div>已完成</div>
                    </div>
                </div>
            </div> 
            <div v-else style="width: 100%;">
                <NoData />

            </div> 
            <div v-if="total > 10" class="flex ic jc" style="width: 100%; margin-top: 40px;">
                <el-pagination  style="color: #737373;" background layout="prev, pager, next"
                 :page-size="size"
                 :total="total"
                 @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>

// import SelectListRR from './SelectListRR.vue';
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数
import NoData from "@/views/com/NoData.vue";



export default {
    props: {
       
        chainIdInfo: {
            type: String,
            required: false
        },
       
        total: {
            type: Number,
            required: false
        },
        size: {
            type: Number,
            required: false
        },
        records: {
            type: Array,
            required: false
        }


    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: "RechargeRecord",
    components: {
        NoData
        // SelectListRR

    },
    data() {
        return {
            threeMonthsAgoTimestamp: '',
            currentTimestamp: '',
            treeState: -1,
            imgState: false,
            btnState: false,
            tableState: true,
            chainListTitle: '全部',

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
      
    },
    methods: {
        handlePageChange(newPage) {
            this.currentPage = newPage; // 更新当前页码
            console.log('当前页码:', newPage);
            // 在这里可以调用接口或执行其他操作以获取新页的数据
            this.$emit('pageChangeFn',newPage)
        },


        chainListFn(item) {
            console.log(item);
        },
        toggleRotation(index) {
            this.imgState = !this.imgState; // 切换旋转状态 /bsex-finance/withdrawal/apply/record/page
            this.treeState = index
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
//  .btn-prev{
//     background-color: #1B1B1B !important;

// }
::v-deep .el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
  background-color:  #1B1B1B !important;
//   background: var(--dialog-bg) !important;
}
::v-deep .el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
   background-color:  #1B1B1B !important;
   
}
::v-deep .el-pagination .btn-next {
   background-color:  #1B1B1B !important;
//    background: var(--dialog-bg) !important;
}

// .el-pager .active {
//     color: #000000 !important;
//     background-color: #90FF00;
// }




::v-deep .el-table .el-table__cell {
  padding: 7px 0;
}

//分页
::v-deep .el-pager li {
//   background: var(--dialog-bg) !important;
color: #737373 !important;
background-color:  #1B1B1B !important;

// background-color: #90FF00;
}

::v-deep .el-pager .active {
   color: #000000 !important;
    // background-color: #90FF00;
}

.el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
    background-color:  #1B1B1B !important;
    color: #737373 !important;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #90FF00 !important;
}
::v-deep .el-pagination.is-background .el-pager li {
    background-color:  #1B1B1B !important;
}
::v-deep  .el-pagination.is-background .btn-prev {
    background-color:  #1B1B1B !important;
}



</style>