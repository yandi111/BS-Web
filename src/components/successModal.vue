<!-- 资金验证表单 -->
<template>
  <div>
    <common-modal
      width="400px"
      :show="isShow"
      :noFooter="false"
      :showClose="false"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="success-container">
          <i class="el-icon-circle-check"></i>
          <div class="text" :style="{'color': isDark ? 'var(--trade-text-color)':'#333'}">
						{{ text }}
					</div>
        </div>
      </template>

      <template #dia_footer>
        <div class="btn-group">
          <el-button type="primary" class="back" @click="handleNext">{{ btnText }}</el-button>
          
           <!-- <div class="btn" >{{ btnText }}</div> -->
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
	import { useThemePage } from "@/libs/useThemePage";
	import {mapGetters} from "vuex";
export default {
  name: 'SuccessModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '返回'
    }
  },
  data () {
    return {}
  },
	computed:{
		...mapGetters(["getTheme"]),
		useTheme() {
			return useThemePage.includes(this.$route.fullPath) ? true : false;
		},
		isDark(){
			return this.useTheme && this.getTheme == 'dark';
		}
	},
  methods: {
    // 验证下一步
    handleNext () {
      this.$emit('next')
    },
  }
}
</script>
<style lang='scss' scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  .el-icon-circle-check {
    font-size: 32px;
    color: #54E283;
    margin-bottom: 16px;
  }
  .text {
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 30px;
    // margin-bottom: 20px;
  }
}

.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  .back {
    min-width: 160px;
    height: 50px;
    border-radius: 6px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>