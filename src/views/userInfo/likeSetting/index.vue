<!-- 偏好设置 -->
<template>
  <div>
    <div class="securyty-setting">
      <div>
        <div class="setting-content">
          <h2>{{ $t("userInfo.我的个人资料") }}</h2>
          <ul>
            <li class="flex-box li-b">
              <div class="flex-box">
                <div class="img-container">
                  <img v-if="avatar" :src="avatar" alt="" />
                  <img v-else src="@/assets/images/avatar-pc.png" alt="" />
                </div>
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.昵称") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.为您的个人资料设置自定义昵称") }}
                  </p>
                </div>
              </div>
              <div class="bind-success fix-width">
                <span class="bind-text">{{ userInfo.name }}</span>
              </div>
              <div>
                <!-- <el-button plain @click="editNickName(nickName)"
                  >编辑</el-button
                > -->
                <div
                  class="setting-btn"
                  :class="editShow ? 'active-btn' : ''"
                  @click="editNickName(nickName)"
                >
                  {{ $t("userInfo.编辑") }}
                </div>
              </div>
            </li>
            <li class="flex-box">
              <div class="flex-box">
                <div class="img-container">
                  <img v-if="avatar" :src="avatar" alt="" />
                  <img v-else src="@/assets/images/avatar-pc.png" alt="" />
                </div>
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.头像") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.请选择一个头像以个性化您的帐户") }}
                  </p>
                </div>
              </div>
              <div>
                <!-- <el-button type="primary" @click="editAvatar">更改</el-button> -->
                <div
                  class="setting-btn"
                  :class="editAvatarShow ? 'active-btn' : ''"
                  @click="editAvatar"
                >
                  {{ $t("userInfo.更改") }}
                </div>
              </div>
            </li>
            <li class="flex-box li-b">
              <div class="flex-box">
                <div class="img-container">
                  <img v-if="avatar" :src="avatar" alt="" />
                  <img v-else src="@/assets/images/avatar-pc.png" alt="" />
                </div>
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.用户名") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.为您的个人资料设置自定义用户名") }}
                  </p>
                </div>
              </div>
              <div class="bind-success fix-width">
                <span class="bind-text">{{ userInfo.communityUsername }}</span>
              </div>
              <div>
                <!-- <el-button plain @click="editNickName(nickName)"
                  >编辑</el-button
                > -->
                <div
                  class="setting-btn"
                  :class="userEditShow ? 'active-btn' : ''"
                  @click="userEdit(communityUsername)"
                >
                  {{ $t("userInfo.编辑") }}
                </div>
              </div>
            </li>
            <li class="flex-box li-b">
              <div class="flex-box">
                <div class="img-container">
                  <img v-if="avatar" :src="avatar" alt="" />
                  <img v-else src="@/assets/images/avatar-pc.png" alt="" />
                </div>
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.简介") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.为您的个人资料设置自定义个人简介") }}
                  </p>
                </div>
              </div>
              <div class="bind-success fix-width">
                <span class="bind-text">{{ userInfo.introduction }}</span>
              </div>
              <div>
                <!-- <el-button plain @click="editNickName(nickName)"
                  >编辑</el-button
                > -->
                <div
                  class="setting-btn"
                  :class="desEditShow ? 'active-btn' : ''"
                  @click="editDes(introduction)"
                >
                  {{ $t("userInfo.编辑") }}
                </div>
              </div>
            </li>
          </ul>

          <h2>{{ $t("userInfo.通知") }}</h2>
          <ul>
            <li class="flex-box special special-b">
              <div class="flex-box">
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.通知接受方式") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.部分地区短信受限，建议使用") }}
                  </p>
                </div>
              </div>
              <div class="select">
                <el-select
                  v-model="receiveMethod"
                  @change="handleReceive"
                  :placeholder="$t('userInfo.请选择')"
                >
                  <el-option
                    v-for="item in receviceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="flex-box special">
              <div class="flex-box">
                <div class="flex-box-column content-tip">
                  <p class="main-text main-size main-color">
                    {{ $t("userInfo.营销消息推送") }}
                  </p>
                  <p class="main-text thiny-size thiny-color">
                    {{ $t("userInfo.接受来自我们的营销电子邮件") }}
                  </p>
                </div>
              </div>
              <div>
                <el-switch
                  v-model="advertiseMsg"
                  active-value="OPEN"
                  inactive-value="CLOSE"
                  @change="handleAdvertiseMsg"
                >
                </el-switch>
              </div>
            </li>
          </ul>
          <!-- 汇率 -->
          <div style="margin-top: 20px">
            <el-button plain style="width: 100%" class="text-btn">
              <div class="content-fix">
                <div>{{ $t("userInfo.汇率") }}</div>
                <el-select
                  class="select-input"
                  v-model="exchangeRateObj.name"
                  :placeholder="$t('userInfo.请选择')"
                  style="width: 100px"
                  @change="onExchange"
                >
                  <el-option
                    v-for="item in exchangeRateList"
                    :key="item.optionValue"
                    :label="item.optionName"
                    :value="item.optionName"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-button>

            <el-button plain style="width: 100%" class="text-btn">
              <div class="content-fix">
                <div>{{ $t("userInfo.默认支付币种") }}</div>
                <el-select
                  class="select-input"
                  v-model="defaultPayCionObj.name"
                  :placeholder="$t('userInfo.请选择')"
                  style="width: 100px"
                  @change="payCionChange"
                >
                  <el-option
                    v-for="item in defaultPayCionList"
                    :key="item.optionValue"
                    :label="item.optionName"
                    :value="item.optionName"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-button>

            <el-button plain style="width: 100%" class="text-btn">
              <div class="content-fix">
                <div>{{ $t("userInfo.涨跌幅基准") }}</div>
                <span class="staticLabel">24H</span>
                <!-- <el-select
                  class="select-input"
                  v-model="priceMovementBaseObj.name"
                  :placeholder="$t('userInfo.请选择')"
                  style="width: 120px"
                  @change="priceMovementBaseChange"
                >
                  <el-option
                    v-for="item in priceMovementBaseList"
                    :key="item.optionValue"
                    :label="item.optionName"
                    :value="item.optionName"
                  >
                  </el-option>
                </el-select> -->
              </div>
            </el-button>
            <!-- 
            <el-button plain style="width: 100%" class="text-btn">
              <div class="content-fix">
                <div>{{ $t("userInfo.主题模式") }}</div>
                <el-select
                  class="select-input"
                  v-model="themeModeObj.name"
                  :placeholder="$t('userInfo.请选择')"
                  style="width: 110px"
                  @change="themeModeChange"
                >
                  <el-option
                    v-for="item in themeModeList"
                    :key="item.optionValue"
                    :label="item.optionName"
                    :value="item.optionName"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-button> -->

            <h2>{{ $t("userInfo.涨跌颜色") }}</h2>
            <ul>
              <li
                :class="[
                  'flex-box',
                  'special',
                  activeItem !== index ? 'choose' : '',
                ]"
                v-for="(item, index) in priceColorList"
                :key="index"
                @click="choose(index, item)"
              >
                <div class="flex-box">
                  <p class="main-text main-size main-color">
                    {{ $t(`userInfo.${item.optionName}`) }}
                  </p>
                </div>
                <div
                  :class="{ active: activeItem === index }"
                  style="padding-right: 30px"
                >
                  <svg-icon :iconClass="item.icon"></svg-icon>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <name-edit
      ref="editNameRef"
      :is-show.sync="editShow"
      :nickName.sync="nickName"
      @editNameChange="editNameChange"
      @handleEditName="handleEditName"
      @close="close"
    ></name-edit>
    <common-modal
      :title="$t('userInfo.更换头像')"
      width="600px"
      :show="editAvatarShow && !dialogVisible"
      :showClose="true"
      @cancel="editAvatarShow = false"
    >
      <template #dia_content>
        <div class="avatar-content">
          <div class="avatar-title">
            {{
              $t(
                "userInfo.其他用户会看到您的头像。成功提交后，我们将会审核上传的图片，过程需时数分钟。"
              )
            }}
          </div>
          <div class="border"></div>
          <div class="avatar">
            <div class="avatar-box" @click="$refs.file.click()">
              <div class="upload-content">
                <img src="@/assets/images/avatar-add.png" alt="" />
                <input
                  id="file"
                  type="file"
                  ref="file"
                  hidden
                  @change="onFileChange"
                />
                <div class="el-upload__text">
                  <em>{{ $t("userInfo.上传文件") }}</em
                  >{{ $t("userInfo.或拖拽放入") }}
                  <p>
                    {{
                      $t("userInfo.支持JPG、PNG、GIF 格式文档，最大不超过 10M")
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </common-modal>
    <!-- 修改头像 -->
    <avatarEdit
      :is-show.sync="dialogVisible"
      :preview-image="previewImage"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
      @onUpdatePhoto="onUpdatePhoto"
      :loading="updatePhotoLoading"
    />
    <!-- <div class="update-photo">
      <el-dialog
        style="text-align: left"
        :visible.sync="flag"
        append-to-body
        @opened="onDialogOpened"
        @closed="onDialogClosed"
        width="600px"
      >
        <div slot="title">
          <div style="color: #333; font-size: 18px">
            {{ $t("userInfo.更换头像") }}
          </div>
        </div>
        <div class="dialog-text">
          {{
            $t(
              "userInfo.其他用户会看到您的头像。成功提交后，我们将会审核上传的图片，过程需时数分钟。"
            )
          }}
        </div>
        <div class="preview-border"></div>
        <div class="preview-image-wrap">
          <img class="preview-image" :src="previewImage" ref="preview-image" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 240px" @click="dialogVisible = false">{{
            $t("userInfo.取 消")
          }}</el-button>
          <el-button
            style="width: 240px; background: #90ff00; color: #fff"
            :loading="updatePhotoLoading"
            @click="onUpdatePhoto"
            >{{ $t("userInfo.保 存") }}</el-button
          >
        </span>
      </el-dialog>
    </div> -->
    <username-edit
      ref="uerEditNameRef"
      :is-show.sync="userEditShow"
      :communityUsername.sync="communityUsername"
      @editUsernameChange="editUsernameChange"
      @handleUsername="handleUsername"
      @close="close"
    ></username-edit>
    <des-edit
      ref="desEditeRef"
      :is-show.sync="desEditShow"
      :introduction.sync="introduction"
      @editIntroduction="editIntroduction"
      @handleIntroduction="handleIntroduction"
      @close="close"
    ></des-edit>
  </div>
</template>

<script>
import NameEdit from "./components/nameEdit.vue";
import CommonModal from "@/components/commonModal/index.vue";
import avatarEdit from "./components/avatarEdit.vue";
import usernameEdit from "./components/usernameEdit.vue";
import desEdit from "./components/desEdit.vue";
import {
  infoHome,
  userSettingsApi,
  settingsUpdateApi,
  updateUserInfo,
  messageSettingApi,
  messageUpdateApi,
  updateUserDetails,
} from "@/api/user";
import { setExchange, getToken } from "@/libs/utils";
//上传功能
import { getFileURLSign } from "@/api/common.js";
import request from "@/request/request";
import axios from "axios";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import { baseApi } from "@/request/baseApi.js";

export default {
  name: "LikeSetting",
  components: {
    NameEdit,
    avatarEdit,
    CommonModal,
    usernameEdit,
    desEdit,
  },
  data() {
    return {
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      dialogVisible: false,
      editAvatarShow: false,
      editShow: false,
      userEditShow: false,
      desEditShow: false,
      activeItem: null,
      receviceList: [
        {
          label: this.$t("userInfo.全部"),
          value: 1,
        },
        {
          label: this.$t("userInfo.仅邮件"),
          value: 2,
        },
      ],
      //接口数据
      userInfo: {},
      nickName: "", //昵称
      avatar: "", //头像
      communityUsername: "", //社区用户名
      introduction: "", //简介
      //主题
      themeModeObj: {
        key: "",
        name: "",
      },
      themeModeList: [],
      //汇率
      exchangeRateObj: {
        key: "",
        name: "",
      },
      exchangeRateList: [],
      //默认支付币种
      defaultPayCionObj: {
        key: "",
        name: "",
      },
      defaultPayCionList: [],
      //涨跌幅基准
      priceMovementBaseObj: {
        key: "",
        name: "",
      },
      priceMovementBaseList: [],
      //k线涨跌颜色
      priceColorObj: {
        key: "",
        name: "",
      },
      priceColorList: [],
      //通知
      advertiseMsg: "", //营销信息推送
      receiveMethod: null, //消息接收方式 1-所有；2-仅邮件；
      //上传文件参数
      imgUrl: "",
      previewImage: "", // 上传图片
      cropper: null, // 裁切器示例
      updatePhotoLoading: false,
      fileName: undefined,
      url: undefined,
    };
  },
  mounted() {
    // this.getUserInfo();
    this.getUserSettings();
    this.getmessageSetting();
  },
  methods: {
    //-----------头像上传-------------
    onFileChange() {
      // 处于图片预览
      const file = this.$refs.file;
      // console.log('kdjskfd',file);
      //图片格式以及大小校验
      const type = file.type === "image/jpg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!type) {
        this.$message.error(
          this.$t("userInfo.图片格式不正确！（只能包含jpg，gif，png）")
        );
        return;
      }
      if (!isLt2M) {
        this.$message.error(this.$t("userInfo.上传图片大小不能超过 10MB"));
        return;
      }

      const blobData = window.URL.createObjectURL(file.files[0]);
      this.fileName = file.files[0].name;
      console.log("kdjskfd", this.fileName);
      this.previewImage = blobData;
      // 展示弹出层，预览用户选择的图片
      this.dialogVisible = true;
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = "";
    },
    onDialogOpened(image) {
      // const image = this.$refs["preview-image"];
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      console.log("this.co", this.cropper);
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false,
        background: false,
        // 当你移动裁切器的时候会触发调用 crop 方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      });
    },
    onDialogClosed() {
      // 对话框关闭，销毁裁切器
      this.cropper.destroy();
      this.cropper = null;
    },
    onUpdatePhoto() {
      // 让确定按钮开始 loading
      this.updatePhotoLoading = true;
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const formData = new FormData();
        formData.append("file", file);
        axios({
          url: this.uploadImgUrl,
          method: "post",
          data: formData,
          headers: {
            Token: getToken(),
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          this.dialogVisible = false;
            this.editAvatarShow = false;
            this.updatePhotoLoading = false;
            this.imgUrl = res.data?.data?.url;
             // 更新顶部登录用户的信息
            updateUserDetails({ avatar: this.imgUrl }).then((res) => {
              if (res && res.status === 200) {
                if (res.data && res.data.success) {
                  this.$message({
                    message: this.$t("userInfo.头像上传成功"),
                    type: "success",
                  });
                  // this.getUserInfo(); //昵称修改有问题，用户修改达到上限
                }
              }
            });
        });
        return;
        getFileURLSign({ fileName: this.fileName }).then((res) => {
          this.url = res.data.fileUrl;
          this.fileName = res.data.fileName;
          let newFile = new window.File([file], this.fileName);
          axios({
            url: res.data.url,
            method: "put",
            data: newFile,
            headers: {
              "Content-Type": null,
            },
          }).then((res) => {
            this.dialogVisible = false;
            this.editAvatarShow = false;
            this.updatePhotoLoading = false;
            this.imgUrl = this.url;
            // 更新顶部登录用户的信息
            updateUserDetails({ avatar: this.imgUrl }).then((res) => {
              if (res && res.status === 200) {
                if (res.data && res.data.success) {
                  this.$message({
                    message: this.$t("userInfo.头像上传成功"),
                    type: "success",
                  });
                  this.getUserInfo(); //昵称修改有问题，用户修改达到上限
                }
              }
            });
          });
        });
      });
    },
    //-----------头像上传-------------

    handleCancel() {
      this.handleRemove();
      this.editAvatarShow = false;
    },
    //获取用户信息
    getUserInfo() {
      infoHome().then((res) => {
        console.log("获取用户信息=>", res);
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.userInfo = res.data.data || {};
            this.nickName = res.data?.data?.name;
            this.avatar = res.data?.data?.avatar;
            this.communityUsername = res.data?.data?.communityUsername;
            this.introduction = res.data?.data?.introduction;
          }
        }
      });
    },
    //通知
    getmessageSetting() {
      messageSettingApi().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.advertiseMsg = res.data?.data?.advertiseMsg;
            this.receiveMethod = res.data?.data?.receiveMethod;
          }
        }
      });
    },
    //修改营销消息通知
    handleAdvertiseMsg(val) {
      this.advertiseMsg = val;
      messageUpdateApi({ advertiseMsg: this.advertiseMsg }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getmessageSetting();
          }
        }
      });
    },
    //修改消息接受方式
    handleReceive(val) {
      this.receiveMethod = val;
      messageUpdateApi({ receiveMethod: this.receiveMethod }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getmessageSetting();
          }
        }
      });
    },
    //偏好设置，我的设置
    getUserSettings() {
      userSettingsApi().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            const list = res.data.data;
            list.forEach((item) => {
              switch (item.key) {
                case "theme_mode":
                  this.themeModeObj.key = item.key;
                  this.themeModeObj.name = item.name;
                  const optionNameStr = item.optionName;
                  const optionNameArr = optionNameStr.split(",");
                  const optionNamelist = optionNameArr.map((item) => ({
                    optionName: item,
                  }));
                  const optionValueStr = item.optionValue;
                  const optionValueArr = optionValueStr.split(",");
                  const optionValueList = optionValueArr.map((item) => ({
                    optionValue: item,
                  }));
                  //数组合并
                  this.themeModeList = optionNamelist.map((item, index) => {
                    return { ...item, ...optionValueList[index] };
                  });
                  break;
                case "default_pay_cion":
                  this.defaultPayCionObj.key = item.key;
                  this.defaultPayCionObj.name = item.name;
                  const payCionStr = item.optionName;
                  const payCionArr = payCionStr.split(",");
                  const payCionList1 = payCionArr.map((item) => ({
                    optionName: item,
                  }));
                  const payCionStr2 = item.optionValue;
                  const payCionArr2 = payCionStr2.split(",");
                  const payCionList2 = payCionArr2.map((item) => ({
                    optionValue: item,
                  }));
                  this.defaultPayCionList = payCionList1.map((item, index) => {
                    return { ...item, ...payCionList2[index] };
                  });
                  break;
                case "price_color":
                  this.priceColorObj.key = item.key;
                  this.priceColorObj.name = item.name;
                  if (this.priceColorObj.name === "绿涨红跌") {
                    this.activeItem = 0;
                  } else {
                    this.activeItem = 1;
                  }
                  const priceColorStr = item.optionName;
                  const priceColorArr = priceColorStr.split(",");
                  const priceColorList = priceColorArr.map((item) => ({
                    optionName: item,
                  }));

                  const priceColorStr2 = item.optionValue;
                  const priceColorArr2 = priceColorStr2.split(",");
                  const priceColorList2 = priceColorArr2.map((item) => ({
                    optionValue: item,
                  }));
                  this.priceColorList = priceColorList.map((item, index) => {
                    return { ...item, ...priceColorList2[index] };
                  });
                  this.priceColorList.forEach((ele) => {
                    if (ele.optionValue === "绿涨红跌") {
                      this.$set(ele, "icon", "reverse");
                    } else {
                      this.$set(ele, "icon", "noreverse");
                    }
                  });

                  //不做选择
                  this.priceColorList = [
                    {
                      icon: "reverse",
                      optionName: "绿涨红跌",
                      optionValue: "绿涨红跌",
                    },
                  ];
                  console.log("prompt", this.priceColorList);
                  break;
                case "exchange_rate":
                  this.exchangeRateObj.key = item.key;
                  this.exchangeRateObj.name = item.name;
                  // 缓存初始汇率name
                  setExchange(item.name);
                  const exchangeStr = item.optionName;
                  const exchangeArr = exchangeStr.split(",");
                  const exchangeList1 = exchangeArr.map((item) => ({
                    optionName: item,
                  }));
                  const exchangeStr2 = item.optionValue;
                  const exchangeArr2 = exchangeStr2.split(",");
                  const exchangeList2 = exchangeArr2.map((item) => ({
                    optionValue: item,
                  }));
                  this.exchangeRateList = exchangeList1.map((item, index) => {
                    return { ...item, ...exchangeList2[index] };
                  });
                  break;
                case "price_movement_base":
                  this.priceMovementBaseObj.key = item.key;
                  this.priceMovementBaseObj.name = item.name;
                  const priceMovementStr = item.optionName;
                  const priceMovementArr = priceMovementStr.split(",");
                  const priceMovementList1 = priceMovementArr.map((item) => ({
                    optionName: item,
                  }));
                  const priceMovementStr2 = item.optionValue;
                  const priceMovementArr2 = priceMovementStr2.split(",");
                  const priceMovementList2 = priceMovementArr2.map((item) => ({
                    optionValue: item,
                  }));
                  this.priceMovementBaseList = priceMovementList1.map(
                    (item, index) => {
                      return { ...item, ...priceMovementList2[index] };
                    }
                  );
                  break;
                case "language":
                  break;
                default:
              }
            });
          }
        }
      });
    },
    //修改汇率
    onExchange(val) {
      this.exchangeRateObj.name = val;
      const params = {
        key: this.exchangeRateObj.key,
        name: this.exchangeRateObj.name,
      };
      settingsUpdateApi(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getUserSettings();
            setExchange(params.name); //缓存修改过后汇率参数name
          }
        }
      });
    },
    //修改默认支付币种
    payCionChange(val) {
      this.defaultPayCionObj.name = val;
      const params = {
        key: this.defaultPayCionObj.key,
        name: this.defaultPayCionObj.name,
      };
      settingsUpdateApi(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getUserSettings();
          }
        }
      });
    },
    //修改涨跌幅基准
    priceMovementBaseChange(val) {
      this.priceMovementBaseObj.name = val;
      const params = {
        key: this.priceMovementBaseObj.key,
        name: this.priceMovementBaseObj.name,
      };
      settingsUpdateApi(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getUserSettings();
          }
        }
      });
    },
    //修改主题
    themeModeChange(val) {
      this.themeModeObj.name = val;
      const params = {
        key: this.themeModeObj.key,
        name: this.themeModeObj.name,
      };
      settingsUpdateApi(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getUserSettings();
          }
        }
      });
    },
    // 修改涨跌颜色
    choose(index, item) {
      return;
      this.activeItem = index;
      const params = {
        key: this.priceColorObj.key,
        name: item.optionName,
      };
      settingsUpdateApi(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getUserSettings();
          }
        }
      });
    },
    editNameChange(val) {
      this.nickName = val;
    },
    //修改昵称
    handleEditName() {
      const params = {
        name: this.nickName,
      };
      updateUserDetails(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.$message({
              message: this.$t("userInfo.昵称编辑成功"),
              type: "success",
            });
            this.getUserInfo(); //昵称修改有问题，用户修改达到上限
            this.$store.dispatch("getUserInfo"); //调用vuex的action方法
          }
        }
      });
    },
    // 编辑头像
    editAvatar() {
      this.editAvatarShow = true;
    },
    // 编辑昵称
    editNickName(name) {
      this.editShow = true;
      this.$refs.editNameRef.getName(name);
    },
    // 编辑用户名
    userEdit(name) {
      this.userEditShow = true;
      this.$refs.uerEditNameRef.getName(name);
    },
    editUsernameChange(val) {
      this.communityUsername = val;
    },
    handleUsername() {
      //调接口
      const params = {
        username: this.communityUsername,
      };
      updateUserDetails(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.$message({
              message: this.$t("userInfo.用户名编辑成功"),
              type: "success",
            });
            this.getUserInfo(); //昵称修改有问题，用户修改达到上限
            this.$store.dispatch("getUserInfo"); //调用vuex的action方法
          }
        }
      });
    },
    // 编辑个人简介
    editDes(name) {
      this.desEditShow = true;
      this.$refs.desEditeRef.getName(name);
    },
    editIntroduction(val) {
      this.introduction = val;
    },
    handleIntroduction() {
      const params = {
        introduction: this.introduction,
      };
      updateUserDetails(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.$message({
              message: this.$t("userInfo.个人简介编辑成功"),
              type: "success",
            });
            this.getUserInfo(); //昵称修改有问题，用户修改达到上限
            this.$store.dispatch("getUserInfo"); //调用vuex的action方法
          }
        }
      });
    },
    //关闭
    close() {
      this.getUserInfo();
      this.$refs.editNameRef.getName(this.nickName);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 12px;
}

.preview-border {
  margin: 15px 0 30px 20px;

  width: 560px;
  border: 1px solid #e1e1e1;
}
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  margin-left: 20px;
  width: 560px;
  .preview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 300px;
  }
}
.footer-btn {
  display: flex;
  justify-content: space-around;
  ::v-deep .el-button {
    width: 120px;
    background: $colorB;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
}
.avatar-content {
  font-size: 12px;
  color: #999;
  font-weight: 500;
  .avatar-title {
    padding: 0 20px;
  }
  .border {
    border-bottom: 1px solid #f5f5f5;
    margin-top: 15px;
  }
  .avatar {
    display: flex;
    justify-content: center;
    .avatar-box {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      width: 560px;
      height: 342px;
      border-radius: 6px;
      border: 1px dashed #f5f5f5;
    }
  }
  .upload-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .el-upload__text {
      font-size: 16px;
      color: #999;
      em {
        display: inline-block;
        color: #90ff00;
        margin: 20px 0 5px 0;
        padding-right: 5px;
      }
      p {
        font-size: 12px;
      }
    }
  }
}
.securyty-setting {
  padding: 20px 20px 0px 20px;
  background: #f5f7fa;

  .common-form {
    padding: 60px;
    width: 100%;
    height: 900px;
    background-color: #ffffff;
  }
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-box-column {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  h1 {
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    height: 52px;
    line-height: 52px;
  }
  .setting-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 90px;
    background: #edf1ff;
    border-radius: 15px;
    padding: 20px 70px;
    margin-bottom: 20px;
    .el-icon-warning-outline {
      font-size: 36px;
      color: $colorB;
      margin-right: 20px;
    }
  }

  .setting-content {
    width: 100%;
    padding: 0 50px 20px 30px;
    background: #ffffff;
    border-radius: 15px;
    .setting-btn {
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 6px;
      border: 2px solid $colorB;
      color: $colorB;
      font-size: 16px;
    }
    .active-btn {
      background: #90ff00;
      color: #ffffff;
    }
    h2 {
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      height: 90px;
      line-height: 90px;
    }
    .fix-width {
      width: 180px;
    }
    ul {
      width: 100%;
      li {
        width: 100%;
        height: 90px;
        position: relative;
        cursor: pointer;
        // &::before {
        //   content: "";
        //   position: absolute;
        //   bottom: 0;
        //   left: 60px;
        //   width: 96%;
        //   height: 1px;
        //   background-color: #f5f5f5;
        // }
        .img-container {
          margin-right: 20px;
          img {
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 50%;
          }
        }
        .content-tip {
          height: 50px;
        }
        .bind-success {
          .el-icon-circle-check {
            font-size: 20px;
            margin-right: 10px;
            color: #90ff00;
            vertical-align: middle;
          }
          .el-icon-circle-close {
            font-size: 20px;
            margin-right: 10px;
            vertical-align: middle;
          }
          .bind-text {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
          }
        }
      }
      .li-b::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50px;
        width: 96%;
        height: 1px;
        background-color: #f5f5f5;
      }
      .special {
        width: 100%;
        height: 90px;
        position: relative;
        // &::before {
        //   content: "";
        //   position: absolute;
        //   bottom: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 1px;
        //   background-color: #e1e1e1;
        // }
      }

      .special-b::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #f5f5f5;
      }

      .choose {
        position: relative;
        ::before {
          content: "";
          position: absolute;
          bottom: 35%;
          right: 2px;
          display: inline-block;
          width: 11px;
          height: 5px;
          border: 2px solid $colorB;
          border-right: none;
          border-top: none;
          transform: rotate(-45deg) translate(7px, -10px);
        }
      }
    }
  }

  .main-text {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }

  .thiny-text {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
  }

  .main-size {
    font-size: 16px;
  }

  .thiny-size {
    font-size: 14px;
  }
  .main-color {
    color: #333333;
  }

  .thiny-color {
    color: #96a2b2;
  }

  .fix-height {
    height: 50px;
  }

  .disabled-count {
    color: $colorB;
  }
}

.text-btn {
  width: 100%;
  height: 42px;
  padding: 0 10px;
  margin-top: 30px;
  margin-left: 0;
  .content-fix {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .staticLabel {
      color: #96a2b2;
    }
  }
  ::v-deep .el-select {
    .el-input__inner {
      border: none;
    }
  }
}
::v-deep .avatar-content {
  color: #96a2b2;
  font-size: 14px;
  padding-left: 10px;
}
::v-deep .avatar-content .upload-content .el-upload__text[data-v-819f19c0] {
  color: #96a2b2;
}

::v-deep .el-button {
  border-color: #f5f5f5;
}
.text-btn {
  height: 50px;
}
.select {
  ::v-deep .el-input__inner {
    border: 1px solid #f5f5f5;
  }
}
::v-deep .el-input__inner {
  color: #96a2b2 !important;
}
.update-photo {
  background-color: red;
}
</style>
