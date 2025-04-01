<template>
  <div class="flex" style="width: 100%; padding-bottom: 10px; height: 360px">
    <!-- <div style="flex:1; padding-top: 16px; height: 300px; overflow-y: auto; "  class="containerInfo"> -->
    <div style="flex: 1; padding-top: 16px">
      <div class="flex jb" style="margin-bottom: 20px">
        <div class="flex" style="
            color: #737373;
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: 500;
            padding-left: 20px;
          ">
          <div @click="setActiveTab(0)" style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              height: 18px;
            ">
            <div :style="{ color: activeTab == 0 ? '#FFFFFF' : '#737373' }">
              {{$t('lang_2208')}}({{ this.positionList ? this.positionList.length : "" }})
            </div>
            <div v-if="activeTab == 0" style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="@/assets/images/icon/lineB.png" alt="" />
            </div>
            <div v-else style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="" alt="" />
            </div>
          </div>
          <div @click="setActiveTab(1)" style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              height: 18px;
            ">
            <div :style="{ color: activeTab == 1 ? '#FFFFFF' : '#737373' }">
              当前委托({{ entrustList ? entrustList.length : "" }})
            </div>
            <div v-if="activeTab == 1" style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="@/assets/images/icon/lineB.png" alt="" />
            </div>
            <div v-else style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="" alt="" />
            </div>
          </div>
          <div @click="setActiveTab(2)" style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              height: 18px;
            ">
            <div :style="{ color: activeTab == 2 ? '#FFFFFF' : '#737373' }">
              历史委托
            </div>
            <div v-if="activeTab == 2" style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="@/assets/images/icon/lineB.png" alt="" />
            </div>
            <div v-else style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="" alt="" />
            </div>
          </div>
          <div @click="setActiveTab(3)" style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              height: 18px;
            ">
            <div :style="{ color: activeTab == 3 ? '#FFFFFF' : '#737373' }">
              历史仓位
            </div>
            <div v-if="activeTab == 3" style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="@/assets/images/icon/lineB.png" alt="" />
            </div>
            <div v-else style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="" alt="" />
            </div>
          </div>
          <div @click="setActiveTab(4)" style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-right: 30px;
              height: 18px;
            ">
            <div :style="{ color: activeTab == 4 ? '#FFFFFF' : '#737373' }">
              资金流水
            </div>
            <div v-if="activeTab == 4" style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="@/assets/images/icon/lineB.png" alt="" />
            </div>
            <div v-else style="width: 19px; height: 2px; margin-top: 5px">
              <img style="width: 100%; height: 100%" src="" alt="" />
            </div>
          </div>
        </div>
        <div class="flex ic" v-if="activeTab == 0">
          <div @click="selectCoin" class="flex ic" style="margin-right: 30px">
            <div  style="width: 14px; height: 14px; margin-right: 5px">
              <img   v-if="activeTabInfo" width="100%" height="100%" src="@/assets/login-img/icon_reached.png" alt="" />
              <img   v-else width="100%" height="100%" src="@/assets/login-img/icon_not.png" alt="" />
            </div>
            <div style="color: #737373; font-size: 12px">{{$t('只看当前币种')}}</div>
          </div>
          <div v-if="activeTabInfo" @click="allCloseDepot(0)" style="
              cursor: pointer;
              width: 90px;
              height: 24px;
              color: #90ff00;
              background-color: #252525;
              font-size: 14px;
              margin-right: 10px;
              border-radius: 4px;
            " class="flex jc ic">
            {{$t('只平当前')}}
          </div>
          <div v-else @click="allCloseDepot(1)" style="
              cursor: pointer;
              width: 90px;
              height: 24px;
              color: #90ff00;
              background-color: #252525;
              font-size: 14px;
              margin-right: 10px;
              border-radius: 4px;
            " class="flex jc ic">
            {{$t('一键全平')}}
          </div>
        </div>

        <!--
            <div v-if="activeTab == 1" @click="allCancellations"
              style="cursor: pointer; width: 90px; height: 24px;color: #90FF00; background-color: #252525; font-size: 14px;font-family: PingFang SC; margin-right: 10px; border-radius: 4px;"
              class="flex jc ic">一键撤单
            </div> -->

        <div class="flex ic" v-if="activeTab == 1">
          <div class="flex ic" style="margin-right: 30px">
            <div @click="activeFun" style="width: 14px; height: 14px; margin-right: 5px">
              <img v-if="activeTabInfono" width="100%" height="100%" src="@/assets/login-img/icon_reached.png" alt="" />
              <img v-else width="100%" height="100%" src="@/assets/login-img/icon_not.png" alt="" />
            </div>
            <div style="color: #737373; font-size: 12px; font-family: PingFang SC">
              {{$t('只看当前币种')}}
            </div>
          </div>
          <div v-if="activeTabInfono" @click="allCancellations(0)" style="
              cursor: pointer;
              width: 90px;
              height: 24px;
              color: #90ff00;
              background-color: #252525;
              font-size: 14px;
              font-family: PingFang SC;
              margin-right: 10px;
              border-radius: 4px;
            " class="flex jc ic">
            {{$t('只撤当前')}}
          </div>
          <div v-else @click="allCancellations(1)" style="
              cursor: pointer;
              width: 90px;
              height: 24px;
              color: #90ff00;
              background-color: #252525;
              font-size: 14px;
              font-family: PingFang SC;
              margin-right: 10px;
              border-radius: 4px;
            " class="flex jc ic">
            {{$t('一键撤单')}}
          </div>
        </div>
      </div>
      <!-- 持仓列表   fullscreenLoading  -->
      <template v-if="activeTab == 0">
        <transition name="fade">
          <div style="height: 300px; overflow-y: auto; overflow-x: auto  " class="containerInfo">
            <div v-for="(item, index) in positionList" :key="index" v-loads="fullscreenLoading"
              style="border-bottom: 1px solid #252525;  padding-bottom: 5px;">
              <div class="flex" style="
                  padding-left: 20px;
                  width: 100%;
                  margin-top: 13px;
               
                 
                ">
                <div style="flex: 1">
                  <div class="flex">
                    <div style="
                        height: 20px;
                        line-height: 20px;
                        margin-right: 5px;
                        color: #ffffff;
                      ">
                      {{ item.childCoinName }}{{ item.motherCoinName }}
                      <span :style="{
                        color: item.direction == 0 ? '#0fbb57' : '#ED3C2F',
                      }">
                        {{ item.direction == 0 ? "多" : "空" }}
                      </span>
                    </div>
                    <div style="
                        color: #737373;
                        padding-right: 5px;
                        padding-left: 5px;
                        margin-right: 5px;
                        height: 20px;
                        line-height: 18px;
                        border-radius: 4px;
                        border: 0.2px solid rgba(115, 115, 115, 0.5);
                        font-size: 12px;
                      ">
                      {{ item.depotType == 0 ? "逐仓" : "全仓"
                      }}{{ item.depotMode == 0 ? "合仓" : "分仓" }}
                    </div>

                    <div @click="setLever(item)" class="flex jc ic" style="
                        cursor: pointer;
                        color: #737373;
                        left: 5px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 4px;
                        padding-left: 5px;
                        padding-right: 5px;
                        margin-right: 5px;
                        border: 0.2px solid rgba(115, 115, 115, 0.5);
                        font-size: 12px;
                      ">
                      <div style="
                          font-weight: 600;
                          font-size: 12px;
                          color: #737373;
                        ">
                        {{ item.multiple }}X
                      </div>
                      <div class="flex jc ic" style="margin-left: 3px; width: 12px; height: 12px">
                        <img style="width: 100%; height: 100%" src="@/assets/images/icon/icon-notes.png" alt="" />
                      </div>
                    </div>
                  </div>

                  <div class="flex">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <!-- <div style="height: 17px; line-height: 17px; margin-top: 16px;">持仓/可平({{ item.denominatedType == 2 ? item.childCoinName : item.motherCoinName}})</div> -->
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 16px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        持仓/可平({{
                          typeBUInfo == item.motherCoinName
                            ? item.motherCoinName
                            : item.childCoinName
                        }})
                      </div>
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        开仓均价(USDT）
                      </div>


                      <div @click="$refs.effectiveRiskRate.openDialog()" style="
                          cursor: pointer;
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        保证金比率
                      </div>

                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 16px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{
                          typeBUInfo == "USDT"
                            ? $thousandth(item.motherCoinAmount)
                            : $thousandth(item.childCoinAmount)
                        }}/{{
                          typeBUInfo == "USDT"
                            ? $thousandth(item.unfinishedHoldAmountMotherCoin)
                            : $thousandth(item.unfinishedHoldAmount)
                        }}
                      </div>
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ $thousandth(item.openPriceAvg) }}
                      </div>

                      <div @click="$refs.effectiveRiskRate.openDialog()" style="
                          cursor: pointer;
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ item.riskRate }}
                      </div>


                    </div>
                  </div>
                </div>
                <div style="flex: 1; position: relative">
                  <!-- // position: absolute; bottom: 0px;  -->
                  <div class="flex" style="position: absolute; bottom: 0px">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <div style="
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        未实现盈亏
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        市场价
                      </div>



                      <div v-if="item.stopLossPrice / 1 > 0 || item.takeProfitPrice / 1 > 0" @click="setTargetProfit(item,index)"
                        class="flex ic" style=" cursor: pointer;">

                        <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                          止盈/止损
                        </div>
                        <div style="margin-left:5px; border-left: 4.5px solid transparent;
                         width: 0;
                         height: 0;
                         border-right: 4.5px solid transparent;
                         border-top: 6.5px solid #a8a8a8;
                         cursor: pointer;
                         transition: transform 0.5s;
                         margin-top: 6px;
                        " class="triangle" :class="{ rotate:  isVisible[index] }">
                        </div>
                      </div>


                      <div v-else style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        止盈/止损
                      </div>



                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 600;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <!-- <div style=" color:#0CBB57; " >{{ item.profitLoss }}</div> -->
                      <div :style="{
                        color: item.profitLoss < 0 ? '#ED3C2F' : '#0CBB57',
                      }" style="
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        <!-- {{item.profitLoss}}</div> (profitLoss + earnestMoney)/earnestMoney  -->
                      {{item.profitLoss < 0 ?'-' :'+'}}{{ truncateDecimal(item.profitLoss) || "--" }}({{item.profitLoss < 0 ?'-' :'+'}}
                      {{ truncateDecimal((Number(item.profitLoss) + Number(item.earnestMoney)) / Number(item.earnestMoney)) }}%)
                      <!-- {{Math.round((item.profitLoss + item.earnestMoney) )/item.earnestMoney}}%)    -->
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ $thousandth(item.marketPrice) || "--" }}
                      </div>



                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{
                          item.takeProfitPrice ?  $thousandth(item.takeProfitPrice)  : "0.00"
                        }}/{{ $thousandth(item.stopLossPrice) || "0.00" }}
                      </div>


                    </div>
                  </div>
                </div>

                <div style="flex: 1; position: relative">
                  <!-- // position: absolute; bottom: 0px;  -->
                  <div class="flex" style="position: absolute; bottom: 0px">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <div style="
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        保证金
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 500px;
                          font-size: 12px;
                          color: #737373;
                        ">
                        预估强平价
                      </div>
                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <div style="" class="flex ic">
                        <div style="
                            font-weight: 600;
                            font-size: 12px;
                            color: #ffffff;
                          ">
                          {{ Math.round((item.earnestMoney + item.alterEarnestMoney) * 100) / 100 }}
                        </div>
                        <div v-if="item.depotType == 0" @click="setBond(item)" class="flex jc ic" style="
                            cursor: pointer;
                            margin-left: 3px;
                            width: 12px;
                            height: 12px;
                          ">
                          <img style="width: 100%; height: 100%" src="@/assets/images/icon/icon-notes.png" alt="" />
                        </div>
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{
                          item.estimateForcedCloseDepotPrice < 0 ? "--" : $thousandth(item.estimateForcedCloseDepotPrice)
                        }}(USDT） </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex" style="flex: 1; position: relative">
                    <!-- // position: absolute; bottom: 0px;  -->
                    <div style="
                      width: 1px;
                      height: 48px;
                      background-color: #252525;
                      position: absolute;
                      bottom: 9px;
                      margin-left: -15px;
                    "></div>
                    <div style="position: absolute; bottom: 0px">
                      <div class="flex">
                        <div @click="clickSurplus(item)" class="flex jc ic action-btn" style="
                          color: #7d7d7d;
                          white-space: nowrap;
                          cursor: pointer;
                          border-radius: 4px;
                          height: 30px;
                          padding-left: 36px;
                          padding-right: 36px;
                          margin-right: 18px;
                          font-family: PingFang SC;
                          font-size: 11px;
                          font-weight: 500;
                        ">
                          止盈/止损
                        </div>
                        <div @click="allForSale(item)" class="flex jc ic action-btn" style="
                          color: #7d7d7d;
                          white-space: nowrap;
                          cursor: pointer;
                          border-radius: 4px;
                          height: 30px;
                          padding-left: 50px;
                          padding-right: 50px;
                          font-family: PingFang SC;
                          font-size: 11px;
                          font-weight: 500;
                        ">
                          平仓
                        </div>
                      </div>
                      <div class="flex" style="margin-top: 10px">
                        <div class="flex jc ic action-btn" @click="marketPriceSell(item)" style="
                          color: #7d7d7d;
                          white-space: nowrap;
                          cursor: pointer;
                          border-radius: 4px;
                          height: 30px;
                          padding-left: 39px;
                          padding-right: 39px;
                          margin-right: 18px;
                          font-family: PingFang SC;
                          font-size: 11px;
                          font-weight: 500;
                        ">
                          市价全平
                        </div>
                        <div class="flex jc ic action-btn" @click="OneClickBackhand(item)" style="
                          color: #7d7d7d;
                          white-space: nowrap;
                          cursor: pointer;
                          border-radius: 4px;
                          height: 30px;
                          padding-left: 38px;
                          padding-right: 39px;
                          font-family: PingFang SC;
                          font-size: 11px;
                          font-weight: 500;
                        ">
                          一键反手
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                 v-if="isVisible[index] && contractType && (item.stopLossPrice / 1 > 0 || item.takeProfitPrice / 1 > 0 )"
                  style="width: 100%;  padding-left: 16px; padding-right: 26px;margin-top: 14px;">
                  <div class="flex"
                    style="background-color: #252525;border-radius: 4px;padding-left: 12px; padding-bottom: 12px; padding-top: 12px;;">
                    <div class="flex " style="flex-direction: column;  justify-content: center;margin-right: 15px;">
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; ">数量({{
                        typeBUInfo == item.motherCoinName
                          ? item.motherCoinName
                          : item.childCoinName
                      }})</div>
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; margin-top: 6px;">时间</div>
                    </div>
                    <div class="flex "
                      style="flex-direction: column;  justify-content: center;margin-right: 15px; margin-right: 70px;">
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; ">{{
                          typeBUInfo == "USDT"
                            ? $thousandth(item.unfinishedHoldAmountMotherCoin)
                            : $thousandth(item.unfinishedHoldAmount)
                        }}</div>
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; margin-top: 6px;">{{
                        $formatTimestamp(item.createTime) }}</div>
                    </div>

                    <div class="flex " style="flex-direction: column;  justify-content: center;margin-right: 15px;">
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; ">委托价(止盈)</div>
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; margin-top: 6px;">委托价(止损)
                      </div>
                    </div>
                    <div class="flex "
                      style="flex-direction: column;  justify-content: center;margin-right: 15px; margin-right: 70px;">
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; "> 限价 </div>
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; margin-top: 6px;">限价</div>
                    </div>

                    <div class="flex " style="flex-direction: column;  justify-content: center;margin-right: 15px;">
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; ">触发价(止盈)</div>
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC;  margin-top: 6px;">触发价(止损)
                      </div>
                    </div>

                    <div class="flex "
                      style="flex-direction: column;  justify-content: center;margin-right: 15px; margin-right: 70px;">
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; ">{{ item.takeProfitPrice ?
                      $thousandth(item.takeProfitPrice)   : "0.00" }}</div>
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; margin-top: 6px;"> {{
                      $thousandth(item.stopLossPrice)  || "0.00" }}</div>
                    </div>

                    <div class="flex " style="flex-direction: column;  justify-content: center;margin-right: 15px;">
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; ">预估盈利</div>
                      <div style="font-size: 12px; color: #737373; font-family: PingFang SC; margin-top: 6px;">预估亏损
                      </div>
                    </div>
                    <div class="flex "
                      style="flex-direction: column;  justify-content: center;margin-right: 15px; margin-right: 70px;">
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; ">{{ estimatedPr ? estimatedPr : '--' }} </div>
                      <div style="font-size: 12px; color: #F0F0F0; font-family: PingFang SC; margin-top: 6px;">{{ estimatedPrsta ? estimatedPrsta : '--' }}</div>
                    </div>

                    <div class="flex " style=" align-items: center; margin-right: 15px; margin-right: 70px;">
                      <div @click="clickSurplus(item)"
                        style="font-size: 12px; color: #90FF00; font-family: PingFang SC; cursor: pointer; ">修改</div>
                      <div
                        style="width: 1px; height: 12px; background-color: #363636; margin-left: 8px; margin-right: 8px;">
                      </div>
                      <div @click="onCancelOrder(item)"
                        style="font-size: 12px; color: #90FF00; font-family: PingFang SC; cursor: pointer; ">撤单</div>
                    </div>
                  </div>


                </div>
                <!-- <Table :columns="columns1" :data="data1" :show-header="false"></Table> -->



              </div>
              <div v-if="this.positionList.length <= 0" class="flex jc ic" style="
                flex-direction: column;
                width: 100%;
                margin-top: 20px;
                height: 80%;
              ">
                <div style="width: 48px; height: 48px">
                  <img style="width: 100%; height: 100%" src="@/assets/images/icon/icon_Null_status.png" />
                </div>
                <div style="color: #737373">{{$t('数据为空')}}</div>
              </div>
            </div>
        </transition>
      </template>

      <!-- 当前委托列表 -->
      <template v-if="activeTab == 1">
        <transition name="fade">
          <div v-loads="fullscreenLoading" style="height: 300px; overflow-y: auto; overflow-x: auto"
            class="containerInfo">
            <div v-for="(item, index) in entrustList" :key="index" style=" 
                 ">
              <div class="flex" style="
                  padding-left: 20px;
                  width: 100%;
                  padding-top: 15px;
                  border-bottom: 1px solid #252525;
                  padding-bottom: 15px;
                 
                ">
                <div style="flex: 1">
                  <div class="flex">
                    <div style="
                        height: 20px;
                        line-height: 20px;
                        margin-right: 5px;
                        color: #ffffff;
                      ">
                      {{ item.childCoinName }}{{ item.motherCoinName }}
                      <span :style="{
                        color: item.direction == 0 ? '#0fbb57' : '#ED3C2F',
                      }">
                        {{ item.direction == 0 ? "多" : "空" }}
                      </span>
                    </div>
                    <div style="
                        color: #737373;
                        padding-right: 5px;
                        padding-left: 5px;
                        margin-right: 5px;
                        height: 20px;
                        line-height: 18px;
                        border-radius: 4px;
                        border: 0.2px solid rgba(115, 115, 115, 0.5);
                        font-size: 12px;
                      ">
                      {{ item.depotType == 0 ? "逐仓" : "全仓"
                      }}{{ item.depotMode == 0 ? "合仓" : "分仓" }}
                    </div>

                    <div class="flex jc ic" style="
                        cursor: pointer;
                        color: #737373;
                        left: 5px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 4px;
                        padding-left: 5px;
                        padding-right: 5px;
                        margin-right: 5px;
                        border: 0.2px solid rgba(115, 115, 115, 0.5);
                        font-size: 12px;
                      ">
                      <div style="color: #737373;">{{ item.multiple }}X</div>
                      <!-- <div class="flex jc ic" style="margin-left: 3px; width: 12px; height: 12px;"> <img
           style="width: 100%; height: 100%;" src="@/assets/images/icon/icon-notes.png" alt="">
        </div> -->
                    </div>
                  </div>
                  <div class="flex">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <!-- <div style="height: 17px; line-height: 17px; margin-top: 16px;">委托量({{ item.denominatedUnit == 2 ? item.childCoinName : item.motherCoinName}}）</div> -->
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 16px;
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        委托量({{
                          typeBUInfo == item.motherCoinName
                            ? item.motherCoinName
                            : item.childCoinName
                        }})
                      </div>
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        已成交(USDT）
                      </div>
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        止盈/止损
                      </div>
                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 16px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        <!--   motherCoinAmount childCoinAmount -->
                        {{
                          typeBUInfo == "USDT"
                            ? $thousandth(item.motherCoinAmount)
                            : $thousandth(item.childCoinAmount)
                        }}
                      </div>
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ item.completedAmount }}
                      </div>
<!-- 止盈止损  委托 -->
                      <div style="
                          height: 17px;
                          line-height: 17px;
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{
                          item.takeProfitPrice ?  $thousandth(item.takeProfitPrice)  : "0.00"
                        }}/{{ $thousandth(item.stopLossPrice) || "0.00" }}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="flex: 1; position: relative">
                  <!-- // position: absolute; bottom: 0px;  -->
                  <div class="flex" style="position: absolute; bottom: 27px">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <div style="
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        委托价
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        成交均价
                      </div>
                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <div style="
                          color: #0cbb57;
                          font-weight: 600;
                          font-size: 12px;
                        ">
                        {{ $thousandth(item.entrustPrice) }}
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ item.tradePriceAvg }}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="flex: 1; position: relative">
                  <!-- // position: absolute; bottom: 0px;  -->
                  <div class="flex" style="position: absolute; bottom: 27px">
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #737373;
                      ">
                      <div style="
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        保证金
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 500;
                          color: #737373;
                          font-size: 12px;
                        ">
                        时间
                      </div>
                    </div>
                    <div style="
                        font-family: PingFang SC;
                        font-size: 12px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-left: 20px;
                      ">
                      <div style="
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ item.earnestMoney }}
                      </div>
                      <div style="
                          margin-top: 10px;
                          font-weight: 600;
                          font-size: 12px;
                          color: #ffffff;
                        ">
                        {{ $formatTimestamp(item.createTime) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div style="flex: 1; position: relative">
                  <!-- // position: absolute; bottom: 0px;  -->
                  <div style="position: absolute; bottom: 20px">
                    <div style="position: absolute; bottom: 0px">
                      <div style="
                          width: 1px;
                          height: 50px;
                          background-color: #252525;
                          position: absolute;
                          bottom: -10px;
                          margin-left: -15px;
                        "></div>

                      <div class="flex">
                        <div @click="setEntrust(item)" class="flex jc ic action-btn" style="
                            color: #737373;
                            white-space: nowrap;
                            cursor: pointer;
                            padding-left: 50px;
                            padding-right: 50px;
                            border-radius: 4px;
                            height: 30px;
                            margin-right: 18px;
                            font-family: PingFang SC;
                            font-size: 11px;
                            font-weight: 500;
                          ">
                          修改
                        </div>
                        <div class="flex jc ic action-btn" @click="cancelOrder(item)" style="
                            color: #737373;
                            white-space: nowrap;
                            cursor: pointer;
                            padding-left: 50px;
                            padding-right: 50px;
                            border-radius: 4px;
                            height: 30px;
                            margin-right: 18px;
                            font-family: PingFang SC;
                            font-size: 11px;
                            font-weight: 500;
                          ">
                          撤单
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            

              <!-- <Table :columns="columns1" :data="data1" :show-header="false"></Table> -->
            </div>
            <div v-if="entrustList.length <= 0" class="flex jc ic" style="
                flex-direction: column;
                width: 100%;
                margin-top: 20px;
                height: 80%;
              ">
              <div style="width: 48px; height: 48px">
                <img style="width: 100%; height: 100%" src="@/assets/images/icon/icon_Null_status.png" />
              </div>
              <div style="color: #737373">数据为空</div>
            </div>

           




          </div>
        </transition>
      </template>

      <!-- 历史委托 -->
      <template v-if="activeTab == 2">
        <transition name="fade">
          <HistoricalList />
        </transition>
      </template>
      <!-- 历史仓位 -->
      <template v-if="activeTab == 3">
        <transition name="fade">
          <HistoricalPosition />
        </transition>
      </template>
      <!-- 资金流水 -->
      <template v-if="activeTab == 4">
        <transition name="fade">
          <CapitalFlow />
        </transition>
      </template>

    </div>

    <simple-dialog-component14 ref="component14" />
    <simple-dialog-component3 ref="component3" @onSetprice="onSetpriceFn" />
    <simple-dialog-component5 ref="component5" />
    <simple-dialog-component7 ref="component7" />
    <simple-dialog-component8 ref="component8" />
    <simple-dialog-component11 ref="component11" />
    <Effective-leverage ref="component12" />
    <EffectiveRiskRate ref="effectiveRiskRate" />
    <EffectiveOneAllClose @allCloseDepotFun="allCloseDepotFun" ref="effectiveOneAllClose" />

    <Estimated-strong-parity ref="component13" />
  </div>
</template>
<script>
import EffectiveRiskRate from "./EffectiveRiskRate.vue";
import SimpleDialogComponent14 from "./SimpleDialogComponent14.vue";
import SimpleDialogComponent3 from "./SimpleDialogComponent3.vue";
import SimpleDialogComponent5 from "./SimpleDialogComponent5.vue";
import SimpleDialogComponent7 from "./SimpleDialogComponent7.vue";
import SimpleDialogComponent8 from "./SimpleDialogComponent8.vue";
import SimpleDialogComponent11 from "./SimpleDialogComponent11.vue";
import EffectiveLeverage from "./EffectiveLeverage.vue";
import EstimatedStrongParity from "./EstimatedStrongParity.vue";
import EffectiveOneAllClose from "./EffectiveOneAllClose.vue";
import HistoricalList from "./com/HistoricalList.vue";
import HistoricalPosition from "./com/HistoricalPosition.vue";
import CapitalFlow from "./com/CapitalFlow.vue";


import { mapGetters, mapMutations } from "vuex";

import {
  GetAllCancellations,
  HandleAllDepot,
  UpdateContract,
  HandleDepot,
  setLeverFn,
  onCancelOrderFn
} from "@/api/hy";
import { positionList } from "@/api/contractExchange";

export default {
  components: {
    CapitalFlow,
    HistoricalPosition,
    HistoricalList,
    EstimatedStrongParity,
    EffectiveOneAllClose,
    EffectiveLeverage,
    SimpleDialogComponent14,
    SimpleDialogComponent3,
    SimpleDialogComponent5,
    SimpleDialogComponent7,
    SimpleDialogComponent8,
    SimpleDialogComponent11,
    EffectiveRiskRate,
  },
  data() {
    return {
      targetProfit: false,
      isVisible: [] ,// 控制每个项目的显示状态
      activeTab: 0,
      isRotated: true,
      positionListCacheTotal:[],
      activeTabInfo: false,
      activeTabInfono: false,
      activeTabInfoqw: false,
      contractType:false,
      positionListsh: [
        {
          childCoinName: "btc",
          motherCoinName: "usdt",
          depotType: 0,
          depotMode: 1,
          takeProfitPrice: 111,
          stopLossPrice: 111,
          multiple: 125,
          motherCoinAmount: 111,
          unfinishedHoldAmountMotherCoin: "111",
          profitLoss: 2,
          unfinishedHoldAmount: 222,
        },
      ],
      positionList: [], // 委托列表
      entrustList: [], // 委托列表
      socket: null,
      socketInfo: null,
      connectionStatus: "",
      param: {},
      paramInfo: {},
      socketb: "",
      websock: "",
      websockTime: "",
      isWebsock: null,

      paramList: {},
      marketParamList: {},
      websockTimeMarket: null,
      websockMaeket: null,
      connectionStatusMaeket: "",

      currentContractId: null, // 当前的 contractId

      currentActive: null, // 当前的活动状态
      loadingState: false,
      fullscreenLoading: false,
      estimatedPr:null,
        estimatedPrsta:null
    };
  },
  mounted() {
    this.initEntrustListSocket(); // 委托0
    this.initmarketListSocket(); // 持仓2
    this.isVisible = this.positionList.map(() => false);
    this.activeTabInfoqw = false;
  },

  beforeDestroy() {
    if (this.websock) {
      this.websock.close(); // 关闭 WebSocket 连接
    }
    this.stopHeartbeatEntrust(); // 停止心跳机制

    if (this.websockMaeket) {
      this.websockMaeket.close(); // 关闭 WebSocket 连接
    }
    this.stopHeartbeatMarket(); // 停止心跳机制
  },
  watch: {
    getContractId(){
      if (!this.activeTabInfoqw) {
        this.activeTabInfoqw = true
        console.log('selectCoin-----------00000----',888888888888888)
       return
      }else{
        console.log('selectCoin-----------00000----',9999999)
        this.selectCoin(true)
      }
     
    
    },
    positionList:{
      handler(val,old){
        if(!this.activeTabInfo){
          this.positionListCacheTotal=val
        }
      },
      immediate:true,
      deep:true
    }
  },
  methods: {
    ...mapMutations(["setPositionList", "setSelectedCurrency"]),

    onSetpriceFn(active){
      let ach =  this.estimatedProfit(active)
   let bch = this.estimatedProfitInfo(active)

   this.estimatedPr = this.$formatNumberWithCommas(ach)

   this.estimatedPrsta = this.$formatNumberWithCommas(bch)
    },
    truncateDecimal(value) {
      // 将值转换为字符串
      const strValue = value.toString();
      // 使用 split 方法分割整数部分和小数部分
      const [integerPart, decimalPart] = strValue.split('.');
      // 截取小数部分的前两位
      const truncatedDecimal = decimalPart ? decimalPart.slice(0, 2) : '00'; // 如果没有小数部分，返回 '00'
      // 返回组合后的结果
      return `${integerPart}.${truncatedDecimal}`;
    },

//  止盈价格
estimatedProfit(active) {
  
if (active.direction == 0) {
 if (this.typeBUInfo == 'USDT') {
  if (active.takeProfitPrice && active.openPriceAvg && active.unfinishedHoldAmountMotherCoin) {
   return (active.takeProfitPrice / 1 - active.openPriceAvg / 1) * active.unfinishedHoldAmountMotherCoin / active.openPriceAvg
  }
 } else {
  if (active.takeProfitPrice / 1 && active.openPriceAvg / 1 && active.unfinishedHoldAmount) {
   return (active.takeProfitPrice / 1 - active.openPriceAvg / 1) * active.unfinishedHoldAmount
  }
 }

} else {

 if (this.typeBUInfo == 'USDT') {
  if (active.takeProfitPrice && active.openPriceAvg && active.unfinishedHoldAmountMotherCoin) {
   return (active.openPriceAvg / 1 - active.takeProfitPrice / 1) * active.unfinishedHoldAmountMotherCoin / active.openPriceAvg
  }
 } else {
  if (active.takeProfitPrice / 1 && active.openPriceAvg / 1 && active.unfinishedHoldAmount) {
   return (active.openPriceAvg / 1 - active.takeProfitPrice / 1) * active.unfinishedHoldAmount
  }
 }
}

},

// 止损价格  
// eslint-disable-next-line vue/return-in-computed-property
estimatedProfitInfo(active) {
   if (active.direction == 0) {
    if (this.typeBUInfo == 'USDT') {
     if (active.stopLossPrice && active.openPriceAvg && active.unfinishedHoldAmountMotherCoin) {
      return (active.stopLossPrice / 1 - active.openPriceAvg / 1) * active.unfinishedHoldAmountMotherCoin / active.openPriceAvg
     }
    } else {
     if (active.stopLossPrice / 1 && active.openPriceAvg / 1 && active.unfinishedHoldAmount) {
      return (active.stopLossPrice / 1 - active.openPriceAvg / 1) * active.unfinishedHoldAmount
     }
    }
   } else {
    if (this.typeBUInfo == 'USDT') {
     if (active.stopLossPrice && active.openPriceAvg && active.unfinishedHoldAmountMotherCoin) {
      return (active.openPriceAvg / 1 - active.stopLossPrice / 1) * active.unfinishedHoldAmountMotherCoin / active.openPriceAvg
     }
    } else {
     if (active.stopLossPrice / 1 && active.openPriceAvg / 1 && active.unfinishedHoldAmount) {
      return (active.openPriceAvg / 1 - active.stopLossPrice / 1) * active.unfinishedHoldAmount
     }
    }

   }

  },


    async onCancelOrder(item) { //  撤单

      let parameter = { id:item.id };
      Promise.try(async () => {

        return await onCancelOrderFn(JSON.stringify(parameter));
      }).then(() => {

        this.$customMessage(0, "撤单成功");
      });
      this.isDialogVisible = false;
    },

    component12() {
      // this.$refs.component12.openDialog()
      this.$refs.component13.openDialog();
    },

    setTargetProfit(item,index) {
      console.log(item,"estimatedProfitInfo111");
      this.contractType = true

   let ach =  this.estimatedProfit(item)
   let bch = this.estimatedProfitInfo(item)

   this.estimatedPr = this.$formatNumberWithCommas(ach)

   this.estimatedPrsta = this.$formatNumberWithCommas(bch)


      console.log(item);
      this.isRotated = !this.isRotated
      // this.targetProfit = !this.targetProfit
      this.$set(this.isVisible, index, !this.isVisible[index]);
    },

    // 选择币种的方法
    selectCoin() {
      this.activeTabInfo=!this.activeTabInfo
      this.filterContractID()

      if(this.activeTabInfo){

        this.activeTabInfo = true;
     // 更新当前的 contractId
        this.currentContractId = this.getContractId;

        // 发送取消订阅的消息（如果需要）
        this.cancelSubscription();

        // 重新订阅新的 contractId
        this.subscribeToMarket();
        //接口立即更新
      }else{
        this.currentContractId = null;
        this.activeTabInfo = false;
           // 发送取消订阅的消息（如果需要）
        this.cancelSubscription();

        // 重新订阅新的 contractId
        this.subscribeToMarket();
      }
     
    },
    async filterContractID(){
    try {
      if(this.activeTabInfo){
        this.positionList=this.positionListCacheTotal?.filter?.(item=>String(item?.contractId)===this.getContractId)

      }else{
        this.positionList=this.positionListCacheTotal
      }
      
    } catch (error) {
      
    }
        },
    // 取消订阅
    cancelSubscription() {
      const cancelParamList = {
        token: this.tokenInfo,
        methodCode: "3", // 假设 "3" 是取消订阅的 methodCode
        body: {
          contractId: this.currentContractId, // 当前的 contractId
        },
      };
      this.websockMaeket.send(JSON.stringify(cancelParamList)); // 发送取消订阅的消息
      console.log(`取消订阅 contractId: ${this.currentContractId}`);
    },
    // 订阅市场数据
    subscribeToMarket() {
      this.marketParamList = {
        token: this.tokenInfo,
        methodCode: "2", // 假设 "2" 是订阅的 methodCode
        body: {
          page: "1",
          rows: "100",
          contractId: this.currentContractId, // 使用当前的 contractId
        },
      };
      this.websockMaeket.send(JSON.stringify(this.marketParamList)); // 发送新的订阅请求
      console.log(`订阅 contractId: ${this.currentContractId}`);
    },
    // 持仓列表
    initmarketListSocket() {
      // 创建 WebSocket 连接
      this.websockMaeket = new WebSocket(
        `${process.env.VUE_APP_BASE_WS_CQ}/contract`
      );

      // 连接打开时的回调
      this.websockMaeket.addEventListener("open", () => {
        console.log("WebSocket 连接已建立");
        this.connectionStatusMaeket = "已连接";

        // 初始订阅
        this.subscribeToMarket();

        // 启动心跳机制
        this.startHeartbeatMarket();
      });

      // 监听消息事件
      this.websockMaeket.addEventListener("message", (event) => {
        // 处理接收到的消息
        let dataInfo = JSON.parse(event.data);
        this.positionList = [];
        this.positionList = dataInfo.data;
        this.fullscreenLoading = false;
        this.setPositionList(dataInfo.data);
      });

      // 监听错误事件
      this.websockMaeket.addEventListener("error", (error) => {
        console.error("WebSocket 错误:", error);
      });

      // 监听连接关闭事件
      this.websockMaeket.addEventListener("close", () => {
        console.log("持仓WebSocket已关闭", "addEventListener");
        this.connectionStatusMaeket = "已断开";

        setTimeout(() => {
          this.initmarketListSocket(); // 重新调用连接方法
        }, 5000); // 5秒后重连
      });
    },
    // 启动心跳机制
    startHeartbeatMarket() {
      this.websockTimeMarket = setInterval(() => {
        this.websockMaeket.send("ping"); // 发送心跳消息
        console.log("发送心跳消息");
      }, 3000); // 每3秒发送一次心跳
    },

    // 停止心跳机制
    stopHeartbeatMarket() {
      if (this.websockTimeMarket) {
        clearInterval(this.websockTimeMarket);
        this.websockTimeMarket = null;
      }
    },

    activeFun() {
      this.fullscreenLoading = true;
      this.activeTabInfono = !this.activeTabInfono;

      if (this.activeTabInfono) {
        this.currentActive = this.getContractId;
        // 取消当前的委托订阅
        this.cancelEntrustSubscription();
        // 重新订阅新的委托数据
        this.subscribeToEntrust();
      } else {
        this.currentActive = null;
        // 取消当前的委托订阅
        this.cancelEntrustSubscription();
        // 重新订阅新的委托数据
        this.subscribeToEntrust();
      }
    },
    // 取消委托订阅
    cancelEntrustSubscription() {
      const cancelParamList = {
        token: this.getToken,
        methodCode: "1", // 假设 "1" 是取消委托的 methodCode
        body: {
          // 这里可以添加需要取消的委托信息
        },
      };
      this.websock.send(JSON.stringify(cancelParamList)); // 发送取消订阅的消息
      console.log(`取消委托订阅`);
    },

    // 订阅委托数据
    subscribeToEntrust() {
      this.paramList = {
        token: this.getToken,
        methodCode: "0", // 假设 "0" 是订阅的 methodCode
        body: {
          page: "1",
          rows: "100",
          contractId: this.getContractId
        },
      };
      this.websock.send(JSON.stringify(this.paramList)); // 发送新的订阅请求
      console.log(`订阅委托数据`);
    },

    // 委托列表
    initEntrustListSocket() {
      // 创建 WebSocket 连接
      this.websock = new WebSocket(
        `${process.env.VUE_APP_BASE_WS_CQ}/contract`
      );

      // 连接打开时的回调
      this.websock.addEventListener("open", () => {
        console.log("WebSocket 连接已建立");
        this.connectionStatus = "已连接";

        // 初始订阅
        this.subscribeToEntrust();

        // 启动心跳机制
        this.startHeartbeatEntrust();
      });

      // 监听消息事件
      this.websock.addEventListener("message", (event) => {
        // 处理接收到的消息
        let dataInfo = JSON.parse(event.data);
        this.fullscreenLoading = false;
        this.entrustList = [];
        this.entrustList = dataInfo.data;
        // 在这里处理 data
      });

      // 监听错误事件
      this.websock.addEventListener("error", (error) => {
        console.error("WebSocket 错误:", error);
      });

      // 监听连接关闭事件
      this.websock.addEventListener("close", () => {
        console.log("WebSocket 连接已关闭");
        this.connectionStatus = "已断开";
        // 清除心跳定时器
        this.stopHeartbeatEntrust();
      });
    },

    // 启动心跳机制
    startHeartbeatEntrust() {
      this.websockTime = setInterval(() => {
        if (this.websock && this.websock.readyState === WebSocket.OPEN) {
          this.websock.send("ping"); // 发送心跳消息
          console.log("发送心跳消息");
        }
      }, 3000); // 每3秒发送一次心跳
    },

    // 停止心跳机制
    stopHeartbeatEntrust() {
      if (this.websockTime) {
        clearInterval(this.websockTime);
        this.websockTime = null;
      }
    },

    allCloseDepot(active) {   // 撤单

      console.log(456789);

      console.log('this.entrustList.length------------>', this.entrustList.length);

      if (this.positionList.length > 0) {
        this.$refs.effectiveOneAllClose.openDialog(active, 0);
      } else {
        this.$customMessage(2, "暂无持仓订单");
      }

    },

    // 一键平仓 持仓
    async allCloseDepotFunsh(active) {
      let parameter = {
        contractId: active === 0 ? this.getCoinsId : "",
      };

      Promise.try(async () => {
        return await HandleAllDepot(JSON.stringify(parameter));
      }).then(() => {
        this.$customMessage(0, "平仓成功");

        this.$refs.effectiveOneAllClose.closeDialog();
      });


      this.isDialogVisible = false;
    },
    // this.$refs.effectiveOneAllClose.openDialog(active);
    // 一键撤单 委托  /contractEntrust/allCancellations

    allCancellations(active) {

      if (this.entrustList.length > 0) {
        this.$refs.effectiveOneAllClose.openDialog(active, 1);
      } else {
        this.$customMessage(2, "暂无委托订单");
      }
    },

    allCloseDepotFun(active, type) {
      console.log("allCloseDepotFun1212121", active, type);

      if (type == 0) {
        this.allCloseDepotFunsh(active)
      } else {

        this.allCancellationsFn(active)
      }
    },



    async allCancellationsFn(active) { //  撤单

      let parameter = {
        contractId: +active === 0 ? this.getCoinsId : "",
      };
      Promise.try(async () => {
        return await GetAllCancellations(JSON.stringify(parameter));
      }).then(() => {
        this.entrustList = [];
        this.$customMessage(0, "撤单成功");
      });
      this.isDialogVisible = false;
    },

    marketPriceSell(item) {
      // 市价全平    平仓
      this.SurplusLossPrice(item);
    },
    async SurplusLossPrice(active) {
      let parameter = {
        id: active.id,
        closeAmount:
          this.typeBUInfo === "USDT"
            ? active.unfinishedHoldAmountMotherCoin
            : active.unfinishedHoldAmount,
        denominatedType: this.typeBUInfo === "USDT" ? 0 : 1,
      };

      Promise.try(async () => {
        return await HandleDepot(JSON.stringify(parameter));
      }).then(() => {
        this.$customMessage(0, "平仓成功");
      });

      this.isDialogVisible = false;
    },
    setLever(item) {
      let contractId = item.contractId;
      this.fetchInitListInfo(contractId, item);
    },

    fetchInitListInfo(contractId, item) {
      Promise.try(async () => {
        return await setLeverFn(contractId);
      }).then((res) => {
        console.log('contractId------------->', res);
        if (res.code === 200) {
          this.$refs.component14.openDialog(item, res.data.contract);
        }
      });
    },

    setEntrust(item) {
      this.$refs.component8.openDialog(item); //
    },

    async cancelOrder(item) {
      // 撤单
      try {
        const res = await UpdateContract({
          type: 0,
          id: item.id,
        });
        this.$customMessage(
          res.code === 200 ? 0 : 2,
          res.code === 200 ? "撤单成功" : res.msg
        );
      } catch (e) {
        this.$customMessage(2, "撤单失败");
      }

      this.isDialogVisible = false;
    },

    setBond(item) {
      this.$refs.component7.openDialog(item); //
    },
    clickSurplus(item) {
      // console.log(item,"itemitemitemitemitemitemitem0000000");

      this.$refs.component3.openDialog(item);
    },
    allForSale(item) {
      // 平仓  --> 接口的自主平仓
      this.$refs.component5.openDialog(item);
      console.log(item, "component5component5component5");
    },
    setActiveTab(index) {
      this.activeTab = index;
      if (index == 1) {
        //  this.entrustListSocket() // 委托列表
      }
      // marketDataSocket();
    },
    OneClickBackhand(item) {
      this.$refs.component11.openDialog(item, this.getToken);
    },
  },
  computed: {
    ...mapGetters([
      "getCoinsId",
      "getContractId",
      "getPositionList",
      "getSelectedCurrency",
      "getToken",
      "getCoinsIdNew",
    ]),
    // eslint-disable-next-line vue/return-in-computed-property

    tokenInfo() {
      return this.getToken;
    },

    typeBUInfo() {
      return this.getSelectedCurrency; // 如果没有选择，显示默认文本
    },
    cournData() {
      return this.$store.state.order.selectedCurrency; // 如果没有选择，显示默认文本
    },
   
  },
};
</script>
<style lang="scss">
.action-btn {
  background-color: #252525;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: #363636;
}

.action-btn:active {
  background-color: #90ff00;
}

html,
body {
  height: 100% !important;
}

.tab-container {
  padding-left: 20px;
  display: flex;
}

.tab-item {
  margin-right: 30px;
  height: 18px;
  color: #737373;
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  color: #ffffff;
}

.underline {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 2px;
  background-image: url("@/assets/images/icon/lineB.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.jc {
  justify-content: center;
}

.ic {
  align-items: center;
}

.jb {
  justify-content: space-between;
}

.container2 {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
  /* 为父容器增加左右 padding，模拟间隔 */
  width: 100%;
}

.box2 {
  background-color: lightgray;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}

/* 设置每个盒子的宽度百分比，剩余空间由间隔填充 */
.box2:nth-child(1) {
  width: 31.5%;
  /* 第一个盒子宽度百分比 */
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

.box2:nth-child(2) {
  width: 9%;
  /* 第二个盒子宽度百分比 */
  margin-left: 2.08%;
  /* 间隔 40px 的百分比换算 */
}

.box2:nth-child(3) {
  width: 17%;
  /* 第三个盒子宽度百分比 */
  margin-left: 2.5%;
  /* 间隔 48px 的百分比换算 */
}

.container5 {
  display: flex;
  width: 100%;
  padding-left: 10px;
  margin-top: 24px;
}

.box5 {
  // margin-left: 0;
  // flex: 1;
  min-width: 0;
  /* 防止内容溢出 */
}

.spacer {
  width: 26px;

  flex: none;
}

.box3 {
  flex: 0 1 auto;
  /* 允许盒子收缩，但不允许增长 */
  text-align: center;
  white-space: nowrap;
  /* 防止文本换行 */
}

.box3:nth-child(1) {
  margin-right: calc(90px - 3%);
  /* 90px 减去容器宽度的 3% */
}

.box3:nth-child(2) {
  margin-right: calc(69px - 3%);
  /* 69px 减去容器宽度的 3% */
}

@media (max-width: 768px) {
  .box3:nth-child(1) {
    margin-right: calc(45px - 3%);
    /* 在小屏幕上减少间距 */
  }

  .box3:nth-child(2) {
    margin-right: calc(34px - 3%);
    /* 在小屏幕上减少间距 */
  }
}

.box2 {
  flex: 0 1 auto;
  /* 允许盒子收缩，但不允许增长 */
  text-align: center;
  white-space: nowrap;
  /* 防止文本换行 */
}

.box2:nth-child(1) {
  margin-right: 40px;
  /* 第一个和第二个盒子之间的间距 */
}

.box2:nth-child(2) {
  margin-right: 48px;
  /* 第二个和第三个盒子之间的间距 */
}

.box2:nth-child(1),
.box2:nth-child(3) {
  flex-basis: calc((100% - 88px) / 3);
  /* 88px 是间距的总和：40px + 48px */
}

.box2:nth-child(2) {
  flex-basis: calc((100% - 88px) / 3 + 88px);
  /* 中间盒子占据间距的空间 */
}

@media (max-width: 768px) {
  .box2 {
    font-size: 14px;
    /* 在小屏幕上减小字体大小 */
  }

  .box2:nth-child(1) {
    margin-right: 20px;
    /* 在小屏幕上减少间距 */
  }

  .box2:nth-child(2) {
    margin-right: 24px;
    /* 在小屏幕上减少间距 */
  }

  .box2:nth-child(1),
  .box2:nth-child(3) {
    flex-basis: calc((100% - 44px) / 3);
    /* 44px 是小屏幕上间距的总和：20px + 24px */
  }

  .box2:nth-child(2) {
    flex-basis: calc((100% - 44px) / 3 + 44px);
    /* 中间盒子占据间距的空间 */
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 60.17% 14.46% 25.38%;
  width: 100vw;
  /* 使容器宽度满屏 */
}

.box {
  border: 1px solid #252525;
}

.tabBar {
  a {
    color: #90ff00;
  }

  .ivu-tabs-nav-scroll {
    padding-left: 12px;
  }

  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #efa70b;
  }

  .ivu-tabs-ink-bar {
    background-color: #efa70b;
  }

  .exchange .symbol .item .coin {
    font-size: 12px;
  }

  .trade_bd {
    padding: 0 15px;
  }

  .trade_menu {
    margin-left: 10px;
  }

  .ivu-tooltip-content {
    position: absolute;
    left: 12px;
    top: -20px;
  }

  .trade_wrap .ivu-form-item-content input {
    padding-left: 25px;
  }

  .symbol {
    padding: 2px 10px !important;
    margin-bottom: 2px !important;
  }

  .imgtable .handler {
    margin-left: 10px;
  }

  .imgtable .mflag {
    z-index: 100;
  }

  .item {
    .price-cny {
      font-size: 12px;
      color: #546886;
    }

    .coin {
      font-size: 14px !important;
    }
  }
}
</style>
<style scoped lang="scss">
// @import url(../../assets/css/swap.css);
$night-bg: #0b1520;
$night-headerbg: #27313e;
$night-contentbg: #192330;
$night-color: #fff;

.swap {
  color: #fff;
  background-color: #141414;

  .main {
    width: 99%;
    margin-left: 0.3%;
    display: flex;
    margin-top: 5px;

    .left {
      border-radius: 0px;
      margin-right: 5px;
      overflow: hidden;

      .handlers {
        font-size: 0;
        padding: 10px 20px;
        background-color: #192330;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;

        .handler {
          display: inline-block;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          cursor: pointer;

          &.handler-all {
            // background-image: url('.@/assets/images/exchange/plate_all.png');

            &.active {
              // background-image: url('.@/assets/images/exchange/plate_all_active.png');
            }
          }

          &.handler-green {
            // background-image: url('.@/assets/images/exchange/plate_green.png');

            &.active {
              // background-image: url('.@/assets/images/exchange/plate_green_active.png');
            }
          }

          &.handler-red {
            // background-image: url('.@/assets/images/exchange/plate_red.png');

            &.active {
              // background-image: url('.@/assets/images/exchange/plate_red_active.png');
            }
          }
        }
      }

      .plate-nowprice {
        text-align: center;
        background-color: #27313e;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;

        .price {
          font-size: 18px;
          margin-right: 10px;
        }

        .price-cny {
          font-size: 12px;
          margin-left: 10px;
          font-weight: 400;
          color: rgba(219, 222, 246, 0.3);
        }
      }
    }

    .center {
      flex: 0 0 76%;
      margin-right: 5px;

      .imgtable {
        height: 446px;
        position: relative;
        overflow: hidden;

        .handler {
          position: absolute;
          top: 10px;
          right: 40px;
          z-index: 1000;

          >span {
            background-color: #2c3b59;
            color: #c7cce6;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 13px;
            opacity: 0.5;

            &.active {
              opacity: 1;
            }
          }
        }
      }

      .trade_wrap {
        .trade_menu {
          position: relative;
          background-color: #192330;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom: 1px solid #27313e;
          font-size: 0;
          height: 40px;
          line-height: 40px;

          >span {
            font-size: 16px;
            padding: 11px 20px;
            cursor: pointer;

            &.active {
              color: #fff;
              border-bottom: 2px solid #90ff00;
            }

            &:first-child {
              border-top-left-radius: 0px;
            }
          }

          .fee-wrap {
            position: absolute;
            top: 0;
            right: 20px;
            font-size: 12px;

            >span {
              margin-right: 10px;
              color: #7c7f82;
            }

            >a {
              vertical-align: middle;
            }
          }
        }

        .trade_panel {
          position: relative;

          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: rgba(0, 52, 77, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 100;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }

          .publish-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 37, 64, 0.93);
            justify-content: center;
            align-items: center;
            z-index: 101;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }
        }

        .trade_panel .panel .hd {
          border-bottom: none;

          b {
            color: #fff;
          }

          a {
            color: #90ff00;
          }
        }
      }
    }

    .right {
      flex: 0 0 23%;

      .coin-menu {
        overflow: hidden;
        height: 512px;
        background-color: #192330;
        border-radius: 0px;
      }
    }
  }

  .symbol {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-bottom: 5px;
    align-items: center;
    background-color: #192330;
    line-height: 1;
    border-radius: 0px;

    .item {
      .price-cny {
        font-size: 12px;
        color: #546886;
      }

      .coin {
        font-size: 20px;
      }

      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }

      .num {
        font-size: 12px;
        color: #fff;
      }

      >img {
        display: block;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }

  .order {
    min-height: 227px;
    margin-bottom: 10px;
    overflow: hidden;

    .order-handler {
      // background-color: #192330;
      background-color: #192330;
      font-size: 0;

      // line-height: 38px;
      >span {
        padding: 0 20px;
        font-size: 14px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        line-height: 30px;
        background-color: #192330;

        &.active {
          color: #90ff00;
          background-color: #27313e;
          border-bottom: 2px solid #90ff00;
        }

        &:first-child {
          border-top-left-radius: 0px;
        }

        &:last-child {
          border-top-right-radius: 0px;
        }
      }
    }

    .table_box {
      width: 100%;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 20%;
      }

      &::-webkit-scrollbar-track-piece {
        background: transparent;
      }

      .table {
        width: 200%;
      }
    }
  }
}

.exchange.day {
  color: #333;
  background-color: #fff;

  .main {
    .left {
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;

      .handlers {
        background-color: #fff;
      }

      .plate-nowprice {
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      }
    }

    .imgtable {
      border-radius: 6px;
      box-shadow: 0 0 2px #ccc;

      .handler {
        >span {
          border: 1px solid #333;
        }
      }
    }

    .trade_wrap {
      box-shadow: 0 0 2px #ccc;

      .trade_menu {
        background-color: #fafafa;

        >span {
          background-color: #fafafa;
          border-right: 1px solid #f0f0f0;

          &.active {
            background-color: #fff;
            color: #90ff00;
          }

          &:last-child {
            border-top-right-radius: 6px;
          }
        }

        .ivu-icon {
          color: #333 !important;
        }
      }

      .trade_panel {
        box-shadow: 0 0 2px #ccc;

        .mask {
          background-color: rgba(0, 52, 77, 0.8);
          color: #fff;
        }
      }

      .trade_panel .panel .hd {
        border-bottom: none;

        b {
          color: #333;
        }

        a {
          color: #90ff00;
        }
      }
    }

    .right {
      .coin-menu {
        background-color: #fff;
        box-shadow: 0 2px 2px #ccc;
      }

      .trade-wrap {
        box-shadow: 0 0 2px #ccc;
        border-radius: 6px;
      }

      // .ivu-table-wrapper{
      //         box-shadow:0 0 2px #ccc;
      //       }
    }
  }

  .symbol {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;

    .item {
      .text {
        color: #999;
      }

      .num {
        color: #333;
      }
    }
  }

  .order {
    box-shadow: 0 2px 2px #ccc;
    min-height: 227px;

    .order-handler {
      margin-right: -2px;
      background-color: #fff;

      >span {
        color: #333;
        background-color: #fafafa;
        box-shadow: 0 0 2px #ccc;

        &.active {
          color: #90ff00;
          background-color: #fff;
        }
      }
    }
  }
}

#kline_container {
  background: #192330;
}

.coin-info {
  color: #8f9ca5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  padding-top: 15px;
}

.mask_phone {
  background: rgba(0, 52, 77, 0.8);
  height: 344px;
  width: 100%;
  line-height: 344px;
  text-align: center;
  position: absolute;
  top: 0;
  font-size: 20px;
  margin: 0 auto;
  z-index: 99;
}

// .containerInfo::-webkit-scrollbar {
//   width: 1px; /* 设置滚动条的宽度 */
// }
// .containerInfo::-webkit-scrollbar-track {
//   background: #f1f1f1; /* 滚动条轨道的颜色 */
// }

// .containerInfo::-webkit-scrollbar-thumb {
//   background: #888; /* 滚动条的颜色 */
//   border-radius: 6px; /* 滚动条的圆角 */
// }

// .containerInfo::-webkit-scrollbar-thumb:hover {
//   background: #555; /* 滚动条悬停时的颜色 */
// }

/* y轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
  width: 1px;
  /* 设置y轴滚动条的宽度 */
}

.containerInfo::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* y轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
  background: #888;
  /* y轴滚动条的颜色 */
  border-radius: 6px;
  /* y轴滚动条的圆角 */
}

.containerInfo::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* y轴滚动条悬停时的颜色 */
}

/* x轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
  height: 1px;
  /* 设置x轴滚动条的高度 */
}

.containerInfo::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* x轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
  background: #888;
  /* x轴滚动条的颜色 */
  border-radius: 6px;
  /* x轴滚动条的圆角 */
}
</style>
