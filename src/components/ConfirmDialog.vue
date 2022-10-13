<template>
  <div class="dialog-container">
    <transition name="dialog">
      <div class="dialog-box">
        <header v-if="title" class="dialog-header">{{ title }}</header>
        <section class="dialog-body">
          <slot></slot>
        </section>
        <footer class="dialog-footer">
          <div v-if="showCancel" class="btn btn-cancel" @click="cancel">
            {{ cancelText }}
          </div>
          <div class="btn btn-confirm" @click="confirm">{{ confirmText }}</div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: {
      type: String,
    },
    showCancel: {
      type: Boolean,
      default: true,
      required: false,
    },
    cancelText: {
      type: String,
      default: "取消",
      required: false,
    },
    confirmText: {
      type: String,
      default: "确定",
      required: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit("cancelPopup", false);
    },
    confirm() {
      this.$emit("confirmPopup", false);
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  font-size: 16px;
}
.dialog-enter-active .dialog-leave-active {
  transition: opacity 0.5s;
}
.dialog-enter .dialog-leave-to {
  opacity: 0;
}
.dialog-box {
  margin: 100px;
  min-height: 100px;
  max-height: 70%;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
}
.dialog-body {
  margin: 15px auto;
  text-align: center;
}
.dialog-footer {
  display: flex;
  border-top: 1px solid #666666;
}
.btn {
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  padding: 10px 0;
}
.btn-confirm {
  color: #1baeae;
}
.dialog-footer > .btn:first-child {
  border-right: 1px solid #666666;
}
</style>
