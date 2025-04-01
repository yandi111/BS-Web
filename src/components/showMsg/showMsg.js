import msgBox from "./showMsg.vue";
import Vue from "vue";
function showMsg(msg, clickHandler) {
  // console.log("ss", msg);
  const div = document.createElement("div");
  document.body.appendChild(div);
  const app = new Vue({
    render: (h) =>
      h(msgBox, {
        props: {
          text: msg,
        },
        on: {
          click() {
            app.$destroy(div);
            let node = document.querySelector(".showMsg");
            node.parentNode.removeChild(node)
            // console.log("node", node.parentNode.removeChild(node));
            clickHandler && clickHandler(true);
          },
        },
      }),
  });
  app.$mount(div);
}
export default showMsg;
