<template>
  <div class="box" style=" position:relative; padding-left: 10px; padding-right: 20px; padding-top:18px; flex: 1; border-top: none;">
    <div class="flex" style="width: 100%; margin: 0;">
      <div
        style=" white-space: nowrap; padding-right: 10px; width: 46px;height: 26px; line-height: 26px; margin: 0; font-family: PingFang SC;font-size: 12px;font-weight: 500; color:#FFFFFF;">
        {{$t('主账户')}}</div>
      <div @click="clickWhole" class="flex ic"
        style="position: relative; height: 26px; width:100%;cursor: pointer; line-height: 26px; font-family: PingFang SC;font-size: 14px;font-weight: 500; background-color:#252525; border-radius: 4px; padding-left: 12px;">
        <div style="color: #B3B3B3; font-size: 14px; font-weight: 500;"> {{ getDepotType == 1 ? $t('全仓') : $t('逐仓') }}{{ getDepotTypeInfo == 0 ? $t('合仓') : $t('分仓') }}
        </div>
        <div style=" margin-right: 9px; position: absolute; right: 1px;"><img src="@/assets/images/icon/arr.png"
            alt=""></div>
      </div>
      <div @click="$refs.component2.openDialog(getMultiple);" class="flex"
        style="padding-left:10px;  height: 26px;line-height: 26px; cursor: pointer; background-color:#252525;border-radius: 4px; margin-left: 5px;">
        <div style="color: #0CBB57; font-size: 12px; margin-right: 2px;">{{ getMultiple }}X</div>
        <div style="color: #ED3C2F; font-size: 12px;">{{ getMultiple }}X</div>
        <div class="flex ic" style="margin-left: 33px; margin-right: 9px;"><img src="@/assets/images/icon/arr.png" alt=""></div>
      </div>
    </div>
    <!-- 止盈触发价 {{this.add.profitPrice  }} 市价{{ this.getSellPriceInfo }}数量:{{  this.usdtBtcNumber  }} -->
    <div class="flex" style=" margin-top: 20px; margin-bottom: 29px;">
      <div
        style="flex:1; flex-direction:column; justify-content: start;align-items: center; font-weight: 500; color: #F0F0F0;font-family: PingFang SC;">
        <div style="color:#F0F0F0;font-size: 12px; ">{{ $formatNumberWithCommas(assetsAmount) }}/{{
          $formatNumberWithCommas(usableAmount) }}</div>
        <div style="margin-top: 5px;font-size: 12px; color: #737373;">资金/可用 <span   @click="$router.push('/Transfer-v2');"  style="color: #90FF00; cursor: pointer;font-size: 12px;">划转 </span> </div>


      </div>
      <!-- @mouseleave="reset"formatPrice   formatAmount -->
      <div
        style="flex:1; flex-direction:column;font-weight: 500; color: #737373;font-family: PingFang SC; cursor: pointer;">
        <div class="flex ic jc" style="color: #F0F0F0;font-size: 12px;">{{ $formatNumberWithCommas(effectiveMultiple) }}X
        </div>
        <div @click="$refs.EstimatedStrongParity.openDialog()" class="flex ic jc"
          style="margin-top: 5px;font-size: 12px;color: #737373;">{{$t('有效杠杆')}}</div>
      </div>
      <div style="flex:1; flex-direction:column;  font-weight: 500; color: #737373;font-family: PingFang SC;">
        <div style="display: flex;  justify-content: end;  align-items: center;color: #F0F0F0;font-size: 12px;">
          {{ $formatNumberWithCommas(unfinishedProfitLoss) }}</div>
        <div style="display: flex;  justify-content: end;color: #737373;  align-items: center; margin-top: 5px; font-size: 12px;">{{$t('lang_1029')}}
        </div>
      </div>
    </div>
    <!-- 市价单 限价单 条件委托 按钮 -->
    <div class="button-group" style=" width: 100%; margin-bottom: 10px;font-family: PingFang SC; font-size: 12px; ">
      <div v-for="(button, index) in buttons" :key="index" @click="selectButton(index)" :class="[selectedIndex === index ? 'active' : '', 'flex ic jc button']" :style="index !== 2 ? getButtonStyle(index) : {color: '#252525'}">
        {{ button.text }}
      </div>
    </div>

    <!-- 市价单    -->
    <div v-if="selectedIndex === 0">
      <div class="flex" style=" width: 100%; margin-bottom: 10px;font-family: PingFang SC; font-size: 12px; ">
        <div class="flex ic jc"
          style="cursor: pointer; flex: 1;  border-radius: 4px; height: 26px; background-color: #363636; color: #737373;">
          {{$t('lang_1006')}}</div>
      </div>
      <div class="flex" style=" width: 100%;font-family: PingFang SC;font-size: 12px; margin-bottom: 24px; ">
        <input @change="usdtBtcNumberBlur" v-model="usdtBtcNumber" @focus="countFocus($event)"
          @blur="$event.target.style.border = 'none'"
          style="color: #FFFFFF;flex: 1; width: 100%;  caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;outline: none"
          :placeholder="$t('lang_1013')" type="text">

    <!-- <div  v-if="usdtBtcNumberType" style="width: 100%;margin-right: 3px;"> 
        <input @change="usdtBtcNumberBlur" v-model="usdtBtcNumber" @focus="countFocus($event)"
          @blur="$event.target.style.border = 'none'"
          style="color: #FFFFFF;flex: 1; width: 100%;  caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;outline: none"
          placeholder="数量" type="text">

      </div>
      <div  v-else style="width: 100%;margin-right: 3px;"  @click="onUsdtBtcNumberView"> 
        <input @change="usdtBtcNumberBlur" v-model="usdtBtcNumberView" @focus="countFocus($event)"
          @blur="$event.target.style.border = 'none'"
          style="color: #FFFFFF;flex: 1; width: 100%;  caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;outline: none"
          placeholder="数量" type="text">

      </div> -->
        <!-- <div class="flex ic jc"
          style=" cursor: pointer; width: 116px; border-radius: 4px; height: 26px; background-color: #252525; color: #FFFFFF;">

        </div> -->

        <div>
          <div class="flex ic jc" style=" width: 116px; height: 26px; border-radius: 4px;" @click="toggleDropdown"
            :style="{ backgroundColor: '#252525', color: '#a8a8a8', color: usdtBtcType ? '#FFFFFF' : '#737373' }">
            {{ selectedOption }}

            <div style="margin-left: 15px;">

              <div class="triangle" :class="{ rotate: isRotated }">
              </div>


            </div>
          </div>



          <transition name="fade">
            <div style=" width: 116px; " v-if="isDropdownVisible" class="dropdown">
              <div style=" width: 116px; height: 26px; " class="dropdown-item flex ic jc"
                @click="selectOption('USDT', 0)">
                USDT
              </div>
              <div style=" width: 116px; height: 26px; " class="dropdown-item flex ic jc"
                @click="selectOption(coneNameInfo, 1)">
                {{ coneNameInfo }}
              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>
    <!-- 限价单 -->
    <div v-if="selectedIndex === 1">
      <div class="flex" style=" width: 100%; margin-bottom: 10px;font-family: PingFang SC; font-size: 12px; ">
        <div class="flex ic jc"
          style="cursor: pointer; flex: 1;  border-radius: 4px; height: 26px; background-color: #252525; color: #ffffff;">
          <!-- <input v-model="getPrice"  -->
          <input v-model="entrustPrice" @focus="$event.target.style.border = '1px solid #90FF00'"
            @input="entrustPriceClick" @blur="$event.target.style.border = '1px solid rgba(0,0,0,0)'"
            style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px; z-index: 999"
            :placeholder="$t('lang_1325')" type="text">

        </div>
      </div>
      <div class="flex" style=" width: 100%;font-family: PingFang SC;font-size: 12px; margin-bottom: 24px; ">

        <!-- <input v-model="nowUsdtBtcNumber" @focus="$event.target.style.border = '0.5px solid #90FF00'" -->
        <input @change="usdtBtcNumberBlur" @focus="countFocus($event)" @blur="$event.target.style.border = 'none'"
          v-model="usdtBtcNumber"
          style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;"
          :placeholder="$t('lang_1352')" type="text">



<!-- 
          <div  v-if="usdtBtcNumberType" style="width: 100%;margin-right: 3px;"> 
        <input @change="usdtBtcNumberBlur" v-model="usdtBtcNumber" @focus="countFocus($event)"
          @blur="$event.target.style.border = 'none'"
          style="color: #FFFFFF;flex: 1; width: 100%;  caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;outline: none"
          placeholder="数量" type="text">

      </div>
      <div  v-else style="width: 100%;margin-right: 3px;"  @click="onUsdtBtcNumberView"> 
        <input @change="usdtBtcNumberBlur" v-model="usdtBtcNumberView" @focus="countFocus($event)"
          @blur="$event.target.style.border = 'none'"
          style="color: #FFFFFF;flex: 1; width: 100%;  caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;outline: none"
          placeholder="数量" type="text">

      </div> -->

        <!-- <div class="flex ic jc" style="cursor: pointer; flex: 1; margin-right: 4px; border-radius: 4px; height: 26px; background-color: #252525; color: #737373;">数量</div> -->

        <div>
          <div class="flex ic jc" style=" width: 116px; height: 26px; border-radius: 4px;" @click="toggleDropdown"
            :style="{ backgroundColor: '#252525', color: '#a8a8a8' }">
            {{ selectedOption }}
            <div style="margin-left: 15px;">

              <div class="triangle" :class="{ rotate: isRotated }"></div>


            </div>
          </div>
          <transition name="fade">
            <div style=" width: 116px; " v-if="isDropdownVisible" class="dropdown">
              <div style=" width: 116px; height: 26px; " class="dropdown-item flex ic jc"
                @click="selectOption('USDT', 0)">
                USDT
              </div>
              <div style=" width: 116px; height: 26px; " class="dropdown-item flex ic jc"
                @click="selectOption(coneNameInfo, 1)">
                {{ coneNameInfo }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- 条件委托 -->
    <!-- <div v-if="selectedIndex === 2"> -->
    <div v-if="false">
      <div class="flex" style=" width: 100%; margin-bottom: 10px;font-family: PingFang SC; font-size: 12px; ">
        <div class="flex ic jc"
          style="cursor: pointer; flex: 1;  border-radius: 4px; height: 26px; background-color: #252525; color: #ffffff;">
          <input v-model="entrustPrice" @focus="$event.target.style.border = '0.5px solid #90FF00'"
            @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
            style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;"
            :placeholder="`${$t('lang_855')}（USDT）`" type="text">
        </div>
      </div>

      <div class="flex" style=" width: 100%; margin-bottom: 10px; font-family: PingFang SC;font-size: 12px;">
        <input v-model="nowMarketNumber" @focus="$event.target.style.border = '0.5px solid #90FF00'"
          @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
          style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;"
          :placeholder="`${$t('lang_1022')}（USDT）`" type="text">
        <div class="flex ic jc"
          style="cursor: pointer; width: 116px; border-radius: 4px; height: 26px; background-color: #252525; color: #FFFFFF;">
          <template>
            <Select class="custom-select" transfer :placeholder="$t('lang_1037')"
              style="background-color: #252525; color: #ffffff;border: none;">
              <Option v-for="item in conditionInfo" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </template>
        </div>
      </div>

      <div class="flex"
        style=" width: 100%; margin-bottom: 10px; font-family: PingFang SC;font-size: 12px; margin-bottom: 24px; ">

        <input v-model="usdtBtcNumber" @focus="$event.target.style.border = '0.5px solid #90FF00'"
          @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
          style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 26px; line-height: 26px;"
          :placeholder="$t('lang_1182')" type="text">

        <div class="flex ic jc"
          style="cursor: pointer; width: 116px; border-radius: 4px; height: 26px; background-color: #252525; color: #FFFFFF;">

          <template>
            <Select v-model="selectedValue" class="custom-select" transfer
              style="background-color: #252525; color: #ffffff;border: none;">
              <!-- <Option v-for="item in conditionList" :key="item.value">{{ item.label }}</Option> -->
              <Option v-for="item in conditionList" :key="item.value">{{ item.label }}</Option>
              <!-- <Option  value="1" >USDT</Option>
              <Option  value="2" >{{ this.getCoinsName  ?  getCoinsName.split('-')[0] : 'BTC' }}</Option> -->

            </Select>
          </template>

        </div>
      </div>


    </div>
    <!-- <Radio v-model="single">Radio</Radio> -->
    <!-- 订单 -->
    <div style="margin-top: 10px;">
      <slider :newCount="newCount" @usdtBtcOpen="usdtBtcOpen" />

    </div>

    <!-- <Slider v-model="value9" :tip-format="format"></Slider> -->
    <!--  止盈止损按钮  -->
    <!-- {{ priceInfo }} -->
    <div class="flex jb" style="margin-top: 12px;">
      <div @click="toggleIcon" class="flex">
        <div style="width: 14px; height: 14px; margin-right: 2px;">
          <img v-if="isChecked" style="width: 100%; height: 100%;" src='@/assets/images/icon/icon_check.png' alt="">
          <img v-else style="width: 100%; height: 100%;" src='@/assets/images/icon/icon-circle-choice.png' alt="">
        </div>
        <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;">{{$t('lang_1077')}}</div>
      </div>
      <div @click="openMore = !openMore" style="color: #90FF00; border-bottom: 1px solid #90FF00; cursor: pointer; font-size: 12px; ">

        {{ openMore ? $t('lang_1912') : $t('lang_1916') }}
      </div>
    </div>

    <!--  止盈止损展示  -->
    <div v-if="isChecked" style=" margin-top: 8px; font-family: PingFang SC;font-size: 12px;">
      <div class="flex" style="font-size: 12px; ">
        <input v-model="add.profitPrice" @focus="$event.target.style.border = '1px solid #90FF00'"
          @blur="$event.target.style.border = '1px solid rgba(0,0,0,0)'"
          style="color: #FFFFFF;outline: none; flex: 1; caret-color:#90FF00;margin-right: 6px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;"
          :placeholder="$t('lang_1144')" type="text">

        <div v-if="estimatedProfit"
          style="flex: 1; caret-color: #90FF00;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;color: #FFFFFF;">
          {{ $formatPrice(estimatedProfit) }}
        </div>
        <div v-else
          style="flex: 1; caret-color: #90FF00;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px; color: #737373;">
          {{$t('预估盈利')}}
        </div>
        <!-- <input @focus="$event.target.style.border = '1px solid #90FF00'" @blur="$event.target.style.border = 'none'"
              style="flex: 1; caret-color: #90FF00;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;"
              placeholder="预估盈利" type="text"> -->

      </div>
      <div class="flex" style="font-size: 12px; margin-top: 10px;">
        <input v-model='add.lossPrice' @focus="$event.target.style.border = '1px solid #90FF00'"
          @blur="$event.target.style.border = '1px solid rgba(0,0,0,0)'"
          style="color: #FFFFFF;outline: none;flex: 1; caret-color: #90FF00;margin-right: 6px;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;"
          :placeholder="$t('lang_1145')" type="text">

        <!-- <div style="flex: 1; caret-color: #90FF00;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;">111</div> -->
        <div v-if="estimatedProfitInfo"
          style="color: #FFFFFF;flex: 1; caret-color: #FFFFFF;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;">
          {{ $formatPrice(estimatedProfitInfo) }}
        </div>
        <div v-else
          style="flex: 1; caret-color:#FFFFFF;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px; color: #737373;">
          {{$t('预估盈损')}}
        </div>

        <!-- <input @focus="$event.target.style.border = '1px solid #90FF00'" @blur="$event.target.style.border = 'none'"
              style="flex: 1; caret-color: #90FF00;border: none; border-radius: 4px; background: #252525;  text-align: center; height: 30px; line-height: 30px;"
              placeholder="预估盈损" type="text"> -->
      </div>
    </div>
    <div class="flex" style="position: absolute; bottom: 16px;width: 97.5%; padding-right: 20px; ">
      <div class="left" style="flex:1;margin-right: 6px;">
        <div class="flex" style="margin-bottom: 10px;">
          <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500; color:#737373; margin-right: 10px;">
            <div style="font-size: 11px;font-weight: 500; color:#737373;">可开</div>
            <div style="margin-top: 5px;font-size: 11px;font-weight: 500; color:#737373;">预估强平价</div>
          </div>
          <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;">
            <div style="font-size: 12px; font-weight: 500;">
              <!-- {{ $formatNumberWithCommas(usdtBtcOpenPrice) <= 0 ? '0.00' : $formatNumberWithCommas(usdtBtcOpenPrice) }} -->
              {{ usdtBtcOpenPrice && isFinite(usdtBtcOpenPrice) ? (usdtBtcOpenPrice <= 0 ? '--' :
                $formatNumberWithCommas(usdtBtcOpenPrice)) : '--' }} {{ selectedOption }}
                </div>

                <div style="margin-top: 5px;font-size: 12px; font-weight: 500;">{{ $formatNumberWithCommas(EstimatedStrongParityMany) || '' }}</div>
                <!-- <div style="margin-top: 5px;">{{ EstimatedStrongParityMany   }}</div>  -->
            </div>
          </div>

          <div @click="addContract(0)" class="flex ic jc"
            style="cursor: pointer; height: 36px;background: #0CBB57;border-radius: 4px; color: #FFFFFF;font-family: PingFang SC;font-size: 14px;font-weight: 600;">
            {{$t('买入/开多')}}
          </div>
        </div>
        <div class="right" style="flex:1">
          <div class="flex" style="margin-bottom: 10px;">
            <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500; color:#737373; margin-right: 10px;">
              <div style="font-size: 11px;font-weight: 500; color:#737373;" >{{$t('lang_772')}}</div>
              <div style="margin-top: 5px;font-size: 11px;font-weight: 500; color:#737373;">{{$t('lang_1061')}}</div>
            </div>
            <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;">
              <div style="font-size: 12px; font-weight: 500;">
               
                <!-- {{ usdtBtcOpenPrice && isFinite(usdtBtcOpenPrice) ? (usdtBtcOpenPrice <= 0 ? '--' :
                  $formatNumberWithCommas(usdtBtcOpenPrice)) : '--' }} {{ $formatNumberWithCommas(selectedOption) }} -->

                {{ usdtBtcOpenPrice && isFinite(usdtBtcOpenPrice) ? (usdtBtcOpenPrice <= 0 ? '--' :
                  $formatNumberWithCommas(usdtBtcOpenPrice)) : '--' }} {{ selectedOption }}
                  

                  <!-- formatPrice    formatAmount -->



                  </div>
                    <div style="font-size: 12px; font-weight: 500;margin-top: 5px;">
                    {{ $formatNumberWithCommas(EmptyOrderEstimatedStrongParity) || '' }}
                  </div>

              </div>
            </div>

            <div @click="addContract(1)" class="flex ic jc"
              style="cursor: pointer;height: 36px;background: #ED3C2F;;border-radius: 4px; color: #FFFFFF;font-family: PingFang SC;font-size: 14px;font-weight: 600;">
              {{$t('卖出/开空')}}
            </div>
          </div>
        </div>
        
        <simple-dialog-component ref="component" />
        <simple-dialog-component2 ref="component2" />
        <simple-dialog-component9 ref="component9" />
        <simple-dialog-component10 ref="component10" />
        <simple-dialog-component12 ref="component12" :estimatedProfitInfoFmt="$formatPrice(estimatedProfitInfo)" :estimatedProfitFmt="$formatPrice(estimatedProfit)" />
        <simple-dialog-component13 ref="component13" />
        <EstimatedStrongParity ref="EstimatedStrongParity" />

      </div>
</template>
  <script>
  import slider from '../../components/swap/slider.vue'
  import SimpleDialogComponent from '../../components/swap/SimpleDialogComponent.vue'
  import SimpleDialogComponent2 from '../../components/swap/SimpleDialogComponent2.vue'
  import SimpleDialogComponent9 from '../../components/swap/SimpleDialogComponent9.vue'
  import SimpleDialogComponent10 from '../../components/swap/SimpleDialogComponent10.vue'
  import SimpleDialogComponent12 from '../../components/swap/SimpleDialogComponent12.vue'
  import SimpleDialogComponent13 from '../../components/swap/SimpleDialogComponent13.vue'
  import EstimatedStrongParity from '../../components/swap/EstimatedStrongParity.vue'
  import { mapGetters, mapMutations } from 'vuex';
  import {AddContract} from "@/api/hy";

  export default {
    // eslint-disable-next-line vue/multi-word-component-names    
    name: "Transaction",
    components: {
      // eslint-disable-next-line vue/no-unused-components   
      slider, EstimatedStrongParity,
      SimpleDialogComponent, SimpleDialogComponent2, SimpleDialogComponent9, SimpleDialogComponent10, SimpleDialogComponent12, SimpleDialogComponent13,
    },
    mixins: [],
    data() {
      return {
        usdtBtcType: false,
        openMore: true, // 开多 开空按钮状态
        checkedIcon: '@/assets/images/icon/icon-check.png',
        uncheckedIcon: '@/assets/images/icon/icon-circle-choice.png',
        isDropdownVisible: false,
        // selectedOption: 'USDT', // 默认选项
        selectedOption: 'USDT', // 默认选项
        isRotated: false,
        entrustPrice: '', // 限价单 触发价格
        
        closePriceInfo: 100, // 
        add: {
          profitPrice: null,
          lossPrice: null,
          USDTbond: null,
          BTCBond: null,
          balance: null,
          feeRate: null,  // 手续费
        },
        entrustTypeInfo: 0,
        nowUsdtBtcNumber: null,
        nowMarketNumber: '',
        newCount: 0,
        usdtBtcNumber: null,
        selectedIndex: 0,
        buttons: [
          { text: '市价单',id:1 },
          { text: '限价单',id:2 },
          { text: '条件委托',id:3 }
        ],
        selectedValue: 0,
        conditionList: [
          {
            value: 1,
            label: 'USDT'
          },
          {
            value: 2,
            // eslint-disable-next-line vue/no-computed-properties-in-data
            label: this.coneNameInfo
          },
        ],

        orderListStatus: 0, // 点击订单薄 或最新成交状态
        value9: 25,
        isChecked: false,

        icons: {
          unchecked: '/src/assets/images/icon/icon-circle-choice.png',
          checked: '/src/assets/images/icon/icon-check.png'
        },
        
        entrustType: 1,
        // balanceInfo: null, // 余额： 
        multipleInfo: null, //杠杆：
        feeRateInfo: null, //  手续费：
        maintainEarnestMoneyRate: null, // 维持保证金率
        frozen: null,//  冻结：
        effectiveMultiple: null, //  ：有效杠杆
        unfinishedProfitLoss: null, // 未实现盈亏
        paramList: {},
        websockTime: null,
        websockBlance: null,
        balanceNew:null,
        frozenNew:null,
        unfinishedProfitLossNew:null,
        assetsAmount:'', // 资金
        usableAmount:'', // 可用

      }
    },
    created() {
      // this.initList()
    },
    mounted() {
      this.setSelectedCurrency('USDT')
      this.entrustPrice = this.getPrice;

      this.initEntrustListSocket()

    },
    beforeDestroy() {
      // this.clearLocalStorage();
      localStorage.removeItem('typeBU'); // 删除指定的键
    },
    // clearLocalStorage() {
    //   // 删除本地存储中的值
    //   localStorage.removeItem('typeBU'); // 删除指定的键

    // },
    methods: {
      ...mapMutations(['setInitListInfo', 'setMultiple', 'setPrice', 'setBalanceInfo','setUsableAmount', 'setSelectedCurrency', 'setFeeRateInfo']),

      calculatePrecision(getPricePrecision) {
        return 1 / Math.pow(10, getPricePrecision);
      },

      initEntrustListSocket() {
        console.log( 'VUE_APP_BASE_WS_CQ======>' ,   `${process.env.VUE_APP_BASE_WS_CQ}/contract`);
        

        // 创建 WebSocket 连接
        this.websockBlance = new WebSocket(`${process.env.VUE_APP_BASE_WS_CQ}/contract`);
        // 连接打开时的回调
        this.websockBlance.addEventListener("open", () => {
          console.log("WebSocket 连接已建立");
          this.connectionStatus = '已连接';
          // 发送参数
          this.paramList = {
            token: this.getToken,
            methodCode: "4",
            body: {
              contractId: this.getCoinsId ? this.getCoinsId : ''
            }
          };


          this.websockBlance.send(JSON.stringify(this.paramList)); // 发送 JSON 格式的参数

          // 启动心跳机制
          this.startHeartbeatEntrust();
        });
        // 监听消息事件
        this.websockBlance.addEventListener("message", (event) => {
          let res = JSON.parse(event.data);

          // this.balanceInfo = res.data.balance, // 余额： 
          // this.balanceInfo = res.data.balance 

        // 资金  余额 + 冻结 + 浮动盈亏
        this.balanceNew = res.data.balance
        this.frozenNew = res.data.frozen
        this.unfinishedProfitLossNew = res.data.unfinishedProfitLoss
          this.setBalanceInfo(res.data.balance)  // 
          this.feeRateInfo = res.data.feeRate, //  手续费：
          this.setFeeRateInfo(res.data.feeRate)
          this.setFeeRateInfo(res.data.feeRate)
          this.frozen = res.data.frozen //  冻结：
          this.effectiveMultiple = res.data.effectiveMultiple, //  ：有效杠杆
          this.unfinishedProfitLoss = res.data.unfinishedProfitLoss // 未实现盈亏
          this.maintainEarnestMoneyRate = res.data.maintainEarnestMoneyRate // 维持保证金率

          this.assetsAmount = res.data.assetsAmount // 资金
          this.usableAmount = res.data.usableAmount // 可用

          this.setUsableAmount(res.data.usableAmount) 

        });

        // 监听错误事件
        this.websockBlance.addEventListener("error", (error) => {
          console.error("WebSocket 错误:------", error);

        });

        // 监听连接关闭事件
        this.websockBlance.addEventListener("close", () => {
          console.log("通用数据 WebSocket 连接已关闭");
          this.connectionStatus = '已断开';
          // 清除心跳定时器
          this.stopHeartbeatEntrust();

          setTimeout(() => {
            this.initEntrustListSocket(); // 重新调用连接方法
          }, 5000); // 5秒后重连
        });
      },
      // 启动心跳机制
      startHeartbeatEntrust() {
        this.websockTime = setInterval(() => {
          if (this.websockBlance && this.websockBlance.readyState === WebSocket.OPEN) {
            // this.websock.send(JSON.stringify(this.paramList)); // 发送 JSON 格式的参数
            this.websockBlance.send('ping'); // 发送 JSON 格式的参数
          }
        }, 3000); // 每30秒发送一次心跳
      },

      // 停止心跳机制
      stopHeartbeatEntrust() {
        if (this.websockTime) {
          clearInterval(this.websockTime);
          this.websockTime = null;
        }
      },



      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
        this.isRotated = !this.isRotated; // 切换旋转状态
      },


      entrustPriceClick() {
        //  this.entrustPrice = this.$thousandth(this.entrustPrice)  
      },

      mathRound(active) {
        return Math.round(active * 100) / 100;
      },

      // 点击usdt或者 btc
      selectOption(option, type) {
        this.usdtBtcType = true; // 设置状态
        this.selectedOption = option; // 记录选择的选项
        this.isDropdownVisible = false; // 选择后隐藏下拉框
        this.isRotated = false; // 切换旋转状态
        this.selectedValue = type; // 设置选中的值
        // 根据选项设置 selectedValue
        // if (option === 'USDT') {
        //     this.selectedValue = 0;
        // } else {
        //     this.selectedValue = 1;
        // }
        // 获取当前存储的类型
        this.setSelectedCurrency(option)
        this.$store.commit('setSelectedCurrency', option); // 更新 Vuex 状态
      },
    
      // 进度条  数量  ： 进度条数量 * 可开 /100 
      usdtBtcOpen(value) {
        if (value && this.usdtBtcOpenPrice) {
          this.newCount = Math.round(value) * this.usdtBtcOpenPrice / 100
        }
        // console.log(newCount,'newCount');
        if (this.newCount && this.newCount > 0) {
          this.usdtBtcNumber = this.mathRound(this.newCount)
        } else if (value == 0) {
          this.usdtBtcNumber = 0
        }
      },
      //  @focus="$event.target.style.border = '0.5px solid #90FF00'"
      countFocus(event) {
        event.target.style.border = '0.5px solid #90FF00'
        this.newCount = ''
       this.usdtBtcNumber = null
      },
      $formatNumberWithCommas(num) {
        // 确保输入是数字
        if (num === null || num === undefined || isNaN(num)) {
          return null; // 或者返回一个默认值
        }

        // 将数字转换为字符串并分割整数部分和小数部分
        const parts = Number(num).toFixed(2).split('.');

        // 使用正则表达式为整数部分添加千分位逗号
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // 返回格式化后的字符串
        return parts.join('.');
      },
      usdtBtcNumberBlur() {  // usdt
        this.add.USDTbond = (this.usdtBtcNumber / 1) / (this.getMultiple | 0) / 1

        this.selectedValue == this.coneNameInfo/1
      },
      getButtonStyle(index) {

        const isActive = this.selectedIndex === index
        return {
          backgroundColor: isActive ? '#90FF00' : '#252525',
          color: isActive ? '#252525' : '#B3B3B3'
        }
      },
      clickWhole() {
        this.$refs.component.openDialog();
      },
      selectButton(index) {
       if (index === 2) return
       
        // this.setMultiple(125)
        this.selectOption('USDT', 1)
        this.selectedValue = 0 // 默认usdt
        console.log(index, 'denominatedUnitdenominatedUnit');

        this.add.profitPrice = null
        this.add.lossPrice = null
        this.usdtBtcNumber = null
        this.selectedIndex = index
        if (index === 2) {        // 条件委托
          this.entrustTypeInfo = 5
        } else if (index === 0) {   // 市价
          this.entrustTypeInfo = 1
        } else if (index === 1) {   // 限价

          // this.entrustPrice = this.getEntrustPrice
          this.setPrice(this.getSellPriceInfo)

          this.entrustTypeInfo = 0
        }
      },
      toggleIcon() {
        this.isChecked = !this.isChecked;
        this.add.profitPrice = null,
          this.add.lossPrice = null

        // 如果需要，这里可以触发一个事件通知父组件状态已改变
        // this.$emit('toggle', this.isChecked);
      },
      // 点击购买
      addContract(type) {
        

        console.log(type,this.usdtBtcNumber,"this.usdtBtcNumber");
      

        if (!this.getMultiple) {
          this.$refs.component13.openDialog('请选择杠杆倍数')
        } else
          if (!this.usdtBtcNumber) {
            this.$refs.component13.openDialog('数量不能为空')
          } else {
            if (this.selectedIndex == 0) { // 市价
              this.$refs.component12.openDialog({
                type,
                usdtBtcBond: this.usdtBtcBond, // 保证金
                entrustAmount: this.usdtBtcNumber, //  委托数量
                profitPrice: this.add.profitPrice, //  止盈触发价
                lossPrice: this.add.lossPrice,// 止损触发价
                estimatedStrong: this.EstimatedStrongParityMany, // 预估强评价  --
                estimatedStrongParity: this.EmptyOrderEstimatedStrongParity, // 预估强评价 ++ 
                estimatedProfitInfo: this.mathRound(this.estimatedProfitInfo),
                estimatedProfit: this.mathRound(this.estimatedProfit),
                contractValue: this.contractValue, // 合约价值
                contractQantity: this.contractQantity // 数量
              })
            }
            if (this.selectedIndex == 1) {   // 限价
              if (!this.entrustPrice) {
                this.$refs.component13.openDialog('价格不能为空')
              }
              else {
                this.$refs.component12.openDialog({
                  type,
                  usdtBtcBond: this.usdtBtcBond, // 保证金
                  entrustAmount: this.usdtBtcNumber, //  委托数量
                  profitPrice: this.add.profitPrice, //  止盈触发价
                  lossPrice: this.add.lossPrice,// 止损触发价
                  estimatedStrong: this.EstimatedStrongParityMany, // 预估强评价  --
                  estimatedStrongParity: this.EmptyOrderEstimatedStrongParity, // 预估强评价 ++ 
                  entrustPrice: this.entrustPrice,
                  estimatedProfitInfo: this.mathRound(this.estimatedProfitInfo),
                  estimatedProfit: this.mathRound(this.estimatedProfit),
                  contractValue: this.contractValue, // 合约价值
                  contractQantity: this.contractQantity // 数量
                })

              }
            }

          }
      },
      async addContractinfo(type) {

        let parameter = {
          contractId: this.getCoinsId, // 合约id

          denominatedUnit: this.selectedOption === 'USDT' ? 0  : 1,   //计价类型：   1.子币   2.母币    1.子币   0.母币
          depotType: this.getDepotType, //平仓类型：0：逐仓，1：全仓
          depotMode: this.getDepotTypeInfo, // == 0 ? '合仓' : '分仓' ,
          direction: type, //方向： 0: 看多，1： 看空

          entrustAmount: this.usdtBtcNumber,  // 委托数量

          entrustPrice: this.entrustPiN, // 委托价 -- 考虑市价和限价
          entrustType: 0, //委托类型：0:现价委托,1:市价委托,2:指标委托,3:组合指标委托,4:追逐现价,5:条件委托
          multiple: this.getMultiple, //杠杆倍数
          stopLossPrice: this.add.lossPrice / 1 || '', // 止损价
          takeProfitPrice: this.add.profitPrice / 1 || '', // 止盈价 
          tradeType: this.nowMarketPrice, // 0：限价，1：市价 

        }

        try {
         const res = await AddContract(JSON.stringify(parameter))
          console.log(res);
         this.$customMessage(0, "下单成功")
        } catch (e) {
         console.log(e);
        }

        this.usdtBtcNumber = null
        // this.setMultiple(125)
        this.add.lossPrice = ''    // 止损价
        this.add.profitPrice = ''// 止盈价
      },

    },
    watch: {
      getPrice(newValue) {
        this.entrustPrice = newValue; // 监听 Vuex 的变化
      },
      getCoinsName(newValue){
        if (newValue) {
          // let newValueInfo = newValue.split('-')[0]
          this.selectedOption = 'USDT'
          this.selectOption('USDT', 1)
      }
    },

    coneNameInfoType(){  // 币对切换数量为空
      this.usdtBtcNumber = null
    }
  },
    computed: {   
      ...mapGetters(['getPricePrecision', 'getMultiple','getSellPriceInfo','getCoinsName', 'getBalance', 'getFeeRate', 'getInitListInfo', 'getMultiple', 'getEntrustPrice', 'getSellPriceInfo', 'getCoinsId', 'getMaintainEarnestMoneyRate', 'getDepotType', 'getPrice', 'getDepotTypeInfo', 'getToken']),
      currentIcon() {
        return this.isChecked ? this.icons.checked : this.icons.unchecked;
      },
      coneNameInfoType(){
        return this.getCoinsName 
      },
      // selectedOption: 'BTC', // 默认选项

      coneNameInfo() {   // 币对列表的子币值
        return this.getCoinsName ? this.getCoinsName.split('-')[0] : 'BTC'
      },

      fund() {
        // 余额  ➕ 冻结
        return this.balanceNew/1 + this.frozenNew/1  + this.unfinishedProfitLossNew/1
        // this.fund = this.balanceNew/1 + this.frozenNew/1  + this.unfinishedProfitLossNew/1
      },
      balanceInfo(){
        if (this.unfinishedProfitLossNew > 0) {
            return this.balanceNew
            
        }else {
          return this.balanceNew/1 + this.unfinishedProfitLossNew/1
        }

      },
     

      //  合约价值 selectedOption == 'USDT'usdt. 下单  
      //   合约价值 = 下单数量
      //     展示数量 = 合约价值 / 价格


      // eslint-disable-next-line vue/return-in-computed-property
      contractValue() {    //  合约价值  
        if (this.selectedOption == 'USDT') {       //   合约价值 = 下单数量
          return this.usdtBtcNumber
        } else {   // 合约价值 =  价格 * 输入数量
          return this.entrustPiN * this.usdtBtcNumber
        }
      },
      // eslint-disable-next-line vue/return-in-computed-property
      contractQantity() {        //  数量 
        if (this.selectedOption == 'USDT') {       //   展示数量 = 输入数量 / 价格
          return this.usdtBtcNumber / this.entrustPiN
        } else  {   // 展示数量 = 输入数量
          return this.usdtBtcNumber
        }

      },

  


      // 下单金额
      entrustPiN() {
        if (this.selectedIndex == 0) {     // 市价
          return this.getSellPriceInfo
        } if (this.selectedIndex == 1) {  //  限价单
          return this.entrustPrice
        } else {                          //  条件委托单 
          return this.nowMarketNumber
        }
      },
      //  市价 限价
      // eslint-disable-next-line vue/return-in-computed-property
      nowMarketPrice() {
        if (this.selectedIndex == 0) {  //  市价 
          return 1
        }
        if (this.selectedIndex == 1) {  // 限价
          return 0
        }
      },
      // 保证金 计算:
      // eslint-disable-next-line vue/return-in-computed-property
      usdtBtcBond() {   // 保证金 计算:
        // 保证金 计算:
        // u 数量/杠杆倍数
        // B 数量*价格/杠杆倍数 selectedIndex
        if (this.selectedIndex == 0) {  // 市价
          if (this.selectedValue == 0) {   // usdt
            return (this.usdtBtcNumber / 1) / (this.getMultiple | 0) / 1
          }
          if (this.selectedValue == 1) {  // btc
            return this.usdtBtcNumber / 1 * (this.getSellPriceInfo / 1) / (this.getMultiple | 0) / 1
          }
        } else
          if (this.selectedIndex == 1) {  // xian jia
            if (this.selectedValue == 0) {   // usdt
              return (this.usdtBtcNumber / 1) / (this.getMultiple | 0) / 1
            }
            if (this.selectedValue == 1) {  // btc
              return this.usdtBtcNumber / 1 * (this.entrustPrice) / (this.getMultiple | 0) / 1
            }
          } else
            if (this.selectedIndex == 2) {  // tiao jian
              if (this.selectedValue == 0) {   // usdt
                return (this.usdtBtcNumber / 1) / (this.getMultiple | 0) / 1
              }
              if (this.selectedValue == 1) {  // btc
                return this.usdtBtcNumber / 1 * (this.nowMarketNumber) / (this.getMultiple | 0) / 1
              }
            }

      },
      // 可开    balanceInfo  multipleInfo feeRateInfo maintainEarnestMoneyRate
      // eslint-disable-next-line vue/return-in-computed-property
      usdtBtcOpenPrice() {
        if (this.selectedOption == 'USDT') {    // usdt   可开: 可用资金 *杠杆 *(1-手续费%)
          
          return this.usableAmount * this.getMultiple * (1 - this.feeRateInfo)
          // eslint-disable-next-line no-empty
        } else  { // btc  可开: 可用资金 *杠杆 *(1-手续费%) /价格 

          if (this.selectedIndex == 0) {     //市价

            return this.usableAmount * this.getMultiple * (1 - this.feeRateInfo) / this.getSellPriceInfo || 0

          } else if (this.selectedIndex == 1) {  //限价

            return this.usableAmount * this.getMultiple * (1 - this.feeRateInfo) / this.entrustPrice

          }

        }

      },

      // 市价单   nowUsdtBtcNumber   usdtBtcNumber   止盈触发价   预估盈利 = (市价 -  触发价) * 数量 

      // 开多   预估盈损 = (市场价|| 下单价 - 止损触发价  ) *数量
      //      止盈:(限价价格-止盈价)*数量u/限价价格
      //开空   预估盈损 = (市场价|| 下单价  - 止损触发价 ) *数量
      // eslint-disable-next-line vue/return-in-computed-property
      estimatedProfitInfo() {      // 预估盈损

        if (this.selectedOption == 'USDT') {
          if (this.openMore) {
            if (this.selectedIndex == 0 && this.add.lossPrice && this.usdtBtcNumber) {
              return (this.add.lossPrice - this.getSellPriceInfo) * this.usdtBtcNumber / this.getSellPriceInfo
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.lossPrice && this.usdtBtcNumber) { // 限价单
              return (this.add.lossPrice - this.entrustPrice) * this.usdtBtcNumber / this.entrustPrice
            }
          } else {
            if (this.selectedIndex == 0 && this.add.lossPrice && this.usdtBtcNumber) {
              return (this.getSellPriceInfo - this.add.lossPrice) * this.usdtBtcNumber / this.getSellPriceInfo
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.lossPrice && this.usdtBtcNumber) { // 限价单
              return (this.entrustPrice - this.add.lossPrice) * this.usdtBtcNumber / this.entrustPrice
            }
          }

        } else {
          if (this.openMore) {
            if (this.selectedIndex == 0 && this.add.lossPrice && this.usdtBtcNumber) {
              return (this.add.lossPrice - this.getSellPriceInfo) * this.usdtBtcNumber
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.lossPrice && this.usdtBtcNumber) { // 限价单
              return (this.add.lossPrice - this.entrustPrice) * this.usdtBtcNumber
            }
          } else {
            if (this.selectedIndex == 0 && this.add.lossPrice && this.usdtBtcNumber) {
              return (this.getSellPriceInfo - this.add.lossPrice) * this.usdtBtcNumber
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.lossPrice && this.usdtBtcNumber) { // 限价单
              return (this.entrustPrice - this.add.lossPrice) * this.usdtBtcNumber
            }
          }
        }


      },



      // 止盈触发价格   openMore
      // 开多   预估盈利 = ( 止盈触发价 - 市场价|| 下单价 ) *数量
      // 开空   预估盈利 = ( 市场价|| 下单价  - 止盈触发价  ) *数量

      // usdt  

      // entrustPrice 委托价   this.add.profitPrice  止盈触发价   this.usdtBtcNumber 数量
      // eslint-disable-next-line vue/return-in-computed-property    
      estimatedProfit() {    // getSellPriceInfo   市价

        if (this.selectedOption == 'USDT') {
          if (this.openMore) {  // 开多            
            if (this.selectedIndex == 0 && this.add.profitPrice && this.usdtBtcNumber) {    // 市价
              return (this.add.profitPrice - this.getSellPriceInfo) * this.usdtBtcNumber / this.getSellPriceInfo
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.profitPrice && this.usdtBtcNumber) { // 限价单
              return (this.add.profitPrice - this.entrustPrice) * this.usdtBtcNumber / this.entrustPrice
            }
          } else {     // 开空
            if (this.selectedIndex == 0 && this.add.profitPrice && this.usdtBtcNumber) {    // 市价
              return (this.getSellPriceInfo - this.add.profitPrice) * this.usdtBtcNumber / this.getSellPriceInfo
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.profitPrice && this.usdtBtcNumber) { // 限价单
              return (this.entrustPrice - this.add.profitPrice) * this.usdtBtcNumber / this.entrustPrice
            }

          }

        } else {
          if (this.openMore) {  // 开多            
            if (this.selectedIndex == 0 && this.add.profitPrice && this.usdtBtcNumber) {    // 市价
              return (this.add.profitPrice - this.getSellPriceInfo) * this.usdtBtcNumber
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.profitPrice && this.usdtBtcNumber) { // 限价单
              return (this.add.profitPrice - this.entrustPrice) * this.usdtBtcNumber
            }
          } else {     // 开空
            if (this.selectedIndex == 0 && this.add.profitPrice && this.usdtBtcNumber) {    // 市价
              return (this.getSellPriceInfo - this.add.profitPrice) * this.usdtBtcNumber
            }
            if (this.selectedIndex == 1 && this.entrustPrice && this.add.profitPrice && this.usdtBtcNumber) { // 限价单
              return (this.entrustPrice - this.add.profitPrice) * this.usdtBtcNumber
            }

          }
        }

      },

      //  预估强平价 = 市场价 - 维持保证金率 * 保证金/张数/持仓数量  
      // 100 -  0.2 * 10  / 20
      //  预估强平价 = 市场价  + 维持保证金率 * 保证金/张数/持仓数量

      estimatedStrongParity() { // 预估强平价   2    5
        return this.getSellPriceInfo + this.getMaintainEarnestMoneyRate * this.usdtBtcBond / 1 / this.usdtBtcNumber

      },

      estimatedStrong() {
        return this.getSellPriceInfo - this.getMaintainEarnestMoneyRate * this.usdtBtcBond / 1 / this.usdtBtcNumber

      },


      // 预估强平价
      //     this.getDepotType == 1 ? '全仓' : '逐仓' 
      //    this.selectedOption  == 'USDT' 母币 - 子币
      //    维持保证金率    : this.maintainEarnestMoneyRate 
      //   保证金       : this.usdtBtcBond
      //   数量          : this.usdtBtcNumber
      //   市价         :  this.getEntrustPrice  
      //   价格              this.entrustPiN 

      //  余额  :      this.usableAmount




      // eslint-disable-next-line vue/return-in-computed-property 
      EstimatedStrongParityMany() {
        if (this.entrustPiN && this.maintainEarnestMoneyRate && this.usableAmount && this.usdtBtcNumber && this.usdtBtcBond) {
          // 多单预估强评价
          if (this.getDepotType == 1) {     // 全仓
            if (this.selectedOption == 'USDT') {   // 母币   -- 多单
              //     预估强平价 = 市场价 -  (1-维持保证金率) *可用/u数量/价格
              //     预估强平价 = 市场价 - ((1 - 维持保证金率) * 可用) / (u / 价格)  getPricePrecision
              let Precision = (this.entrustPiN / 1) - ((1 - this.maintainEarnestMoneyRate) * this.usableAmount) / (this.usdtBtcNumber / this.entrustPiN)

              if (Precision < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return Precision
              }
            } else {    // 子币   预估强平价  =市场价 - (1-维持保证金率) *可用 /持仓数量   --多单 
              //       预估强平价 = 市场价 -  (1-维持保证金率) * 保证金/ 持仓数量 
              let entrust = this.entrustPiN / 1 - (1 - this.maintainEarnestMoneyRate) * (this.usableAmount / this.usdtBtcNumber)
              if (entrust < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrust
              }

            }

          } else {
            if (this.selectedOption == 'USDT') {      // 逐仓 // 母币
              //   预估强平价 = 市场价 - ((1 - 维持保证金率) * 保证金) / (u数量 / 价格)   --多单
              let entrusInfo = this.entrustPiN / 1 - (1 - this.maintainEarnestMoneyRate) * this.usdtBtcBond / (this.usdtBtcNumber / this.entrustPiN)

              if (entrusInfo < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrusInfo
              }

            } else {    // 子币
              // 预估强平价 = 市场价 - (1-维持保证金率) *保证金 / 持仓数量  -- 多单
              let entrustPiNInfo = this.entrustPiN / 1 - (  (1 - this.maintainEarnestMoneyRate) * this.usdtBtcBond  )/ this.usdtBtcNumber

              if (entrustPiNInfo < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrustPiNInfo
              }
            }
          }
        }
      },

      // 预估强平价
      //     this.getDepotType == 1 ? '全仓' : '逐仓' 
      //    this.selectedOption  == 'USDT' 母币 - 子币
      //    维持保证金率    : this.maintainEarnestMoneyRate 
      //   保证金       : this.usdtBtcBond
      //   数量          : this.usdtBtcNumber
      //   市价         :  this.getEntrustPrice  
      //   价格              this.entrustPiN 

      //  余额  :      this.usableAmount

      // eslint-disable-next-line vue/return-in-computed-property
      EmptyOrderEstimatedStrongParity() {     // 空单 预估强评价
        if (this.entrustPiN && this.maintainEarnestMoneyRate && this.usableAmount && this.usdtBtcNumber && this.usdtBtcBond) {


          if (this.getDepotType == 1) {     // 全仓
            if (this.selectedOption == 'USDT') {   // 母币
              // 预估强平价 = 市场价 +   (1-维持保证金率) *可用资金 / 持仓数量      -- 空单、、
              // 预估强平价 =( 1-维持保证金率)*可用/数量/价格 + 市场价
              let entrustPiN = this.entrustPiN / 1 + (1 - this.maintainEarnestMoneyRate) / 1 * this.usableAmount / (this.usdtBtcNumber / this.entrustPiN / 1)

              if (entrustPiN < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrustPiN
              }

              // return this.entrustPiN / 1 + (1 - this.maintainEarnestMoneyRate) / 1 * this.usableAmount / (this.usdtBtcNumber / this.entrustPiN / 1)

            } else {    // 子币
              //  预估强平价 = 市场价 + (1-维持保证金率) *可用资金 / 持仓数量   --空单

              let entrustPiN = this.entrustPiN / 1 + (1 - this.maintainEarnestMoneyRate) / 1 * this.usableAmount / this.usdtBtcNumber / 1

              if (entrustPiN < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrustPiN
              }
            }
          } else {                                   

            if (this.selectedOption == 'USDT') {    // 逐仓  -> 母币   / 

              //  预估强平价 = 市场价 + ((1 - 维持保证金率) * 保证金) / (u数量 / 价格)  --空单
              //  预估强平价  = (1-维持保证金率)*保证金/u/价格) +  市场价
              let entrustPiN = this.entrustPiN / 1 + (1 - this.maintainEarnestMoneyRate) / 1 * this.usdtBtcBond / (this.usdtBtcNumber / this.entrustPiN / 1)
              if (entrustPiN < 0) {
                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrustPiN
              }
            } else {    // 子币
              // 预估强平价 = 市场价 + (1-维持保证金率) *保证金 / 持仓数量  -- 空单
              //  预估强平价 = (1-维持保证金率)*保证金/持仓数量 + 市场价
              let entrustPiN = this.entrustPiN / 1 + (  (1 - this.maintainEarnestMoneyRate) / 1 * this.usdtBtcBond ) / this.usdtBtcNumber
              if (entrustPiN < 0) {

                return this.calculatePrecision(this.getPricePrecision)
              } else {
                return entrustPiN
              }
            }

          }
        }

      }
      }

  };
</script>

  <style lang="scss">
  .custom-select .ivu-select-selection {
    background-color: #252525 !important;
    border: none !important;
    height: 26px !important;
    line-height: 26px !important;
    color: #FFFFFF !important;
  }

  .custom-select .ivu-select-selected-value {
    height: 26px !important;
    line-height: 26px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .custom-select .ivu-select-arrow {
    line-height: 26px !important;
  }

  /* 重置箭头样式 */
  .custom-select .ivu-select-arrow:before {
    content: "\25BC" !important;
    font-family: Ionicons !important;
    // width: 8px !important;
    // height: 5px !important;
    font-size: 10px !important;
    color: #B3B3B3 !important;
  }

  .ivu-select-dropdown {
    background-color: #252525 !important;
    color: #FFFFFF !important;
  }

  .ivu-select-item:hover,
  .ivu-select-item-focus {
    background-color: #333333 !important;
  }

  .ivu-select-item-selected {
    background-color: #1a1a1a !important;
  }

  .ivu-select-dropdown .ivu-select-item {
    color: #FFFFFF !important;
    /* 修改为您想要的颜色 */
  }

  /* 悬停时的颜色 */
  .ivu-select-dropdown .ivu-select-item:hover {
    color: #90FF00 !important;
    /* 修改为您想要的悬停颜色 */
  }

  /* 选中项的颜色 */
  .ivu-select-dropdown .ivu-select-item-selected {
    font-weight: 500 !important;
    font-family: PingFang SC !important;
    color: #90FF00 !important;
    /* 修改为您想要的选中颜色 */
  }

  .custom-select .ivu-select-selected-value {
    font-weight: 500 !important;
    font-family: PingFang SC !important;
    color: #FFFFFF !important;
    /* 修改为您想要的颜色 */
  }

  .custom-select .ivu-select-placeholder {
    color: #FFFFFF !important;
    /* 设置占位文本的颜色 */
    font-size: 12px !important;
    /* 设置字体大小 */
    font-weight: 500 !important;
    font-family: PingFang SC !important;
  }


  .contract-item:hover {
    background-color: #363636;
    /* 鼠标悬浮时的背景色 */
  }


  .contract-item {
    transition: background-color 0.3s;
    /* 添加过渡效果 */
  }

  .action-btn {
    background-color: #252525;
    transition: background-color 0.3s ease;
  }

  .action-btn:hover {
    background-color: #363636;
  }

  .action-btn:active {
    background-color: #90FF00;
  }

  html,
  body {
    height: 100% !important;

  }

  .swap .ivu-slider-wrap {
    height: 1px !important;
    background: #252525;
    border-radius: 0.4px;
  }

  .swap .ivu-slider-bar {
    width: 164px;
    height: px;
    // border-radius: 4px ;
    background: #B3B3B3;
    // background: pink;

  }

  // .swap .ivu-slider-button-wrap { // 小圆点
  //   // background-color: pink;
  //   background-image: url(@/assets/images/icon/icon-Slide.png);


  // }
  .custom-slider :deep(.ivu-slider-button):focus {
    box-shadow: none;
  }

  .custom-slider :deep(.ivu-slider-button) {
    background-color: pink;
    // width: 20px;  /* 根据您的图片尺寸调整 */
    // height: 20px; /* 根据您的图片尺寸调整 */
    // top: -9px;    /* 根据您的图片尺寸调整，使滑块垂直居中 */
    border: none;
    box-shadow: none;
    background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
    background-size: contain;
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
    color: #FFFFFF;
  }

  .underline {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    background-image: url('@/assets/images/icon/lineB.png');
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
      color: #90FF00;
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
  .button-group {
    display: flex;
  }

  .button {
    cursor: pointer;
    flex: 1;
    margin-right: 4px;
    border-radius: 4px;
    height: 26px;
    font-weight: 500;
  }

  .button:last-child {
    margin-right: 0;
  }

  .active {
    background-color: #90FF00;
    color: #252525;
  }

  $night-bg: #0b1520;
  $night-headerbg: #27313e;
  $night-contentbg: #252525;
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
          background-color: #252525;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;

          .handler {
            display: inline-block;
            margin-right: 10px;
            width: 20px;
            height: 20px;
            background-size: 100% 100%;
            cursor: pointer;


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
            background-color: #252525;
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
                border-bottom: 2px solid #90FF00;
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
              // background-color: rgba(0, 52, 77, 0.8);
              background-color: #252525;
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
              color: #90FF00;
            }
          }
        }
      }

      .right {
        flex: 0 0 23%;

        .coin-menu {
          overflow: hidden;
          height: 512px;
          background-color: #252525;
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
      background-color: #252525;
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
        // background-color: #252525;
        background-color: #252525;
        font-size: 0;

        // line-height: 38px;
        >span {
          padding: 0 20px;
          font-size: 14px;
          display: inline-block;
          color: #fff;
          cursor: pointer;
          line-height: 30px;
          background-color: #252525;

          &.active {
            color: #90FF00;
            background-color: #27313e;
            border-bottom: 2px solid #90FF00;
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
              color: #90FF00;
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
            // background-color: rgba(0, 52, 77, 0.8);
            background-color: #252525;
            color: #fff;
          }
        }

        .trade_panel .panel .hd {
          border-bottom: none;

          b {
            color: #333;
          }

          a {
            color: #90FF00;
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
            color: #90FF00;
            background-color: #fff;
          }
        }
      }
    }
  }

  #kline_container {
    background: #141414;
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
    // background: rgba(0, 52, 77, 0.8);
    background: #252525;
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

  .trade-view {
    background-color: #141414;
    /* 设置背景颜色为黑色 */
  }



  .dropdown {
    position: absolute;
    background-color: #252525;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
  }

  .dropdown-item {
    border-radius: 4px;
    // padding: 8px 12px;
    cursor: pointer;
    overflow: hidden;
    color: #FFFFFF;
  }

  .dropdown-item:hover {
    overflow: hidden;
    border-radius: 4px;
    background-color: #363636;
    color: #90ff00;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
  }


  .triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #a8a8a8;
    /* 三角形颜色，朝上 */
    cursor: pointer;
    transition: transform 0.5s;
    /* 动画效果 */
    // margin: 20px; /* 添加一些间距 */
  }

  .rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
  }
</style>