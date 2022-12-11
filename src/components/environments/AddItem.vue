<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="panel-body_modal">
            <button
              aria-label="Dismiss"
              class="ngdialog-close"
              @click="close()"
            ></button>
          </div>
         

          <div class="panel-body_modal">
            <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'AddJobTitle',
  data() {
    return {
      abc: 'vxc'
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleSubmit(e) {
      e.preventDefault();
    }
  },
  mounted() {}
};
</script>
