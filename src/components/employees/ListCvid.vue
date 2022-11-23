
<template>
  <div>
    <section class="content-header">
      <h1>Quản lý CVID</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách CVID</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <b-form inline class="m-b-5 m-t-5">
          <b-form-select
            v-model="perPage"
            :options="pageOptions"
            class="form-control"
          ></b-form-select>
          <b-input-group
            size="sm"
            class=""
            style="float: right"
          >
            <b-form-input
              type="search"
              v-model="filter"
              placeholder="Search terms"
            ></b-form-input>
          </b-input-group>

        </b-form>

        <b-table
        :busy="isBusy"
          striped
          bordered
          hover
          :items="items"
          :fields="fields"
          :filter="filter"
        >
        <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
          <template v-slot:cell(viewcv)="{ item }">
            <b> 
              <a :href="'https://cvidpro.net/cvid/'+item._id+encodedURL" target="_blank">
      Xem CV
              </a>
            </b>
          </template>
          <template v-slot:cell(job.status)="{ item }">
            <b>{{ item.job ? displayJobStatus(item.job.status) : "" }}</b>
          </template>
          <template v-slot:cell(comfirm1)="{ item }">
            <td>sxc</td><td>s</td>
          </template>
        <template v-slot:cell(confirm1)="{ item }">
            <a v-if="item.confirm1.status == 0" @click="showModalViewGPKD(item)">Đang chờ duyệt</a>
            <a v-else-if="item.confirm1.status == -1" disabled>
              Trạng thái: Yêu cầu chỉnh sửa</br>
              Thời gian: {{ new Date(item.confirm1.confirmAt).toLocaleString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                year: "numeric",
                month: "short",
                day: "numeric"
              }) }}<br />
              Người duyệt: {{ item.confirm1.confirmBy }}
            </a>
            <a v-else @click="showModalViewGPKD(item)"
              >
              Trạng thái: Đã duyệt </br>
              Thời gian: {{ new Date(item.confirm1.confirmAt).toLocaleString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                year: "numeric",
                month: "short",
                day: "numeric"
              }) }}<br />
              Người duyệt: {{ item.confirm1.confirmBy }}
            </a>
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
          <template v-slot:cell(actions)="{ item }">
              <b-icon
                icon="trash"
                variant="danger"
                style="margin: auto"
                @click="deleteItem(item._id, item.name)"
              ></b-icon>
          </template>
        </b-table>
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
      <viewcv :itemid="itemid" v-show="isModalViewCv" @close="closeModalViewCv" />
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
import adduser from '@/components/employees/adduser'
import edituser from '@/components/employees/edituser'
import viewcv from '@/components/employees/viewcv'
import Multiselect from 'vue-multiselect'
const { BASE_URL } = require('../../utils/config')
export default {
  data () {
    return {
      encodedURL: `?token=${encodeURIComponent(localStorage.getItem('token'))}`,
      filter: null,
      isModalVisible: false,
      isModalEditVisible: false,
      isModalViewCv: false,
      jobtitles: [],
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page),
      page: Number(this.$route.query.page),
      isBusy: true,
      itemid: '',
      fields: [
        {
          key: 'name',
          label: 'Họ và tên',
          sortable: true
        },
        {
          key: 'viewcv',
          label: 'Thông tin CV',
          sortable: true,
          class: 'text-center'
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
        // {
        //   key: 'job.status',
        //   label: 'Trạng thái tìm việc',
        //   sortable: true,
        //   thClass: 'text-center'
        // },
        // {
        //   key: 'createdAt',
        //   label: 'Thời gian cập nhật',
        //   sortable: true,
        //   thClass: 'text-center'
        // },
        // {
        //   key: 'timeBrowse',
        //   label: 'Thời gian duyệt CV',
        //   sortable: true,
        //   thClass: 'text-center'
        // },
        // {
        //   key: 'job',
        //   label: 'Công việc mong muốn',
        //   sortable: true,
        //   thClass: 'text-center'
        // },
        // { key: 'actions', label: 'Thao tác', sortable: false }
      ]
    }
  },
  components: {
    adduser,
    edituser,
    viewcv,
    Multiselect
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    showisModalEditVisible (id) {
      this.itemid = id
      this.isModalEditVisible = true
    },
    showisModalViewCv (id) {
      this.itemid = id
      this.isModalViewCv = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    closeEditModal () {
      this.isModalEditVisible = false
    },
    closeModalViewCv () {
      this.isModalViewCv = false
    },
    clickCallback (pageNum) {
      this.items = this.employees.filter((item, index) => {
        if (
          (pageNum - 1) * this.perPage <= index &&
          index < pageNum * this.perPage
        ) {
          return true
        }
        return false
      })
    },
    updateMessage (variable) {
      this.items = variable
    },

    makeQueryParams (sortOrder, currentPage, perPage) {
      return {
        sortBy: sortOrder[0].field,
        sortOrder: sortOrder[0].direction,
        pageNo: currentPage,
        pageSize: perPage
      }
    },
    displayJobStatus (id) {
      switch (id) {
        case 1:
          return 'Đang tìm việc'
          break
        case 0:
          return 'Tạm dừng tìm việc'
          break
        default:
          return 'Đang làm việc'
      }
    },
    displayCvidStatus (id) {
      switch (id) {
        case -1:
          return 'Không được duyệt'
          break
        case 0:
          return 'Đang chờ duyệt'
          break
        case 1:
          return 'Đã duyệt lần 1'
          break
        case 2:
          return 'Đã duyệt lần 2'
          break
        default:
          return 'Chưa tạo CV'
      }
    },

    deleteItem (id, name) {
      this.$confirm({
        message: 'Bạn có muốn xóa ' + name,
        button: {
          yes: 'Đồng ý'
        },
        callback: (confirm) => {
          if (confirm) {
            this.$http
              .get(`${BASE_URL}/employee/delete/${id}`, {
                headers: {
                  Authorization: `Basic ${localStorage.getItem('token')}`
                }
              })
              .then((response) => {
                this.$http
                  .get(`${BASE_URL}/employee/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem('token')}`
                    }
                  })
                  .then((response) => {
                    this.items = response.data
                    this.totalRows = response.data.length
                  })
              })
              .catch(function (error) {
                console.error(error.response)
              })
          }
        }
      })
    }
  },
  created () {
    this.$http
      .get(`${BASE_URL}/employee/getall`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then((response) => {
        this.items = response.data
        this.totalRows = response.data.length
        this.isBusy = false
        if (this.$route.query.page === undefined) {
          this.currentPage = 1
        }
      })
  }
}
</script>
