<template>
  <div class="s-detail">
    <div class="top">
      <i class="el-icon-back" @click="$router.back()"></i>
    </div>
    <sEmptyStatus :state="state" v-if="!info.uid" />
    <main v-if="info.uid">
      <s-info-card :info="info" detail @resetDetail="checkContentDetail">
        <template #header>
          <div class="header df aic">
            <sButton
              class="mr5"
              :focus="info.followStatus"
              v-if="userInfo.uid != info.uid"
              @click="onChangeState"
              >{{
                info.followStatus ? $t("square.已关注") : $t("square.关注")
              }}</sButton
            >
            <sSetting
              icon="icon-s-more"
              :action-list="actionList"
              @onAction="onAction"
            />
          </div>
        </template>
        <template #content>
          <div class="container">
            <div class="textbox">
              <p class="name">{{ info.title }}</p>
              <div class="text">{{ info.content }}</div>
            </div>
            <div class="imgsBox mt10" v-if="info.urls">
              <s-imags :urls="info.urls" />
            </div>
            <div class="orinal mt10" v-if="info.originalContent">
              <detailForward :info="info.originalContent" />
            </div>
          </div>
        </template>
      </s-info-card>
    </main>

    <reportForm :is-show.sync="report_isShow" :reportInfo="reportInfo" />
  </div>
</template>

<script>
import sInfoCard from "../components/s-info-card";
import sButton from "../components/s-button";
import sSetting from "../components/s-setting";
import sImags from "../components/s-imgs";
import reportForm from "./components/report-form.vue";
import sEmptyStatus from "../components/s-empty-status.vue";
import detailForward from "./components/detail-forward.vue";

import $confirm from "../components/s-confirm";

import { mapGetters } from "vuex";

import * as api from "@/api/square";
export default {
  components: {
    sEmptyStatus,
    sInfoCard,
    sButton,
    sSetting,
    sImags,
    reportForm,
    detailForward,
  },
  data() {
    return {
      actionList: [
        {
          label: this.$t("square.分享"),
          value: "forward",
          icon: "icon-s-forward",
        },
        {
          label: this.$t("square.举报"),
          value: "report",
          icon: "icon-s-report",
        },
      ],
      info: {},
      report_isShow: false,
      reportInfo: {},
      state: "",
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    onChangeState() {
      const params = {
        uid: this.info.uid,
        follow: !this.info.followStatus,
      };
      api.$onFollowOperations(params).then((res) => {
        console.log("res.data.data", res.data.data);
      });
    },
    onAction(type) {
      if (type == "forward") {
        $confirm("forward", () => {
          const url = window.location.href;

          api.$onShare({ id: this.info.id }).then((res) => {
            console.log("res", res);
            this.$copyText(url).then(() => {
              this.$message.success("复制成功");
            });
          });
        });
      } else {
        this.report_isShow = true;
        this.reportInfo = {
          repost: this.info.repost,
          reportedId: this.info.id,
          reportUid: this.userInfo.uid,
        };
        // console.log("this.info", this.reportInfo);
      }
    },
    checkContentDetail() {
      const params = {
        id: this.$route.query.id,
      };
      api
        .$checkContentDetail(params)
        .then((res) => {
          this.state = "success";
          console.log("内容详情", res.data.data);
          this.info = res.data.data;
        })
        .catch(() => {
          this.state = "error";
        });
    },
  },
  created() {
    this.checkContentDetail();
  },
};
</script>

<style lang="scss" scoped>
.s-detail {
  width: 930px;
  overflow-y: scroll;
  height: 960px;
  // padding: 20px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  .top {
    padding: 20px 20px 0;
    margin-bottom: 10px;
    font-size: 24px;
    i {
      cursor: pointer;
    }
  }
  main {
    .header {
      ::v-deep .s-setting {
        .setting-icon {
          font-size: 22px;
        }
      }
    }
    .container {
      font-size: 14px;
      .textbox {
        color: #333;
        font-size: 14px;
        .name {
          font-size: 16px;
        }
        .text {
          word-break: break-all;
        }
      }
      .imgsBox {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
      }
      .orinal {
        width: 100%;
      }
    }
  }
}
</style>
