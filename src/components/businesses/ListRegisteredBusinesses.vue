<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <section class="content-header">
      <h1>Quản lý NTD đăng kí</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách NTD</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button class="btn btn-primary m-r-5 m-b-5" @click="showModal">
            Thêm NTD
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
          <template v-slot:cell(status)="{ item }">
            {{ item.confirmEmail === true ? 'Đã xác thực' : 'Chưa xác thực' }}
          </template>
          <template v-slot:cell(actions)="{ item }">
            <b-icon
              icon="trash"
              variant="danger"
              style="margin: auto"
              @click="deleteItem(item._id, item.name)"
            ></b-icon>
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
      <AddBusiness
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
import AddBusiness from '@/components/businesses/AddBusiness';
import edituser from '@/components/businesses/edituser';
import viewGPKD from '@/components/businesses/viewGPKD';
import Multiselect from 'vue-multiselect';
const { BASE_URL } = require('../../utils/config');
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
      itemid: '',
      fields: [
        {
          key: 'name',
          label: 'Tên công ty',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'username',
          label: 'Mã số thuế',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'createdAt',
          label: 'Thời gian đăng kí',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'manager',
          label: 'Người đăng kí',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'position',
          label: 'Chức vụ',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'phone',
          label: 'Số điện thoại',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'status',
          label: 'Trạng thái',
          sortable: true,
          thClass: 'text-center'
        },
        { key: 'actions', label: 'Thao tác', sortable: false }
      ]
    };
  },
  components: {
    AddBusiness,
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

    clickCallback(pageNum) {
      this.$http
        .get(`${BASE_URL}/employee/getall?page=${pageNum}`, {
          headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
        })
        .then(response => (this.items = response.data));
    },
    updateMessage(variable) {
      this.items = variable;
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
              .get(
                `${BASE_URL}/business/delete/${id}`,

                {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem('token')}`
                  }
                }
              )
              .then(response => {
                this.$http
                  .get(`${BASE_URL}/business/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem('token')}`
                    }
                  })
                  .then(response => (this.items = response.data));
                this.$http
                  .get('api/user/getcountuser', {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem('token')}`
                    }
                  })
                  .then(response => (this.totalRows = response.data));
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
      .get(`${BASE_URL}/business/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then(response => {
        this.items = response.data;
        this.totalRows = this.items.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
      });
  }
};
</script>
