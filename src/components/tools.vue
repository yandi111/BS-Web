<!--  -->
<template>
  <div></div>
</template>

<script>
export default {
  name: 'Tools',
  components: {},
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.right-tools {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 30%;
    right: 10px;
    width: 80px;
    height: 193px;
    background-color: rgba(89, 119, 255, 0.1);
    border-radius: 20px 0px 0px 20px;
    z-index: 9;
    img {
      &:first-child {
        width: 36px;
        height: 37px;
      }
      &:last-child {
        width: 31px;
        height: 36px;
      }
    }
  }
</style>