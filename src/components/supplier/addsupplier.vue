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
              <label class="col-sm-2 control-label">Tên nhà cung cấp</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="supplier_name">
              </div>
            </div>
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
        supplier_name:"",
      }
    },
    methods: {
      handleSubmit() {
        if (this.supplier_name.length > 0) {
          this.$emit('close');
            this.$http.post('api/suppliers/addsupplier', {
                supplier_name: this.supplier_name,
            },
            {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
            )
            .then(response => {
              this.supplier_name ="";
              this.$emit("inputData", response.data)
            })
            .catch(function (error) {
              console.error(error.response);
          });
        }
      }
    }
  };
</script>