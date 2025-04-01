<template>
  <div class="input-emoji">
    <input type="text" v-model="input" :placeholder="$t('square.请输入评论内容')" @keyup.enter="$emit('keyup')"/>
    <emoji-picker @emoji="insert" :search="search">
      <i
        class="iconfont icon-s-emoji"
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
      this.input += emoji;
    },
  },
  watch: {
    input: {
      handler(newValue) {
        this.$emit("onInput", newValue);
      },
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
.input-emoji {
  position: relative;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  input {
    flex: 1;
    height: 100%;
    font-size: 14px;
    color: #8992a6;
    border: none;
    outline: none;
    background-color: inherit;
    caret-color: var(--theme-color);
    
    &::placeholder {
      color: #8992a6;
    }
  }
  .iconfont {
    position: absolute;
    top: 5px;
    right: 10px;
    margin-left: 15px;
    cursor: pointer;
    font-size: 24px;
    color: #626364;
    transition: all 0.2s linear;

    &:hover {
      transform: scale(1.1);
    }
  }
  .emoji-picker {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 100%;
    width: 600px;
    height: 250px;
    overflow-y: auto;
    padding: 12px;
    border-radius: 10px;
    background: #fff;
    // box-shadow: 1px 1px 8px #c7dbe6;
    &::-webkit-scrollbar-track-piece {
      background-color: #fff;
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
        font-size: 18px;
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
}
</style>
