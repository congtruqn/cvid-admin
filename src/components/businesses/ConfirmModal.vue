<template>
  <div class="modal-confirm">
    <b-button variant="secondary" @click="$emit('close')">Bỏ qua</b-button>
    <b-button variant="success" @click="confirm">Duyệt</b-button>
    <b-button variant="danger" @click="notConfirm">Không duyệt</b-button>
    <b-button variant="info" @click="cancelConfirm">Chờ duyệt</b-button>
  </div>
</template>
<script>
const {BASE_URL} = require('../../utils/config');
export default {
  name: 'ConfirmModal',
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$http
        .post(
          `${BASE_URL}/business/confirm1`,
          {
            id: this.itemid._id,
            confirm: {
              status: 1,
            },
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(response => {
          this.itemid.status = 1;
          this.itemid.confirmAt = new Date();
          this.itemid.confirmBy = JSON.parse(localStorage.getItem('user')).name;
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },

    notConfirm() {
      this.$http
        .post(
          `${BASE_URL}/business/confirm2`,
          {
            id: this.itemid._id,
            confirm: {
              status: 1,
            },
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(response => {
          this.itemid.status = 1;
          this.itemid.confirmAt = new Date();
          this.itemid.confirmBy = JSON.parse(localStorage.getItem('user')).name;
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    cancelConfirm() {
      this.$http
        .post(
          `${BASE_URL}/business/confirm1`,
          {
            id: this.itemid._id,
            confirm: {
              status: 0,
            },
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(response => {
          this.itemid.status = 0;
          this.itemid.confirmAt = new Date();
          this.itemid.confirmBy = JSON.parse(localStorage.getItem('user')).name;
          this.$emit('close');
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
  },
  props: ['itemid'],
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
