 <template>
  <div class="input_box">
    <input
      class="type"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
    <span class="span_text" v-if="this.label">{{ this.label }}</span>
    <div :class="{ icon: icon }" class="span_icon">
      <i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>
 <script>
export default {
  name: 'InputComp',
  props: {
    label: String,
    value: String,
    placeholder: String,
    icon: {
      //默认隐藏
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.input_box {
  margin: 20px 0;
  position: relative;
  display: flex;
  width: 347px;
  height: 36px;
  font-size: 14px;
  color: #96A2B2;
}
.type {
  display: block;
  width: 100%;
  height: 100%;
  background: #000622;
  border: 1px solid #2E3442;
  border-radius: 8px;
  &:focus {
    border: 1px solid #5375fb;
  }
}
span {
  margin-right: 10px;
}
.span_text {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-block;
  width: 50px;
  height: 36px;
  line-height: 36px;
  text-align: right;
}
input {
  padding-left: 15px;
   color: #96A2B2;
}
input:focus {
  outline: none;
}
.icon {
  display: none;
}
.span_icon {
  font-size: 16px;
  position: absolute;
  right: 8px;
  top: 8px;
}

</style>
