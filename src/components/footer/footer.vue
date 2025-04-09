<template>
 <div class="footer">
  <div class="footer_d flex w-1203" :class="changePadding?'footer_d1':''">
   <div class="footer_d_b icon">
    <img class="footer_icon" src="../../assets/images/icon/icon_logo.png" alt=""/>
    <div>
     <p class="subTitle">{{ $t("lang_1284") }}</p>
     <p class="subTitle">contact@ubex.tech</p>
    </div>
   </div>
   <div class="footer_d_b" v-for="(item, index) in fieldsList" :key="index">
    <div class="font-bold">{{ item.type }}</div>
    <div v-for="(ele, eIndex) in item.child" :key="eIndex">
     <p class="link" @click="toPage(ele)">{{ ele.name }}</p>
    </div>
   </div>

   <div class="footer_d_c">
    <div class="font-bold">{{$t('home_58')}}</div>

    <div class="icon flex">
     <a></a>
     <a></a>
     <a></a>
     <a></a>
     <a></a>
     <a></a>
     <a></a>
     <a></a>
    </div>
   </div>
  </div>
  <div class="footer-border"></div>
  <div class="footer_f">
    ©2025 UBEX 
  </div>
 </div>
</template>

<script>
export default {
 name: "Footer",
 props: {
  changePadding: {
   type: Boolean,
   default: false
  },
 },
 data() {
  return {
   fieldsList: [
    {
     type: '关于',
     child: [
      {
       id: 1,
       name: '关于我们',
       url: "",
      },
      {
       id: 2,
       name: 'AML 条款',
       url: "https://ubexsupport.zendesk.com/hc/zh-cn/articles/44348990499225-AML-%E6%9D%A1%E6%AC%BE",
      },
       {
         id: 5,
         name: 'KYC 条款',
         url: "https://ubexsupport.zendesk.com/hc/zh-cn/articles/44348903176345-KYC-%E6%9D%A1%E6%AC%BE",
       },
      {
       id: 3,
       name: '服务协议',
       url: "https://ubexsupport.zendesk.com/hc/zh-cn/articles/44348868151833-%E7%94%A8%E6%88%B7%E4%B8%8E%E9%9A%90%E7%A7%81%E6%9D%A1%E6%AC%BE",
      },
      {
       id: 4,
       name: '隐私协议',
       url: "https://ubexsupport.zendesk.com/hc/zh-cn/articles/44348868151833-%E7%94%A8%E6%88%B7%E4%B8%8E%E9%9A%90%E7%A7%81%E6%9D%A1%E6%AC%BE",
      },
     ],
    },
    {
     type: '服务',
     child: [
      {
       id: 5,
       name: '现货交易',
       url: "",
      },
      {
       id: 6,
       name: 'U本位合约',
       url: "",
      },
      {
       id: 7,
       name: '成为超级合伙人',
       url: "",
      },
     ],
    },
    {
     type: '帮助',
     child: [
      {
       id: 16,
       name: '帮助中心',
       url: "",
      },
      {
       id: 8,
       name: '费率标准',
       url: "",
      },
     ],
    },
   ],
   padShow: false
  };
 },
 mounted() {
  this.getCurrentBackground(this.$route.fullPath);
 },
 methods: {
  getCurrentBackground(newVal) {
   let changeBackground = [
    "/layout/c2c/buyCoin",
    "/layout/userStudy",
    "/layout/quotes",
   ];
   if (newVal == "/layout/home") {
    this.background = "#f5f7fb";
   }
  },
  toPage(val) {
    console.log(val)
   if (val.url === "/information/compliance") {
    this.$router.push({
     path: val.url,
     query: {
      params: val.id,
     },
    });
   } else if (val.url === "") {
    zE("messenger", "open");
   } else {
     if (this.isExternalLink(val.url)) {
       window.open(val.url, '_blank');
     } else {
       this.$router.push(val.url);
     }
   }
  },
   isExternalLink(link) {
     return /^(http|https|www):\/\//.test(link);
   }
 },
};
</script>

<style lang="scss" scoped>
.footer {
 width: 100%;
 display: flex;
 flex-direction: column;
 background-color: $bg;

 &.plr360 {
  .footer_d {
   padding: 60px 360px 0;
  }

  .footer_f {
   padding: 0 360px;
  }
 }

 .footer_d1 {
  padding: 60px 360px 0 !important;
 }

 .footer_d {
  justify-content: space-between;
  flex: 1;
  padding: 130px 0;
  margin: auto;

  .footer_d_b {

   .link {
    margin-bottom: 10px;
    cursor: pointer;
    @include Font((color: $colorF, size: 14px));

    &:hover {
     color: #90ff00;
    }
   }
  }
 }

 .footer-border {
  border-bottom: 1px solid $border_color;
 }

 .footer_f {
  padding: 20px 0;
  margin: auto;
  @include Font((color: $colorD, size: 12px, align: left));
 }
}

.font-bold {
 @include Font((color: $colorD, size: 18px, weight: 600));
 margin-bottom: 20px;
}

.icon {
 width: 170px;
 @include NewFlex((
  align: center,
  wrap: wrap
 ));
 

 a {
  width: 20px;
  height: 20px;
  flex: 1 1 calc(25% - 28px);
  margin-bottom: 20px;
  transition: .3s;
  &:not(:nth-of-type(4n)) {
   margin-right: 28px;
  }

  &:nth-of-type(1) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon1_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon1_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon1_2.png');
      };
    }
  }

  &:nth-of-type(2) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon2_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon2_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon2_2.png');
      };
    }
  }

  &:nth-of-type(3) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon3_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon3_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon3_2.png');
      };
    }
  }

  &:nth-of-type(4) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon4_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon4_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon4_2.png');
      };
    }
  }

  &:nth-of-type(5) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon5_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon5_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon5_2.png');
      };
    }
  }

  &:nth-of-type(6) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon6_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon6_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon6_2.png');
      };
    }
  }

  &:nth-of-type(7) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon7_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon7_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon7_2.png');
      };
    }
  }

  &:nth-of-type(8) {
    transition: .3s;
    background: {
      image: url('../../assets/images/footer/icon8_1.png');
      repeat: no-repeat;
      size: cover;
      position: center center
    };

    &:hover {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon8_2.png');
      };
    }
    &:active {
      transition: .3s;
      background: {
        image: url('../../assets/images/footer/icon8_2.png');
      };
    }
  }
 }
}

.footer_icon {
 margin-bottom: 29px;
 width: 70px;
}

.subTitle {
 margin-bottom: 10px;
 @include Font((color: $colorF, size: $h5));
}
</style>
