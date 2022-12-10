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
              <label class="col-sm-3 control-label">Họ và Tên</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="name" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Tên đăng nhập</label>
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
                  v-model="repassword"
                />
              </div>
            </div>

            <label class="col-sm-3 control-label">Phân quyền</label>
            <div class="col-sm-9 h-100">
              <multiselect
                v-model="roles"
                :options="options"
                value=""
                :multiple="true"
                group-values="role"
                group-label="roleGroup"
                :group-select="true"
                placeholder="Type to search"
                track-by="value"
                label="name"
              ></multiselect>
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
import Multiselect from 'vue-multiselect';
const { BASE_URL } = require('../../utils/config');
export default {
  name: 'adduser',
  components: {
    Multiselect
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      repassword: '',
      roles: [],
      type: 1,
      options: [
        {
          roleGroup: 'Người lao động',
          role: [
            { name: 'Duyệt NLD 1', value: 'nldC1' },
            { name: 'Duyệt NLD 2', value: 'nldC2' },
            { name: 'Xóa NLD', value: 'nldD' }
          ]
        },
        {
          roleGroup: 'Nhà tuyển dụng',
          role: [
            { name: 'Duyệt NTD 1', value: 'ntdC1' },
            { name: 'Duyệt NTD 2', value: 'ntdC2' },
            { name: 'Xóa NTD', value: 'ntdD' }
          ]
        },
        {
          roleGroup: 'Chức danh công việc',
          role: [
            { name: 'Thêm chức danh', value: '' },
            { name: 'Sửa chức danh', value: '' },
            { name: 'Xóa chức danh', value: '' }
          ]
        },
        {
          roleGroup: 'Môi trường làm việc',
          role: [
            { name: 'Thêm môi trường làm việc', value: '' },
            { name: 'Sửa môi trường làm việc', value: '' },
            { name: 'Xóa môi trường làm việc', value: '' }
          ]
        },
        {
          roleGroup: 'Loại hình doanh nghiệp',
          role: [
            { name: 'Thêm loại hình doanh nghiệp', value: '' },
            { name: 'Sửa loại hình doanh nghiệp', value: '' },
            { name: 'Xóa loại hình doanh nghiệp', value: '' }
          ]
        },
        {
          roleGroup: 'Danh sách trường',
          role: [
            { name: 'Thêm trường', value: '' },
            { name: 'Sửa trường', value: '' },
            { name: 'Xóa trường', value: '' }
          ]
        },
        {
          roleGroup: 'Danh sách chức vụ',
          role: [
            { name: 'Thêm chức vụ', value: '' },
            { name: 'Sửa chức vụ', value: '' },
            { name: 'Xóa chức vụ', value: '' }
          ]
        }
      ]
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.username.length > 6) {
        if (this.password === this.repassword) {
          this.$emit('close');
          this.$http
            .post(
              `${BASE_URL}/admin/create`,
              {
                name: this.name,
                username: this.username,
                password: this.password,
                type: this.type,
                roles: this.roles.map(obj => obj.value)
              },
              {
                headers: {
                  Authorization: `Basic ${localStorage.getItem('token')}`
                }
              }
            )
            .then(response => {
              this.name = '';
              this.username = '';
              this.password = '';
              this.repassword = '';
              this.roles = [];
              this.$http
                .get(`${BASE_URL}/admin/getall`, {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem('token')}`
                  }
                })
                .then(response => {
                  if (response.data) {
                    this.$emit('inputData', response.data.data);
                  }
                });
            })
            .catch(function(error) {
              console.error(error.response);
            });
        } else {
          alert('Mật khẩu phải giống nhau!');
        }
      } else {
        alert('Tên đăng nhập quá ngắn!');
      }
    }
  }
};
</script>
