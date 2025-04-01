import qrcode from "vue_qrcodes";
import "./codebox.scss";
export default {
  props: {
    isShow: Boolean,
    url: String,
  },
  data() {
    return {
      codeSize: "",
      codeUrl: "",
    };
  },
  methods: {
    //设置二维码宽度
    setCodeWidth() {
      const width = document.body.clientWidth;
      const proportion = 1920 / 160;
      // const codeSize = width / proportion;
      this.codeSize = width / proportion;
    },
  },
  watch: {
    isShow: {
      handler(newValue) {
        if (newValue) {
          this.setCodeWidth();
        }
      },
    },
    url: {
      handler(newValue) {
        this.codeUrl = newValue ? newValue : "";
      },
    },
  },
  render(h) {
    if (this.isShow) {
      return (
        <div class="codeBox">
          <qrcode
            url={this.codeUrl}
            iconurl={require("../../assets/downAppImages/LOGO.png")}
            wid={this.codeSize}
            hei={this.codeSize}
          ></qrcode>
        </div>
      );
    }
  },
  components: {
    qrcode,
  },
};

