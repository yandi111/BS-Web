<!-- 订单 -->
<template>
  <div class="container">
    <div class="header-title flexs">
      <el-image class="mr10" style="width: 26px; height: 26px" :src="orderInfo.coinIcon" fit="cover" />
      {{ orderInfo.type == 1 ? $t("lang_151") : $t("lang_1818")
      }}{{ orderInfo.coinName }}
      <!-- {{ orderInfo }} -->
      <!-- orderStatus: {{ orderStatus }} orderType: {{ orderInfo.type }} -->
    </div>
    <div class="dia-content">
      <div class="order-content">
        <!-- 0 卖 1 买 -->
        <div class="order-content-item" v-if="orderInfo.type === 1">
          <!-- 待支付 -->
          <p v-if="!isBuy && orderStatus === 0" class="item-pay">
            {{ $t(t + "待付款") }}
          </p>
          <!-- 申诉中 appealUser 1 买 -->
          <p v-if="orderStatus === 2" class="item-pay">
            {{ orderInfo.type == 1 ? (orderInfo.appealUser !== 0 ?  $t(t + "买家申诉中") : $t(t + "卖家申诉中") ): $t(t + "待收款") }}
          </p>

          <!-- 已支付,等待商家收款 -->
          <p v-if="orderStatus === 1" class="item-pay">
            {{ $t(t + "等待卖家确认收款") }}
          </p>
          <p v-if="isBuy && orderStatus != 4" class="item-pay">
            {{ $t(t + "订单已生成") }}
          </p> 
          <!-- 订单异常，客服仲裁审 隐藏计时以及总价 -->
          <p v-if="orderStatus === 2" class="item-paytime">
            <span class="time">{{ countdownAppealTime }}</span><span>{{
              $t(t + "申诉将会在_min内完成", [orderInfo.maxAppealTime])
            }}</span>
            <!-- <span class="time">{{ countdownAppealTime }}</span>{{ $t(t + "订单异常，客服仲裁审判中") }} -->
          </p>

          <div v-if="!isBuy && orderStatus === 0" class="item-paytime">
            <span class="time">{{ countdownTime }}</span><span>&nbsp;&nbsp;{{
              $t(t + "请在_min内完成付款", [orderInfo.tradingTime])
            }}</span>
          </div>
          <div v-if="isBuy && orderStatus != 4" class="item-paytime">
            <span class="time">{{ countdownTime }}</span><span>&nbsp;&nbsp;{{
              $t(t + "请在_min内付款给卖家", [orderInfo.tradingTime])
            }}</span>
          </div>
          <div v-if="orderStatus === 1" class="item-paytime">
            <span class="time">{{ countdownTime }}</span><span>&nbsp;&nbsp;
              {{
                $t(t + "卖家会在_min内放币，请注意查看账户资产", [
                  orderInfo.confirmTime,
                ])
              }}</span>
          </div>
          <div class="pay-success" v-if="orderStatus === 3 || orderStatus === 6">
            <div class="icon">
              <i class="el-icon-circle-check" style="font-size: 30px; color: #54e283"></i>
            </div>
            <div class="success-tip">
              {{ $t(t + "成功购买") }}{{ orderInfo.coinName }}
            </div>
            <el-button type="primary" @click="$router.push('/wallet/assetsOverview')" style="margin-bottom: 40px">{{ $t(t
              + "查看资产") }}</el-button>
          </div>
          <p v-if="orderStatus === 3" class="order-done">
            {{ $t(t + "订单已完成") }}
          </p>
          <ul v-if="orderStatus === 0 || orderStatus === 3">
            <li class="item-paytime">
              <span>{{ $t(t + "总价") }}</span>
              <span class="item-tdcolor">{{ orderInfo.amount }} CNY</span>
            </li>
          </ul>

          <div v-if="orderStatus === 4">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "已取消订单") }}</span>
              </li>
            </ul>
          </div>
          <div v-if="orderStatus === 10">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已超时") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "如有疑问，请联系卖家或发起申诉") }}</span>
              </li>
            </ul>
          </div>
          <div v-if="orderStatus === 11">
            <p class="item-pay item-pay-cancel">{{ $t(t + "申诉超时") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "请等候客服介入处理") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 5">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>

            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "商家已取消订单") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 7">
            <p class="item-pay item-pay-cancel">{{ $t(t + "申诉失败") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "您的订单申诉失败，交易已完成") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 8">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "商家超时，订单已取消") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 9">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "商家存在违规操作，订单已取消") }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-content-item item-merchant" v-if="orderInfo.type === 0">

          <p v-if="orderStatus === 2" class="item-pay">
            {{ orderInfo.appealUser !== 0 ? $t(t + "买家申诉中") : $t(t + "卖家申诉中") }}
          </p>
          <p class="item-pay" v-if="orderStatus === 0">
            {{ $t(t + "等待买家付款") }}
          </p>
          <p class="item-pay" v-if="orderStatus === 1">
            {{ $t(t + "等待确认收款")  }}
          </p>
          <!-- 申诉超时 -->
          <p v-if="orderStatus === 11" class="item-pay">
            {{ $t(t + '申诉超时') }}
          </p>
          <!-- 放币超时 -->
          <p v-if="orderStatus === 10" class="item-pay">
            {{ '订单已超时' }}
          </p>
          <!-- 订单异常，客服仲裁审 隐藏计时以及总价 -->
          <!-- <p>订单异常，客服仲裁审</p> -->
          <div class="item-paytime" v-if="orderStatus === 2">
            <span class="time">{{ countdownAppealTime }}</span><span>{{
              $t(t + "申诉将会在_min内完成", [orderInfo.maxAppealTime])
            }}</span>
            <!-- <span class="time">{{ countdownAppealTime }}</span><span>{{
              $t(t + "请在_min内完成付款", [orderInfo.maxAppealTime])
            }}</span> -->
          </div>
          <!-- orderInfo.type == 0 -->
          <div class="item-paytime" v-if="orderStatus === 0">
            {{ $t(t + "将会在") }}
            <span class="time">
              {{ countdownTime || orderInfo.tradingTime }} </span><span>
              {{
                $t(t + "min内向_您打款", [
                  orderInfo.type == 0 ? $t(t + "买家") : $t(t + "卖家"),
                ])
              }}</span>
          </div>
          <!-- 放币超时 -->
          <div class="item-paytime" v-if="orderStatus === 10">
            {{
              $t(t + '如有疑问，请联系卖家或发起申诉')
            }}
          </div>
          <!-- 申诉超时 -->
          <div class="item-paytime" v-if="orderStatus === 11">
            {{
              $t(t + '请等候客服介入处理')
            }}
          </div>
          <div class="item-paytime" v-if="orderStatus === 1">
            <!-- appealTime -->
            <!-- countdownAppealTime -->
            <span class="time">{{ countdownTime }}</span><span>&nbsp;&nbsp;
              {{
                $t(t + "卖家会在_min内付款，请注意查看账户资产", [
                  orderInfo.tradingTime,
                ])
              }}</span>
          </div>
          <div class="pay-success" v-if="orderStatus === 3">
            <div class="icon">
              <i class="el-icon-circle-check" style="font-size: 30px; color: #54e283"></i>
            </div>
            <div class="success-tip">{{ $t(t + "成功出售") }}</div>
            <el-button type="primary" style="margin-bottom: 40px" @click="$router.push('/wallet/assetsOverview')">{{ $t(t
              + "查看资产") }}</el-button>
          </div>
          <p v-if="orderStatus === 3" class="order-done">
            {{ $t(t + "订单已完成") }}
          </p>
          <ul v-if="orderStatus === 0 || orderStatus === 3">
            <li class="item-paytime">
              <span>{{ $t(t + "总价") }}</span>
              <span class="item-tdcolor">{{ orderInfo.amount }} CNY</span>
            </li>
          </ul>

          <div v-if="orderStatus === 4">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ orderInfo.tradingTime
                }}{{ $t(t + "min未完成订单，订单自动取消") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 5">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>

            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "商家已取消订单") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 6">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "您已取消订单") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 7">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span> {{ $t(t + "您的订单有违规操作，已被取消") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 8">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span> {{ $t(t + "商家超时，订单已取消") }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 9">
            <p class="item-pay item-pay-cancel">{{ $t(t + "订单已取消") }}</p>
            <ul>
              <li class="item-paytime">
                <span> {{ $t(t + "商家存在违规操作，订单已取消") }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-content-item" v-if="orderStatus !== 3">
          <p class="item-pay item-padding">{{ $t(t + "订单详情") }}</p>
          <ul>
            <li class="item-paytime">
              <span> {{ $t(t + "订单号") }}</span>
              <span class="item-tdsize">{{ orderInfo.number }}
                <i class="el-icon-copy-document ml5" @click="copyText(orderInfo.number)"></i>
              </span>
            </li>
            <li class="item-paytime">
              <span> {{ $t(t + "下单时间") }}</span>
              <span class="item-tdsize">{{
                $formatTime(orderInfo.createTime)
              }}</span>
            </li>
            <li class="item-paytime">
              <span> {{ $t(t + "付款方式") }}</span>
              <span class="item-tdsize">{{ formattePay }}</span>
            </li>
            <li class="item-paytime">
              <span>{{ $t(t + "单价") }}</span>
              <span class="item-tdsize">{{ orderInfo.advertPrice }}
                {{ orderInfo.legalTenderName }}</span>
            </li>
            <li class="item-paytime">
              <span>{{ $t(t + "数量") }}</span>
              <span class="item-tdsize">{{ orderInfo.quantity }} {{ orderInfo.coinName }}</span>
            </li>
            <li class="item-paytime">
              <span>{{ $t(t + "付款金额") }}</span>
              <span class="item-tdsize">{{ orderInfo.amount }} {{ orderInfo.legalTenderName }}</span>
            </li>
          </ul>
        </div>

        <div class="order-content-item">
          <!-- 1 买 0 卖 -->
          <p class="item-pay item-padding" v-if="orderInfo.type === 1">
            {{ $t(t + "卖家收款方式") }}
          </p>
          <p class="item-pay item-padding" v-if="orderInfo.type === 0">
            {{ $t(t + "您的收款方式") }}
          </p>
          <!-- 卖家收款方式 -->
          <div v-if="orderStatus !== 4 &&
            orderStatus !== 5 &&
            orderStatus !== 6 &&
            orderStatus !== 7 &&
            orderStatus !== 8 &&
            orderStatus !== 9
            " class="cancel-mask">
            <!-- orderStatus 0 -->
            <div class="flexs between mb10" v-if="orderInfo.type === 1">
              <span class="item-pay-text">
                {{ $t(t + "请使用本人")
                }}<span class="info-red">({{ userInfo.realName || orderInfo.userName }})</span>
                {{ $t(t + "银行卡账户向以下账户自行转账") }}</span>
              <span v-if="orderStatus === 1" class="item-pay-text info-red">
                {{ $t(t + "已成功付款，请勿重复支付") }}</span>
            </div>
            <ul>
              <li class="item-paytime">
                <span>{{ $t(t + "收款人") }}</span>
                <span class="item-tdsize">
                  {{ orderInfo.payTypeVo.name }}
                  <i class="el-icon-copy-document ml5" @click="copyText(orderInfo.payTypeVo.name)"></i>
                </span>
              </li>
              <li class="item-paytime">
                <span>{{ $t(t + payObj[orderInfo.payTypeVo.type]) }}</span>

                <span class="item-tdsize">{{
                  orderInfo.payTypeVo.type === 1
                  ? orderInfo.payTypeVo.num
                  : $t(t+"查看二维码")
                }}
                  <i v-if="orderInfo.payTypeVo.type === 1" class="el-icon-copy-document ml5"
                    @click="copyText(orderInfo.payTypeVo.num)"></i>
                  <i v-else class="el-icon-arrow-right ml5 pointer" @click="viewCode()"></i>
                </span>
              </li>
              <li class="item-paytime" v-if="orderInfo.payTypeVo.type === 1">
                <span>{{ $t(t + "开户行") }}</span>
                <span class="item-tdsize">{{
                  orderInfo.payTypeVo.bankName
                }}</span>
              </li>
            </ul>
          </div>

          <div v-if="orderStatus === 4 ||
              orderStatus === 5 ||
              orderStatus === 6 ||
              orderStatus === 7 ||
              orderStatus === 8 ||
              orderStatus === 9
              " class="info-red info-flex mask-content">
            {{ $t(t + "订单取消，不可查看支付方式") }}
          </div>
        </div>
        <div v-if="orderInfo.type === 1">
          <!-- 客服仲裁 -->
          <div v-if="orderStatus === 2">
            <div class="payment-tool">
              <div class="order-btn" style="margin-left: auto">
                <el-button class="login" @click="cancelOrderShow = true">{{
                  $t(t + "取消订单")
                }}</el-button>
                <el-button v-if="orderInfo.orderAppealDetailVO?.userId != userInfo.userId
                    " type="info" disabled>{{ $t(t + "与对方协商并等待仲裁结果") }}</el-button>
                <el-button type="primary" v-else @click="handleAppealType('bay')">{{ $t(t + "取消申诉") }}
                </el-button>
              </div>
            </div>
          </div>

          <!-- 买家 -->
          <div v-if="orderStatus === 10">
            <div class="payment-tool">
              <div class="problem-basemerchant">
              </div>
              <div class="order-btn">

                <el-button class="login mr10" @click="cancelOrderShow = true">{{ $t(t + "取消订单") }}</el-button>
                <el-button type="primary" @click="appealShow = true">{{ $t(t + "申诉") }}</el-button>
              </div>

            </div>
          </div>
          <div v-if="orderStatus === 11">
            <div class="payment-tool">
              <div class="problem-basemerchant">
              </div>
              <div class="order-btn">

                <el-button class="login mr10" @click="cancelOrderShow = true">{{ $t(t + "取消订单") }}</el-button>
                <el-button type="primary" @click="handleAppealType('bay')">{{ $t(t + "取消申诉") }}</el-button>
              </div>

            </div>
          </div>
          <div
            v-if="orderStatus !== 0 && orderStatus !== 1 && orderStatus !== 2 && orderStatus !== 10 && orderStatus !== 11">
            <div class="payment-tool">
              <div class="problem-basemerchant">
                <span @click="toZendesk" class="cancelAppeal">{{ $t(t + "对订单有疑问") }}？</span>
              </div>
              <div class="order-btn">
                <el-button class="login" @click="$emit('back')">{{
                  $t(t + "返回")
                }}</el-button>
                <el-button type="primary" class="register" v-if="orderInfo.orderAppealDetailVO?.userId != userInfo.userId &&
                    userInfo?.merchantStatus !== 2
                    " @click="$emit('back')">{{ $t(t + "再次下单") }}</el-button>
              </div>
            </div>
          </div>

          <!-- 上传付款凭证 -->
          <div v-if="orderStatus === 0 || orderStatus === 1">
            <!-- 订单生成页面不显示上传凭证,待支付和已支付都显示上传支付凭证 file => (voucher = file)-->
            <div :class="[!isBuy ? 'payment-tool' : 'single-tool']">
              <div class="upload-tool" v-if="!isBuy">
              </div>
              <div class="order-btn">
                <div v-if="orderStatus === 0">
                  <el-button class="login" @click="cancelOrderShow = true">{{ $t(t + "取消订单") }}</el-button>
                  <el-button v-if="isBuy" type="primary" class="register" @click="isBuy = false">{{ $t(t + "去付款")
                  }}</el-button>
                  <el-button v-else type="primary" class="register" @click="surePayShow = true">{{ $t(t + "我已付款")
                  }}</el-button>
                </div>
                <div v-if="orderStatus === 1">
                  <el-button type="primary" class=" mr10" @click="cancelOrderShow = true">{{ $t(t + "取消订单") }}</el-button>
                  <template v-if="orderInfo.orderAppealDetailVO != null &&
                    Object.keys(orderInfo.orderAppealDetailVO)?.length
                    ">
                    <el-button type="primary" @click="handleAppealType('wait')">{{
                      orderInfo.orderAppealDetailVO?.userId == userInfo.userId
                      ? $t(t + "申诉")
                      : $t(t + "等待客服申诉结果")
                    }}</el-button>
                  </template>
                  <template v-else>
                    <el-button type="info" v-if="isAppealTime > 1500 && !orderInfo.twoAppealStatus && appealTime" >{{ appealTime }}{{ $t(t + "申诉") }}
                    </el-button>
                    <el-button type="primary" v-else @click="appealShow = true">{{ $t(t + "申诉") }}</el-button>
                  </template>
                </div>
              </div>
            </div>

            <!-- <div
              class="error-tips"
              v-if="!isBuy && orderStatus === 0 && orderInfo.type === 1"
            >
              {{
                $t(
                  t +
                    "请上传付款凭证，支持图片格式JPG/JPEJ/PNG,图片大小不超过10MB"
                )
              }}
              <br />
              {{
                $t(
                  t +
                    "付款完成后并上传付款凭证后，请务必点击下方“我已付款成功”按钮"
                )
              }}
            </div> -->
          </div>
        </div>

        <div v-if="orderInfo.type === 0">
          <!-- 客服仲裁 -->
          <div v-if="orderStatus === 2">
            <div class="payment-tool">
              <div class="problem-base"></div>
              <div class="order-btn">
                <el-button  type="primary" @click="confirm()">{{ $t(t + "我已确认收款") }}</el-button>
                <el-button type="primary" v-if="orderInfo.appealUser === 0" @click="handleAppealType('bay')">{{
                  $t(t + "取消申诉")
                }}</el-button>
                <el-button v-else
                     type="info" disabled>{{ $t(t + "与买家协商并等待仲裁结果") }}
                </el-button>
              </div>
            </div>
          </div>
          <div v-if="orderStatus === 10">
            <div class="payment-tool">
              <div class="problem-basemerchant">
              </div>
              <div class="order-btn">

                <el-button type="primary" class=" mr10" @click="confirm()">{{ $t(t + "我已确认收款") }}</el-button>
                <el-button type="info" plain @click="appealShow = true">{{ $t(t + "申诉") }}</el-button>
              </div>

            </div>

          </div>
          <div v-if="orderStatus === 11">
            <div class="payment-tool" v-if="orderInfo.appealUser !== 0">
              <div class="problem-basemerchant">
              </div>
              <div class="order-btn">

                <el-button type="primary" @click="confirm()">{{ $t(t + "确认收款") }}</el-button>
                <el-button type="info" disabled>{{ $t(t + "与买家协商并等待仲裁结果") }}</el-button>
              </div>

            </div>
            <div class="payment-tool" v-else>
              <div class="problem-basemerchant">
              </div>
              <div class="order-btn">

                <el-button type="primary" @click="confirm()">{{ $t(t + "确认收款") }}</el-button>
                <el-button class="login" @click="handleAppealType('bay')">{{ $t(t + "取消申诉") }}</el-button>
              </div>

            </div>
          </div>

          <div
            v-if="orderStatus !== 0 && orderStatus !== 1 && orderStatus !== 2 && orderStatus !== 10 && orderStatus !== 11">
            <div class="payment-tool">
              <div class="problem-base">
                <span @click="toZendesk" class="cancelAppeal color-blue">{{ $t(t + "对订单有疑问") }}？</span>
              </div>
              <div class="order-btn">
                <el-button class="login" @click="$emit('back')">{{
                  $t(t + "返回")
                }}</el-button>
                <el-button type="primary" class="register" v-if="orderInfo.orderAppealDetailVO?.userId != userInfo.userId &&
                    userInfo?.merchantStatus !== 2
                    " @click="$emit('back')">{{$t(t+'再次下单')}}</el-button>
              </div>
            </div>
          </div>

          <!-- 待确认，确认收款 -->
          <div v-if="orderStatus === 1 || orderStatus === 0">
            <div class="payment-tool">
              <div class="problem-base">
                <template v-if="orderStatus === 1">
                  <!-- applyAppeal -->
                  <div class="cancelAppeal color-blue" @click="handleAppealType('sell')">
                    {{ $t(t + "申请客服仲裁") }}
                  </div>
                  <div class="cancelAppeal mt10 color-red">
                    {{
                      $t(
                        t +
                        "买家_min内未打款，其他时间法币有所延后，_min后未打款可申诉联系客服。",
                        [orderInfo.tradingTime, orderInfo.tradingTime]
                      )
                    }}
                  </div>
                </template>
              </div>
              <div class="order-btn">
                <el-button class="login" @click="$emit('back')">
                  {{ $t(t + "返回") }}</el-button>
                <el-button type="primary" :disabled="orderStatus === 0" @click="confirm()">{{ $t(t +
                  "我已确认收款") }}</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="tips mar-top">
          <p class="tip-header">{{ $t(t + "温馨提示") }}</p>
          <div class="tip-desc">
            *
            {{
              $t(
                t +
                "转账时请务必准确备注“付款备注号”否则导致资产损失需自行承担，另外除填写“付款备注号”信息切勿备注其他"
              )
            }}
            <br />
            &nbsp; {{ $t(t + "无关信息；") }}<br />
            *
            {{
              $t(t + "请务必使用本人银行卡进行转账，否则导致您的资金损失")
            }}
            ；<br />
            *
            {{
              $t(t + "一个账号一天内3次取消交易后，24h内将不能再进行交易")
            }}；<br />
            *
            {{
              $t(
                t +
                "未付款而点击“我已付款成功”3次以上，24h小时内将不能再进行交易"
              )
            }}；
          </div>
        </div>
      </div>
      <!-- IM聊天 -->
      <div class="chat-content">
        <div class="chat-panel">
          <div class="chat-header">
            <div class="user-container">
              <img class="avatar-large block pointer" @click="
                $router.push({
                  path: '/c2c/userCenter',
                  query: { isMerchant: false, userId: orderInfo.toUserId },
                })
                " :src="websoketInfo.advertisingAvatar" />
              <div class="user-info">
                <div class="user-name">{{ websoketInfo.userName  }} <span v-if="orderStatus !== 0">{{ '('+$t(t+'实名：')+orderInfo.merchantRealName+')' }}</span> </div>
                <div class="user-tools">
                  <span></span>
                  <svg-icon v-if="websoketInfo.isAuth" iconClass="name" className="icon-filter" />
                  <!-- <span class="report" @click="appealUserShow = true">举报</span> -->
                </div>
              </div>
            </div>
            <div class="order-count">
              <ul>
                <li>{{ $t(t + "30日成单数") }}</li>
                <li>{{ websoketInfo.finishOrder || 0 }} {{ $t(t + "单") }}</li>
              </ul>
              <ul>
                <li>{{ $t(t + "30日成单率") }}</li>
                <li>{{ websoketInfo.finishOrderRate || 0 }}</li>
              </ul>
            </div>
          </div>
          <div class="chat-body" ref="chatBody">
            <div class="text-centent">
              <el-button class="historyText" v-if="showHistory" type="text" @click="searchHistory"
                :loading="historyLoading">
                {{ $t(t + "查看历史数据") }}</el-button>
            </div>
            <div v-for="(item, index) in filterSoketTimeList" :key="index">
              <div>
                <div class="msg-tip" v-if="item.senderType == 0 || item.sendTime">
                  {{ parseTime(item.sendTime) }}
                </div>
                <!-- 聊天 orderInfo.type -->
                <div class="msg-content" v-if="item.senderType != 0" :class="{
                  'msg-content-reverse':
                    item.senderType == 1 ||
                    (orderInfo.type == 0 && item.senderType == 3) ||
                    (orderInfo.type == 1 && item.senderType == 2),
                }">
                  <el-image v-if="item.senderType == 1" class="avatar block ml10"
                    :src="require('@/assets/images/kefu.jpg')" />
                  <el-image :src="item.userAvatar" v-else class="avatar block pointer" fit="cover" @click="
                    $router.push({
                      path: '/c2c/userCenter',
                      query: {
                        isMerchant: false,
                        userId:
                          (orderInfo.type == 0 && item.senderType == 2) ||
                            (orderInfo.type == 1 && item.senderType == 3)
                            ? orderInfo.toUserId
                            : orderInfo.userId,
                      },
                    })
                    " />
                  <div :class="[
                    'msg-text ellipsis',
                    {
                      'ml15 service':
                        (orderInfo.type == 0 && item.senderType == 2) ||
                        (orderInfo.type == 1 && item.senderType == 3),
                    },
                    {
                      mr15:
                        (orderInfo.type == 0 && item.senderType == 3) ||
                        (orderInfo.type == 1 && item.senderType == 2),
                    },
                    { bgqyt: item.type == 2 },
                  ]">
                    <el-image v-if="item.type == 2" style="max-width: 350px; maxheight: 550px" :src="item.content"
                      :preview-src-list="[item.content]" fit="cover" />
                    {{ item.type != 2 ? item.content : "" }}
                  </div>
                </div>
                <!-- 提示信息 -->
                <div class="msg-tip" v-else-if="item.senderType == 0">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="chat-footer">
            <el-input class="chat-input" v-model="content" :placeholder="$t(t + '请输入内容')" @keyup.enter.native="sendMsg">
              <div slot="suffix" class="func-tools">
                <upload-img @success="(data) => handleSuccess(data, 'socketImg')">
                  <template #content>
                    <svg-icon iconClass="href" className="icon-filter" />
                  </template>
                </upload-img>
                <svg-icon iconClass="send" className="icon-filter" @click="sendMsg(content)" />
              </div>
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认付款 -->
    <common-modal :title="$t(t + '付款确认')" width="500px" :show="surePayShow" :noFooter="false" :showClose="true"
      :is-center="true" class="surePay" :cancel-text="$t(t + '我再想想')" :sure-text="$t(t + '确认付款')" :appendToBody="true"
      @cancel="surePayShow = false" @save="surePaySave">
      <template #dia_content>
        <div class="cancel-pay">
          <div class="tip">
            <svg-icon iconClass="find" className="icon-filter" />
            <div>{{ $t(t + "请确认您已向卖家支付订单相应金额；") }}</div>
          </div>
          <div class="tip">
            <svg-icon iconClass="find" className="icon-filter" />
            <div>
              {{ $t(t + "恶意点击或未支付订单相应金额，将可能冻结账户") }}；
            </div>
          </div>
        </div>
      </template>
    </common-modal>
    <!-- 取消订单 -->
    <common-modal :title="$t(t + '取消订单')" width="650px" :show="cancelOrderShow" :noFooter="false" :showClose="true"
      :FooterIsCenter="true" :cancel-text="$t(t + '不取消订单')" :sure-text="$t(t + '确认取消订单')" :appendToBody="true"
      @cancel="cancel" @save="cancelOrderSave">
      <template #dia_content>
        <div class="cancel-order">
          <div class="cancel-tip content-bg">
            <p class="fontWeight600">{{ $t(t + "温馨提示") }}</p>
            <div class="tip-content">
              {{ $t(t + "如果您已经付款给卖家，请勿取消订单") }}。<br />
              {{
                $t(
                  t +
                  "如果卖家未在15分钟内回复您的消息，您可以无责任取消订单，完成率并不受影响。您一天可以无责取消5次。"
                )
              }}<br />
              {{
                $t(
                  t + "若您在一天内有责取消订单超过3次，您当天不可再进行下单。"
                )
              }}
            </div>
          </div>
          <div class="cancel-tip">
            <p class="fontWeight600">{{ $t(t + "请您选择取消订单的原因") }}</p>
            <div class="tip-content">
              {{ $t(t + "我们对您的反馈保密，并致力于下次更好地为您服务") }}
            </div>
          </div>
          <ul>
            <li class="flexs slectImg" @click="reasonIndex = reasonIndex == index ? undefined : index"
              v-for="(item, index) in reasonList" :key="index">
              <el-image :src="index == reasonIndex
                  ? require('@/assets/buy-coins/active-on.png')
                  : require('@/assets/buy-coins/active.png')
                "></el-image>
              <div class="text fontWeight500">
                {{ item.active }}{{ $t(t + item.text) }}
              </div>
            </li>
          </ul>
        </div>
      </template>
    </common-modal>
    <!-- 暂时不需要举报功能 -->
    <common-modal :title="$t(t + '为什么要举报该用户？')" width="500px" :show="appealUserShow" :noFooter="false" :showClose="true"
      :FooterIsCenter="true" :cancel-text="$t(t + '取消')" :sure-text="$t(t + '上传凭证')" :appendToBody="true" @cancel="cancel"
      @save="appealUserSave">
      <template #dia_content>
        <div class="cancel-order">
          <ul>
            <li @click="handleUser(index)" v-for="(item, index) in userList" :key="index">
              <span :class="[
                'circle',
                activeUserArr.includes(index) ? 'circle-active' : '',
              ]"></span>
              <span class="text">{{ $t(t + item.text) }}</span>
            </li>
          </ul>
        </div>
      </template>
    </common-modal>
    <!-- 上传凭证 -->
    <common-modal :title="$t(t + '上传凭证')" width="500px" :show="appealUserShow" :noFooter="false" :showClose="true"
      :FooterIsCenter="true" :cancel-text="$t(t + '取消')" :sure-text="$t(t + '上传凭证')" :appendToBody="true" @cancel="cancel"
      @save="appealUserSave">
      <template #dia_content>
        <div class="cancel-order">
          <ul>
            <li @click="handleUser(index)" v-for="(item, index) in userList" :key="index">
              <span :class="[
                'circle',
                activeUserArr.includes(index) ? 'circle-active' : '',
              ]"></span>
              <span class="text">{{ $t(t + item.text) }}</span>
            </li>
          </ul>

          <div class="upload-tool">
            <upload-img @success="(data) => handleSuccess(data, 'user')">
              <template #content>
                <div class="upload-btn flexs">
                  <el-image class="width24 height24" :src="require('@/assets/buy-coins/upload.png')"></el-image>
                  <span class="upload-title">{{ $t(t + "上传凭证") }}</span>
                </div>
              </template>
            </upload-img>
          </div>
        </div>
      </template>
    </common-modal>

    <!-- 提交申诉 -->
    <common-modal :title="$t(t + '提交申诉')" width="600px" :show="appealShow" :noFooter="false" :showClose="true"
      :FooterIsCenter="true" :cancel-text="$t(t + '取消')" :sure-text="$t(t + '提交申诉')" :appendToBody="true"
      @cancel="() => (appealShow = false)" @save="appealSave">
      <template #dia_content>
        <div class="cancel-order">
          <div class="cancel-tip content-bg">
            <div class="tip-content">
              {{
                $t(
                  t +
                  "提交的内容对双方和客服可见，避免包含任何私人或敏感信息。"
                )
              }}<br />
              {{
                $t(
                  t +
                  "恶意申诉属于扰乱平台正常运营秩序的行为，情节严重严重将冻结账户"
                )
              }}。<br />
              {{
                $t(
                  t +
                  "客服介入需要几个小时如果没有提交证明，客服将通知双方上传更多证明，请耐心等待。"
                )
              }}
            </div>
          </div>

          <div class="form-con">
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-position="top">
              <el-form-item prop="name" :label="$t(t + '联系姓名')">
                <el-input v-model="formData.name" autocomplete="off" :placeholder="$t(t + '请输入您的姓名')"></el-input>
              </el-form-item>
              <el-form-item prop="phone" :label="$t(t + '联系电话')" class="formPhone">
                <el-input v-model="formData.phone" class="input-with-select" :placeholder="$t(t + '请输入联系电话')">
                  <el-select v-model="formData.phoneArea" slot="prefix" :placeholder="$t(t + '请选择')" size="small">
                    <el-option v-for="(item, index) in phoneAreaList" :key="index" :label="item.value"
                      :value="item.value">
                      <span style="float: left">{{ item.label }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item prop="cause" :label="$t(t + '申诉理由')">
                <el-input v-model="formData.cause" type="textarea" :rows="4" :placeholder="$t(t + '请输入您的申诉理由')"
                  maxlength="500" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :label="$t(t + '上传申诉凭证')" prop="evidence">
                <div class="upload-tool">
                  <ImageUpload :isShowTip="false" ref="ImageUpload" v-model="formData.evidence" :limit="1"
                    listType="picture-card">
                    <template #content>
                      <div class="upload-btn height80" v-if="!formData.evidence">
                        <el-image class="width24 height24" :src="require('@/assets/buy-coins/upload.png')"></el-image>
                        <span class="upload-title">{{
                          $t(t + "上传凭证")
                        }}</span>
                      </div>
                    </template>
                  </ImageUpload>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </common-modal>

    <!-- 申诉 -->
    <el-dialog :title="$t(t + bayAndSellAppealTit)" :visible.sync="configAppealShow" width="400px"
      :close-on-press-escape="false" :close-on-click-modal="false" class="appealDialog" :show-close="false">
      <div class="text-centent fontSize16">
        {{ $t(t + bayAndSellAppealTxt) }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="configAppealShow = false" style="width: 100%; height: 45px" v-if="bayAndSellType != 'wait'">{{
          $t(t + "取消") }}</el-button>
        <el-button type="primary" @click="cancelApply" style="width: 100%; height: 45px">{{ $t(t + "确定") }}</el-button>
      </span>
    </el-dialog>

    <!-- 查看二维码 -->
    <div class="codeDialog" v-if="codeShow">
      <div class="codeDialogBody">
        <div class="payName">{{ orderInfo.payTypeVo.name }}</div>
        <div class="payInfo">
          <span>{{ $t(t + payObj[orderInfo.payTypeVo.type]) }}:</span>
          <span>{{ orderInfo.payTypeVo.num }}</span>
        </div>
        <div class="showCode">
          <img :src="orderInfo.payTypeVo.qrcode" :alt="$t(t+ '支付二维码')" />
        </div>

        <div class="donwload">
          <a :href="orderInfo.payTypeVo.qrcode" :download="$t(t+ '支付二维码')">
            <i class="el-icon-download pointer"></i></a>
        </div>
      </div>
      <div class="closeCode">
        <i class="el-icon-circle-close pointer" @click="codeShow = false"></i>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="codeShow" width="500px" :close-on-press-escape="false" :close-on-click-modal="false"
			class="codeDialog" :show-close="false">
			<div class="">
				
			</div>
		</el-dialog> -->

    <!-- 验证 -->
    <validate-info :is-show.sync="validateShow" v-if="validateShow" :isVerify="isVerify" :params="params" :nameTips="orderInfo.confirmDesc"
      @next="startApprove"></validate-info>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { deepClone } from "@/libs/utils.js";
import { authItemStong } from "@/api/common";
import { wsMixin } from "./ws.js";
import { transferPay } from "@/libs/utils";
import { countryList } from "@/api/user";
import UploadImg from "@/components/uploadImg.vue";
import ImageUpload from "@/components/ImageUpload/index.vue";
import { orderDetail } from "@/api/otc.js";
import validateInfo from "@/views/c2c/tradeTrust/components/validateInfo.vue";
// import QRCode from 'qrcode';
import QRCode from "qrcodejs2";

import {
  appealAdd,
  getHistoryChat,
  payOrder,
  cancelOrder,
  appealCancel,
  sendMsg,
  finishOrder,
} from "@/api/otc.js";

export default {
  name: "order",
  components: {
    UploadImg,
    ImageUpload,
    validateInfo,
  },
  mixins: [wsMixin],
  data() {
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      // let reg = this.phoneRegex ? new RegExp(this.phoneRegex) : /^\d{5,15}$/;
      let reg = /^\d{5,15}$/;
      if (!value) {
        callback(new Error(this.$t("loginRegister.请输入手机号码(提示)")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("loginRegister.请输入正确的手机格式")));
        }
      }
    };
    // // 手机号验证
    // const validPhone = (rule, value, callback) => {
    //   let reg = /^[0-9]{11}$/;
    //   if (!value) {
    //     callback(new Error(this.$t(this.t + "请输入手机号码")));
    //   } 
    //   else {
    //     if (reg.test(value)) {
    //       callback();
    //     } 
    //     // else {
    //     //   callback(new Error(this.$t(this.t + "请输入正确的手机格式")));
    //     // }
    //   }
    // };
    return {
      //二维码查看
      codeShow: false,
      codeURL: undefined,
      // 买卖家申诉
      bayAndSellType: "",
      bayAndSellAppealTit: "",
      bayAndSellAppealTxt: "",
      configAppealShow: false,
      cancalAppeal: false,
      // 申诉
      appealShow: false,
      authItemType: "",
      // 是否前往付款页面sendMs
      isBuy: false,
      // 验证
      validateShow: false,
      validateParam: {},
      params: {},
      // 是否显示历史数据
      showHistory: true,
      pageNum: 1,
      pageSize: 10,
      websoketInfo: "",
      historyLoading: false,
      // 发送内容
      content: "",
      soketInfoType: 1,
      // 获取商家付款信息
      merchantPayInfo: null,
      // 订单状态
      // 状态 0：待支付 1：待放币 2：申诉中 3 : 已完成 4：用户超时取消 5：商家取消 6： 用户取消 7：用户违规取消  8：商家超时取消 9：商户违规取消
      // status: null,
      // 申诉
      formData: {
        name: "",
        phone: "",
        phoneArea: "+86",
        cause: "",
        evidence: "",
      },
      payObj: {
        1: "银行账户",
        2: "支付宝账号",
        3: "微信账号",
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("c2c.请输入您的姓名"),
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            validator: validPhone,
            trigger: "change",
          },
        ],
        cause: [
          {
            required: true,
            message: this.$t("c2c.请输入申诉原因"),
            trigger: "change",
          },
        ],
        // evidence: [
        //   {
        //     required: true,
        //     message: this.$t(this.t + "请上传申诉凭证"),
        //     trigger: "change",
        //   },
        // ],
      },
      questionIndexArr: [],
      activeUserArr: [],
      // 举报用户
      appealUserShow: false,
      // 取消订单
      cancelOrderShow: false,
      // 确认付款
      surePayShow: false,

      // 订单倒计时
      countdownTime: "",
      // 申诉按钮倒计时
      appealTime: "",
      // 申诉倒计时
      countdownAppealTime: "",
      timer2: null,
      timer: null,
      timer1: null,
      update_time: null,
      input: undefined,
      reasonIndex: undefined,
      reasonList: [
        {
          text: "我不想交易了",
        },
        {
          text: "我不满足广告交易条款的要求",
        },
        {
          text: "卖家要额外收取费用",
        },
        {
          text: "卖家收款方式有问题，无法成功打款",
        },
        {
          text: "卖家无法放行，卖家已退款给我",
        },
        {
          text: "其他",
        },
      ],
      questionList: [
        {
          text: "尝试联系对方，看能否解决这个问题",
        },
        {
          text: "如无法解决，则发起申诉",
        },
        {
          text: "其他",
        },
      ],
      userList: [
        {
          text: "买方付款姓名和平台实名不符",
        },
        {
          text: "对方建议我在其他平台交易",
        },
        {
          text: "其他",
        },
      ],
      infoList: [],
      lastDisplayedTime: null,
      voucher: undefined, // 凭证图片
      isAppealTime: undefined, // 申诉时长是否为0
      phoneAreaList: [],
      // 国际缩写
      t: "c2c.",
      isVerify: false, //是否多重验证
    };
  },
  created() {
    this.isBuy = this.orderStatus === 0 ? true : false;
    // 获取历史聊天记录
    this.getHistoryChat();
    this.getCountryList();
  },
  watch: {
    orderInfo: {
      handler: function (newVal, oldVal) {
        newVal.type = Number(newVal.type);
        console.log(newVal.type, newVal);
        if (newVal.status === 0) {
          this.appealTime = "";
          // 未付款，开始付款倒计时
          // 订单倒计时 订单创建时间，订单交易时常
          if (newVal.type == 1) {
            this.countdown(
              this.orderInfo.createTime,
              // this.orderInfo.permitAppealTime,
              this.orderInfo.tradingTime,
              "timer",
              "countdownTime",
              "hour"
            );
          } else {
            this.countdown(
              this.orderInfo.createTime,
              this.orderInfo.tradingTime,
              "timer",
              "countdownTime",
              "hour"
            );
          }
        } else if (newVal.status === 1) {
          // 付款成功，开始放币倒计时，并清空未付款倒计时
          // 订单付款时间， 放币确认时常
          // 清除定时器
          if (this.timer || this.timer1) {
            clearTimeout(this.timer);
            this.timer = null;
            this.countdownTime = "";

            clearTimeout(this.timer1);
            this.timer1 = null;
            this.appealTime = "";
          }
          this.countdown(
            this.orderInfo.timeOfPayment,
            this.orderInfo.confirmTime,
            "timer",
            "countdownTime",
            "hour"
          );
          this.countdown(
            this.orderInfo.timeOfPayment,
            this.orderInfo.permitAppealTime,
            "timer1",
            "appealTime",
            "hour"
          );
        } else if (newVal.status === 2) {
          if (this.timer2 || this.timer1) {
            clearTimeout(this.timer1);
            this.timer1 = null;
            this.appealTime = "";

            clearTimeout(this.timer2);
            this.timer2 = null;
            this.countdownAppealTime = "";
          }
          // 申诉开始，申诉倒计时
          this.countdown(
            this.orderInfo.appealTime,
            this.orderInfo.permitAppealTime,
            "timer1",
            "appealTime",
            "hour"
          );
          this.countdown(
            this.orderInfo.appealTime,
            this.orderInfo.maxAppealTime,
            "timer2",
            "countdownAppealTime",
            "hour"
          );
        } else {
          // 其他情况，取消所有定时器
          this.clearTimerAndField();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    // 获取订单信息
    ...mapState({
      orderInfo: (state) => state.order.orderInfo,
      orderStatus: (state) => state.order.orderStatus,
    }),
    // 获取用户信息
    ...mapGetters(["userInfo"]),
    // 格式化支付方式
    formattePay() {
      return transferPay(this.orderInfo.payTypeVo.type);
    },

    // 过滤时间
    filterSoketTimeList() {
      let result = [];
      let prevTime = null;

      for (let item of this.infoList) {
        // 判断前后时间是否大于等于3分钟
        const currentTime = new Date(this.parseTime(item.sendTime));
        if (!prevTime || currentTime - prevTime >= 3 * 60 * 1000) {
          result.push(item);
          prevTime = currentTime;
        }
      }
      let cloneResult = deepClone(result);

      for (let filter of this.infoList) {
        // 除了系统提示都清除时间
        if (filter.senderType != 0) {
          delete filter.sendTime;
        }
        // 将间隔3分钟的时间进行展示
        for (let filterRes of cloneResult) {
          if (filter.id === filterRes.id) {
            filter.sendTime = filterRes.sendTime;
          }
        }
      }
      return this.infoList;
    },
  },
  methods: {
    
    // 提交订单信息
    ...mapActions([
      "handleOrderInfo",
      "handleOrderStatus",
    ]),
    // 打开客服聊天
    toZendesk(){
      // zE.activate()
      zE('messenger', 'open');
    },
    // 申诉提示
    handleAppealType(type) {
      this.bayAndSellType = type;
      this.bayAndSellAppealTit =
        type == "bay"
          ? "取消申诉"
          : type == "sell"
            ? "发起申诉"
            : type == "wait"
              ? "温馨提示"
              : "取消申诉并确认收款";
      this.bayAndSellAppealTxt =
        type == "bay"
          ? "取消申诉后不得再次申诉，您确定要取消申诉吗？"
          : type == "sell"
            ? "您确定要发起申诉吗？"
            : type == "wait"
              ? "您已经申诉过了，请等待客服介入判定结果"
              : "您确定要取消申诉并确认收款吗？";
      this.configAppealShow = true;
    },
    // 图片上传成功后处理函数
    handleSuccess(file, type) {
      if (type == "socketImg") {
        this.soketInfoType = 2;
        let content = file || file.data.url;
        this.sendMsg(content);
        return;
      }
    },
    // websocket连接
    websockOpen(e) {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      // 订单状态实时获取
      self.websockSend("orderStatus");
      // 聊天记录实时获取
      self.websockSend("orderChat");
      // console.log('OTC链接成功！！！！！！！！！！！！！！！！！！！！');
    },
    // 发送消息
    sendMsg(content) {
      console.log('this.content',this.content,'content',content);
      if (!this.content && !content) return
      let params = {
        type: this.voucher ? 2 : this.soketInfoType, // 1 文本 2 图片
        content: this.content || content,
        toUserId: this.orderInfo.advertUserId,
        orderId: this.orderInfo.id,
      };

      sendMsg(params).then((res) => {
        this.content = "";
        this.voucher = undefined;
        this.soketInfoType = 1;
        this.infoList.push(res.data);
        this.websockSend("orderChat");
        // this.$message("发送成功！");
      });
    },
    // 获取历史聊天记录
    getHistoryChat() {
      getHistoryChat({
        orderId: this.orderInfo.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        this.websoketInfo = res.data;
        let item = deepClone(res.data.content);
        this.infoList = item.reverse();

        if (
          this.infoList &&
          this.infoList.length >= this.websoketInfo.totalElements
        ) {
          this.showHistory = false;
        }
      });
    },
    // 查看历史数据
    searchHistory() {
      this.pageNum = 1;
      this.pageSize += 10;
      this.historyLoading = true;
      setTimeout((_) => {
        this.historyLoading = false;
        this.getHistoryChat();
      }, 500);
    },
    //confirm
    confirm(){
      authItemStong({
        data: 25,
      }).then((auth) => {
        this.params = {
          email: auth.data.email,
          phone: auth.data.phone,
          authToken: auth.data.authToken,
          bizType: 25,
          tradePasswordStatus: auth.data.tradePasswordStatus,
        };
        this.validateShow = true;
        this.configAppealShow = false;
      });
  
    },
    // 验证
    cancelApply(type) {
      // this.bayAndSellType = type
      // 卖家提交申诉
      if (this.bayAndSellType == "wait") {
        this.configAppealShow = false;
        return;
      }
      // 卖家提交申诉
      if (this.bayAndSellType == "sell") {
        this.appealShow = true
        // appealAdd({
        //   orderId: this.orderInfo.id,
        // }).then((res) => {
        //   this.configAppealShow = false;
        //   this.$message(this.$t(this.t + "发起申诉成功") + `！`);
        // });
        return;
      }
      // 买家提交申诉
      if (this.bayAndSellType == "bay") {
        appealCancel({
          orderId: this.orderInfo.id,
        }).then((res) => {
          this.$message({
            message:this.$t(this.t + "取消申诉成功") + `！`,
            type: 'success'
          });
          this.cancalAppeal = true;
          this.configAppealShow = false;
        });
        return;
      }
      // 卖家发起申诉
      authItemStong({
        data: 25,
      }).then((auth) => {
        this.params = {
          email: auth.data.email,
          phone: auth.data.phone,
          authToken: auth.data.authToken,
          bizType: 25,
          tradePasswordStatus: auth.data.tradePasswordStatus,
        };
        this.validateShow = true;
        this.configAppealShow = false;
      });
    },
    // 开始审核,验证通过以后才能提交申诉
    startApprove(result) {
      this.validateShow = false;
      const api =
        this.bayAndSellType == "sellCancel" ? appealCancel : finishOrder;
      api({
        orderId: this.orderInfo.id,
        ...result,
      }).then((res) => {
        this.$message({
            message:this.$t(this.t + "收款成功") + `！`,
            type: 'success'
          });
      });
    },
    // 修改订单状态
    editOrderStatus(modalVisble = null) {
      // 存在弹窗，隐藏弹窗
      if (modalVisble) {
        this[modalVisble] = false;
      }
    },
    //查看二维码
    viewCode(fields) {
      console.log(fields);
      this.codeShow = true;
      // this.getQRCode(fields);
    },
    //创建二维码对象
    createQrCode(url) {
      new QRCode(this.$refs.qrCodeRef, {
        text: url,
        width: this.codeWidth,
        height: this.codeWidth,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: 3,
      });
    },

    // 	// 生成二维码
    // 	getQRCode(fields) {
    //     let opts = {
    //       errorCorrectionLevel: 'H', //容错级别
    //       type: 'image/png', //生成的二维码类型
    //       quality: 0.3, //二维码质量
    //       margin: 12, //二维码留白边距
    //       width: 300, //宽
    //       height: 300, //高
    //       text: fields, //二维码内容
    //       color: {
    //         dark: '#333333', //前景色
    //         light: '#fff', //背景色
    //       },
    //     };
    //     this.QRCodeMsg = fields; //生成的二维码为URL地址js
    //     let msg = document.getElementById('QRCode_header');
    //     // 将获取到的数据（val）画到msg（canvas）上
    //     QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
    //     });
    //   },
    // 复制文本
    copyText(fields) {
      let that = this;
      this.$copyText(fields).then(
        function (e) {
          that.$message.success(that.$t(that.t + "复制成功"));
        },
        function (e) {
          that.$message.success(that.$t(that.t + "复制失败"));
        }
      );
    },
    /**
     * 订单完成或者取消 需要停止倒计时
     * @param {*} val 当前订单创建时间
     * @param {*} timeInterval 订单交易期限
     * @param {*} timerName data中定义的延时器变量
     * @param {*} field 接收倒计时定义的变量
     */
    countdown(val, timeInterval, timerName, field, type) {
      const nowTime = new Date();
      const createdTime = new Date(val);
      const TIME = 1000 * 60 * timeInterval + 2000;
      // 目标时间和当前时间的毫秒数
      let differ = nowTime - createdTime;
      // 目标时间超过当前时间，或目标时间与当前时间的差超过30分钟则返回0

      if (differ >= TIME) {
        return 0;
      }

      // 剩余时间的秒数
      differ = TIME - differ;
      if (field == "appealTime") {
        this.isAppealTime = differ;
      }
      // 计算小时
      let hour = Math.floor(differ / (60 * 60 * 1000));
      hour = hour < 10 ? "0" + hour : hour;
      // 计算分钟数
      let minute = Math.floor((differ - hour * (60 * 60 * 1000)) / (60 * 1000));
      minute = minute < 10 ? "0" + minute : minute;
      // 计算秒数
      let second = Math.floor(
        (differ - (minute * (60 * 1000) + hour * (60 * 60 * 1000))) / 1000
      );
      second = second < 10 ? "0" + second : second;
      // 返回结果格式 29:59
      if (hour > 0 || minute > 0 || second > 0) {
        this[timerName] = setTimeout(() => {
          this.countdown(val, timeInterval, timerName, field, type);
        }, 1000);
      } else {
        if (this[timerName]) {
          clearTimeout(this[timerName]);
          this[timerName] = null;
        }
      }
      this[field] =
        type === "hour"
          ? hour + ":" + minute + ":" + second
          : minute + ":" + second;
    },
    // 取消
    cancel() {
      this.surePayShow = false;
      this.cancelOrderShow = false;
      this.appealUserShow = false;
      this.activeUserArr = [];
    },
    // 获取订单详情
    orderDetail() {
      orderDetail({
        id: this.orderInfo.id,
      }).then((res) => {
        this.handleOrderInfo(res.data);
        this.handleOrderStatus(res.data.status);
      });
    },
    // 确认付款保存
    surePaySave() {
      console.log('1833');
      payOrder({
        orderId: this.orderInfo.id,
      }).then((res) => {
        this.editOrderStatus("surePayShow");
        if (this.voucher) {
          console.log('1839');
          this.content = this.voucher;
          this.sendMsg();
        }
        // 清除定时器
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
          this.countdownTime = "";
        }
        // 获取订单详情，更新数据 1 表示计算放币时长 2表示计算申诉时常
        // this.orderDetail();
      });
    },
    // 取消订单保存
    cancelOrderSave() {
      if (this.activeIndexArr && this.activeIndexArr.length === 0) {
        this.$message.warning(this.$t(this.t + "请选择取消订单原因"));
        return;
      }
      const cancelRemark = this.reasonList.find(
        (item, index) => index === this.reasonIndex
      ).text;
      let params = {
        orderId: this.orderInfo.id,
        cancelRemark: cancelRemark,
      };
      cancelOrder(params).then((res) => {
        this.editOrderStatus("cancelOrderShow");
      });
    },
    // 提交申诉
    appealSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            orderId: this.orderInfo.id,
            ...this.formData,
          };
          appealAdd(params).then((res) => {
            // 开始申诉倒计时
            this.editOrderStatus("appealShow");
            this.soketInfoType = 2;
            this.content = this.formData.evidence;
            this.sendMsg();
            this.configAppealShow = false;
          });
        }
      });
    },
    // 举报用户原因
    handleUser(index) {
      if (this.activeUserArr.includes(index)) {
        this.activeUserArr.splice(index, 1);
      } else {
        this.activeUserArr.push(index);
      }
      this.$nextTick(() => { });
    },
    // 举报用户保存
    appealUserSave() {
      if (this.activeUserArr && this.activeUserArr.length === 0) {
        this.$message.warning(this.$t(this.t + "请选择举报原因"));
        return;
      }
      this.appealUserShow = false;
    },
    // 清除定时器和字段
    clearTimerAndField() {
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer);
        this.timer = null;
        this.countdownTime = "";
      }
      if (this.timer1) {
        clearTimeout(this.timer1);
        this.timer1 = null;
        this.appealTime = "";
      }
      if (this.timer2) {
        clearTimeout(this.timer2);
        this.timer2 = null;
        this.countdownAppealTime = "";
      }
    },
    //获取国家列表
    getCountryList() {
      countryList().then((res) => {
        const { data } = res.data;
        const list = [];
        data.map((item) => {
          list.push({
            label: item.name,
            value: `+${item.code}`,
          });
        });
        this.phoneAreaList = list;
      });
    },
  },

  beforeDestroy() {
    this.clearTimerAndField();
    // 关闭websocket
    this.websock.close();
  },
};
</script>
<style lang="scss" scoped>
@use "./index.scss";

::v-deep .surePay {
  .btn-box {
    justify-content: center;
    align-items: center;
  }

  .cancel {
    margin-right: 30px;
  }
}

::v-deep .slectImg {
  cursor: pointer;
  margin-bottom: 10px;

  .el-image {
    width: 20px;
    height: 20px;
  }
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 150px;
  height: 80px;
}

.fukuan {
  width: 150px;
  height: 60px;
}

::v-deep .right50 .is-fixed {
  right: 50px;
}

::v-deep .formPhone {
  .input-with-select {
    >.el-input__inner {
      padding-left: 110px;
    }
  }

  .el-input__prefix {
    max-width: 100px;

    .el-input__suffix {
      top: -2px;
    }

    .el-input__inner {
      padding: 0 15px;
      border: transparent;
    }
  }
}

::v-deep .appealDialog {
  overflow: hidden;
  color: black;

  .el-dialog {
    margin-top: 30vh !important;
    border-radius: 12px;


    &__header {
      text-align: center;
      font-weight: bold;
      padding-top: 25px;
    }

    &__title {
      font-size: 18px;
    }

    &__body {
      font-size: 18px;
    }
  }

  .dialog-footer {
    justify-content: center;

    .el-button {
      width: 160px;
      height: 50px;
    }
  }
}

::v-deep .codeDialog {
  // width: 100%;
  // height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.4);
  // opacity: 0.4;

  z-index: 2001 !important;

  .codeDialogBody {
    width: 500px;
    border-radius: 12px;
    background: linear-gradient(180deg, #ffffff 0%, #f1fffa 100%);
    position: relative;
    margin: 0 auto;
    margin-top: 10%;
    overflow: hidden;
    transform: none;

    // z-index: 2002 !important;
    .payName {
      font-size: 22px;
      font-weight: 500;
      color: #333333;
      line-height: 30px;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .payInfo {
      font-size: 14px;
      font-weight: 500;
      color: #96a2b2;
      line-height: 20px;
      text-align: center;
      margin-bottom: 50px;
    }

    .showCode {
      text-align: center;
      width: 318px;
      height: 318px;
      border-radius: 10px;
      margin: 0 auto 50px auto;
      border: 2px solid #90ff00;
      margin-bottom: 50px;

      img {
        margin: 10px;
        width: 300px;
        height: 300px;
      }
    }
  }

  // overflow: hidden;
}

.closeCode {
  // position: absolute;
  // bottom: -41px;
  // position: absolute;
  // // top: 515px;
  // left: 250px;
  text-align: center;
  margin-top: 15px;

  .el-icon-circle-close {
    font-size: 32px;
    color: #fff;
  }
}

.donwload {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(179, 179, 177);
  text-align: center;

  .el-icon-download {
    font-size: 22px;
    color: #fff;
    margin-top: 3px;
  }
}
</style>
