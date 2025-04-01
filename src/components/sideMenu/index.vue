<!-- 侧边菜单 -->
<template>
  <div class="side-menu">
    <div v-if="$route.meta.type === 'wallet'">
      <ul style="background-color: #141414;">
        <li
        style="background-color: #141414;"
          v-for="(item, index) in walletList"
          :key="index"
          @click="handleMenu(item)"
          :class="[$route.path === item.url ? 'menu-active' : '']"
        >
          <svg-icon :iconClass="item.icon || 'find'" className="icon-find" />
          <span class="text">{{ $t("property." + item.name) }}</span>
        </li>
      </ul>
    </div>
    <div v-if="$route.meta.type == 'notice'">
      <ul style="background-color: #141414;">11111111
        <li style="background-color: #141414;"
          v-for="(item, index) in noticeList"
          :key="index"
          @click="handleMenu(item)"
          :class="[$route.path === item.url ? 'menu-active' : '']"
        >
          <!-- <svg-icon :iconClass="item.icon" className="icon-find" /> -->
          <span class="text">{{ $t("notice." + item.name) }}</span>
        </li>
      </ul>
    </div>
    <!-- 广场模块 -->
    <div v-if="$route.meta.type == 'square'">
      <ul style="background-color: #141414;">
        <li style="background-color: #141414;"
          v-for="(item, index) in squareList"
          :key="index"
          @click="handleMenu(item)"
          :class="[$route.path === item.url ? 'square-active' : '']"
        >
          <svg-icon
            :iconClass="
              $route.path === item.url ? item.iconActive : item.icon || 'find'
            "
            className="icon-find"
          />
          <span
            class="text"
            :class="{ noLogin: !isLogin && !item.url.includes('squareHome') }"
            >{{ $t("square." + item.name) }}</span
          >
        </li>
      </ul>
      <div
        class="write-btn"
        @click="publish"
        v-if="
          ['/square/squareNotify', '/square/squarePersonal'].includes(
            $route.fullPath
          )
        "
      >
        <span>{{ $t("square.发布文章") }}</span>
      </div>
    </div>

    <div v-if="!$route.meta.type">
      <div style="padding-top: 26px; font-family: PingFang SC;font-size: 12px;font-weight: 400; color: #737373;margin-left: 16px;">{{$t('资产中心')}}</div>
      <div style="background-color: #141414; margin-top: 6px;">
        <div style="background-color: #141414;">

        <div @click="navigateTo('overview')" class="hoverColor" :style="{background: isCurrentRoute('/overview') ? '#2B2B2B': '' }"   style="display: flex; align-items: center; height: 44px;  width: 100% ; cursor: pointer;">
          <div style="width: 4px; height: 40px;">
            <img  v-if="isCurrentRoute('/overview')"  width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
          </div>
          <div style="width: 20px; height: 20px; margin-left: 12px;">  
            <!-- /Users/strong/Desktop/website/src/assets/sidex/icon_1.png -->
            <img v-if="isCurrentRoute('/overview')"  src="@/assets/sidex/icon_11.png" width="100%" height="100%" alt="">
            <img v-else src="@/assets/sidex/icon_1.png" width="100%" height="100%" alt=""> 
          </div>
         
          <div style="margin-left: 10px; color: #F0F0F0; font-size: 14px;">{{$t('spot_23')}}</div>
        </div>

        <div @click="navigateTo('fundAccount')" class="hoverColor" :style="{background: isCurrentRoute('/fundAccount') ? '#2B2B2B': '' }"   style="display: flex; align-items: center; height: 44px;  width: 100% ; cursor: pointer;">
          <div style="width: 4px; height: 40px;">
            <img  v-if="isCurrentRoute('/fundAccount')"  width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
          </div>
          <div style="width: 20px; height: 20px; margin-left: 12px;"> 
            <img v-if="isCurrentRoute('/fundAccount')"  src="@/assets/sidex/icon_22.png" width="100%" height="100%" alt="">
            <img v-else src="@/assets/sidex/icon_2.png" width="100%" height="100%" alt=""> 
          </div>
         
          <div style="margin-left: 10px; color: #F0F0F0; font-size: 14px;">{{$t('lang_1098')}}</div>
        </div>

        <div @click="navigateTo('contractAccount')" class="hoverColor" :style="{background: isCurrentRoute('/contractAccount') ? '#2B2B2B': '' }"   style="display: flex; align-items: center; height: 44px;  width: 100% ; cursor: pointer;">
          <div style="width: 4px; height: 40px;">
            <img  v-if="isCurrentRoute('/contractAccount')" width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
          </div>
          <div style="width: 20px; height: 20px; margin-left: 12px;"> 
            <img v-if="isCurrentRoute('/contractAccount')"  src="@/assets/sidex/icon_33.png"  width="100%" height="100%" alt="">
            <img v-else  src="@/assets/sidex/icon_3.png" width="100%" height="100%" alt=""> 
          </div>
         
          <div style="margin-left: 10px; color: #F0F0F0; font-size: 14px;">{{$t('lang_908')}}</div>
        </div>

        <div class="hoverColor"  style="display: flex; align-items: center; height: 44px;   width: 100%;cursor: pointer; "> 
          <div style="width: 4px; height: 40px;">
            <!-- <img width="100%" height="100%" src="@/assets/side/Rectangle.png" alt=""> -->
            <!-- <img width="100%" height="100%" src="" alt=""> -->
          </div>
          <div style="width: 20px; height: 20px;  margin-left: 12px;"> <img src="@/assets/sidex/icon_4.png" width="100%" height="100%" alt=""> </div>
          <div style="margin-left: 10px; color: #F0F0F0;font-size: 14px;">{{$t('lang_1035')}}</div>
        </div>
          
        </div>
        <!-- <div style="background-color: #141414;"
          v-for="(item, index) in menuList"
          :key="index"
          @click="handleMenu(item)"
          :class="[$route.path === item.url ? 'menu-active' : '']"
        >
          <div v-if="isShow">
            <svg-icon
              v-show="item.icon !== 'loginout'"
              :iconClass="item.iconImg"
              className="icon-find"
            />
            <span class="text" v-show="item.url !== 'loginout'">{{
              $t("userInfo." + item.name)
            }}</span>
          </div>
          <div v-else>
            <svg-icon :iconClass="item.icon || 'find'" className="icon-find" />
            <span class="text">{{ $t("userInfo." + item.name) }}</span>
          </div>
        </div> -->
      </div>
      <div style="padding-top: 26px; font-family: PingFang SC;font-size: 12px;font-weight: 400; color: #737373;margin-left: 16px; margin-top: 52px;">{{$t('spot_24')}}</div>
      <div style="background-color: #141414; margin-top: 6px;"> 
        <div  class="hoverColor" 
         @click="navigateTo('securitySetting')"
         :style="{background: isCurrentRoute('/securitySetting') ? '#2B2B2B': '' }"
        style="display: flex; align-items: center; height: 44px;   width: 100%; cursor: pointer;"> 
          <div v-if="isCurrentRoute('/securitySetting')"  style="width: 4px; height: 40px;">
            <img  width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
            <!-- <img v-else width="100%" height="100%" src="" alt=""> -->
          </div>
          <div v-else style="width: 4px; height: 40px;">
            <!-- <img v-else width="100%" height="100%" src="" alt=""> -->
          </div>

          <div style="width: 20px; height: 20px;  margin-left: 12px;">
             <img v-if="isCurrentRoute('/securitySetting')" src="@/assets/sidex/icon11.png" width="100%" height="100%" alt="">
             <img v-else  src="@/assets/sidex/icon1.png" width="100%" height="100%" alt=""> 
            </div>
          <div style="margin-left: 10px; color: #F0F0F0;font-size: 14px;">{{$t('lang_2443')}}</div>
        </div>

        <div class="hoverColor"  @click="navigateTo('verifyIdentidy')"   :style="{background: isCurrentRoute('/verifyIdentidy') ? '#2B2B2B': '' }"
        style="cursor: pointer;display: flex; align-items: center; height: 44px;   width: 100%; "> 
          <div style="width: 4px; height: 40px;">
            <img v-if="isCurrentRoute('/verifyIdentidy')"   width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
            <!-- <img v-else width="100%" height="100%" src="" alt=""> -->
          </div>
          <div style="width: 20px; height: 20px;  margin-left: 12px;"> 
             <img v-if="isCurrentRoute('/verifyIdentidy')"  src="@/assets/sidex/icon22.png" width="100%" height="100%" alt="">
             <img v-else src="@/assets/sidex/icon2.png" width="100%" height="100%" alt=""> 
            </div>
          <div style="margin-left: 10px; color: #F0F0F0;font-size: 14px;">{{$t('lang_681')}}</div>
        </div>

        <div  class="hoverColor" 
        @click="navigateTo('rebateInfo')" 
        :style="{background: isCurrentRoute('/rebateInfo') ? '#2B2B2B': '' }"
        style="display: flex; align-items: center; height: 44px;   width: 100%; cursor: pointer;"> 
          <div style="width: 4px; height: 40px;">
            <img  v-if="isCurrentRoute('/rebateInfo')"   width="100%" height="100%" src="@/assets/side/Rectangle.png" alt="">
            <!-- <img v-else width="100%" height="100%" src="" alt=""> -->
          </div>
          <div style="width: 20px; height: 20px;  margin-left: 12px;">
             <img v-if="isCurrentRoute('/rebateInfo')" src="@/assets/sidex/icon33.png" width="100%" height="100%" alt="">
             <img v-else  src="@/assets/sidex/icon3.png" width="100%" height="100%" alt=""> 
            </div>
          <div  style="margin-left: 10px; color: #F0F0F0;font-size: 14px;">{{$t('lang_2699')}}</div>
        </div>
      
      </div>
    </div>



    <div v-if="$route.meta.type === 'post'">
      <ul>
        <li
          v-for="(item, index) in postList"
          :key="index"
          @click="handleMenu(item)"
          :class="[$route.path === item.url ? 'menu-active' : '']"
        >
          <span class="text">{{ $t("notice." + item.name) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  menuList,
  walletList,
  noticeList,
  postList,
  squareList,
} from "@/config/fields";
export default {
  name: "SideMenu",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuList: menuList,
      walletList: walletList,
      noticeList: noticeList,
      postList: postList,
      squareList: squareList,
      currentPage: '' // 用于跟踪当前页面
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {

    navigateTo(page) {
      this.currentPage = page; // 更新当前页面
      this.$router.push(`/${page}`); // 跳转到相应页面
    },
    isCurrentRoute(route) {
      return this.$route.path === route; // 检查当前路由是否匹配
    },
    // 菜单点击
    handleMenu({ url }) {
      this.$router.push(url);
    },
    //广场发布文章
    publish() {
      this.$router.push("/comLayout/squarePublish");
    },
  },
};
</script>
<style lang="scss" scoped>
.side-menu {
 border-right:1px solid $slide_color;
  width: 250px;
  height: 100%;
  background-color: #141414;
  & ul {
    width: 100%;
    height: 100%;
    & li {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      background-color: #141414;
      padding-left: 30px;
      cursor: pointer;
      .text {
        padding-left: 20px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        &.noLogin {
          opacity: 0.6;
        }
      }
      .icon-find {
        width: 24px;
        height: 24px;
      }
    }

    .menu-active {
      position: relative;
      background-color: $bgColorA;
      &::before {
        position: absolute;
        content: "";
        top: 15px;
        right: 0;
        width: 3px;
        height: 30px;
        background: #90ff00;
        border-radius: 2px;
      }
    }
    .square-active {
      position: relative;
      background-color: #f2f4f7;
      &::before {
        position: absolute;
        content: "";
        top: 15px;
        right: 0;
        width: 3px;
        height: 30px;
        background: #90ff00;
        border-radius: 2px;
      }
    }
  }
  .write-btn {
    margin: 350px 0 200px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    span {
      height: 42px;
      line-height: 42px;
      background: #90ff00;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      width: 100%;
      cursor: pointer;
    }
  }
  .hoverColor:hover {
    background-color: #2B2B2B;
  }
}
</style>
