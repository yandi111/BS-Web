<!-- 个人中心-总览 -->
<template>
  <div class="user-center">
    <div v-if="!publishShow">
      <div class="userinfo">
        <div class="info-container">
          <div
            @click="
              (userInfo.userId == $route.query.userId ||
                !$route.query.isMerchant) &&
                (editAvatarShow = true)
            "
            :class="[
              {
                pointer:
                  userInfo.userId == $route.query.userId ||
                  !$route.query.isMerchant,
              },
            ]"
          >
            <el-avatar
              :size="80"
              fit="cover"
              :src="merchantInfo?.avatarPicture"
            />
          </div>
          <!-- 是否为当前登陆人发布的广告 -->
          <div class="info-item">
            <span
              v-if="
                !$route.query.isMerchant ||
                ($route.query.isMerchant &&
                  userInfo.userId == $route.query.userId)
              "
            >
              <span class="item-bold1"
                >{{ $t(t + "您好") }}，{{ merchantInfo?.userName }}
              </span>
              <i
                class="el-icon-edit-outline"
                @click="
                  (editNickNameShow = true),
                    $refs.editNameRef.getName(merchantInfo?.userName)
                "
              ></i>
              <span class="no-dentify">{{ merchantInfo?.userType === 1 ? $t(t + '商家'):$t(t+'普通用户') }}</span>
            </span>
            <span
              v-if="
                $route.query.userId && userInfo.userId != $route.query.userId
              "
            >
              <span class="item-bold1" v-if="!isEdit">{{
                merchantInfo?.userName
              }}</span>
              <span class="no-dentify">{{ merchantInfo?.userType === 1 ? $t(t + '商家'):$t(t+'普通用户') }}</span>
              <span
                class="no-star"
                @click="handleFocus(merchantInfo?.attentionType == 1 ? 0 : 1)"
                v-if="merchantInfo?.attentionType != 2"
              >
                <svg-icon
                  class="inline-block width13 height13 mr5"
                  :iconClass="
                    merchantInfo?.attentionType == 1 ? 'focused' : 'focus'
                  "
                  style="vertical-align: middle; margin-top: -2px"
                ></svg-icon>
                {{
                  merchantInfo?.attentionType == 1
                    ? $t(t + "已关注")
                    : merchantInfo?.attentionType == 0
                    ? $t(t + "关注")
                    : ""
                }}
              </span>
              <span
                class="lahei"
                @click="handleFocus(merchantInfo?.attentionType == 2 ? 0 : 2)"
              >
                <svg-icon
                  class="inline-block width13 height13 mr5"
                  v-if="merchantInfo?.attentionType != 2"
                  iconClass="stopLh"
                  style="vertical-align: middle; margin-top: -2px"
                ></svg-icon>
                {{
                  merchantInfo?.attentionType != 2
                    ? $t(t + "拉黑")
                    : $t(t + "解除拉黑")
                }}
              </span>
            </span>
            <span class="verify flexs">
              <span class="flexs">
                {{ $t(t + "电子邮箱验证")
                }}<el-image
                  class="ml10"
                  :src="
                    require(`@/assets/business/${
                      merchantInfo?.mailAuth ? 'success' : 'danger'
                    }.png`)
                  "
              /></span>
              <span class="flexs">
                {{ $t(t + "手机验证")
                }}<el-image
                  class="ml10"
                  :src="
                    require(`@/assets/business/${
                      merchantInfo?.phoneAuth ? 'success' : 'danger'
                    }.png`)
                  "
              /></span>
              <span class="flexs">
                {{ $t(t + "身份认证")
                }}<el-image
                  class="ml10"
                  :src="
                    require(`@/assets/business/${
                      merchantInfo?.identityAuth ? 'success' : 'danger'
                    }.png`)
                  "
              /></span>
            </span>
          </div>
        </div>
      </div>
      <div class="history-content">
        <div class="panel">
          <h3>{{ $t(t + "近30天") }}</h3>
          <div class="panel-count">
            <div class="item">
              <div>
                {{ $t(t + "成交单数(近 30 天)") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '近30天内完成的订单数量 (购买和出售)')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>
                {{ merchantInfo?.thirtySucceedCount || 0 }}{{ $t(t + "单") }}
              </div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "成交率(近 30 天)") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '近30天内完成的订单占所有订单的百分比')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>{{ merchantInfo?.thirtySucceedRate || 0 }} %</div>
            </div>
            <div class="item">
              <div class="change-up">{{ $t(t + "买") }}</div>
              <div>{{ merchantInfo?.merchantBuyCount || 0 + $t(t+'次')}}</div>
            </div>
            <div class="item">
              <div class="change-down">{{ $t(t + "卖") }}</div>
              <div>{{ merchantInfo?.merchantSellCount || 0 + $t(t+'次')}}</div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "交易用户数(近30天)") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '近30天内与之交易过的用户数量')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>{{ merchantInfo?.userDealQty || 0 }}</div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h3>{{ $t(t + "总计") }}</h3>
          <div class="panel-count">
            <div class="item">
              <div>
                {{ $t(t + "总成交单数") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t+'自加入平台以来已完成的购买及出售订单总数')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>{{ merchantInfo?.merchantSucceedCount || 0 + $t(t+'单')}}</div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "交易总额", ["(USDT)"]) }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="
                    $t(
                      t +
                        '过去六个月内已完成的购买以及出售订单总金额（以人民币计算）'
                    )
                  "
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>{{ merchantInfo?.merchantQtyTotalUSDT || 0 }}USDT</div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "成交率") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '已完成订单占全部订单的百分比')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>{{ merchantInfo?.thirtySucceedRate || 0 }}%</div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "平均付款时间") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '在订单中作为买家的平均付款时间')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>
                {{ merchantInfo?.averagePaymentTime || 0 }}{{ $t(t + "分钟") }}
              </div>
            </div>
            <div class="item">
              <div>
                {{ $t(t + "平均放币时间") }}
                <el-tooltip
                  style="display: inline-block"
                  popper-class="atooltip"
                  effect="light"
                  :content="$t(t + '在订单中作为卖家的平均放币时间')"
                  placement="top"
                >
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </div>
              <div>
                {{ merchantInfo?.averageReleaseTime || 0 }}{{ $t(t + "分钟") }}
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h3>{{ $t(t + "其他") }}</h3>
          <div class="panel-count">
            <div class="item">
              <div>{{ $t(t + "粉丝") }}</div>
              <div>{{ merchantInfo?.fanCount || 0 + $t(t+'个') }}</div>
            </div>
            <div class="item">
              <div>{{ $t(t + "被拉黑次数") }}</div>
              <div>{{ merchantInfo?.blockCount || 0 + $t(t+'个')}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 我的广告 收付款设置 -->
      <div
        class="set-content"
        v-if="
          !$route.query.isMerchant ||
          ($route.query.isMerchant && userInfo.userId == $route.query.userId)
        "
      >
        <div class="top-container">
          <div class="topNav between">
            <ul class="tabs flexs">
              <li
                v-for="(item, index) in leftList"
                :key="index"
                class="mr40"
                :class="activeIndex == item.key ? 'tabs-active' : ''"
                @click="handleNav(index, item)"
              >
                <span class="pointer">{{ $t(t + item.title) }}</span>
              </li>
            </ul>
            <el-button
              v-if="activeIndex === 1"
              class="addPay"
              @click="handlePayAdd(undefined)"
            >
              {{ $t(t + "新增") }}
            </el-button>
            <!-- <div class="pointer addPay" @click="handlePayAdd(undefined)" v-if="activeIndex === 1">
							<span  style="margin: 0 auto;">{{ $t(t+'新增')  }}</span>
							
						</div> -->
          </div>
        </div>
        <div>
          <my-advice
            class="mt10"
            @handlePublish="handlePublish"
            ref="my"
            v-if="activeIndex === 0"
          ></my-advice>
          <receive-payments
            v-if="activeIndex === 1"
            ref="payments"
            @handlePay="handlePayAdd"
          ></receive-payments>
        </div>
      </div>
      <!-- 关注 黑名单 -->
      <div
        class="set-content"
        v-if="
          !$route.query.isMerchant ||
          ($route.query.isMerchant && userInfo.userId == $route.query.userId)
        "
      >
        <div class="topNav between">
          <ul class="tabs flexs">
            <li
              v-for="(item, index) in focusList"
              :key="index"
              class="mr40"
              :class="activeFocusIndex === index ? 'tabs-active' : ''"
              @click="handleFocusNav(index)"
            >
              <span class="pointer">{{ $t(t + item) }}</span>
            </li>
          </ul>
        </div>
        <div>
          <focus-list v-if="activeFocusIndex === 0"></focus-list>
          <black-list v-if="activeFocusIndex === 1"></black-list>
        </div>
      </div>

      <h2
        class="order-title mt40"
        v-if="
          $route.query.isMerchant && userInfo.userId != this.$route.query.userId
        "
      >
        {{ $t(t + "Ta的委托单") }}
      </h2>
      <!-- Ta的委托单 -->
      <div
        class="set-content"
        v-if="
          $route.query.isMerchant && userInfo.userId != this.$route.query.userId
        "
      >
        <order-list :userId="this.$route.query.userId"></order-list>
      </div>
    </div>
    <!-- 添加收付款 -->
    <pay-form
      :is-show.sync="showPayForm"
      :edit-form-info="editFormInfo"
      ref="parForm"
      @next="handleNext"
    ></pay-form>
    <!-- 编辑广告 -->
    <publish-ad
      ref="publishEdit"
      @list="handleEndPublish"
      v-if="publishShow"
    ></publish-ad>
    <!-- 修改用户名 -->
    <name-edit
      ref="editNameRef"
      :is-show.sync="editNickNameShow"
      :nickName.sync="merchantInfo && merchantInfo.userName"
      @handleEditName="handleEditName"
    />

    <!-- 修改头像 -->
    <common-modal
      :title="$t(t + '更换头像')"
      width="600px"
      :show="editAvatarShow"
      :showClose="true"
      @cancel="editAvatarShow = false"
    >
      <template #dia_content>
        <div class="avatar-content">
          <div>
            {{
              $t(
                t +
                  "其他用户会看到您的头像。成功提交后，我们将会审核上传的图片，过程需时数分钟。"
              )
            }}
          </div>
          <div class="border"></div>
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
                <em>{{ $t(t + "上传文件") }}</em> {{ $t(t + "或拖拽放入") }}
                <p>
                  {{ $t(t + "支持JPG、PNG、GIF 格式文档，最大不超过 10M") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </common-modal>
    <!-- 修改头像 -->
    <div class="update-photo">
      <el-dialog
        style="text-align: left"
        :visible.sync="dialogVisible"
        append-to-body
        @opened="onDialogOpened"
        @closed="onDialogClosed"
        width="600px"
      >
        <div slot="title">
          <div style="color: #333; font-size: 18px">
            {{ $t(t + "更换头像") }}
          </div>
        </div>
        <div style="margin-left: 20px; color: #8992a6; font-size: 12px">
          {{
            $t(
              t +
                "其他用户会看到您的头像。成功提交后，我们将会审核上传的图片，过程需时数分钟。"
            )
          }}
        </div>
        <div class="preview-border"></div>
        <div class="preview-image-wrap">
          <img class="preview-image" :src="previewImage" ref="preview-image" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 240px" @click="dialogVisible = false">
            {{ $t(t + "取消") }}
          </el-button>
          <el-button
            style="width: 240px; background: #90ff00; color: #fff"
            :loading="updatePhotoLoading"
            @click="onUpdatePhoto"
            >{{ $t(t + "保存") }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MyAdvice from "./components/myAdvice.vue";
import ReceivePayments from "./components/receivePayments.vue";
import FocusList from "./components/focusList.vue";
import PublishAd from "../tradeTrust/components/publishAd.vue";
import BlackList from "./components/blackList.vue";
import nameEdit from "@/views/userInfo/likeSetting/components/nameEdit.vue";
import { updateUserInfo } from "@/api/user";
import {
  getMerchantInfo,
  merchantCheck,
  statisticsRelation,
  relationList,
  getMerchantInfoById,
  relationOper,
} from "@/api/otc.js";
import { getDate } from "@/libs/utils.js";
import PayForm from "../components/popup/payForm.vue";
import { mapGetters } from "vuex";
import OrderList from "./components/orderList.vue";

import axios from "axios";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { baseApi } from "@/request/baseApi.js";

export default {
  name: "UserCenter",
  components: {
    MyAdvice,
    ReceivePayments,
    FocusList,
    BlackList,
    PayForm,
    OrderList,
    PublishAd,
    nameEdit,
  },
  data() {
    return {
      // 国际缩写
      t: "c2c.",
      // 修改用信息
      editNickNameShow: false,
      editAvatarShow: false,
      dialogVisible: false,
      // 广告
      publishShow: false,
      relationUserList: [],
      // 是否显示账户信息
      isShow: false,
      showPayForm: false,
      editFormInfo: {
        type: 1,
        name: "",
        num: "",
        bankName: "",
        bankBranch: "",
        remark: "",
        qrcode: "",
      },
      otherInfo: null,
      merchantInfo: null,
      isEdit: false,
      activeIndex: 0,
      activeFocusIndex: 0,
      leftList: [],
      focusList: ["关注", "黑名单"],
      //上传文件参数
      previewImage: "", // 上传图片
      cropper: null, // 裁切器示例
      updatePhotoLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    // 计算当前用户是否已关注
    relationUserIds() {
      let iconsName = (
        this.relationUserList &&
        this.relationUserList.map((item) => item.toUserId)
      ).includes(this.$route.query.userId && Number(this.$route.query.userId))
        ? "focused"
        : "focus";

      return iconsName;
    },
  },
  created() {
    // this.getMerchantInfo()
    // 当前用户进入商户个人中心
    if (
      !this.$route.query.isMerchant ||
      (this.$route.query.isMerchant &&
        this.userInfo.userId == this.$route.query.userId)
    ) {
      this.getMerchantInfo();
      this.merchantCheck();
    } else {
      // 订单商家个人中心
      // 根据id查询商户信息
      this.getMerchantInfo(this.$route.query.userId);
      // 查询关注列表
      this.relationList();
    }
    // this.statisticsRelation();
     this.getMerchantInfo(this.$route.query.userId);
  },
  methods: {
    // 打开广告
    handleEndPublish() {
      this.$scrollToTop();
      this.publishShow = false;
    },
    // 编辑广告
    handlePublish(row) {
      this.publishShow = true;
      this.$nextTick((_) => {
        this.$refs.publishEdit.getEchoForm(row);
      });
    },
    // 关注处理
    handleFocus(type) {
      // 关注1 拉黑2
      relationOper({
        toUserId: this.$route.query.userId,
        type: type,
      }).then((res) => {
        this.$message({
            message:`${
            type == 1
              ? this.$t(this.t + "关注")
              : type == 2
              ? this.$t(this.t + "拉黑")
              : this.merchantInfo?.attentionType == 2
              ? this.$t(this.t + "解除拉黑")
              : this.$t(this.t + "取关")
          }${this.$t(this.t + "成功")}！`,
            type: 'success'
          });
        
        this.getMerchantInfo(this.$route.query.userId);
        // this.statisticsRelation();
      });
    },
    // 获取关注信息
    relationList() {
      relationList({
        type: 1,
        userId: this.$route.query.userId,
      }).then((res) => {
        this.relationUserList = res.data;
        // console.log("关注信息", res.data);
      });
    },

			// 新增成功后
			handleNext() {
				this.$refs.payments.getPayList();
			},
			// 新增/编辑支付方式
			handlePayAdd(item) {
				if (item !== undefined) {
					this.$nextTick((_) => {
						for (let key in this.$refs.parForm.formData) {
							if (item.hasOwnProperty(key)) {
								this.$refs.parForm.formData[key] = item[key];
							}
						}
            this.$refs.parForm.formData["qrcode"] = (item.qrcode && item.qrcode != '//0') ? item.qrcode : ''
						this.$refs.parForm.formData["id"] = item["id"];
						console.log(this.$refs.parForm);
						this.$refs.parForm.bizType = 40;
					});
				} else {
					this.$nextTick((_) => {
						this.$refs.parForm.formData = {
							type: 1,
							name: "",
							num: "",
							bankName: "",
							bankBranch: "",
							remark: "",
							qrcode: "",
						};
						this.$refs.parForm.bizType = 39;
					});
				}
        this.$nextTick(_ => {
          this.$refs.parForm.getName()
        })

				this.showPayForm = true;
			},
			// 查询商户信息
			getMerchantInfo(userId) {
				getMerchantInfo({
					userId: userId
				}).then((res) => {
					this.merchantInfo = res.data;
				});
			},
			// 粉丝 | 被拉黑
			// statisticsRelation() {
			// 	statisticsRelation({userId:this.$route.query.userId}).then((res) => {
			// 		this.otherInfo = res.data;
			// 	});
			// },
			// 根据用户ID 查询 商户信息
			merchantCheck() {
				getMerchantInfoById().then((res) => {
					// user为商家
					if (res.data.userLevel === 1) {
						this.leftList = [{
								title: "我的广告",
								key: 0
							},
							{
								title: "收款设置",
								key: 1
							},
						];
						this.activeIndex = 0;
					} else {
						this.leftList = [{
							title: "收款设置",
							key: 1
						}];
						this.activeIndex = 1;
					}
				});
			},
			// 导航点击事件
			handleNav(index, item) {
				this.activeIndex = item.key;
			},
			// 关注黑名单
			handleFocusNav(index) {
				this.activeFocusIndex = index;
			},
			//修改昵称
			handleEditName(name) {
				updateUserInfo(name).then((res) => {
					if (res && res.status === 200) {
						if (res.data && res.data.success) {
							this.$message({
								message: this.$t(this.t+'昵称编辑成功'),
								type: "success",
							});
							this.getMerchantInfo();
						}
					}
				});
			},
			//-----------头像上传-------------
			onFileChange() {
				// 处于图片预览
				const file = this.$refs.file;
				//图片格式以及大小校验
				const type = file.type === "image/jpg" || "image/gif" || "image/png";
				const isLt2M = file.size / 1024 / 1024 < 10;
				if (!type) {
					this.$message.error(this.$t(this.t+'图片格式不正确！（只能包含jpg，gif，png）'));
					return;
				}
				if (!isLt2M) {
					this.$message.error( this.$t(this.t+'支持JPG、PNG、GIF 格式文档，最大不超过 10M'));
					return;
				}

      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;
      // 展示弹出层，预览用户选择的图片
      this.dialogVisible = true;
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = "";
    },
    onDialogOpened() {
      const image = this.$refs["preview-image"];
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false,
        background: false,
      });
    },
    // 对话框关闭，销毁裁切器
    onDialogClosed() {
      this.cropper.destroy();
    },
    onUpdatePhoto() {
      // 让确定按钮开始 loading
      this.updatePhotoLoading = true;
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("file", file);
        // 请求更新用户头像请求提交 fd
        axios({
          url: `${baseApi}/ex/user/file/upload-file`,
          data: fd,
          method: "POST",
          headers: {
            Token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.dialogVisible = false;
              this.editAvatarShow = false;

              // 直接把裁切结果的文件对象转为 blob 数据本地预览
              // this.imgUrl = window.URL.createObjectURL(file);
              // 关闭确定按钮的 loading
              this.updatePhotoLoading = false;
              // 把服务端返回的图片进行展示有点慢

              // 更新顶部登录用户的信息
              updateUserInfo({
                avatar: res.data.data.url,
              }).then((res) => {
                if (res && res.status === 200) {
                  if (res.data && res.data.success) {
                    this.$message({
                      message: this.$t(this.t + "头像上传成功"),
                      type: "success",
                    });
                    this.getMerchantInfo();
                  }
                }
              });
            }
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addPay {
  background-color: #90ff00;
  width: 80px;
  height: 35px;
  border-radius: 6px;
  // text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 2px 5px;
}
.user-center {
  height: 100%;
  padding: 22px 210px;
  background-color: #f8f9fb;

  .userinfo {
    width: 100%;
    height: 140px;
    background-color: #ffffff;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 19px;

    .info-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-item {
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;

      .no-dentify {
        margin-left: 20px;
        padding: 5px 9px;
        background: #90ff00;
        color: white;
        border-radius: 5px;
        /* cursor: pointer; */
      }

      .no-star {
        margin-left: 20px;
        padding: 5px 15px;
        background: #fff5e1;
        color: #ffbf3a;
        border-radius: 5px;
        cursor: pointer;
      }

      .lahei {
        margin-left: 20px;
        padding: 5px 15px;
        background: #f75f5252;
        color: #f75f52;
        border-radius: 5px;
        cursor: pointer;
      }

      ::v-deep .verify {
        font-size: 14px;
        font-weight: 600;
        color: #333333;

        & span {
          margin-right: 30px;
        }

        .el-image {
          width: 18px;
        }

        & .el-icon-success {
          font-size: 16px;
          color: #90ff00;
          margin-left: 5px;
          vertical-align: middle;
        }
      }

      .info-level {
        display: inline-block;
        margin-left: 20px;
        width: 40px;
        height: 25px;
        line-height: 25px;
        background-color: #90ff00;
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }

  .history-content {
    width: 100%;
    // height: 284px;
    background-color: #ffffff;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .panel {
      width: 33.3%;
      padding: 40px;
      border-right: 1px solid #e1e1e1;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 35px;

      &:last-child {
        border-right: none;
      }

      h3 {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 30px;
      }

      .panel-count {
        width: 100%;

        .item {
          display: flex;
          justify-content: space-between;

          // padding-right: 42px;
          .el-icon-warning-outline {
            font-size: 16px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  .set-content {
    width: 100%;
    // height: 284px;
    background-color: #ffffff;
    border-radius: 12px;
    min-height: 430px;
    padding: 0 20px 36px 20px;
    margin-bottom: 20px;

    .top-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-group {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        height: 82px;
        line-height: 82px;

        span {
          width: 50px;
          display: inline-block;
          cursor: pointer;
          color: #90ff00;
        }
      }
    }

    .topNav {
      width: 100%;
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid #eeeeee;
      color: #8992a6;
      height: 60px;
      line-height: 60px;

      .mr40 {
        font-weight: bold;
      }
      .addPay {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        font-size: 15px;
        padding: 0 18px;
        color: #fff;
        border-radius: 6px;
        background-color: #90ff00;
        &:hover {
          opacity: 0.8;
        }
      }

      .tabs {
        border-bottom: 1px solid transparent;
        font-weight: bold;

        &-active {
          color: #333333;
          border-bottom: 1px solid #90ff00;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .table-container {
    padding: 20px;
  }

  // 去除表格所有边框
  ::v-deep .el-table__body-wrapper {
    font-size: 16px;
  }

  // 去除表格所有边框
  .el-table::before {
    height: 0 !important;
  }

  ::v-deep.el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none !important;
  }

  /* 头部边框 */
  ::v-deep.customer-no-border-table thead tr th.is-leaf {
    border: none !important;
    border-right: none !important;
  }

  .trade-btn {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #5871f6;
  }

  .username-input {
    width: 150px;
  }
}

.item-bold1 {
  font-weight: 500;
  color: #333333;
  font-size: 24px;
}

.item-bold2 {
  font-weight: 500;
  color: #333333;
  font-size: 22px;
}

.common-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  background-color: #f7f7f7;
  border-radius: 5px;
  margin-left: 10px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}

.common-icon1 {
  display: inline-block;
  font-size: 16px;
  width: 24px;
  height: 24px;
  background-color: #f7f7f7;
  border-radius: 5px;
  margin-left: 10px;
  line-height: 24px;
  cursor: pointer;
}

.el-icon-edit-outline {
  font-size: 22px;
  cursor: pointer;
  margin-left: 14px;
  vertical-align: middle;
}

.change {
  &-up {
    color: #90ff00;
  }

  &-down {
    color: #f75f52;
  }
}

::v-deep .el-table {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

::v-deep .el-table::before {
  height: 0;
}

::v-deep.customer-no-border-table thead tr th.is-leaf {
  border: none;
}

::v-deep .otc-content .oct-topNav .left-panel > li,
.otc-content .oct-topNav .right-panel > li {
  text-align: left;
  width: 100px;
}
</style>

<style>
.atooltip {
  background: #eaeefe !important;
  color: #eaeefe !important;
  font-weight: 400;
  font-size: 12px;
  border: none !important;
  font-size: 11px !important;
  font-family: PingFang SC !important;
  font-weight: 400 !important;
  color: #333333 !important;
}

/* 修改箭头边框 */
.atooltip.el-tooltip__popper.is-dark[x-placement^="top"] .popper__arrow {
  border-top-color: #eaeefe !important;
  top: 4px !important;
}

.atooltip.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #eaeefe !important;
}

/* 修改箭头背景颜色 */
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #eaeefe;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
  border-top-color: #eaeefe !important;
}

.order-title {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
  margin-bottom: 20px;
}

.avatar-content {
  padding: 0 20px;
  font-size: 12px;
  color: #999;
  font-weight: 500;

  .border {
    height: 1px;
    border: 1px solid #e1e1e1;
    margin-top: 15px;
  }

  .avatar-box {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    width: 540px;
    height: 342px;
    border-radius: 6px;
    border: 1px dashed #e1e1e1;
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
  text-align: center;

  .el-button {
    width: 240px;
    height: 50px;
  }
}
</style>
