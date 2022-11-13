<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <h2 class="text-center">{{ itemid.name }}</h2>
              <button
                aria-label="Dismiss"
                class="ngdialog-close"
                @click="$emit('close')"
              ></button>
            </div>
            <div>
              <div>
                <h3>Người đại diện:</h3>
                <h3>Số điện thoại:</h3>
                <h3>Email:</h3>
              </div>
              <div></div>
              <img class="imgGPKD" :src="itemid.urlGPKD" />
              <div class="panel-body_modal">
                <button
                  v-if="itemid.confirm1 && itemid.confirm1.status == 0"
                  class="btn btn-primary float-right m-r-5 m-b-5"
                  @click="handleBrowse1"
                >
                  Duyệt lần 1
                </button>
                <button
                  v-if="itemid.confirm1.status == 1 && itemid.confirm2.status == 0"
                  class="btn btn-primary float-right m-r-5 m-b-5"
                  @click="handleBrowse2"
                >
                  Duyệt lần 2
                </button>
                <button
                  class="btn btn-success m-r-5 m-b-5"
                  v-if="itemid.confirm1.status == 0"
                  @click="notBrowse"
                >
                  Không duyệt
                </button>
                <button
                  class="btn btn-success m-r-5 m-b-5"
                  v-if="itemid.confirm1.status == 1 && itemid.confirm2.status == 0"
                  @click="cancelBrowse"
                >
                  Hủy duyệt lần 1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const { BASE_URL } = require('../../utils/config')
export default {
  name: 'viewGPKD',
  data () {
    return {
      admin: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    handleBrowse1 () {
      this.$http
        .get(`${BASE_URL}/business/confirm1/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.itemid.confirm1.status = 1
          this.itemid.confirm1.confirmAt = new Date()
          this.itemid.confirm1.confirmBy = this.admin.name
          this.$emit('close')
        })
        .catch(function (error) {
          console.error(error.response)
        })
    },
    handleBrowse2 () {
      this.$http
        .get(`${BASE_URL}/business/confirm2/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.itemid.confirm2.status = 1
          this.itemid.confirm2.confirmAt = new Date()
          this.itemid.confirm2.confirmBy = this.admin.name
          this.$emit('close')
        })
        .catch(function (error) {
          console.error(error.response)
        })
    },
    cancelBrowse () {
      this.$http
        .get(`${BASE_URL}/business/cancel-confirm/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.itemid.confirm1.status = 0
          this.itemid.confirm1.confirmAt = new Date()
          this.itemid.confirm1.confirmBy = this.admin.name
          this.$emit('close')
        })
        .catch(function (error) {
          console.error(error.response)
        })
    },
    notBrowse () {
      this.$http
        .get(`${BASE_URL}/business/not-confirm/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.itemid.confirm1.status = -1
          this.itemid.confirm1.confirmAt = new Date()
          this.itemid.confirm1.confirmBy = this.admin.name
          this.$emit('close')
        })
        .catch(function (error) {
          console.error(error.response)
        })
    }
  },
  props: ['itemid']
}
</script>
<style scoped>
.imgGPKD {
  width: 100%;
}

.modal-container {
  overflow: scroll;
  max-height: 80vh;
}
</style>
