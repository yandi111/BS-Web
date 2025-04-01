<template>
  <div class="loading_box" v-if="isShow">
    <div style="width: 100px; height: 100px;">

      <img  style="width: 100%; height: 100%;" src="@/assets/images/loding/lodding.gif"  alt="">
    </div>
    <!-- <div class="loading">
      <span style="--i: 0"></span>
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
    </div>
    <div class="text">
      <span style="--i: 0">L</span>
      <span style="--i: 1">o</span>
      <span style="--i: 2">a</span>
      <span style="--i: 3">d</span>
      <span style="--i: 4">i</span>
      <span style="--i: 5">n</span>
      <span style="--i: 6">g</span>
      <span style="--i: 7">.</span>
      <span style="--i: 8">.</span>
      <span style="--i: 0">.</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name:'my-loading',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    setLoading() {
      let timer = setTimeout(() => {
        this.isShow = false;
        clearTimeout(timer);
      }, 1000);
    },
  },
  mounted() {
    this.setLoading();
  },
};
</script>

<style lang="scss" scoped>
$color: #ccc;
$color: #ccc;
.loading_box {
  overflow: hidden;
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: calc(100vh - 70px);
  background-color: #141414;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 99999;
  .loading {
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    // filter: contrast(15);
    span {
      width: 10px;
      height: 10px;
      background-color: #141414;
      border-radius: 50%;
      position: absolute;
      left: 20px;
      transform-origin: 30px center;
      transform: rotate(calc(360deg / 8 * var(--i)));
      animation: show 2s infinite;
      // filter: blur(5px)
    }
  }
  .text {
    font-size: 24px;
    color: #ccc;
    padding-left: 10px;
    display: flex;
    margin-bottom: 50px;
    span {
      animation: upDown 1.5s ease-in-out infinite;
      animation-delay: (calc(0.1s * var(--i)));
    }
  }
}
@keyframes show {
  0% {
    transform: rotate(0deg) translateX(30px);
  }
  50%,
  100% {
    transform: rotate(calc(360deg / 8 * var(--i)));
  }
  100% {
    transform: rotate(360deg) translateX(30px);
  }
}
@keyframes upDown {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-24px);
  }
  40%,
  100% {
    transform: translateY(0px);
  }
}
</style>
