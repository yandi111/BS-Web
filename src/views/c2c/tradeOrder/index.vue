<!-- otc订单页面 -->
<template>
  <div class="trade-order">
    <div class="main">
			  <div class="topNav between " v-show="isShow">
			    <ul class="tabs flexs ">
			      <li
			        v-for="(item, index) in leftList"
			        :key="index"
							class="mr40"
			        :class="index === activeIndex ? 'tabs-active' : ''"
			        @click="handleNav(index)"
			      >
			        <span class="pointer">{{$t(t+item)   }}</span>
			      </li> 
			    </ul>
			    <div class="pointer export" @click="handleExport">{{ $t(t+'导出订单') }} </div>
			  </div>
			<done-list @detail="handleDetail" ref="doneList" @back="(isShow = true, handleNav(activeIndex))"></done-list>
		</div>
  </div>
</template> 

<script>
import DoneList from './components/doneList.vue'
export default {
  name: 'TradeOrder',
  components: {
    DoneList,
  },
  data () {
    return {
			// 国际缩写
			t: 'c2c.',
      isShow: true,
      activeIndex: 0,
      leftList: ['进行中',"已完成"],
    }
  },
  mounted () {
		if (this.$route.query?.orderId) {
			this.$nextTick(_=>{
				this.handleDetail();
				this.$refs.doneList.handleDetail({ id: this.$route.query?.orderId, type: this.$route.query?.type})
			})
			return
		}
		this.handleNav(0);
	},
  methods: { 
    handleNav (index) {
      this.activeIndex = index;
			// console.log(index,'index');


			this.$nextTick(_=>{
				this.$refs.doneList.statusType = index == 1 ? true : false;
				this.$refs.doneList.formInline.status = index == 0 ? -2 : -1;
				this.$refs.doneList.formInline.type = '';
				this.$refs.doneList.orderList()
			})
    },
    // 导出
    handleExport(){
      
    },
    handleDetail () {
      this.isShow = false
    },
  }
}
</script>
<style lang='scss' scoped>
.trade-order {
	background-color: white;
	.main{
		// width: 1400px;
		padding: 0 210px;
		margin: auto;
		.topNav{
			// width: 1400px;
			margin: 110px auto 0 auto;
			// width: 100%;
			font-size: 18px;
			border-bottom: 1px solid #EEEEEE;
			color: #8992a6;
			height: 60px;
			line-height: 60px;
			.mr40{
				font-weight: bold;
			}
			.tabs{
				font-weight: bold;
				border-bottom: 1px solid transparent;
				font-weight: bold;
				&-active{
					color: #333333;
					border-bottom: 1px solid #90ff00;
				}
			}
			.export{
				color: #90ff00;
				min-width: 120px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				font-size: 16px;
				background: #F5F7FA;
				border-radius: 6px;
				&:active{
					opacity: .8;
				}
			}
		}
	}
}
</style>