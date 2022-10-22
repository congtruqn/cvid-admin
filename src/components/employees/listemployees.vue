
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
      <div class="row">
        <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="items"
          :options="options"
        ></vuetable>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="25px">STT</th>
              <th>Tên người dùng</th>

              <th colspan="4" class="text-center">Trạng thái</th>
              <th width="15px" class="functionicon"></th>
              <th width="15px" class="functionicon"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ (currentPage - 1) * 20 + index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>Đã đăng kí</td>
              <td>{{ item.point ? "Đã tạo cv" : "Chưa tạo cv" }}</td>
              <td>{{ "Chưa được duyệt" }}</td>
              <td>{{ item.job ? displayUserStatus(item.job.status) : "" }}</td>
              <td>
                <span>
                  <a href="#" @click="showisModalEditVisible(item)">
                    <i class="fa fa-edit"></i>
                  </a>
                </span>
              </td>
              <td>
                <a href="#" @click="dellItem(item._id, item.name)">
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
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
      <adduser
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      />
      <edituser
        :editid="editid"
        v-show="isModalEditVisible"
        @close="closeEditModal"
      />
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import Vuetable from "vuetable-2";
import adduser from "@/components/employees/adduser";
import edituser from "@/components/employees/edituser";
const { BASE_URL } = require("../../utils/config");
export default {
  data() {
    return {
      isModalVisible: false,
      isModalEditVisible: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      currentPage: Number(this.$route.query.page),

      countinvoicetype: "",
      page: Number(this.$route.query.page),
      editid: "",
      fields: [
        {
          name: "name",
          sortField: "name",
        },
        {
          name: "Trạng thái",
        },
      ],
      options: {
        headings: {
          name: 'Country Name',
          code: 'Country Code',
          uri: 'View Record'
        },
        sortable: ['name'],
        filterable: ['name']
      },
    };
  },
  components: {
    adduser,
    edituser,
    Vuetable,
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showisModalEditVisible(id) {
      this.editid = id;
      this.isModalEditVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    displayUserStatus(id) {
      switch (id) {
        case 1:
          return "Đang tìm việc";
          break;
        case 0:
          return "Chưa tìm việc";
          break;
        default:
          return "Đã đăng kí";
      }
    },
    closeEditModal() {
      this.isModalEditVisible = false;
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
  
    makeQueryParams (sortOrder, currentPage, perPage) {
      return {
        sortBy: sortOrder[0].field,
        sortOrder: sortOrder[0].direction,
        pageNo: currentPage,
        pageSize: perPage
      }
    },
  
    dellItem(id, name) {
      this.$confirm({
        message: "Bạn có muốn xóa " + name,
        button: {
          yes: "Đồng ý",
        },
        callback: (confirm) => {
          if (confirm) {
            this.$http
              .post(
                "api/toquote/delltoquote",
                {
                  id: id,
                },
                {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                this.$http
                  .get(`${BASE_URL}/employee/getall?page=${this.currentPage}`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((response) => (this.items = response.data));
                this.$http
                  .get("api/user/getcountuser", {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((response) => (this.countinvoicetype = response.data));
              })
              .catch(function (error) {
                console.error(error.response);
              });
          }
        },
      });
    },
  },
  created() {
    this.$http
      .get(`${BASE_URL}/employee/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.employees = response.data;
        this.totalRows = response.data.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
        this.items = this.employees.filter((item, index) => {
          if (
            (this.currentPage - 1) * this.perPage <= index &&
            index < this.currentPage * this.perPage
          ) {
            return true;
          }
          return false;
        });
      });
  },
};
</script>