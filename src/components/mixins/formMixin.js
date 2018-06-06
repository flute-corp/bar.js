export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    value: {
      handler (v) {
        this._value = {
          ...v
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      _value: {}
    }
  }
}
