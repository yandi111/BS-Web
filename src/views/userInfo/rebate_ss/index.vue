
<template>
  <div>11111</div>
</template>

<script>
// import QRCode from "qrcodejs2";

export default {
 
  components: {
 
  },
  data() {
    return {
     
    };
  },
  mounted() {
   
  },
  methods: {
   
  },
};
</script>
<style lang="scss" scoped>
.rebate {
  color: #333;
  background: #f5f7fa;
  padding-bottom: 70px;
  .bg {
    height: 500px;
    background: linear-gradient(135deg, #fafffd 0%, #d0f0e6 100%);
    display: flex;
    justify-content: space-between;
    .left {
      margin: 100px 0 0 210px;
      width: 100%;
      .left-title {
        font-size: 40px;
        color: #333;
        font-weight: 500;
      }
      .left-text {
        color: #90ff00;
        padding-left: 20px;
      }
      .left-b {
        width: 100%;
        color: #637184;
        font-size: 18px;
        margin-top: 10px;
      }
      .left-img {
        margin-top: 20px;
        img {
          width: 169px;
          height: 192px;
        }
      }
    }
    .right {
      width: 550px;
      height: 325px;
      background: #ffffff;
      border-radius: 15px;
      margin: 75px 210px 0 0;
      padding: 30px 30px 0 30px;
      .right-title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 30px;
      }
      .item {
        height: 50px;
        line-height: 50px;
        background: #f4f5f7;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        color: #96a2b2;
        img {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-left: 5px;
          cursor: pointer;
        }
        .link-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .link {
            display: inline-block;
            width: 191px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333;
          }
        }
      }
      .submit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 415px;
          height: 50px;
          line-height: 50px;
          background: #90ff00;
          border-radius: 6px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
        .qr-code {
          width: 50px;
          height: 50px;
          padding: 5px;
          margin-left: 30px;
          cursor: pointer;
          background-color: #90ff00;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          .qr-img {
            width: 40px;
            height: 40px;

            img {
              width: 40px;
              height: 40px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .recommend {
    height: 400px;
    background: #ffffff;
    border-radius: 25px;
    margin: 40px 210px 0 210px;
    padding: 30px 40px 0 40px;
    .recommend-title {
      font-size: 28px;
      font-weight: 500;
      .border {
        width: 112px;
        height: 8px;
        background: #90ff00;
        border-radius: 5px;
      }
    }
    .recommend-box {
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      .item {
        width: 690px;
        height: 240px;
        background: #f5f7fa;
        border-radius: 15px;

        display: flex;
        img {
          width: 126px;
          height: 130px;
          display: inline-block;
          margin: 55px 0 0 100px;
        }
        .item-right {
          margin: 86px 0 0 157px;
          font-size: 14px;
          color: #96a2b2;
          .num {
            font-size: 24px;
            font-weight: 500;
            margin-top: 15px;
            color: #333;
          }
        }
      }
    }
  }
  .table {
    // background: #ffffff;
    margin: 40px 210px 0 210px;
    border-radius: 25px;
    ::v-deep .el-card__body {
      padding: 0;
    }
    .loading {
      height: 300px;
      overflow: auto;
      border-radius: 0px 0px 25px 25px;
      .nomore {
        margin: 20px 0 20px 730px;
      }
    }
    .item-left {
      margin-left: 404px;
    }
    .item-right {
      margin-left: 504px;
    }
    .table-header {
      height: 60px;
      line-height: 60px;
      background: #f4f5f7;
      border-radius: 25px 25px 0px 0px;
      display: flex;
      // justify-content: space-around;
      font-size: 14px;
      color: #96a2b2;
    }
    .table-item {
      height: 60px;
      line-height: 60px;
      display: flex;
      // justify-content: space-around;
      font-size: 14px;
      color: #333;
      &:last-child {
        border-radius: 0px 0px 25px 25px;
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
  .bigQrCode {
    // margin-left: 75px;
    // margin-top: 30px;
    // margin-bottom: 30px;
    background: #f4f5f7;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
    height: 380px;
  }
  .invite-banner {
    position: relative;
    width: 260px;
    height: 462px;
    margin: auto;
    border-radius: 6px;
    img {
      width: 259px;
      height: 460px;
      display: inline-block;
      border-radius: 6px;
    }
    .sm-text {
      position: absolute;
      bottom: 16px;
      left: 10px;
      font-size: 12px;
      color: #fff;
      font-weight: 500;
    }
    .qr-sm {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 80px;
      height: 80px;
      border-radius: 6px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .sm-img {
      }
    }
  }
  .invite-box {
    padding: 0 60px;
    .invite-item {
      margin-top: 30px;
      height: 40px;
      line-height: 40px;
      background: #f4f5f7;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 14px;
      color: #999;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-left: 5px;
        cursor: pointer;
      }
      .link-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .link {
          display: inline-block;
          width: 191px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .invite-img {
    padding: 0 60px;
    .invite-icon {
      display: flex;
      margin-top: 30px;
      margin-bottom: 10px;
      div {
        margin-right: 40px;
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }

  .qr-dialog {
    ::v-deep .el-dialog {
      border-radius: 12px;
    }
  }
  .invite-dialog {
    ::v-deep .el-dialog {
      border-radius: 12px;
      height: 774px;
    }
  }
}
</style>
