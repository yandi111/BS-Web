<template>
  <div class="protocol">
    <div class="title">{{ $t("footer.反洗钱政策") }}</div>
    <div class="content">
      <div class="content-logo">
        <img src="../../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">BSEX</p>
          <p class="content-date">2023.09.27</p>
        </div>
      </div>
      <div class="content-text">{{ $t("information.尊敬的BSEX用户") }}：</div>
      <div class="content-text">
        {{
          $t(
            "information.请仔细阅读BSEX的AML(反洗钱)和KYC(实名认证)政策。"
          )
        }}
      </div>
      <div class="content-title">{{ $t("information.目的") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.为了维护一个健全、合规的数字资产交易平台，我们建立并实施了一系列的反洗钱计划，我们致力于推进合法、透明的商业活动，并在用户和数字资产行业中保持一个良好的声誉。"
          )
        }}
      </div>
      <div class="content-title">
        {{ $t("information.BSEX的 AML/KYC 政策") }}
      </div>
      <div class="content-text">
        {{
          $t(
            "information.通过基于风险的多层次控制系统，我们设计了AML/KYC 政策以合理防止洗钱。"
          )
        }}
      </div>
      <div class="content-text">
        <div>
          1.{{
            $t(
              "information.BSEX将对每个用户进行KYC（实名认证），需要用户提供的信息："
            )
          }}
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>{{ $t("information.电子邮件地址") }}</div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>{{ $t("information.手机号码") }}</div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>
            {{ $t("information.法定全名（包括曾用名和当地语言名称）") }}
          </div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>{{ $t("information.国籍") }}</div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>
            {{
              $t(
                "information.社会安全号码（“SSN”），护照号码或任何政府颁发的身份证号码"
              )
            }}
          </div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>{{ $t("information.出生日期") }}</div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>
            {{
              $t(
                "information.身份证明（例如护照，驾驶执照或政府颁发的身份证明）"
              )
            }}
          </div>
        </div>
        <div class="info">
          <div class="info-icon"></div>
          <div>
            {{
              $t(
                "information.由我们的合规团队酌情决定的所需的额外的个人资料或文件"
              )
            }}
          </div>
        </div>
      </div>
      <div class="content-text">
        {{
          $t(
            "information.我们将按照规定的方式保护用户的个人数据，详见BSEX隐私协议与说明。"
          )
        }}
      </div>
      <div class="content-text">
        2.{{
          $t(
            "information.包括持续监控可疑活动，如果我们怀疑或有理由怀疑用户存在可疑交易活动，我们有权不提前通知的情况下对此用户账户进行部分功能限制或账户限制使用等措施并将酌情向当地监管机构提交可疑交易活动报告。"
          )
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoneyPolicy",
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
      // margin-top: 60px;
      padding: 20px 0px;
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
      .info {
        display: flex;
        align-items: center;
        .info-icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #333;
          margin-right: 5px;
        }
      }
    }
    .content-info {
      p {
        padding-left: 60px;
      }
    }
  }
}
</style>
