<template>
  <div class="protocol">
    <div class="title">{{ $t("lang_3153") }}</div>
    <div class="content">
      <div class="content-logo">
        <img src="../../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">UBEX</p>
          <p class="content-date">2023.06.19</p>
        </div>
      </div>
      <div class="content-text">{{ $t("尊敬的BSEX用户") }}：</div>
      <div class="content-text">
        {{ $t("lang_1577") }}
      </div>
      <div class="content-title">{{ $t("information.第1条") }}</div>
      <div class="content-text">
        {{
          $t(
            "UBEX网站包括移动端等UBEX的相关产品（以下简称UBEX）旨在不违反任何相关法律法规的前提下，为广大全球数字资产爱好者和投资者提供符合专业和国际标准的最佳交易平台。任何机构或者个人使用UBEX，均应遵守有关法律与本声明，不得使用UBEX从事任何非法交易活动，如洗钱、走私和商业贿赂。如发现任何账号涉及任何上述非法活动，本网站将冻结该账号并立即将该账号报告给管理当局。"
          )
        }}
         
      </div>
      <div class="content-title">{{ $t("lang_1580") }}</div>
      <div class="content-text">
        {{
          $t(
            "管理当局依据相关调查证件要求BSEX配合其对任何指定用户开展调查的，或需对用户账号采取关闭、冻结或转账等措施的，UBEX将根据管理当局的要求协助其提供该账号用户的相关数据，或根据管理当局的要求执行相关操作。UBEX不以任何形式对因上述行为而产生的用户隐私披露、账号操作失败及损失承担任何责任。"
          )
        }}
         
      </div>
      <div class="content-title">{{ $t("information.第3条") }}</div>
      <div class="content-text">
        {{
          $t(
            "如UBEX用户违反本声明的任何规定，从而违反相关法律的任何条款，UBEX作为服务提供者，有义务完善本平台的规则和服务。但是，本网站既没有违反任何法律法规的动机，也没有实际违反任何相关法律法规的行为，对用户的行为不承担任何连带责任。"
          )
        }}
      </div>
      <div class="content-title">{{ $t("information.第4条") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.任何人直接或间接登录本网站或使用本网站，均视为已完全知悉、理解并自愿接受本网站的约束。"
          )
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegalNotices",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.protocol {
  width: 100%;
  background: #fff;
  padding: 40px;
  color: #333;
  .title {
    font-size: 24px;
  }
  .content {
    font-size: 14px;
    .content-title {
      font-size: 16px;
    }
    .content-logo {
      margin-top: 60px;
      display: flex;
      align-items: center;
      img {
        width: 34px;
        height: 34px;
        display: inline-block;
        margin-right: 10px;
      }

      .content-date {
        font-size: 10px;
        color: #999;
      }
    }
    .content-text {
      margin: 10px 0;
      font-size: 14px;
    }
    .content-info {
      p {
        padding-left: 60px;
      }
    }
  }
}
</style>
