
<template>
  <div>
    <section class="content-header">
      <h1>Quản lý chức danh công việc</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách chức danh công việc</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <b-form inline v-on:submit.prevent>
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              class="form-control"
              @input="clickCallback(1)"
            ></b-form-select>
            <b-button variant="primary" @click="showModal" style="float: right"
              >Thêm chức danh công việc</b-button
            >
            <b-input-group size="sm" class="m-r-5" style="float: right">
              <b-form-input
                type="search"
                v-model="filter"
                placeholder="Search terms"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </div>
        <b-table
          striped
          bordered
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
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
import adduser from "@/components/jobtitles/adduser";
import edituser from "@/components/jobtitles/edituser";
const { BASE_URL } = require("../../utils/config");
export default {
  data() {
    return {
      filter: null,
      isModalVisible: false,
      isModalEditVisible: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page),
      editid: "",
      fields: [
        { key: "index", label: "STT" },
        {
          key: "name",
          label: "Chức danh công việc",
          sortable: true,
        },
        { key: "actions", label: "Thao tác", sortable: false },
      ],
    };
  },
  components: {
    adduser,
    edituser,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
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
    displayUserType(id) {
      switch (id) {
        case 1:
          return "Quản trị viên";
          break;
        case 2:
          return "Người quản lý";
          break;
        default:
          return "Nhân viên";
      }
    },
    closeEditModal() {
      this.isModalEditVisible = false;
    },
    clickCallback(pageNum) {
      this.currentPage = pageNum
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    updateMessage(variable) {
      this.items = variable;
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
                "jobtitle/delete",
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
                  .get(`${BASE_URL}/jobtitle/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((response) => {
                    this.jobtitles = response.data;
                    this.totalRows = response.data.length;
                    this.items = this.jobtitles.filter((item, index) => {
                      if (
                        (this.currentPage - 1) * this.perPage <= index &&
                        index < this.currentPage * this.perPage
                      ) {
                        return true;
                      }
                      return false;
                    });
                  });
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
      .get(`${BASE_URL}/jobtitle/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.jobtitles = response.data;
        this.totalRows = response.data.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
        this.items = this.jobtitles
      });
  },
};
</script>