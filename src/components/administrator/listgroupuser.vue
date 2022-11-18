<template>
  <div>
    <section class="content-header">
      <h1>Quản lý người tìm việc</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách người tìm việc</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <multiselect
        v-model="fields"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Nhập từ khóa"
        label="label"
        track-by="key"
        :preselect-first="true"
      ></multiselect>
      <div class="row">
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
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
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
            <b>{{ item.job ? displayJobStatus(item.job.status) : "" }}</b>
          </template>

          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>
          <template v-slot:cell(actions)="{ item }">
            <b-icon
              icon="pen"
              variant="primary"
              style="margin: auto 2px"
              @click="showisModalEdit(item)"
            ></b-icon>
            <b-icon
              icon="trash"
              variant="danger"
              style="margin: auto 2px"
              @click="deleteItem(item._id, item.name)"
            ></b-icon>
          </template>

          <template #row-details="row">
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Nhóm chức năng NLĐ"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-row>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Nhóm chức năng NLĐ"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-row>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                    <b-col cols="6" sm="4" md="4">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        ><b>Quản lí NLĐ:</b><br />
                        <b-form-checkbox value="orange">Thêm</b-form-checkbox>
                        <b-form-checkbox value="apple">Sửa</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Xóa</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 1</b-form-checkbox>
                        <b-form-checkbox value="grape">Duyệt 2</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Hide Details</b-button
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
      <!-- <adduser
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      /> -->
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
import editadmin from "@/components/administrator/editadmin";
import edituser from "@/components/employees/edituser";
import viewcv from "@/components/employees/viewcv";
import Multiselect from "vue-multiselect";
const { BASE_URL } = require("../../utils/config");
export default {
  data() {
    return {
      encodedURL: `?token=${encodeURIComponent(localStorage.getItem("token"))}`,
      filter: null,
      isModalVisible: false,
      isModalEdit: false,
      isModalViewCv: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page),
      page: Number(this.$route.query.page),
      itemid: "",
      options: [
        {
          key: "approved",
          label: "Trạng thái Cvid",
          sortable: true,
          thClass: "text-center"
        },
        {
          key: "job.status",
          label: "Trạng thái tìm việc",
          sortable: true,
          thClass: "text-center"
        },
        { key: "actions", label: "Thao tác", sortable: false }
      ],
      fields: [
        {
          key: "username",
          label: "Tên đăng nhập",
          sortable: true,
          $isDisabled: true
        },
        {
          key: "name",
          label: "Họ và tên",
          sortable: true,
          $isDisabled: true
        },
        {
          key: "status",
          label: "Kích hoạt",
          sortable: true,
          thClass: "text-center"
        },
        {
          key: "show_details",
          label: "Kích hoạt",
          thClass: "text-center"
        },
        { key: "actions", label: "Thao tác", sortable: false }
      ]
    };
  },
  components: {
    editadmin,
    edituser,
    viewcv,
    Multiselect
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
    displayJobStatus(id) {
      switch (id) {
        case 1:
          return "Đang tìm việc";
          break;
        case 0:
          return "Tạm dừng tìm việc";
          break;
        default:
          return "Đang làm việc";
      }
    },
    displayCvidStatus(id) {
      switch (id) {
        case -1:
          return "Không được duyệt";
          break;
        case 0:
          return "Đang chờ duyệt";
          break;
        case 1:
          return "Đã duyệt lần 1";
          break;
        case 2:
          return "Đã duyệt lần 2";
          break;
        default:
          return "Chưa tạo CV";
      }
    },

    deleteItem(id, name) {
      this.$confirm({
        message: "Bạn có muốn xóa " + name,
        button: {
          yes: "Đồng ý"
        },
        callback: confirm => {
          if (confirm) {
            this.$http
              .get(`${BASE_URL}/employee/delete/${id}`, {
                headers: {
                  Authorization: `Basic ${localStorage.getItem("token")}`
                }
              })
              .then(response => {
                this.$http
                  .get(`${BASE_URL}/employee/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem("token")}`
                    }
                  })
                  .then(response => {
                    this.items = response.data;
                    this.totalRows = response.data.length;
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
      .get(`${BASE_URL}/employee/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
      })
      .then(response => {
        this.items = response.data.filter(cv => cv.approved != -1);
        this.totalRows = response.data.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
      });
  }
};
</script>
