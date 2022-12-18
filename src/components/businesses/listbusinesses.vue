<!-- eslint-disable vue/no-parsing-error -->
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
            Thêm nhân viên
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
        <template v-slot:cell(username)="{ item }">
            <b-link href="https://dangkykinhdoanh.gov.vn/vn/Pages/Trangchu.aspx" target="_blank">{{item.username}}</b-link>
          </template>
          <template v-slot:cell(urlGPKD)="{ item }">
            <b-link @click="showModalViewGPKD(item)">Xem giấy ĐKKD</b-link>
          </template>
          <template v-slot:cell(address)="{ item }">
            {{
              item.address +
                ', ' +
                item.ward +
                ', ' +
                item.district +
                ', ' +
                item.province
            }}
          </template>
          <template v-slot:cell(confirm1.status)="{ item }">
            <div
              @click="item.confirm2.status != 1 && ConfirmModal(item.confirm1)"
            >
              <div
                :class="
                  item.confirm1.status == 1
                    ? 'status-confirm accept'
                    : item.confirm1.status == -1
                    ? 'status-confirm reject'
                    : 'status-confirm'
                "
              ></div>
              {{ getStatusConfirm(item.confirm1.status) }}
            </div>
          </template>
          <template v-slot:cell(confirm1.confirmAt)="{ item }">
            {{
              item.confirm1 && item.confirm1.status !== 0
                ? new Date(item.confirm1.confirmAt).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : ''
            }}
          </template>
          <template v-slot:cell(confirm1.confirmBy)="{ item }">
            {{
              item.confirm1 && item.confirm1.status !== 0
                ? item.confirm1.confirmBy
                : ''
            }}
          </template>

          <template v-slot:cell(confirm2.status)="{ item }">
            <div
              @click="item.confirm1.status == 1 && item.confirm2.status != 1 && ConfirmModal(item.confirm2)"
            >
              <div
                :class="
                  item.confirm2.status == 1
                    ? 'status-confirm accept'
                    : item.confirm2.status == -1
                    ? 'status-confirm reject'
                    : 'status-confirm'
                "
              ></div>
              {{ getStatusConfirm(item.confirm2.status) }}
            </div>
          </template>
          <template v-slot:cell(confirm2.confirmAt)="{ item }">
            {{
              item.confirm2 && item.confirm2.status !== 0
                ? new Date(item.confirm2.confirmAt).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : ''
            }}
          </template>
          <template v-slot:cell(confirm2.confirmBy)="{ item }">
            {{
              item.confirm2 && item.confirm2.status !== 0
                ? item.confirm2.confirmBy
                : ''
            }}
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
      <adduser
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      />
      <confirmModal
        :itemid="itemid"
        v-show="isModalConfirm"
        @close="closeConfirmModal"
      />
    </section>
  </div>
</template>
<script>
import adduser from '@/components/businesses/adduser';
import edituser from '@/components/businesses/edituser';
import viewGPKD from '@/components/businesses/viewGPKD';
import confirmModal from '@/components/businesses/ConfirmModal';

const { BASE_URL } = require('../../utils/config');
export default {
  data() {
    return {
      filter: null,
      isModalConfirm: false,
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
          value: ''
        },
        {
          key: 'username',
          label: 'Mã số thuế',
          sortable: true,
          value: ''
        },
        {
          key: 'address',
          label: 'Địa chỉ',
          sortable: true,
          value: ''
        },
        {
          key: 'usernjame',
          label: 'Tình trạng hoạt động',
          sortable: true,
          value: ''
        },
        {
          key: 'urlGPKD',
          label: 'Giấy ĐKKD',
          sortable: true,
          value: ''
        },
        {
          key: 'manager',
          label: 'Người đại diện',
          sortable: true,
          value: ''
        },
        {
          key: 'confirm1.status',
          label: 'Trạng thái duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC1'
        },
        {
          key: 'confirm1.confirmAt',
          label: 'Thời gian duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC1'
        },
        {
          key: 'confirm1.confirmBy',
          label: 'Người duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC1'
        },
        {
          key: 'confirm2.status',
          label: 'Trạng thái duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC2'
        },
        {
          key: 'confirm2.confirmAt',
          label: 'Thời gian duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC2'
        },
        {
          key: 'confirm2.confirmBy',
          label: 'Người duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'ntdC2'
        },
        { key: 'actions', label: 'Thao tác', sortable: false, value: '' }
      ]
    };
  },
  components: {
    adduser,
    edituser,
    viewGPKD,
    confirmModal
  },
  methods: {
    ConfirmModal(itemid) {
      this.isModalConfirm = true;
      this.itemid = itemid;
    },
    closeConfirmModal() {
      this.isModalConfirm = false;
    },
    showisModalEditVisible(id) {
      this.itemid = id;
      this.isModalEditVisible = true;
    },
    showModal(id) {
      this.itemid = id;
      this.isModalVisible = true;
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
    handleConfirm1(item) {
      item.status = -1;
    },
    getStatusConfirm(id) {
      id = parseInt(id);
      switch (id) {
        case -1:
          return 'Không được duyệt';
        case 0:
          return 'Đang chờ duyệt';
        case 1:
          return 'Đã được duyệt';
      }
    },
    displayGPKDStatus(id) {
      switch (id) {
        case -1:
          return 'Không đủ điều kiện';
          break;
        case 0:
          return 'Đang chờ duyệt';
          break;
        case 1:
          return 'Đã được duyệt';
      }
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
      .get(`${BASE_URL}/admin/me`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then(response => {
        if (response.data) {
          let admin = response.data;
          console.log(admin);
          this.fields = this.fields.filter(item => {
            if (item.value !== '') {
              return (
                admin.roles.includes(item.value) ||
                admin.roles.includes('admin')
              );
            }
            return true;
          });
        }
      });
    this.$http
      .get(`${BASE_URL}/business/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then(response => {
        this.items = response.data.filter(item => {
          return item.confirmEmail === true;
        });
        this.totalRows = this.items.length;
        if (this.$route.query.page === undefined) {
          this.currentPage = 1;
        }
      });
  }
};
</script>

<style scoped>
.status-confirm {
  width: 15px;
  height: 15px;
  border: 1px solid black;
  display: inline-block;
}
.status-confirm.accept {
  background: green;
}
.status-confirm.reject {
  background: red;
}
</style>
