<!--  -->
<template>
  <div>
    <el-popover
      placement="bottom"
      width="480"
      trigger="click"
      v-model="popperShow">
      <div>
        <slot name="popper_content"></slot>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'CommonPopper',
  components: {},
  props: {
    width: {
      type: String,
      default: '480'
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>