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
              <label class="col-sm-2 control-label">Tên nhãn hiệu</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="brand_name">
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
    name: 'addbrand',
    data(){
      return {
        modalElement: null,
        brand_name:"",
      }
    },
    methods: {
      handleSubmit() {
        if (this.brand_name.length > 0) {
          this.$emit('close');
            this.$http.post('api/brands/addbrand', {
                brand_name:this.brand_name
            },
            {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
            )
            .then(response => {
              this.brand_name ="";
              this.$emit("inputData", response.data)
            })
            .catch(function (error) {
              console.error(error.response);
          });
        }
      }
    },
    mounted () {
    }
  };
</script>