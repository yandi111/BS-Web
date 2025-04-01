import msgDom from "./s-confirm.vue";
import Vue from "vue";

function $confirm(type, callback) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const app = new Vue({
    render: (h) =>
      h(msgDom, {
        props: {
          type: type,
        },
        on: {
          click() {
            app.$destroy(div);
            let node = document.querySelector(".s-conform");
            node.parentNode.removeChild(node);
            callback && callback(true);
          },
          return() {
            app.$destroy(div);
            let node = document.querySelector(".s-conform");
            node.parentNode.removeChild(node);
          },
        },
      }),
  });
  app.$mount(div);
}

export default $confirm;
