
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
              <a :href="'https://cvidpro.net/job-resume/'+item._id+encodedURL" target="_blank">
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

          <template v-slot:cell(confirm1.confirmed)="{ item }">
           {{getStatusConfirm(item.confirm1.confirmed)}}
          </template>
          <template v-slot:cell(confirm1.confirmAt)="{ item }">
           {{item.confirm1 && item.confirm1.confirmed !== 0? new Date(item.confirm1.confirmAt):''}}
          </template>
          <template v-slot:cell(confirm1.confirmBy)="{ item }">
           {{item.confirm1 && item.confirm1.confirmed !== 0? item.adminConfirm1.name :'' }}
          </template>

          <template v-slot:cell(confirm2.confirmed)="{ item }">
           {{getStatusConfirm(item.confirm2.confirmed)}}
          </template>
          <template v-slot:cell(confirm2.confirmAt)="{ item }">
           {{item.confirm2 && item.confirm2.confirmed !== 0? new Date(item.confirm2.confirmAt):'' }}
          </template>
          <template v-slot:cell(confirm2.confirmBy)="{ item }">
           {{item.confirm2 && item.confirm2.confirmed !== 0? item.adminConfirm2.name :'' }}
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
import axios from '../../utils/AxiosInstance'
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
          sortable: true,
          value: ''
        },
        {
          key: 'viewcv',
          label: 'Thông tin CV',
          sortable: true,
          class: 'text-center',
          value: ''
        },
        {
          key: 'confirm1.confirmed',
          label: 'Trạng thái duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC1'
        },
        {
          key: 'confirm1.confirmAt',
          label: 'Thời gian duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC1'
        },
        {
          key: 'confirm1.confirmBy',
          label: 'Người duyệt 1',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC1'
        },
        {
          key: 'confirm2.confirmed',
          label: 'Trạng thái duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC2'
        },
        {
          key: 'confirm2.confirmAt',
          label: 'Thời gian duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC2'
        },
        {
          key: 'confirm2.confirmBy',
          label: 'Người duyệt 2',
          sortable: true,
          thClass: 'text-center',
          value: 'nldC2'
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
    getStatusConfirm (id) {
      switch (id) {
        case -1:
          return 'Không được duyệt'
        case 0:
          return 'Đang chờ duyệt'
        case 1:
          return 'Đã được duyệt'
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
                    this.items = response.data.filter(item => item.confirmPhone === true)
                    this.totalRows = this.items.length
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
      .get(`${BASE_URL}/admin/me`, {
        headers: { Authorization: `Basic ${localStorage.getItem('token')}` }
      })
      .then((response) => {
        if (response.data){
          let admin = response.data
          console.log(admin)
          this.fields = this.fields.filter(item => {
            if (item.value !== '') {
              return admin.roles.includes(item.value) || admin.roles.includes('admin')
            }
            return true
          })
        }
      })
      axios.get(`employee/get-all`)
      .then(res => res.data.data)
      .then((response) => {
        this.items = response.filter(item => item.confirmPhone === true)
        this.totalRows = this.items.length
        if (this.$route.query.page === undefined) {
          this.currentPage = 1
        }
        this.isBusy = false
      })
  }
}
</script>
