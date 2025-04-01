<template>
    <div>
        <!-- 谷歌验证 -->
        <div>
            <div v-if="stateShow"  class="ff0" style="font-size: 14px; margin-bottom: 14px; ">谷歌验证</div>
            <div class="input-containerS" style="height: 42px;">
                <input style="height: 42px; padding-left: 12px; color: #F0F0F0" v-model="phoneCheckCode"
                        @input="handleInput" @focus="eventFocusS($event)" @blur="$event.target.style.border = 'none',
                        eventFlag = false" class="custom-input" placeholder="请输入谷歌验证码 " type="text" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        method: {
            type: String,
            required: false,
        },
        authBizEnum: {
            type: String,
            required: false,
        },
        stateShow: {
            type: String,
            required: false,
        },
    },


    components: {
    },
    name: 'PhoneCheck',
    data() {
        return {
            phoneCheckCode: '',
            eventFlag: false,
        }
    },
    computed: {
        ...mapGetters(['getAccountList', 'getToken']),
    },
    // eslint-disable-next-line vue/return-in-computed-property
    mounted() { },

    methods: {
        handleInput() {
            this.$emit('gooleCheckCodeClick',this.phoneCheckCode) 
        },
        eventFocusS(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlag = true
        }
    }
}
</script>

<style scoped>
.ff {
    font-family: PingFang SC;
    font-weight: 500;
}

.ff0 {
    color: #F0F0F0;
}

.input-containerS {
    display: flex;
    align-items: center;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */

    width: 100%;
    /* 容器宽度 */
}

.custom-input {
    width: 100%;
    /* 输入框宽度 */
    height: 40px;
    /* 输入框高度 */
    caret-color: #90FF00;
    /* 光标颜色 */
    outline: none;
    /* 去除聚焦时的蓝色边框 */
    border: 0.5px solid rgba(0, 0, 0, 0);
    /* 初始边框样式 */
    border-radius: 4px;
    /* 圆角边框 */
    background: #252525;
    /* 背景颜色 */
    text-align: left;
    /* 文本左对齐 */
}

.close-button svg {
    fill: #333333;
    transition: fill 0.3s ease;
}

.close-button:hover svg {
    fill: #ffffff;
}

h2 {
    color: #333;
    margin-bottom: 15px;
}

p {
    margin-bottom: 20px;
}

.selected-icon img {
    height: 30px;
    width: 30px;
}
</style>