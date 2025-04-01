<!-- 返回顶部 -->
<template>
 <el-backtop target="wrapper-view" :bottom="40" @click="handleTop">
  <div class="back-container">
   <i class="el-icon-caret-top"></i>
  </div>
 </el-backtop>
</template>

<script>
	export default {
		name: 'BackTop',
		components: {},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			handleTop(e) {
				console.log(e);
				
			}
		}
	}
</script>
<style lang='scss' scoped>
	.back-contianer {
		height: 100%;
		width: 100%;
		background-color: #f2f5f6;
		box-shadow: 0 0 6px rgba(0, 0, 0, .12);
		text-align: center;
		line-height: 40px;
	}
</style>