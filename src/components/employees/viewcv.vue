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
                @click="()=>{$emit('close'); notbrowse = false;}"
              ></button>
            </div>
            <h1 class="text-center text-primary">
              CVID: {{ itemid.username }}
            </h1>
            <div v-if="notbrowse" class="form-inline">
              <input type="text" v-model="noteCV" class="form-control" />
              <button class="btn btn-success" @click="handlerNotBrowse">
                Xác nhận
              </button>
            </div>
          </div>
          <div class="panel-body_modal">
            <button
              v-if="itemid.approved < 1"
              class="btn btn-primary float-right m-r-5 m-b-5"
              @click="handleBrowse1"
            >
              Duyệt lần 1
            </button>
            <button
              v-if="itemid.approved == 1"
              class="btn btn-primary float-right m-r-5 m-b-5"
              @click="handleBrowse2"
            >
              Duyệt lần 2
            </button>
            <button
              class="btn btn-success m-r-5 m-b-5"
              v-if="itemid.approved == 0"
              @click="notBrowse"
            >
              Không duyệt
            </button>
            <button
              class="btn btn-success m-r-5 m-b-5"
              v-if="itemid.approved == 1"
              @click="cancelBrowse"
            >
              Hủy duyệt lần 1
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const { BASE_URL } = require("../../utils/config");
export default {
  name: "EditInvoiceType",
  data() {
    return {
      criteria: [],
      notbrowse: false,
      noteCV: "",
    };
  },
  methods: {
    handleBrowse1() {
      this.$http
        .get(`${BASE_URL}/employee/browse-cvid1/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.itemid.approved = 1;
        })
        .catch(function (error) {
          console.error(error.response);
        });
      this.$emit("close");
    },
    handleBrowse2() {
      this.$http
        .get(`${BASE_URL}/employee/browse-cvid2/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.itemid.approved = 2;
        })
        .catch(function (error) {
          console.error(error.response);
        });
      this.$emit("close");
    },
    cancelBrowse() {
      this.$http
        .get(`${BASE_URL}/employee/cancel-browse-cvid/${this.itemid._id}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.itemid.approved = 0;
        })
        .catch(function (error) {
          console.error(error.response);
        });
      this.$emit("close");
    },
    notBrowse() {
      this.notbrowse = true;
    },
    handlerNotBrowse() {
      this.$http
        .post(
          `${BASE_URL}/employee/not-browse-cvid/${this.itemid._id}`,
          {
            noteCV: this.noteCV
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.itemid.approved = -1;
        })
        .catch(function (error) {
          console.error(error.response);
        });
        this.notbrowse = false;
      this.$emit("close");
    },
    handleSubmit() {
      if (this.itemid.username.length > 6) {
        if (this.password === this.repassword) {
          this.$http
            .post(
              "api/user/edituser",
              {
                name: this.itemid.name,
                username: this.itemid.username,
                password: this.password,
                email: this.itemid.email,
                phone: this.itemid.phone,
                address: this.itemid.address,
                type: this.itemid.type,
                status: this.itemid.status,
                id: this.itemid._id,
              },
              {
                headers: {
                  Authorization: `Basic ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              this.$emit("close");
            })
            .catch(function (error) {
              console.error(error.response);
            });
        } else {
          alert("Mật khẩu phải giống nhau!");
        }
      } else {
        alert("Tên đăng nhập quá ngắn!");
      }
    },
  },
  created() {

    this.$http
      .get(`${BASE_URL}/criteria/getall`)
      .then((res) => {
        this.criteria = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  props: ["itemid"],
};
</script>