<template>
  <div class="protocol">
    <div class="title">{{ $t("information.风险提示") }}</div>
    <div class="content">
      <div class="content-logo">
        <img src="../../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">{{ logoName }}</p>
          <p class="content-date">2023.06.19</p>
        </div>
      </div>
      <div class="content-text">
        {{ $t("information.尊敬的XXX用户：", [logoName]) }}
      </div>
      <div class="content-text">
        {{
          $t("information.尊敬的XXX用户： 请仔细阅读以下《交易风险提示》。", [
            logoName,
          ])
        }}
      </div>
      <div class="content-text">
        {{
          $t(
            "information.合约交易平台所提供的衍生品交易服务具有高杠杆性和高风险性，设立本风险提示旨在向投资者揭示数字资产衍生品交易高杠杆的投资风险，并且帮助投资者评估和确定自身的能力。",
            [logoName]
          )
        }}<br />
        {{
          $t(
            "information.鉴于投资风险的存在，在确认本协议及进行合约交易前，投资者应该仔细阅读本风险提示书，必须确保自己理解有关合约交易的性质、规则，并依据自身的投资经验、目标、财务状况、承担风险的能力等自行决定是否参与合约交易。投资者在合约交易及使用高杆杠前应该咨询法律及其它独立的专业意见。"
          )
        }}
      </div>
      <div class="content-title">{{ $t("informaiton.适合的投资者") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.数字资产衍生品交易具有高杠杆性和高风险性，仅适合投资经验丰富的人士，或者能够充分理解有关于数字资产衍生品交易的一切风险，能承受因投资失误而造成账户资金部分或者全部损失的人士。"
          )
        }}
      </div>
      <div class="content-title">{{ $t("information.存在的风险") }}</div>
      <div class="content-text">1.{{ $t("information.交易风险") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.投资者需要了解衍生品交易具有高杠杆的特点，可能导致快速的盈利或者亏损。若交易的方向和行情的波动相反，会造成较大的亏损。根据亏损的程度，投资者需要追加数字货币保证金或者减少仓位，否则其持仓可能会被强制平仓，投资者必须承担由此造成的全部损失。投资者在交易所的交易系统内，提交的限价单一经成交，即不可撤销，投资者必须接受这种方式可能带来的风险。交易所不会对投资者做出获利保证，并且不会与投资者分享收益或共担风险。"
          )
        }}
      </div>
      <div class="content-text">2.{{ $t("information.价格波动的风险") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.数字货币衍生品作为一种特殊的具有投资价值的産品，其价格受多种因素的影响，价格波动大，投资者在实际操作中难以全面把握，因而存在出现投资失误的可能性，如果不能有效控制风险，则可能遭受较大的损失，投资者必须独自承担由此导致的一切损失。"
          )
        }}
      </div>
      <div class="content-text">3.{{ $t("information.政策监管风险") }}</div>
      <div class="content-text">
        {{
          $t(
            "information.数字资产衍生品交易可能面临一定法域内的政策监管风险，投资者在交易之前需在了解交易地域的政策监管背景的前提下审慎做出判断。"
          )
        }}
      </div>
      <div class="content-text">
        4.{{ $t("information.其他可能存在的风险") }}
      </div>
      <div class="content-text">
        {{
          $t(
            "information.数字资产交易存在较大的市场风险和价格波动，因此平台为了维护市场稳定，对于持仓的用户，当平台判断用户的持仓有风险存在，将会采取相应的处理措施，包括但不限于提示、强制平仓等。"
          )
        }}<br />
        {{
          $t(
            "information.数字资产衍生品市场的衍生品交易规则，包括但不限于调整系数、产品规则等可根据平台实际运营情况进行修改，平台如因特殊情况需要对产品进行提前在官网公布或短信通知等方式履行告知义务后，用户需及时处理自身仓位，如因此造成的可能损失或者收益，皆由用户自身承担。"
          )
        }}
      </div>
      <div class="content-text">
        {{ $t("information.提示：") }}<br />
        {{
          $t(
            "information.投资者在参与之前务必详尽地了解数字货币合约交易的基本知识和相关风险以及参与衍生品交易所有关的业务规则等。"
          )
        }}<br />
        {{
          $t(
            "information.本风险提示上提及的风险事项仅为列举性质，未能详尽的列明有关数字资产衍生品交易的所有风险因素，投资者参与数字资产衍生品交易投资前，还应该认真对其它可能存在风险因素有所了解和掌握。"
          )
        }}<br />
        {{
          $t(
            "information.我们诚挚的希望和建议投资者，从风险承受能力等自身实际情况出发，审慎的决定是否参与此合约交易，合理地配置自己的数字资产。"
          )
        }}<br />

        {{ $t("information.XXX网站上提供的任何信息仅供参考。", [logoName]) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RiskWarning",
  data() {
    return {
      logoName: "BSEX",
    };
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
