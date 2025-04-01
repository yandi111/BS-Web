import msgDom from "./index.vue";
import Vue from "vue";

function myAlert(content, obj) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const app = new Vue({
    render: (h) =>
      h(msgDom, {
        props: {
          content: content,
          btnText: obj?.confirm,
          cancel: obj?.cancel,
        },
        on: {
          click() {
            app.$destroy(div);
            let node = document.querySelector(".my-alert");
            node.parentNode.removeChild(node);
            obj.callback && obj.callback(true);
          },
          return() {
            app.$destroy(div);
            let node = document.querySelector(".my-alert");
            node.parentNode.removeChild(node);
          },
        },
      }),
  });
  app.$mount(div);
}

export default myAlert;
