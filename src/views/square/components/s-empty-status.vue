<template>
  <div class="empty-status">
    <div class="loading df aic jc" v-if="!state">
      <!-- <span style="--i: 0"></span>
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span> -->
      <div>{{$t('square.数据加载中')}}...</div>
    </div>
    <div class="error" v-if="state === 'error'">
      <img src="@/assets/square-imgs/s-error.png" alt="" />
      <span>{{$t('square.网络错误')}}</span>
    </div>
    <div class="success" v-if="state === 'success'">
      <img src="@/assets/contract-imgs/empty2.png" alt="" />
      <span>{{$t('square.暂无数据')}}</span>
    </div>
  </div>
</template>

<script>
import myEmpty from "@/components/my-empty/index.vue";
export default {
  components: {
    myEmpty,
  },
  props: {
    state: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-status {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // filter: contrast(10);
    font-size: 12px;
    color: #96a2b2;
    span {
      width: 10px;
      height: 10px;
      background-color: #c6cad0;
      border-radius: 50%;
      position: absolute;
      left: 20px;
      transform-origin: 30px center;
      transform: rotate(calc(360deg / 8 * var(--i)));
      animation: show 2s infinite;
      filter: blur(1px);
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
  }
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    img {
      width: 100%;
    }
    span {
      font-size: 12px;
      color: #96a2b2;
    }
  }
  .success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75px;
    img {
      width: 100%;
    }
    span {
      font-size: 12px;
      color: #96a2b2;
      margin-top: 10px;
    }
  }
}
</style>
