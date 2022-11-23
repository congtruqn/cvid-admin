<template>
  <div>
    <section class="content-header">
      <h1>Quản lý người dùng</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách người dùng</a></li>
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
          :items="items"
          :fields="fields"
          :filter="filter"
        >
          <template v-slot:cell(updateAt)="{ item }">
            {{new Date(item.updateAt).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}}
          </template>
          <template v-slot:cell(status)="{ item }">
            <b>{{ displayPositionStatus(item.status) }}</b>
          </template>

          <template v-slot:cell(confirm1.status)="{ item }">
           {{item.confirm1 && item.confirm1.status === 1?'Đã được duyệt':'Đang chờ duyệt'}}
          </template>
          <template v-slot:cell(confirm1.confirmAt)="{ item }">
           {{item.confirm1 && item.confirm1.status === 1? new Date(item.confirm1.confirmAt).toLocaleString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                year: "numeric",
                month: "short",
                day: "numeric"
              }):'' }}
          </template>
          <template v-slot:cell(confirm1.confirmBy)="{ item }">
           {{item.confirm1 && item.confirm1.status === 1? item.confirm1.confirmBy :'' }}
          </template>

          <template v-slot:cell(confirm2.status)="{ item }">
           {{item.confirm2 && item.confirm2.status === 1?'Đã được duyệt':'Đang chờ duyệt'}}
          </template>
          <template v-slot:cell(confirm2.confirmAt)="{ item }">
           {{item.confirm2 && item.confirm2.status === 1? new Date(item.confirm2.confirmAt).toLocaleString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                year: "numeric",
                month: "short",
                day: "numeric"
              }):'' }}
          </template>
          <template v-slot:cell(confirm2.confirmBy)="{ item }">
           {{item.confirm2 && item.confirm2.status === 1? item.confirm2.confirmBy :'' }}
          </template>

          <template v-slot:cell(questions)="{ item }">
            <b
              >Xem tiêu chí
              <b-icon
                icon="eye"
                variant="primary"
                style="float: right"
              ></b-icon>
            </b>
          </template>
          <template v-slot:cell(questions)="{ item }">
            <b
              >Xem tiêu chí
              <b-icon
                icon="eye"
                variant="primary"
                style="float: right"
              ></b-icon>
            </b>
          </template>
          <template v-slot:cell(actions)="{ item }">
            <b-icon
              icon="trash"
              variant="danger"
              style="margin: auto"
              @click="deleteItem(item._id, item.name)"
            ></b-icon>
          </template>
          <template v-slot:cell(department)="{ item }">
            <b
              >Xem phòng ban
              <b-icon
                icon="eye"
                variant="success"
                style="float: right"
              ></b-icon>
            </b>
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
      <viewGPKD
        :itemid="itemid"
        v-show="isModalViewGPKD"
        @close="closeModalViewGPKD"
      />
      <adduser
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      />
      <edituser
        :itemid="itemid"
        v-show="isModalEditVisible"
        @close="closeEditModal"
      />
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import adduser from "@/components/businesses/adduser";
import edituser from "@/components/businesses/edituser";
import viewGPKD from "@/components/businesses/viewGPKD";
import Multiselect from "vue-multiselect";
const { BASE_URL } = require("../../utils/config");
export default {
  data() {
    return {
      filter: null,
      isModalVisible: false,
      isModalEditVisible: false,
      isModalViewGPKD: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page),
      page: Number(this.$route.query.page),
      itemid: "",
      options: [
        // {
        //   key: 'approved',
        //   label: 'Giấy phép kinh doanh',
        //   sortable: true,
        //   thClass: 'text-center'
        // },
        // // {
        // //   key: "job.status",
        // //   label: "Trạng thái tìm việc",
        // //   sortable: true,
        // //   thClass: "text-center",
        // // },
        // { key: 'actions', label: 'Thao tác', sortable: false }
      ],
      fields: [
        {
          key: "jobtitle",
          label: "Tên chức danh",
          sortable: true,
          $isDisabled: true
        },
        {
          key: "status",
          label: "Trạng thái tuyển dụng",
          sortable: false,
          thClass: "text-center"
        },
        // {
        //   key: 'approved',
        //   label: 'Thông tin tuyển dụng',
        //   sortable: false,
        //   thClass: 'text-center'
        // },
        {
          key: "updateAt",
          label: "Thời gian cập nhật",
          sortable: true,
          thClass: "text-center"
        },
        {
          key: 'confirm1.status',
          label: 'Trạng thái duyệt 1',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'confirm1.confirmAt',
          label: 'Thời gian duyệt 1',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'confirm1.confirmBy',
          label: 'Người duyệt 1',
          sortable: true,
          thClass: 'text-center'
        },
       {
          key: 'confirm2.status',
          label: 'Trạng thái duyệt 2',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'confirm2.confirmAt',
          label: 'Thời gian duyệt 2',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'confirm2.confirmBy',
          label: 'Người duyệt 2',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: "questions",
          label: "Tiêu chí",
          sortable: false,
          thClass: "text-center"
        },
        { key: "actions", label: "Thao tác", sortable: false }
      ]
    };
  },
  components: {
    adduser,
    edituser,
    viewGPKD,
    Multiselect
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showisModalEditVisible(id) {
      this.itemid = id;
      this.isModalEditVisible = true;
    },
    showModalViewGPKD(id) {
      this.itemid = id;
      this.isModalViewGPKD = true;
    },
    closeModalViewGPKD() {
      this.isModalViewGPKD = false;
    },

    closeModal() {
      this.isModalVisible = false;
    },
    closeEditModal() {
      this.isModalEditVisible = false;
    },
    displayUserType(id) {
      switch (id) {
        case 1:
          return "Quản trị viên";
        case 2:
          return "Người quản lý";
        default:
          return "Nhân viên";
      }
    },
    displayPositionStatus(id) {
      id = parseInt(id);
      switch (id) {
        case 0:
          return "Đang tìm ứng viên";
        case 1:
          return "Dừng tìm ứng viên";
      }
    },

    clickCallback(pageNum) {
      this.$http
        .get(`${BASE_URL}/employee/getall?page=${pageNum}`, {
          headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
        })
        .then(response => (this.items = response.data));
    },
    updateMessage(variable) {
      this.items = variable;
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
              .get(
                `${BASE_URL}/business/delete/${id}`,

                {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem("token")}`
                  }
                }
              )
              .then(response => {
                this.$http
                  .get(`${BASE_URL}/business/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem("token")}`
                    }
                  })
                  .then(response => (this.items = response.data));
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
      .get(`${BASE_URL}/department/position/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
      })
      .then(response => {
        console.log(response.data);
        this.items = response.data;
        this.totalRows = response.data.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
      });
  }
};
</script>
