<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <button
                aria-label="Dismiss"
                class="ngdialog-close"
                @click="$emit('close')"
              ></button>
            </div>
            <img class="imgGPKD" :src="getUrlImage(itemid.urlGPKD)" />
            <div class="panel-body_modal">
              <button
                class="btn btn-primary float-right m-r-5 m-b-5"
                @click="handleSubmit"
              >
                Duyệt
              </button>
              <button class="btn btn-success m-r-5 m-b-5" @click="handleSubmit">
                Không duyệt
              </button>
              <button
                class="btn btn-secondary m-r-5 m-b-5"
                @click="handleSubmit"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const { BASE_URL } = require("../../utils/config");
export default {
  name: "viewGPKD",
  data() {
    return {
      password: "",
      repassword: "",
      options: [
        { text: "Nhân viên", value: 3 },
        { text: "Người quản lý", value: 2 },
        { text: "Quản trị viên", value: 1 },
      ],
      statuss: [
        { text: "Hoạt động", value: 1 },
        { text: "Tạm dừng", value: 0 },
      ],
    };
  },
  methods: {
    getUrlImage(url) {
      return `${BASE_URL}/${url}`;
    },
    handleSubmit() {
      //   if (this.cvid.username.length > 6) {
      //     if (this.password === this.repassword) {
      //       this.$http
      //         .post(
      //           "api/user/edituser",
      //           {
      //             name: this.cvid.name,
      //             username: this.cvid.username,
      //             password: this.password,
      //             email: this.cvid.email,
      //             phone: this.cvid.phone,
      //             address: this.cvid.address,
      //             type: this.cvid.type,
      //             status: this.cvid.status,
      //             id: this.cvid._id,
      //           },
      //           {
      //             headers: {
      //               Authorization: `Basic ${localStorage.getItem("token")}`,
      //             },
      //           }
      //         )
      //         .then((response) => {
      //           this.$emit("close");
      //         })
      //         .catch(function (error) {
      //           console.error(error.response);
      //         });
      //     } else {
      //       alert("Mật khẩu phải giống nhau!");
      //     }
      //   } else {
      //     alert("Tên đăng nhập quá ngắn!");
      //   }
    },
  },
  props: ["itemid"],
};
</script>
<style scoped>
.imgGPKD {
  width: 100%;
}

.modal-container{
  overflow: scroll;
  max-height: 80vh;
}

</style>