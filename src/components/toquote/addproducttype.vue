<template>
  <transition name="modal" ref="modalElement">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <button aria-label="Dismiss" class="ngdialog-close" @click="$emit('close')"></button>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Tên hệ</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="product_type">
              </div>
            </div>
            <table class="table">
              <thead>
                  <tr>
                      <th width="25px">#</th>
                      <th>Tên hệ</th>
                      <th width="20px"></th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(invoicetype, index) in editid.product_type" :key="index">
                  <td></td>
                  <td><a>{{invoicetype.name}}</a></td>
                  <td>
                    <a>
                      <i class="icon-remove-circle"></i>
                    </a>
                  </td>
                  </tr>
              </tbody>
    		    </table>
            <div class="panel-body_modal">
              <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'addproducttype',
    data(){
      return {
        modalElement: null,
        listprojects:[],
        product_type:"",
      }
    },
    methods: {
      handleSubmit() {
        if (this.editid.project_name.length > 0) {
          this.$emit('close');
            this.$http.post('api/toquote/addproductdetail', {
                product_type: this.product_type,
                id:this.editid._id,
            },
            {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
            )
            .then(response => {

            })
            .catch(function (error) {
              console.error(error.response);
          });
        }
      }
    },
    props:['editid']
  };
</script>