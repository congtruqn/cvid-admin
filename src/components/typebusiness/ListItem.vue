<template>
  <div>
    <section class="content-header">
      <h1>Quản lý loại hình doanh nghiệp</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách loại hình doanh nghiệp</a></li>
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
              >Thêm loại hình doanh nghiệp</b-button
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
          <template v-slot:cell(actions)="{ item }">
            <b-icon
              icon="pen"
              variant="primary"
              style="margin: auto"
              @click="showEditModal(item)"
            ></b-icon>
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
      <AddItem
        @inputData="updateMessage"
        v-show="isModalVisible"
        @close="closeModal"
      />
      <EditItem
        :itemid="itemid"
        v-show="isModalEditVisible"
        @close="closeEditModal"
      />
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import AddItem from './AddItem.vue';
import EditItem from './EditItem.vue';
const { BASE_URL } = require('../../utils/config');
export default {
  data() {
    return {
      filter: null,
      isModalVisible: false,
      isModalEditVisible: false,
      items: [],
      totalRows: 1,
      perPage: 20,
      pageOptions: [10, 20, 50, 100],
      currentPage: Number(this.$route.query.page) || 1,
      itemid: '',
      fields: [
        { key: 'index', label: 'STT' },
        {
          key: 'name',
          label: 'Loại hình doanh nghiệp',
          sortable: true
        },
        { key: 'actions', label: 'Thao tác', sortable: false }
      ]
    };
  },
  components: {
    AddItem,
    EditItem
  },
  computed: {},
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showEditModal(id) {
      this.itemid = id;
      this.isModalEditVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeEditModal() {
      this.isModalEditVisible = false;
    },
    clickCallback(pageNum) {
      this.currentPage = pageNum;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
              .post(
                'jobtitle/delete',
                {
                  id: id
                },
                {
                  headers: {
                    Authorization: `Basic ${localStorage.getItem('token')}`
                  }
                }
              )
              .then(response => {
                this.$http
                  .get(`${BASE_URL}/jobtitle/getall`, {
                    headers: {
                      Authorization: `Basic ${localStorage.getItem('token')}`
                    }
                  })
                  .then(response => {
                    this.items = response.data;
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
      .get(`${BASE_URL}/typebusiness/getall`, {
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
