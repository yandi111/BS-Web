<!-- 常见问题 -->
<template>
  <div class="card">
    <h2 class="title">{{ $t('lang_54') }}</h2>

    <div class="question">
      <el-collapse v-model="activeId" accordion>
        <el-collapse-item :title="$t('home_21')" name="1">
          <template #title>
            <div class="tag flex">
              <p class="flex"><i>1</i>{{ $t('home_21') }}</p>
              <i :class="[+activeId !== 1 ? 'el-icon-plus' : 'el-icon-minus', '']"></i>
            </div>
          </template>

          <p v-html="html_1"></p>
        </el-collapse-item>

        <el-collapse-item :title="$t('home_28')" name="2">
          <template #title>
            <div class="tag flex">
              <p class="flex"><i>2</i>{{ $t('home_28') }}</p>
              <i :class="[+activeId !== 1 ? 'el-icon-plus' : 'el-icon-minus', '']"></i>
            </div>
          </template>
          <p class="mb-26">{{ $t('home_29') }}</p>

          <p>{{ $t('home_30') }}</p>
          <p v-html="html_2"></p>
          <p v-html="html_3"></p>
        </el-collapse-item>

        <el-collapse-item :title="$t('home_41')" name="3">
          <template #title>
            <div class="tag flex">
              <p class="flex"><i>3</i>{{ $t('home_41') }}</p>
              <i :class="[+activeId !== 1 ? 'el-icon-plus' : 'el-icon-minus', '']"></i>
            </div>
          </template>
          <p v-html="html_4"></p>
        </el-collapse-item>

        <el-collapse-item :title="$t('home_46')" name="4">
          <template #title>
            <div class="tag flex">
              <p class="flex"><i>4</i>{{ $t('home_46') }}</p>
              <i :class="[+activeId !== 1 ? 'el-icon-plus' : 'el-icon-minus', '']"></i>
            </div>
          </template>
          <p v-html="html_5"></p>
        </el-collapse-item>

        <el-collapse-item :title="$t('home_52')" name="5">
          <template #title>
            <div class="tag flex">
              <p class="flex"><i>5</i>{{ $t('home_52') }}</p>
              <i :class="[+activeId !== 1 ? 'el-icon-plus' : 'el-icon-minus', '']"></i>
            </div>
          </template>
          <p v-html="html_6"></p>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: '',
    }
  },
  computed: {
    html_1() {
      return this.$t('home_22')
          .replace('$[CryptocCurrency]', `<span>${this.$t('home_10')}</span>`)
          .replace('$[BTC]', `<span>${this.$t('home_11')}</span>`)
          .replace('$[ETH]', `<span>${this.$t('home_12')}</span>`)
          .replace('$[USDT]', `<span>${this.$t('home_23')}</span>`)
    },
    html_2() {
      return this.$t('home_31')
          .replace('$[spot]', `<span>${this.$t('home_24')}</span>`)
          .replace('$[contract]', `<span>${this.$t('home_25')}</span>`)
    },
    html_3() {
      return this.$t('home_32')
          .replace('$[contract]', `<span>${this.$t('home_25')}</span>`)
    },
    html_4() {
      return this.$t('home_42')
          .replace('$[Table_of_contents]', `<span>${this.$t('home_26')}</span>`)
          .replace('$[BTC]', `<span>${this.$t('home_11')}</span>`)
          .replace('$[ETH]', `<span>${this.$t('home_12')}</span>`)
    },
    html_5() {
      return this.$t('home_47')
          .replace('$[Spot]', `<span>${this.$t('home_24')}</span>`)
          .replace('$[Contract]', `<span>${this.$t('home_25')}</span>`)
          .replace('$[StartTrade]', `<span>${this.$t('home_27')}</span>`)
    },
    html_6() {
      return this.$t('home_53')
          .replace('$[financial_management]', `<span>${this.$t('home_33')}</span>`)
          .replace('$[BTC]', `<span>${this.$t('home_11')}</span>`)
          .replace('$[ETH]', `<span>${this.$t('home_12')}</span>`)
          .replace('$[USDT]', `<span>${this.$t('home_23')}</span>`)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 99px;
  width: 100%;

  .title {
    margin-bottom: 74px;
    @include Font((color: $colorD, size: 40px, align: center, weight: bold));
  }

  .question {
    width: 100%;

    &_item {
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 52px;
      }

      &_index {
        margin-right: 10px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        @include Font((color: $colorD, size: $h5, align: center));
        border: 1px solid $border_color;
        border-radius: 50%;
      }

      p {
        @include Font((color: $colorD, size: 20px, weight: 500));
      }
    }
  }
}

.el-icon-plus {
  font: {
    weight: bold
  }
}

.el-icon-minus {
  color: #90Ff00;
  font: {
    weight: bold
  }
}

.tag {
  width: 100%;
  align-items: center;
  justify-content: space-between;

  p {
    align-items: center;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-right: 10px;
      border: 1px solid $border_color;
      @include Font((align: center));
      border-radius: 50%;
    }
  }

  &:hover {
    .el-icon-plus {
      color: #90Ff00;
    }
  }

  img {
    width: 20px;
  }
}

p {
  @include Font((color: $colorD, size: 20px));
}

.el-collapse {
  border: none;

  ::v-deep {
    .el-collapse-item__arrow {
      display: none;
    }

    .el-collapse-item__wrap, .el-collapse-item__header {
      border-bottom: none;
      background-color: transparent;
    }

    .el-collapse-item__header {
      @include Font((color: $colorD, size: 20px, align: center));
    }

    .el-collapse-item__content {
      margin-top: 20px;
      padding-bottom: 0;

      p {
        padding-left: 41px;
        @include Font((color: $colorD, size: 16px));

        span {
          @include Font((color: $colorA, size: 16px));
        }
      }
    }

    .el-collapse-item {
      &:not(:last-child) {
        margin-bottom: 52px;
      }
    }
  }
}

.mb-26 {
  margin-bottom: 26px;
}
</style>