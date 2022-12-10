<template>
  <div>
    <section class="content-header">
      <h1>Quản lý nhân viên</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách nhân viên</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button class="btn btn-primary m-r-5 m-b-5" @click="showModal">
            Thêm người dùng
          </button>
        </div>
        <b-form inline class="m-b-5 m-t-5">
          <b-form-select
            v-model="perPage"
            :options="pageOptions"
            class="form-control"
          ></b-form-select>
          <b-input-group size="sm" class="" style="float: right">
            <b-form-input
              type="search"
              v-model="filter"
              placeholder="Search terms"
            ></b-form-input>
          </b-input-group>
        </b-form>

        <b-table
          striped
          bordered
          hover
          sort-by="approved"
          :items="items"
          :fields="fields"
          :filter="filter"
        >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
            <b-form-checkbox
              v-model="row.detailsShowing"
              @change="row.toggleDetails"
            >
              Details via check
            </b-form-checkbox>
          </template>
          <template v-slot:cell(job.status)="{ item }">
            <b>{{ item.job ? displayJobStatus(item.job.status) : '' }}</b>
          </template>

          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>
          <template v-slot:cell(actions)="{ item }">
            <b-icon
              icon="trash"
              variant="danger"
              style="margin: auto 2px"
              @click="deleteItem(item._id, item.name)"
            ></b-icon>
          </template>

          <template #row-details="row">
            <b-row>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-sm-4 control-label">Mật khẩu</label>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control"
                      v-model="row.item.password"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-sm-4 control-label"
                    >Xác nhận mật khẩu</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control"
                      v-model="row.item.password2"
                    />
                  </div>
                </div>
              </div>
            </b-row>
            <b-row v-if="userInfo._id !== row.item._id">
              <div class="col-md-6">
                <b-form-group
                  label="Nhóm chức năng NLĐ"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-row>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="row.item.roles"
                        :aria-describedby="ariaDescribedby"
                        ><b>Quản lí NLĐ:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox> -->
                        <b-form-checkbox value="nldC1">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="nldC2">Duyệt 2</b-form-checkbox>
                        <b-form-checkbox value="nldD">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Quản lí tìm việc:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox> -->
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Quản lí NLĐ:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox> -->
                      </b-form-checkbox-group>
                    </div>
                  </b-row>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  label="Nhóm chức năng NTD"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-row>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="row.item.roles"
                        :aria-describedby="ariaDescribedby"
                        ><b>Quản lí NTD:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox> -->
                        <b-form-checkbox value="ntdC1">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="ntdC2">Duyệt 2</b-form-checkbox>
                        <b-form-checkbox value="ntdD">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Quản lí phòng ban:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox> -->
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Tin tuyển dụng:</b><br />
                        <!-- <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox> -->
                        <b-form-checkbox value="ttdC1">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="ttdC2">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                  </b-row>
                </b-form-group>
              </div>
              <div class="col-md-12">
                <b-form-group
                  label="Quản lý danh mục"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-row>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="row.item.roles"
                        :aria-describedby="ariaDescribedby"
                        ><b>Chức danh công việc:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Môi trường làm việc:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Loại hình doanh nghiệp:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Danh sách trường:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Danh sách chức vụ:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Danh sách chuyên nghành:</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Các nghành công nghiệp :</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        :aria-describedby="ariaDescribedby"
                        ><b>Câu hỏi đánh giá :</b><br />
                        <b-form-checkbox value="A">Thêm</b-form-checkbox>
                        <b-form-checkbox value="E">Sửa</b-form-checkbox>
                        <b-form-checkbox value="D">Xóa</b-form-checkbox>
                      </b-form-checkbox-group>
                    </div>
                  </b-row>
                </b-form-group>
              </div>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Hide Details</b-button
            >
            <b-button size="sm" variant="success" @click="editItem(row.item)"
              >Lưu</b-button
            >
          </template>
        </b-table>
      </div>
      <div
        id="example2_paginate"
        class="dataTables_paginate paging_simple_numbers"
      >
        <paginate
          v-model="currentPage"
          :page-count="Math.ceil(totalRows / perPage)"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </div>
      <viewcv
        :itemid="itemid"
        v-show="isModalViewCv"
        @close="closeModalViewCv"
      />
      <AddAdmin
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      />
      <edituser
        :itemid="itemid"
        v-show="isModalEditVisible"
        @close="closeEditModal"
      />
      <editadmin
        :itemid="itemid"
        v-show="isModalEdit"
        @close="closeEditModal"
      />
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import editadmin from '@/components/administrator/editadmin';
import edituser from '@/components/employees/edituser';
import viewcv from '@/components/employees/viewcv';
import AddAdmin from '@/components/administrator/AddAdmin';

const { BASE_URL } = require('../../utils/config');
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('user')),
      encodedURL: `?token=${encodeURIComponent(localStorage.getItem('token'))}`,
      filter: null,
      isModalVisible: false,
      isModalEdit: false,
      isModalEditVisible: false,
      isModalViewCv: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page),
      page: Number(this.$route.query.page),
      itemid: '',
      fields: [
        {
          key: 'username',
          label: 'Tên đăng nhập',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'name',
          label: 'Họ và tên',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'status',
          label: 'Kích hoạt',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'show_details',
          label: 'Quyền hạn',
          thClass: 'text-center'
        },
        { key: 'actions', label: 'Thao tác', sortable: false }
      ]
    };
  },
  components: {
    editadmin,
    edituser,
    viewcv,
    AddAdmin
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showisModalEdit(id) {
      this.itemid = id;
      this.isModalEdit = true;
    },
    showisModalViewCv(id) {
      this.itemid = id;
      this.isModalViewCv = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeEditModal() {
      this.isModalEditVisible = false;
    },
    closeModalViewCv() {
      this.isModalViewCv = false;
    },
    clickCallback(pageNum) {
      this.items = this.employees.filter((item, index) => {
        if (
          (pageNum - 1) * this.perPage <= index &&
          index < pageNum * this.perPage
        ) {
          return true;
        }
        return false;
      });
    },
    updateMessage(variable) {
      this.items = variable;
    },

    makeQueryParams(sortOrder, currentPage, perPage) {
      return {
        sortBy: sortOrder[0].field,
        sortOrder: sortOrder[0].direction,
        pageNo: currentPage,
        pageSize: perPage
      };
    },
    editItem(item) {
      if (item.password != item.password2) {
        return alert('Xác nhận mật khẩu không khớp');
      }
      this.$http
        .put(
          `${BASE_URL}/admin/edit`,
          {
            data: item
          },
          {
            headers: {
              Authorization: `Basic ${localStorage.getItem('token')}`
            }
          }
        )
        .then(response => {
          alert('Cập nhật thành công');
        })
        .catch(function(error) {
          console.error(error.response);
        });
      console.log(item);
    },

    deleteItem(id, name) {
      this.$confirm({
        message: 'Bạn có muốn xóa ' + name,
        button: {
          yes: 'Đồng ý'
        },
        callback: confirm => {
          if (confirm) {
            this.$http
              .get(`${BASE_URL}/employee/delete/${id}`, {
                headers: {
                  Authorization: `Basic ${localStorage.getItem('token')}`
                }
              })
              .then(response => {
                this.$http
                  .get(`${BASE_URL}/admin/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem('token')}`
                    }
                  })
                  .then(response => {
                    this.items = response.data.data;
                    this.totalRows = this.items.length;
                  });
              })
              .catch(function(error) {
                console.error(error.response);
              });
          }
        }
      });
    }
  },
  created() {
    this.$http
      .get(`${BASE_URL}/admin/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then(response => {
        if (response.data) {
          this.items = response.data.data;
          this.totalRows = this.items.length;
          if (this.$route.query.page === undefined) {
            this.currentPage = 1;
          }
        }
      });
  }
};
</script>
