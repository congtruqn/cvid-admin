<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <button
                aria-label="Dismiss"
                class="ngdialog-close"
                @click="$emit('close')"
              ></button>
            </div>
            <b-table
              striped
              bordered
              hover
              :items="items"
              :fields="fields"
              :filter="filter"
            >
            </b-table>
            <div class="panel-body_modal">
              <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'EditInvoiceType',
  data () {
    return {
      items: [
        {
          name: 'Quản lí người lao động'
        },
        {
          name: 'Quản lí vị trí tuyển dụng'
        },
        {
          name: 'Quản lí hỗ trợ'
        },
        {
          name: 'Quản lí thanh toán'
        }
      ],
      fields: [
        {
          key: 'name',
          label: 'Quyền',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'namex',
          label: 'Thêm',
          sortable: true,
          $isDisabled: true
        },
        {
          key: 'status',
          label: 'Sửa',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'status',
          label: 'Sửa',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'status',
          label: 'Sửa',
          sortable: true,
          thClass: 'text-center'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {}
  },
  props: ['itemid']
}
</script>
