<template>
  <el-dialog
    :title="title"
    :style="dialogStyle"
    custom-class="bse-dialog-container"
    :visible="localVisible"
    :width="width"
    @close="localVisible = false"
    v-bind="$attrs"
  >
    <slot> </slot>
    <slot name="footer">
      <span slot="footer" class="dialog-footer" v-if="showFooter">
        <el-button @click="localVisible = false">{{
          $t(cancelText)
        }}</el-button>
        <el-button type="primary" @click="confirmHandler">{{
          $t(confirmText)
        }}</el-button>
      </span>
    </slot>
  </el-dialog>
</template>

<script>
import bseDialogMixin from './dialogMixin'

export default {
  name: 'BSEDialog',
  mixins: [bseDialogMixin],
}
</script>

<style lang="scss" scoped src="./dialog.scss">
</style>