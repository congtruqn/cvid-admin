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
            <div class="form-group">
              <label class="col-sm-3 control-label">Người đại diện</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="name" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Số điện thoại</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="username" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Chức vụ</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="username" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Email</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="username" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Mật khẩu</label>
              <div class="col-sm-9">
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Nhập lại mật khẩu</label>
              <div class="col-sm-9">
                <input
                  type="password"
                  class="form-control"
                  v-model="password2"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Loại hình</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="password2" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Lĩnh vực kinh doanh</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="password2" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Mã số thuế</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Tên doanh nghiệp</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Tỉnh/Thành phố</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Quận/Huyện</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Phường/Xã</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Số nhà và tên dường</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label"
                >Ngành nghề kinh doanh</label
              >
              <div class="col-sm-9">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Giấy phép kinh doanh</label>
              <div class="col-sm-9">
                <input type="file" class="form-control" />
              </div>
            </div>
            <div class="panel-body_modal">
              <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'AddBusiness',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      password2: '',
      email: '',
      phone: '',
      address: '',
      type: 4,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleSubmit(e) {
      e.preventDefault();

    }
  }
};
</script>

<style scoped>
.modal-container {
  max-height: 80vh;
  overflow: auto;
}
</style>
