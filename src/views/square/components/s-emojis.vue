<template>
  <div>
    <emoji-picker @emoji="insert" :search="search">
      <i
        class="iconfont icon-s-emoji mr10 f24"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      ></i>
      <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div class="emoji-picker">
          <div class="emoji-picker__search">
            <input type="text" v-model="search" v-focus />
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                  >{{ emoji }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
  </div>
</template>

<script>
import { EmojiPicker } from "vue-emoji-picker";

export default {
  props: {
    // input: {
    //   type: String,
    //   default: "",
    // },
  },
  components: {
    EmojiPicker,
  },
  data() {
    return {
      input: "",
      search: "",
    };
  },
  methods: {
    insert(emoji) {
      this.input = emoji;
      this.$emit("onPick", this.input);
    },
    clickEvent(e) {
      console.log("e", e);
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-s-emoji {
  position: relative;
  color: #8e97aa;
  cursor: pointer;
  transform-origin: center;
  display: inline-block;
  // transition: all 0.2s linear;
  &:hover {
    color: #90ff00;
    transform: scale(1.1);
  }
}
.emoji-picker {
  position: absolute;
  z-index: 1;
  right: 20px;
  bottom: 60px;
  width: 400px;
  height: 180px;
  overflow-y: auto;
  padding: 12px;
  border-radius: 10px;
  background: #f5f7fa;
  // box-shadow: 1px 1px 8px #c7dbe6;
  border-top: 1px solid #ccc;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #f5f7fa;
  }
  .emoji-picker__search {
    display: flex;
    input {
      flex: 1;
      height: 30px;
      border-radius: 50px;
      border: 1px solid #ccc;
      padding: 0 10px;
      outline: none;
      background: #f5f7fa;
    }
  }
  h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 12px;
    cursor: default;
    padding: 5px 0;
  }
  .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &::after {
      content: "";
      flex: auto;
    }
    span {
      // font-size: 18px;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #ececec;
        cursor: pointer;
      }
    }
  }
}
</style>
