<template>
  <div class="modal-confirm">
    <b-button variant="secondary" @click="$emit('close')">Bỏ qua</b-button>
    <b-button variant="success" @click="confirm">Duyệt</b-button>
    <b-button variant="danger" @click="notConfirm">Không duyệt</b-button>
    <b-button variant="info" @click="cancelConfirm">Chờ duyệt</b-button>
  </div>
</template>
<script>
const { BASE_URL } = require('../../utils/config');
import axios from '../../utils/AxiosInstance';
export default {
  name: 'ConfirmModal',
  data() {
    return {};
  },
  methods: {
    confirm() {
      console.log(this.itemid);
      axios
        .post(`admin/confirm-company/${this.itemid._id}/${this.num}`, {
          note: '',
        })
        .then(response => {
          this.$emit("inputData", '')
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },

    notConfirm() {
      axios
        .post(`admin/not-confirm-company/${this.itemid._id}/${this.num}`, {
          note: '',
        })
        .then(response => {
          this.$emit("inputData", '')
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    cancelConfirm() {
      axios
        .post(`admin/cancel-confirm-company/${this.itemid._id}/${this.num}`, {
          note: '',
        })
        .then(response => {
          this.$emit("inputData", '')
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
  },
  props: ['itemid', 'num', 'reload'],
};
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
