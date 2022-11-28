<template>
  <div class="modal-confirm">
    <b-button variant="secondary" @click="$emit('close')">Bỏ qua</b-button>
    <b-button variant="success" @click="confirm">Duyệt</b-button>
    <b-button variant="danger" @click="notConfirm">Không duyệt</b-button>
    <b-button variant="info" @click="cancelConfirm">Chờ duyệt</b-button>
  </div>
</template>
<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.itemid.status = 1
      this.$emit("close");
    },
    notConfirm () {
      this.itemid.status = -1
      this.$emit("close");
    },
    cancelConfirm () {
      this.itemid.status = 0
      this.$emit("close");
    }
  },
  props: ['itemid']
}
</script>

<style scoped>
.modal-confirm {
    position: absolute;
    background: white;
    left: 50%;
    top: 30%;
    width: auto;
    padding: 10px 20px;
    transform: translate(-50%, -50%);
}
</style>
