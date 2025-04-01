export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '30%'
    },
    bgColor: {
      type: String,
      default: '#141414'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    confirmText: {
      type: String,
      default: 'confirm'
    },
  },
  data () {
    return {
      localVisible: true
    }
  },
  computed: {
    dialogStyle () {
      return {
        '--bg-color': this.bgColor,
      }
    }
  },
  watch: {
    visible: {
      handler (newVal, old) {
        this.localVisible = newVal

      },
      immediate: true
    },
    localVisible (newVal, old) {
      this.$emit('update:visible', newVal)
    }
  },
  methods: {
    confirmHandler () {
      this.localVisible = false
      this.$emit('confirm')
    }
  }
}