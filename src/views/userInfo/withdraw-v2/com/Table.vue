<template>
    <div class="flex" style="margin-top: 97px; padding-right: 44px;">
            <div @click="tableState = true" :style="{ color: !tableState ? '#737373' : '#F0F0F0' }" class="flex ic"
                style=" cursor: pointer; flex-direction: column; font-size: 18px;font-weight: 500; margin-right: 43px;">
                <div>{{ tableInfo }}</div>
                <div v-if="tableState" style="width: 18px; height: 2px;margin-top: -10px;">
                    <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png" alt="">
                </div>
            </div>
            <div @click="tableState = false" :style="{ color: tableState ? '#737373' : '#F0F0F0' }" class="flex ic"
                style="flex-direction: column; font-size: 18px;font-weight: 500;cursor: pointer; ">
                <div>{{ tableInfotow }}</div>
                <div v-if="!tableState" style="width: 18px; height: 2px;margin-top: -10px;"><img
                        style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png" alt=""></div>
            </div>
        </div>
</template>

<script>




export default {
    props: {
        coinNameInfo: {
            type: String,
            required: true
        },
        chainIdInfo: {
            type: String,
            required: true
        },
        tableInfo: {
            type: String,
            required: true
        },
        tableInfotow: {
            type: String,
            required: true
        },



    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Tips",
    components: {

    },
    data() {
        return {
            treeState: -1,
            imgState: false,
            btnState: false,
            tableState: true,
            chainListTitle: '全部',
            records: [],
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
    },
    mounted() {
        
    },
    methods: {
      
        toggleRotation(index) {
            this.imgState = !this.imgState; // 切换旋转状态 /bsex-finance/withdrawal/apply/record/page
            this.treeState = index
        }

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
</style>