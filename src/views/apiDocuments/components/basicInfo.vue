<template>
  <div class="basic-info">
    <div class="card">
      <div class="title">API Key设置</div>
      <div class="p">● 很多接口需要API Key才可以访问</div>
      <div class="p">● 设置API Key的同时，为了安全，建议设置IP访问白名单</div>
      <div class="p bold">● 永远不要把你的API key/secret告诉给任何人</div>
      <div class="tips">
        <i class="iconfont icon-warning1"></i>
        <span
          >如果不小心泄露了API key,请立刻删除此Key,并可以另外生产新的Key.</span
        >
      </div>
    </div>
    <div class="card mt20">
      <div class="title">API 基本信息</div>
      <p class="indr mb15">本篇列出接口的 base URL 有:</p>
      <div class="p link">● https://api.mktx.cc</div>
      <div class="p link">● https://api.gysbxg.com</div>
      <div class="p link">● https://api.bjsxu.com</div>
      <div class="p link">● https://api.musk-ex.vip</div>
      <div class="p link">● https://api.musk-ex.club</div>
      <p class="indr mt15">
        上述列表的前两个接口 (api.mktx.cc api.gysbxg.com)
        可能会提供更好的性能，但其稳定性略为逊色。因此，请务必使用最适合您现有配置的那款。
        所有接口的响应都是 JSON 格式。
      </p>
    </div>
    <div class="card mt20">
      <div class="title">HTTP 返回代码</div>
      <div class="p">
        ● HTTP 4XX 错误码用于指示错误的请求内容、行为、格式。问题在于请求者。
      </div>
      <div class="p">● HTTP 403 非法请求。问题在于请求者。</div>
      <div class="p">● HTTP 5XX 错误码用于指示BSEX服务侧的问题。</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "basic-info",
};
</script>

<style lang="scss" scoped>
.basic-info {
  padding: 80px 10px 10px 20px;
  .card {
    .title {
      color: #000;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .p {
      color: #000;
      line-height: 26px;
      font-size: 16px;
      padding-left: 30px;
      &.bold {
        font-weight: bold;
      }
      &.link {
        color: #0052cc;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .indr {
      color: #000;
    }
    .tips {
      display: flex;
      align-items: center;
      padding-left: 15px;
      width: 790px;
      height: 50px;
      margin-top: 15px;
      border: 1px solid #e5cdcf;
      background-color: #f1f0f2;
      i {
        color: #c97a7e;
        margin-right: 10px;
        font-size: 28px;
        margin-top: 2px;
      }
    }
  }
}
</style>
